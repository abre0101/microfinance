from datetime import datetime

class Asset:
    """Asset model for tracking loan-financed assets and their depreciation"""
    
    # Asset types
    TYPE_VEHICLE = 'vehicle'
    TYPE_PROPERTY = 'property'
    TYPE_EQUIPMENT = 'equipment'
    TYPE_FURNITURE = 'furniture'
    TYPE_ELECTRONICS = 'electronics'
    TYPE_OTHER = 'other'
    
    # Depreciation methods
    DEPRECIATION_STRAIGHT_LINE = 'straight_line'
    DEPRECIATION_DECLINING_BALANCE = 'declining_balance'
    
    # Standard depreciation rates (annual %)
    DEPRECIATION_RATES = {
        TYPE_VEHICLE: 20,  # 20% per year (5 years useful life)
        TYPE_PROPERTY: 2,  # 2% per year (50 years useful life)
        TYPE_EQUIPMENT: 15,  # 15% per year (~7 years useful life)
        TYPE_FURNITURE: 10,  # 10% per year (10 years useful life)
        TYPE_ELECTRONICS: 25,  # 25% per year (4 years useful life)
        TYPE_OTHER: 10  # 10% per year (default)
    }
    
    def __init__(self, loan_id, user_id, asset_type, purchase_price, description):
        self.loan_id = loan_id
        self.user_id = user_id
        self.asset_type = asset_type
        self.purchase_price = purchase_price
        self.description = description
        self.purchase_date = datetime.utcnow()
        self.depreciation_method = self.DEPRECIATION_STRAIGHT_LINE
        self.depreciation_rate = self.DEPRECIATION_RATES.get(asset_type, 10)
        self.useful_life_years = 100 / self.depreciation_rate
        self.salvage_value = 0  # Residual value at end of useful life
        self.current_value = purchase_price
        self.accumulated_depreciation = 0
        self.created_at = datetime.utcnow()
    
    def calculate_depreciation(self, years_elapsed):
        """Calculate depreciation using straight-line method"""
        if self.depreciation_method == self.DEPRECIATION_STRAIGHT_LINE:
            annual_depreciation = (self.purchase_price - self.salvage_value) / self.useful_life_years
            total_depreciation = min(annual_depreciation * years_elapsed, self.purchase_price - self.salvage_value)
            self.accumulated_depreciation = total_depreciation
            self.current_value = self.purchase_price - total_depreciation
        
        elif self.depreciation_method == self.DEPRECIATION_DECLINING_BALANCE:
            # Declining balance method (accelerated depreciation)
            rate = self.depreciation_rate / 100
            self.current_value = self.purchase_price * ((1 - rate) ** years_elapsed)
            self.accumulated_depreciation = self.purchase_price - self.current_value
        
        return {
            'current_value': round(self.current_value, 2),
            'accumulated_depreciation': round(self.accumulated_depreciation, 2),
            'depreciation_rate': self.depreciation_rate,
            'years_elapsed': years_elapsed
        }
    
    def to_dict(self):
        return {
            'loan_id': self.loan_id,
            'user_id': self.user_id,
            'asset_type': self.asset_type,
            'purchase_price': self.purchase_price,
            'description': self.description,
            'purchase_date': self.purchase_date,
            'depreciation_method': self.depreciation_method,
            'depreciation_rate': self.depreciation_rate,
            'useful_life_years': self.useful_life_years,
            'salvage_value': self.salvage_value,
            'current_value': self.current_value,
            'accumulated_depreciation': self.accumulated_depreciation,
            'created_at': self.created_at
        }
