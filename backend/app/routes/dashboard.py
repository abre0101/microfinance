from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from app import db

bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@bp.route('/staff', methods=['GET'])
@jwt_required()
def staff_dashboard():
    user_id = get_jwt_identity()
    
    active_loans = list(db.loans.find({'user_id': user_id, 'status': {'$in': ['approved', 'disbursed', 'repaying']}}))
    savings = db.savings.find_one({'user_id': user_id}) or {'balance': 0}
    
    total_loan_balance = sum(loan.get('balance', 0) for loan in active_loans)
    
    return jsonify({
        'active_loans': len(active_loans),
        'total_loan_balance': total_loan_balance,
        'savings_balance': savings.get('balance', 0),
        'next_emi': active_loans[0].get('monthly_emi', 0) if active_loans else 0
    }), 200

@bp.route('/admin', methods=['GET'])
@jwt_required()
def admin_dashboard():
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['admin', 'loan_officer']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    total_loans = db.loans.count_documents({})
    pending_applications = db.loans.count_documents({'status': 'pending'})
    total_disbursed = db.loans.aggregate([
        {'$match': {'status': {'$in': ['disbursed', 'repaying', 'closed']}}},
        {'$group': {'_id': None, 'total': {'$sum': '$amount'}}}
    ])
    
    disbursed_amount = list(total_disbursed)
    
    return jsonify({
        'total_loans': total_loans,
        'pending_applications': pending_applications,
        'total_disbursed': disbursed_amount[0]['total'] if disbursed_amount else 0
    }), 200
