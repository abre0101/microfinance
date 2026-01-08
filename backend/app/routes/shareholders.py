from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime
from app import db

bp = Blueprint('shareholders', __name__, url_prefix='/api/shareholders')

@bp.route('/register', methods=['POST'])
@jwt_required()
def register_shareholder():
    """Register as a shareholder by purchasing shares"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Check if already a shareholder
    existing = db.shareholders.find_one({'user_id': user_id})
    
    shares_to_buy = data.get('shares', 1)
    share_price = 1000  # 1,000 Birr per share (configurable)
    
    if existing:
        # Add more shares
        new_total_shares = existing['shares_owned'] + shares_to_buy
        new_total_investment = existing['total_investment'] + (shares_to_buy * share_price)
        
        db.shareholders.update_one(
            {'user_id': user_id},
            {'$set': {
                'shares_owned': new_total_shares,
                'total_investment': new_total_investment
            }}
        )
        
        return jsonify({
            'message': 'Shares purchased successfully',
            'shares_owned': new_total_shares,
            'total_investment': new_total_investment
        }), 200
    else:
        # New shareholder
        shareholder = {
            'user_id': user_id,
            'shares_owned': shares_to_buy,
            'share_price': share_price,
            'total_investment': shares_to_buy * share_price,
            'purchase_date': datetime.utcnow(),
            'is_active': True,
            'total_dividends_received': 0,
            'created_at': datetime.utcnow()
        }
        
        db.shareholders.insert_one(shareholder)
        
        return jsonify({
            'message': 'Registered as shareholder successfully',
            'shares_owned': shares_to_buy,
            'total_investment': shares_to_buy * share_price
        }), 201

@bp.route('/my-shares', methods=['GET'])
@jwt_required()
def get_my_shares():
    """Get current user's shareholding information"""
    user_id = get_jwt_identity()
    shareholder = db.shareholders.find_one({'user_id': user_id})
    
    if not shareholder:
        return jsonify({'message': 'Not a shareholder', 'shares_owned': 0}), 200
    
    # Get dividend history
    dividends = list(db.dividend_payments.find({'user_id': user_id}))
    
    shareholder['_id'] = str(shareholder['_id'])
    for div in dividends:
        div['_id'] = str(div['_id'])
    
    # Calculate total shares in system
    total_shares = db.shareholders.aggregate([
        {'$group': {'_id': None, 'total': {'$sum': '$shares_owned'}}}
    ])
    total_shares_list = list(total_shares)
    total_shares_count = total_shares_list[0]['total'] if total_shares_list else 0
    
    ownership_percentage = (shareholder['shares_owned'] / total_shares_count * 100) if total_shares_count > 0 else 0
    
    return jsonify({
        'shareholder': shareholder,
        'dividends': dividends,
        'ownership_percentage': round(ownership_percentage, 4),
        'total_shares_in_system': total_shares_count
    }), 200

@bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_shareholders():
    """Get all shareholders (Admin/Accountant only)"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['admin', 'accountant']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    shareholders = list(db.shareholders.find({'is_active': True}))
    
    # Enrich with user details
    for shareholder in shareholders:
        shareholder['_id'] = str(shareholder['_id'])
        user_info = db.users.find_one({'_id': ObjectId(shareholder['user_id'])})
        if user_info:
            shareholder['name'] = user_info['name']
            shareholder['employee_id'] = user_info['employee_id']
            shareholder['department'] = user_info['department']
    
    # Calculate totals
    total_shares = sum(s['shares_owned'] for s in shareholders)
    total_investment = sum(s['total_investment'] for s in shareholders)
    
    return jsonify({
        'shareholders': shareholders,
        'summary': {
            'total_shareholders': len(shareholders),
            'total_shares': total_shares,
            'total_investment': total_investment
        }
    }), 200
