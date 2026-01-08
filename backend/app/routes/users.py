from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from app import db

bp = Blueprint('users', __name__, url_prefix='/api/users')

@bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    user['_id'] = str(user['_id'])
    user.pop('password', None)
    
    return jsonify(user), 200

@bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    allowed_fields = ['phone', 'address']
    update_data = {k: v for k, v in data.items() if k in allowed_fields}
    
    db.users.update_one({'_id': ObjectId(user_id)}, {'$set': update_data})
    return jsonify({'message': 'Profile updated'}), 200
