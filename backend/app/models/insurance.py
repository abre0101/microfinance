from datetime import datetime

class Insurance:
    TYPE_LIFE = 'life'
    TYPE_LOAN_PROTECTION = 'loan_protection'
    TYPE_ASSET = 'asset'
    
    STATUS_ACTIVE = 'active'
    STATUS_EXPIRED = 'expired'
    STATUS_PENDING = 'pending'
    
    def __init__(self, loan_id, user_id, insurance_type, premium_amount, coverage_amount, provider):
        self.loan_id = loan_id
        self.user_id = user_id
        self.insurance_type = insurance_type
        self.premium_amount = premium_amount
        self.coverage_amount = coverage_amount
        self.provider = provider
        self.status = self.STATUS_PENDING
        self.start_date = None
        self.end_date = None
        self.created_at = datetime.utcnow()
    
    def to_dict(self):
        return {
            'loan_id': self.loan_id,
            'user_id': self.user_id,
            'insurance_type': self.insurance_type,
            'premium_amount': self.premium_amount,
            'coverage_amount': self.coverage_amount,
            'provider': self.provider,
            'status': self.status,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'created_at': self.created_at
        }
