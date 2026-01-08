from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime, timedelta
from app import db

bp = Blueprint('insurance', __name__, url_prefix='/api/insurance')

@bp.route('/loan/<loan_id>', methods=['GET'])
@jwt_required()
def get_loan_insurance(loan_id):
    """Get insurance details for a loan"""
    insurance = db.insurance.find_one({'loan_id': loan_id})
    
    if not insurance:
        return jsonify({'error': 'No insurance found for this loan'}), 404
    
    insurance['_id'] = str(insurance['_id'])
    return jsonify(insurance), 200

@bp.route('/apply', methods=['POST'])
@jwt_required()
def apply_insurance():
    """Apply for loan insurance"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    loan = db.loans.find_one({'_id': ObjectId(data['loan_id'])})
    if not loan:
        return jsonify({'error': 'Loan not found'}), 404
    
    if loan['user_id'] != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Calculate insurance premium (4.5% of loan amount - paid upfront)
    premium_rate = 0.045
    premium_amount = loan['amount'] * premium_rate
    coverage_amount = loan['amount']  # Full loan coverage
    
    insurance = {
        'loan_id': data['loan_id'],
        'user_id': user_id,
        'insurance_type': data.get('insurance_type', 'loan_protection'),
        'premium_amount': premium_amount,
        'coverage_amount': coverage_amount,
        'provider': data.get('provider', 'University Insurance Scheme'),
        'status': 'pending',
        'start_date': None,
        'end_date': None,
        'created_at': datetime.utcnow()
    }
    
    result = db.insurance.insert_one(insurance)
    
    # Update loan with insurance info
    db.loans.update_one(
        {'_id': ObjectId(data['loan_id'])},
        {'$set': {'insurance_required': True, 'insurance_id': str(result.inserted_id)}}
    )
    
    return jsonify({
        'insurance_id': str(result.inserted_id),
        'premium_amount': premium_amount,
        'coverage_amount': coverage_amount
    }), 201

@bp.route('/<insurance_id>/activate', methods=['POST'])
@jwt_required()
def activate_insurance(insurance_id):
    """Activate insurance (Admin/Accountant only)"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['admin', 'accountant']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    insurance = db.insurance.find_one({'_id': ObjectId(insurance_id)})
    if not insurance:
        return jsonify({'error': 'Insurance not found'}), 404
    
    loan = db.loans.find_one({'_id': ObjectId(insurance['loan_id'])})
    
    db.insurance.update_one(
        {'_id': ObjectId(insurance_id)},
        {'$set': {
            'status': 'active',
            'start_date': datetime.utcnow(),
            'end_date': datetime.utcnow() + timedelta(days=loan['tenure_months'] * 30)
        }}
    )
    
    return jsonify({'message': 'Insurance activated'}), 200

@bp.route('/my-insurance', methods=['GET'])
@jwt_required()
def get_my_insurance():
    """Get all insurance policies for current user"""
    user_id = get_jwt_identity()
    insurance_list = list(db.insurance.find({'user_id': user_id}))
    
    for ins in insurance_list:
        ins['_id'] = str(ins['_id'])
    
    return jsonify(insurance_list), 200
