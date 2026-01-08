from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from app import db
from app.services.loan_service import generate_amortization_schedule

bp = Blueprint('amortization', __name__, url_prefix='/api/amortization')

@bp.route('/loan/<loan_id>', methods=['GET'])
@jwt_required()
def get_loan_schedule(loan_id):
    """Get amortization schedule for a specific loan"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    loan = db.loans.find_one({'_id': ObjectId(loan_id)})
    
    if not loan:
        return jsonify({'error': 'Loan not found'}), 404
    
    # Check authorization
    is_authorized = (
        loan['user_id'] == user_id or  # Borrower
        user['role'] in ['loan_officer', 'loan_committee', 'accountant', 'admin']  # Staff
    )
    
    if not is_authorized:
        return jsonify({'error': 'Unauthorized to view this loan schedule'}), 403
    
    # Get loan product for interest rate
    product = db.loan_products.find_one({'_id': ObjectId(loan['product_id'])})
    
    if not product:
        return jsonify({'error': 'Loan product not found'}), 404
    
    # Generate schedule
    schedule = generate_amortization_schedule(
        loan['amount'],
        product['interest_rate'],
        loan['tenure_months']
    )
    
    # Calculate totals
    total_interest = sum(month['interest'] for month in schedule)
    total_principal = sum(month['principal'] for month in schedule)
    total_payment = sum(month['emi'] for month in schedule)
    
    return jsonify({
        'loan_id': loan_id,
        'loan_amount': loan['amount'],
        'insurance_amount': loan.get('insurance_amount', 0),
        'net_disbursement': loan.get('net_disbursement', loan['amount']),
        'interest_rate': product['interest_rate'],
        'tenure_months': loan['tenure_months'],
        'monthly_emi': loan['monthly_emi'],
        'schedule': schedule,
        'summary': {
            'total_interest': round(total_interest, 2),
            'total_principal': round(total_principal, 2),
            'total_payment': round(total_payment, 2)
        }
    }), 200

@bp.route('/preview', methods=['POST'])
@jwt_required()
def preview_schedule():
    """Preview amortization schedule before applying for loan"""
    data = request.get_json()
    
    amount = data.get('amount')
    product_id = data.get('product_id')
    tenure_months = data.get('tenure_months')
    
    if not all([amount, product_id, tenure_months]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    product = db.loan_products.find_one({'_id': ObjectId(product_id)})
    
    if not product:
        return jsonify({'error': 'Loan product not found'}), 404
    
    # Calculate insurance
    insurance_amount = amount * 0.045
    net_disbursement = amount - insurance_amount
    
    # Generate schedule
    schedule = generate_amortization_schedule(
        amount,
        product['interest_rate'],
        tenure_months
    )
    
    # Calculate totals
    total_interest = sum(month['interest'] for month in schedule)
    total_payment = sum(month['emi'] for month in schedule)
    
    return jsonify({
        'loan_amount': amount,
        'insurance_amount': round(insurance_amount, 2),
        'insurance_rate': 4.5,
        'net_disbursement': round(net_disbursement, 2),
        'interest_rate': product['interest_rate'],
        'tenure_months': tenure_months,
        'monthly_emi': schedule[0]['emi'] if schedule else 0,
        'schedule': schedule,
        'summary': {
            'total_interest': round(total_interest, 2),
            'total_principal': amount,
            'total_payment': round(total_payment, 2),
            'total_cost': round(total_payment + insurance_amount, 2)
        }
    }), 200
