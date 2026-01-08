from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime
from app import db

bp = Blueprint('accountant', __name__, url_prefix='/api/accountant')

@bp.route('/pending-disbursements', methods=['GET'])
@jwt_required()
def get_pending_disbursements():
    """Get loans approved and pending disbursement"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['accountant', 'admin']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    loans = list(db.loans.find({'status': 'approved'}))
    
    # Enrich with user details
    for loan in loans:
        loan['_id'] = str(loan['_id'])
        borrower = db.users.find_one({'_id': ObjectId(loan['user_id'])})
        if borrower:
            loan['borrower'] = {
                'name': borrower['name'],
                'employee_id': borrower['employee_id'],
                'department': borrower['department'],
                'basic_salary': borrower['basic_salary']
            }
    
    return jsonify(loans), 200

@bp.route('/disbursement-history', methods=['GET'])
@jwt_required()
def get_disbursement_history():
    """Get history of disbursed loans"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['accountant', 'admin']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    loans = list(db.loans.find({'status': {'$in': ['disbursed', 'repaying', 'closed']}}))
    
    for loan in loans:
        loan['_id'] = str(loan['_id'])
        borrower = db.users.find_one({'_id': ObjectId(loan['user_id'])})
        if borrower:
            loan['borrower_name'] = borrower['name']
            loan['employee_id'] = borrower['employee_id']
    
    return jsonify(loans), 200

@bp.route('/financial-report', methods=['GET'])
@jwt_required()
def get_financial_report():
    """Generate financial report"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['accountant', 'admin']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Total loans disbursed
    disbursed_loans = list(db.loans.find({'status': {'$in': ['disbursed', 'repaying', 'closed']}}))
    total_disbursed = sum(loan.get('amount', 0) for loan in disbursed_loans)
    
    # Total insurance collected
    total_insurance = sum(loan.get('insurance_amount', 0) for loan in disbursed_loans)
    
    # Total repayments
    total_repaid = sum(loan.get('total_repaid', 0) for loan in disbursed_loans)
    
    # Outstanding balance
    outstanding = sum(loan.get('balance', 0) for loan in disbursed_loans if loan['status'] in ['disbursed', 'repaying'])
    
    return jsonify({
        'total_loans_disbursed': len(disbursed_loans),
        'total_amount_disbursed': total_disbursed,
        'total_insurance_collected': total_insurance,
        'total_repayments': total_repaid,
        'outstanding_balance': outstanding,
        'default_rate': 0  # Calculate based on defaulted loans
    }), 200
