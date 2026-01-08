from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime
from app import db
from app.services.loan_service import calculate_emi, check_eligibility

bp = Blueprint('loans', __name__, url_prefix='/api/loans')

@bp.route('/products', methods=['GET'])
@jwt_required()
def get_loan_products():
    products = list(db.loan_products.find({'is_active': True}))
    for product in products:
        product['_id'] = str(product['_id'])
    return jsonify(products), 200

@bp.route('/apply', methods=['POST'])
@jwt_required()
def apply_loan():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    user = db.users.find_one({'_id': ObjectId(user_id)})
    product = db.loan_products.find_one({'_id': ObjectId(data['product_id'])})
    
    if not product:
        return jsonify({'error': 'Invalid loan product'}), 400
    
    # Check eligibility
    eligible, message = check_eligibility(user, product, data['amount'])
    if not eligible:
        return jsonify({'error': message}), 400
    
    # Calculate insurance (4.5% upfront)
    insurance_rate = 0.045
    insurance_amount = data['amount'] * insurance_rate
    
    # Calculate EMI
    monthly_emi = calculate_emi(data['amount'], product['interest_rate'], data['tenure_months'])
    
    loan = {
        'user_id': user_id,
        'product_id': data['product_id'],
        'amount': data['amount'],
        'tenure_months': data['tenure_months'],
        'monthly_emi': monthly_emi,
        'insurance_amount': insurance_amount,
        'insurance_rate': insurance_rate,
        'status': 'pending',
        'applied_at': datetime.utcnow(),
        'total_repaid': 0,
        'balance': data['amount'],
        'insurance_required': True,
        'insurance_paid': False
    }
    
    result = db.loans.insert_one(loan)
    
    return jsonify({
        'loan_id': str(result.inserted_id),
        'loan_amount': data['amount'],
        'insurance_amount': insurance_amount,
        'total_deduction': insurance_amount,
        'net_disbursement': data['amount'] - insurance_amount,
        'monthly_emi': monthly_emi
    }), 201

@bp.route('/my-loans', methods=['GET'])
@jwt_required()
def get_my_loans():
    user_id = get_jwt_identity()
    loans = list(db.loans.find({'user_id': user_id}))
    for loan in loans:
        loan['_id'] = str(loan['_id'])
    return jsonify(loans), 200

@bp.route('/<loan_id>/approve', methods=['POST'])
@jwt_required()
def approve_loan(loan_id):
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['loan_officer', 'admin']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    db.loans.update_one(
        {'_id': ObjectId(loan_id)},
        {'$set': {'status': 'approved', 'approved_at': datetime.utcnow()}}
    )
    
    return jsonify({'message': 'Loan approved'}), 200

@bp.route('/<loan_id>/disburse', methods=['POST'])
@jwt_required()
def disburse_loan(loan_id):
    """Disburse loan (Accountant only)"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['accountant', 'admin']:
        return jsonify({'error': 'Unauthorized - Only accountants can disburse loans'}), 403
    
    loan = db.loans.find_one({'_id': ObjectId(loan_id)})
    
    if not loan:
        return jsonify({'error': 'Loan not found'}), 404
    
    if loan['status'] != 'approved':
        return jsonify({'error': 'Loan must be approved before disbursement'}), 400
    
    # Calculate net disbursement (loan amount - insurance)
    insurance_amount = loan.get('insurance_amount', 0)
    net_disbursement = loan['amount'] - insurance_amount
    
    # Update loan status
    db.loans.update_one(
        {'_id': ObjectId(loan_id)},
        {'$set': {
            'status': 'disbursed',
            'disbursed_at': datetime.utcnow(),
            'insurance_paid': True,
            'net_disbursement': net_disbursement,
            'disbursed_by': user_id
        }}
    )
    
    # Create insurance record
    insurance = {
        'loan_id': loan_id,
        'user_id': loan['user_id'],
        'insurance_type': 'loan_protection',
        'premium_amount': insurance_amount,
        'coverage_amount': loan['amount'],
        'provider': 'University Insurance Scheme',
        'status': 'active',
        'start_date': datetime.utcnow(),
        'paid_at': datetime.utcnow(),
        'created_at': datetime.utcnow()
    }
    db.insurance.insert_one(insurance)
    
    return jsonify({
        'message': 'Loan disbursed successfully',
        'loan_amount': loan['amount'],
        'insurance_deducted': insurance_amount,
        'net_disbursement': net_disbursement
    }), 200
