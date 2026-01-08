from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime
from app import db

bp = Blueprint('committee', __name__, url_prefix='/api/committee')

@bp.route('/pending-loans', methods=['GET'])
@jwt_required()
def get_pending_loans():
    """Get loans pending committee review"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['loan_committee', 'loan_officer', 'admin']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    loans = list(db.loans.find({'status': {'$in': ['pending', 'committee_review']}}))
    
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

@bp.route('/loan/<loan_id>/review', methods=['POST'])
@jwt_required()
def review_loan(loan_id):
    """Submit committee review for a loan"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['loan_committee', 'loan_officer', 'admin']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    action = data.get('action')  # 'approve', 'reject', 'request_inspection'
    comment = data.get('comment', '')
    
    review_entry = {
        'reviewer_id': user_id,
        'reviewer_name': user['name'],
        'reviewer_role': user['role'],
        'action': action,
        'comment': comment,
        'reviewed_at': datetime.utcnow()
    }
    
    loan = db.loans.find_one({'_id': ObjectId(loan_id)})
    
    if action == 'approve':
        db.loans.update_one(
            {'_id': ObjectId(loan_id)},
            {
                '$set': {'status': 'approved', 'approved_at': datetime.utcnow()},
                '$push': {'reviewed_by': review_entry, 'comments': comment}
            }
        )
        return jsonify({'message': 'Loan approved'}), 200
    
    elif action == 'reject':
        db.loans.update_one(
            {'_id': ObjectId(loan_id)},
            {
                '$set': {'status': 'rejected'},
                '$push': {'reviewed_by': review_entry, 'comments': comment}
            }
        )
        return jsonify({'message': 'Loan rejected'}), 200
    
    elif action == 'request_inspection':
        db.loans.update_one(
            {'_id': ObjectId(loan_id)},
            {
                '$set': {'status': 'inspection', 'inspection_required': True},
                '$push': {'reviewed_by': review_entry, 'comments': comment}
            }
        )
        return jsonify({'message': 'Inspection requested'}), 200
    
    elif action == 'request_info':
        db.loans.update_one(
            {'_id': ObjectId(loan_id)},
            {'$push': {'reviewed_by': review_entry, 'comments': comment}}
        )
        return jsonify({'message': 'Additional information requested'}), 200
    
    return jsonify({'error': 'Invalid action'}), 400

@bp.route('/loan/<loan_id>/history', methods=['GET'])
@jwt_required()
def get_loan_review_history(loan_id):
    """Get review history for a loan"""
    loan = db.loans.find_one({'_id': ObjectId(loan_id)})
    
    if not loan:
        return jsonify({'error': 'Loan not found'}), 404
    
    return jsonify({
        'reviewed_by': loan.get('reviewed_by', []),
        'comments': loan.get('comments', [])
    }), 200
