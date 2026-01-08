from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime
from app import db

bp = Blueprint('inspection', __name__, url_prefix='/api/inspection')

@bp.route('/loan/<loan_id>', methods=['GET'])
@jwt_required()
def get_loan_inspection(loan_id):
    """Get inspection details for a loan"""
    inspection = db.inspections.find_one({'loan_id': loan_id})
    
    if not inspection:
        return jsonify({'error': 'No inspection found for this loan'}), 404
    
    inspection['_id'] = str(inspection['_id'])
    return jsonify(inspection), 200

@bp.route('/request', methods=['POST'])
@jwt_required()
def request_inspection():
    """Request inspection for a loan (Loan Officer/Committee)"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['loan_officer', 'loan_committee', 'admin']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    
    inspection = {
        'loan_id': data['loan_id'],
        'inspector_id': data.get('inspector_id'),
        'inspection_type': data.get('inspection_type', 'asset'),
        'status': 'pending',
        'scheduled_date': data.get('scheduled_date'),
        'completed_date': None,
        'report': None,
        'asset_value': None,
        'asset_condition': None,
        'photos': [],
        'created_at': datetime.utcnow()
    }
    
    result = db.inspections.insert_one(inspection)
    
    # Update loan status
    db.loans.update_one(
        {'_id': ObjectId(data['loan_id'])},
        {'$set': {
            'status': 'inspection',
            'inspection_required': True,
            'inspection_id': str(result.inserted_id)
        }}
    )
    
    return jsonify({'inspection_id': str(result.inserted_id)}), 201

@bp.route('/<inspection_id>/complete', methods=['POST'])
@jwt_required()
def complete_inspection(inspection_id):
    """Complete inspection report (Inspector only)"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['inspector', 'admin']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    
    db.inspections.update_one(
        {'_id': ObjectId(inspection_id)},
        {'$set': {
            'status': 'completed',
            'completed_date': datetime.utcnow(),
            'report': data.get('report'),
            'asset_value': data.get('asset_value'),
            'asset_condition': data.get('asset_condition'),
            'photos': data.get('photos', [])
        }}
    )
    
    inspection = db.inspections.find_one({'_id': ObjectId(inspection_id)})
    
    # Update loan status back to committee review
    db.loans.update_one(
        {'_id': ObjectId(inspection['loan_id'])},
        {'$set': {'status': 'committee_review'}}
    )
    
    return jsonify({'message': 'Inspection completed'}), 200

@bp.route('/pending', methods=['GET'])
@jwt_required()
def get_pending_inspections():
    """Get pending inspections (Inspector view)"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['inspector', 'admin']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    query = {'status': {'$in': ['pending', 'scheduled']}}
    if user['role'] == 'inspector':
        query['inspector_id'] = user_id
    
    inspections = list(db.inspections.find(query))
    
    for inspection in inspections:
        inspection['_id'] = str(inspection['_id'])
    
    return jsonify(inspections), 200
