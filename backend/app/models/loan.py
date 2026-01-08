from datetime import datetime
from bson import ObjectId

class Loan:
    STATUS_PENDING = 'pending'
    STATUS_COMMITTEE_REVIEW = 'committee_review'
    STATUS_INSPECTION = 'inspection'
    STATUS_APPROVED = 'approved'
    STATUS_DISBURSED = 'disbursed'
    STATUS_REPAYING = 'repaying'
    STATUS_CLOSED = 'closed'
    STATUS_REJECTED = 'rejected'
    STATUS_DEFAULTED = 'defaulted'
    
    def __init__(self, user_id, product_id, amount, tenure_months):
        self.user_id = user_id
        self.product_id = product_id
        self.amount = amount
        self.tenure_months = tenure_months
        self.status = self.STATUS_PENDING
        self.applied_at = datetime.utcnow()
        self.approved_at = None
        self.disbursed_at = None
        self.monthly_emi = 0
        self.total_repaid = 0
        self.balance = amount
        self.insurance_required = True
        self.insurance_amount = amount * 0.045  # 4.5% insurance
        self.insurance_rate = 0.045
        self.insurance_paid = False
        self.net_disbursement = amount - (amount * 0.045)
        self.insurance_id = None
        self.inspection_required = False
        self.inspection_id = None
        self.reviewed_by = []  # List of officers/committee members who reviewed
        self.comments = []
    
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'product_id': self.product_id,
            'amount': self.amount,
            'tenure_months': self.tenure_months,
            'status': self.status,
            'applied_at': self.applied_at,
            'approved_at': self.approved_at,
            'disbursed_at': self.disbursed_at,
            'monthly_emi': self.monthly_emi,
            'total_repaid': self.total_repaid,
            'balance': self.balance,
            'insurance_required': self.insurance_required,
            'insurance_amount': self.insurance_amount,
            'insurance_rate': self.insurance_rate,
            'insurance_paid': self.insurance_paid,
            'net_disbursement': self.net_disbursement,
            'insurance_id': self.insurance_id,
            'inspection_required': self.inspection_required,
            'inspection_id': self.inspection_id,
            'reviewed_by': self.reviewed_by,
            'comments': self.comments
        }
