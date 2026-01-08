from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime
from app import db
from app.models.asset import Asset

bp = Blueprint('assets', __name__, url_prefix='/api/assets')

@bp.route('/register', methods=['POST'])
@jwt_required()
def register_asset():
    """Register an asset purchased with loan"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    loan = db.loans.find_one({'_id': ObjectId(data['loan_id'])})
    
    if not loan:
        return jsonify({'error': 'Loan not found'}), 404
    
    if loan['user_id'] != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Create asset record
    asset = {
        'loan_id': data['loan_id'],
        'user_id': user_id,
        'asset_type': data['asset_type'],
        'purchase_price': data['purchase_price'],
        'description': data.get('description', ''),
        'purchase_date': datetime.utcnow(),
        'depreciation_method': 'straight_line',
        'depreciation_rate': Asset.DEPRECIATION_RATES.get(data['asset_type'], 10),
        'useful_life_years': 100 / Asset.DEPRECIATION_RATES.get(data['asset_type'], 10),
        'salvage_value': data.get('salvage_value', 0),
        'current_value': data['purchase_price'],
        'accumulated_depreciation': 0,
        'created_at': datetime.utcnow()
    }
    
    result = db.assets.insert_one(asset)
    
    # Update loan with asset reference
    db.loans.update_one(
        {'_id': ObjectId(data['loan_id'])},
        {'$set': {'asset_id': str(result.inserted_id)}}
    )
    
    return jsonify({
        'asset_id': str(result.inserted_id),
        'message': 'Asset registered successfully'
    }), 201

@bp.route('/my-assets', methods=['GET'])
@jwt_required()
def get_my_assets():
    """Get all assets owned by current user"""
    user_id = get_jwt_identity()
    assets = list(db.assets.find({'user_id': user_id}))
    
    # Calculate current depreciation for each asset
    for asset in assets:
        asset['_id'] = str(asset['_id'])
        
        # Calculate years elapsed
        purchase_date = asset['purchase_date']
        years_elapsed = (datetime.utcnow() - purchase_date).days / 365.25
        
        # Calculate depreciation
        depreciation_rate = asset['depreciation_rate'] / 100
        annual_depreciation = (asset['purchase_price'] - asset['salvage_value']) / asset['useful_life_years']
        accumulated_depreciation = min(annual_depreciation * years_elapsed, asset['purchase_price'] - asset['salvage_value'])
        current_value = asset['purchase_price'] - accumulated_depreciation
        
        asset['years_owned'] = round(years_elapsed, 2)
        asset['current_value'] = round(current_value, 2)
        asset['accumulated_depreciation'] = round(accumulated_depreciation, 2)
        asset['depreciation_percentage'] = round((accumulated_depreciation / asset['purchase_price']) * 100, 2)
    
    return jsonify(assets), 200

@bp.route('/<asset_id>', methods=['GET'])
@jwt_required()
def get_asset_details(asset_id):
    """Get detailed asset information with depreciation schedule"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    asset = db.assets.find_one({'_id': ObjectId(asset_id)})
    
    if not asset:
        return jsonify({'error': 'Asset not found'}), 404
    
    # Check authorization
    is_authorized = (
        asset['user_id'] == user_id or
        user['role'] in ['accountant', 'admin', 'inspector']
    )
    
    if not is_authorized:
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Generate depreciation schedule
    schedule = []
    purchase_price = asset['purchase_price']
    salvage_value = asset['salvage_value']
    useful_life = int(asset['useful_life_years'])
    annual_depreciation = (purchase_price - salvage_value) / useful_life
    
    accumulated = 0
    book_value = purchase_price
    
    for year in range(1, useful_life + 1):
        depreciation = min(annual_depreciation, book_value - salvage_value)
        accumulated += depreciation
        book_value -= depreciation
        
        schedule.append({
            'year': year,
            'depreciation': round(depreciation, 2),
            'accumulated_depreciation': round(accumulated, 2),
            'book_value': round(book_value, 2)
        })
    
    asset['_id'] = str(asset['_id'])
    asset['depreciation_schedule'] = schedule
    
    # Calculate current status
    years_elapsed = (datetime.utcnow() - asset['purchase_date']).days / 365.25
    current_accumulated = min(annual_depreciation * years_elapsed, purchase_price - salvage_value)
    
    asset['current_status'] = {
        'years_owned': round(years_elapsed, 2),
        'current_value': round(purchase_price - current_accumulated, 2),
        'accumulated_depreciation': round(current_accumulated, 2),
        'remaining_useful_life': round(max(0, useful_life - years_elapsed), 2)
    }
    
    return jsonify(asset), 200

@bp.route('/depreciation-report', methods=['GET'])
@jwt_required()
def get_depreciation_report():
    """Get depreciation report for all assets (Accountant/Admin)"""
    user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(user_id)})
    
    if user['role'] not in ['accountant', 'admin']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    assets = list(db.assets.find({}))
    
    total_purchase_value = 0
    total_current_value = 0
    total_depreciation = 0
    
    asset_summary = []
    
    for asset in assets:
        purchase_price = asset['purchase_price']
        years_elapsed = (datetime.utcnow() - asset['purchase_date']).days / 365.25
        annual_depreciation = (purchase_price - asset['salvage_value']) / asset['useful_life_years']
        accumulated_depreciation = min(annual_depreciation * years_elapsed, purchase_price - asset['salvage_value'])
        current_value = purchase_price - accumulated_depreciation
        
        total_purchase_value += purchase_price
        total_current_value += current_value
        total_depreciation += accumulated_depreciation
        
        # Get borrower info
        borrower = db.users.find_one({'_id': ObjectId(asset['user_id'])})
        
        asset_summary.append({
            'asset_id': str(asset['_id']),
            'borrower_name': borrower['name'] if borrower else 'Unknown',
            'asset_type': asset['asset_type'],
            'purchase_price': round(purchase_price, 2),
            'current_value': round(current_value, 2),
            'accumulated_depreciation': round(accumulated_depreciation, 2),
            'years_owned': round(years_elapsed, 2)
        })
    
    return jsonify({
        'summary': {
            'total_assets': len(assets),
            'total_purchase_value': round(total_purchase_value, 2),
            'total_current_value': round(total_current_value, 2),
            'total_depreciation': round(total_depreciation, 2),
            'average_depreciation_rate': round((total_depreciation / total_purchase_value * 100) if total_purchase_value > 0 else 0, 2)
        },
        'assets': asset_summary
    }), 200
