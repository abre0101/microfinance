from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime
from app import db

bp = Blueprint('profit', __name__, url_prefix='/api/profit')

@bp.route('/calculate-annual', methods=['POST'])
@jwt_required()
def calculate_annual_profit():
    """Calculate annual profit (Admin/Accountant only)"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['admin', 'accountant']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    year = data.get('year', datetime.utcnow().year - 1)
    
    # Calculate total interest income from loans
    loans = list(db.loans.find({'status': {'$in': ['disbursed', 'repaying', 'closed']}}))
    
    total_interest_income = 0
    total_insurance_income = 0
    
    for loan in loans:
        # Get loan product for interest rate
        product = db.loan_products.find_one({'_id': ObjectId(loan['product_id'])})
        if product:
            # Calculate interest paid
            loan_amount = loan['amount']
            tenure = loan['tenure_months']
            interest_rate = product['interest_rate']
            
            # Simple calculation: total interest = (amount * rate * tenure) / (12 * 100)
            monthly_rate = interest_rate / (12 * 100)
            emi = loan['monthly_emi']
            total_payment = emi * tenure
            total_interest = total_payment - loan_amount
            
            total_interest_income += total_interest
        
        # Add insurance income
        total_insurance_income += loan.get('insurance_amount', 0)
    
    # Calculate expenses (simplified)
    total_expenses = 0  # Add operational expenses, salaries, etc.
    
    # Calculate profit
    total_revenue = total_interest_income + total_insurance_income
    net_profit = total_revenue - total_expenses
    
    return jsonify({
        'year': year,
        'revenue': {
            'interest_income': round(total_interest_income, 2),
            'insurance_income': round(total_insurance_income, 2),
            'total_revenue': round(total_revenue, 2)
        },
        'expenses': {
            'operational_expenses': round(total_expenses, 2),
            'total_expenses': round(total_expenses, 2)
        },
        'net_profit': round(net_profit, 2)
    }), 200

@bp.route('/distribute', methods=['POST'])
@jwt_required()
def create_profit_distribution():
    """Create profit distribution plan (Admin only)"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] != 'admin':
        return jsonify({'error': 'Unauthorized - Admin only'}), 403
    
    data = request.get_json()
    year = data.get('year')
    total_profit = data.get('total_profit')
    distribution_percentage = data.get('distribution_percentage', 60)  # Default 60% distributed, 40% retained
    
    # Calculate distributable amount
    distributable_amount = total_profit * (distribution_percentage / 100)
    retained_earnings = total_profit - distributable_amount
    
    # Get total shares
    total_shares_result = db.shareholders.aggregate([
        {'$group': {'_id': None, 'total': {'$sum': '$shares_owned'}}}
    ])
    total_shares_list = list(total_shares_result)
    total_shares = total_shares_list[0]['total'] if total_shares_list else 0
    
    if total_shares == 0:
        return jsonify({'error': 'No shareholders found'}), 400
    
    # Calculate dividend per share
    dividend_per_share = distributable_amount / total_shares
    
    # Create distribution record
    distribution = {
        'year': year,
        'total_profit': total_profit,
        'distribution_percentage': distribution_percentage,
        'distributable_amount': distributable_amount,
        'retained_earnings': retained_earnings,
        'total_shares': total_shares,
        'dividend_per_share': round(dividend_per_share, 2),
        'status': 'pending',
        'created_by': user_id,
        'created_at': datetime.utcnow()
    }
    
    result = db.profit_distributions.insert_one(distribution)
    
    return jsonify({
        'distribution_id': str(result.inserted_id),
        'year': year,
        'total_profit': total_profit,
        'distributable_amount': distributable_amount,
        'retained_earnings': retained_earnings,
        'total_shares': total_shares,
        'dividend_per_share': round(dividend_per_share, 2),
        'message': 'Profit distribution plan created. Approve to distribute.'
    }), 201

@bp.route('/approve/<distribution_id>', methods=['POST'])
@jwt_required()
def approve_distribution(distribution_id):
    """Approve profit distribution (Admin only)"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] != 'admin':
        return jsonify({'error': 'Unauthorized - Admin only'}), 403
    
    distribution = db.profit_distributions.find_one({'_id': ObjectId(distribution_id)})
    
    if not distribution:
        return jsonify({'error': 'Distribution not found'}), 404
    
    if distribution['status'] != 'pending':
        return jsonify({'error': 'Distribution already processed'}), 400
    
    # Update distribution status
    db.profit_distributions.update_one(
        {'_id': ObjectId(distribution_id)},
        {'$set': {
            'status': 'approved',
            'approved_by': user_id,
            'approved_at': datetime.utcnow()
        }}
    )
    
    return jsonify({'message': 'Distribution approved. Ready to distribute.'}), 200

@bp.route('/execute/<distribution_id>', methods=['POST'])
@jwt_required()
def execute_distribution(distribution_id):
    """Execute profit distribution to all shareholders (Admin/Accountant only)"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['admin', 'accountant']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    distribution = db.profit_distributions.find_one({'_id': ObjectId(distribution_id)})
    
    if not distribution:
        return jsonify({'error': 'Distribution not found'}), 404
    
    if distribution['status'] != 'approved':
        return jsonify({'error': 'Distribution must be approved first'}), 400
    
    # Get all active shareholders
    shareholders = list(db.shareholders.find({'is_active': True}))
    
    dividend_per_share = distribution['dividend_per_share']
    total_distributed = 0
    payments_made = 0
    
    # Create dividend payment for each shareholder
    for shareholder in shareholders:
        shares_owned = shareholder['shares_owned']
        dividend_amount = shares_owned * dividend_per_share
        
        # Create payment record
        payment = {
            'distribution_id': distribution_id,
            'user_id': shareholder['user_id'],
            'year': distribution['year'],
            'shares_owned': shares_owned,
            'dividend_per_share': dividend_per_share,
            'dividend_amount': round(dividend_amount, 2),
            'payment_date': datetime.utcnow(),
            'payment_method': 'bank_transfer',
            'status': 'paid',
            'created_at': datetime.utcnow()
        }
        
        db.dividend_payments.insert_one(payment)
        
        # Update shareholder's total dividends received
        db.shareholders.update_one(
            {'_id': shareholder['_id']},
            {'$inc': {'total_dividends_received': round(dividend_amount, 2)}}
        )
        
        total_distributed += dividend_amount
        payments_made += 1
    
    # Update distribution status
    db.profit_distributions.update_one(
        {'_id': ObjectId(distribution_id)},
        {'$set': {
            'status': 'distributed',
            'distributed_at': datetime.utcnow(),
            'distributed_by': user_id,
            'total_distributed': round(total_distributed, 2),
            'payments_made': payments_made
        }}
    )
    
    return jsonify({
        'message': 'Dividends distributed successfully',
        'payments_made': payments_made,
        'total_distributed': round(total_distributed, 2)
    }), 200

@bp.route('/distributions', methods=['GET'])
@jwt_required()
def get_distributions():
    """Get all profit distributions (Admin/Accountant)"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['admin', 'accountant']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    distributions = list(db.profit_distributions.find().sort('year', -1))
    
    for dist in distributions:
        dist['_id'] = str(dist['_id'])
    
    return jsonify(distributions), 200

@bp.route('/my-dividends', methods=['GET'])
@jwt_required()
def get_my_dividends():
    """Get dividend payment history for current user"""
    user_id = get_jwt_identity()
    
    dividends = list(db.dividend_payments.find({'user_id': user_id}).sort('year', -1))
    
    for div in dividends:
        div['_id'] = str(div['_id'])
    
    total_received = sum(div['dividend_amount'] for div in dividends)
    
    return jsonify({
        'dividends': dividends,
        'total_received': round(total_received, 2)
    }), 200
