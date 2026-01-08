from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
import bcrypt
from app import db
from app.services.hrms_service import fetch_employee_data

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    employee_id = data.get('employee_id')
    password = data.get('password')
    
    if not email or not email.endswith('@uni.edu'):
        return jsonify({'error': 'Invalid university email'}), 400
    
    if db.users.find_one({'email': email}):
        return jsonify({'error': 'User already exists'}), 400
    
    # Fetch employee data from HRMS
    employee_data = fetch_employee_data(employee_id)
    if not employee_data:
        return jsonify({'error': 'Employee not found in HRMS'}), 404
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    user = {
        'email': email,
        'password': hashed_password,
        'employee_id': employee_id,
        'name': employee_data.get('name'),
        'department': employee_data.get('department'),
        'grade': employee_data.get('grade'),
        'basic_salary': employee_data.get('basic_salary'),
        'role': 'staff'
    }
    
    db.users.insert_one(user)
    return jsonify({'message': 'Registration successful'}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = db.users.find_one({'email': email})
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    access_token = create_access_token(identity=str(user['_id']))
    refresh_token = create_refresh_token(identity=str(user['_id']))
    
    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': {
            'id': str(user['_id']),
            'email': user['email'],
            'name': user['name'],
            'role': user['role']
        }
    }), 200
