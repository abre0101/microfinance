from datetime import datetime

class Shareholder:
    """Shareholder model for institution shareholders"""
    
    def __init__(self, user_id, shares_owned, share_price):
        self.user_id = user_id
        self.shares_owned = shares_owned
        self.share_price = share_price
        self.total_investment = shares_owned * share_price
        self.purchase_date = datetime.utcnow()
        self.is_active = True
        self.total_dividends_received = 0
        self.created_at = datetime.utcnow()
    
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'shares_owned': self.shares_owned,
            'share_price': self.share_price,
            'total_investment': self.total_investment,
            'purchase_date': self.purchase_date,
            'is_active': self.is_active,
            'total_dividends_received': self.total_dividends_received,
            'created_at': self.created_at
        }
