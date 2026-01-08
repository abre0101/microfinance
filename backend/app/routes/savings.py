from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime
from app import db

bp = Blueprint('savings', __name__, url_prefix='/api/savings')

@bp.route('/balance', methods=['GET'])
@jwt_required()
def get_balance():
    user_id = get_jwt_identity()
    savings = db.savings.find_one({'user_id': user_id})
    
    if not savings:
        return jsonify({'balance': 0, 'transactions': []}), 200
    
    return jsonify({
        'balance': savings.get('balance', 0),
        'monthly_contribution': savings.get('monthly_contribution', 0)
    }), 200

@bp.route('/transactions', methods=['GET'])
@jwt_required()
def get_transactions():
    user_id = get_jwt_identity()
    transactions = list(db.savings_transactions.find({'user_id': user_id}).sort('created_at', -1))
    
    for txn in transactions:
        txn['_id'] = str(txn['_id'])
    
    return jsonify(transactions), 200

@bp.route('/withdraw', methods=['POST'])
@jwt_required()
def request_withdrawal():
    user_id = get_jwt_identity()
    data = request.get_json()
    amount = data.get('amount')
    
    savings = db.savings.find_one({'user_id': user_id})
    if not savings or savings['balance'] < amount:
        return jsonify({'error': 'Insufficient balance'}), 400
    
    withdrawal_request = {
        'user_id': user_id,
        'amount': amount,
        'status': 'pending',
        'requested_at': datetime.utcnow()
    }
    
    result = db.withdrawal_requests.insert_one(withdrawal_request)
    return jsonify({'request_id': str(result.inserted_id)}), 201
