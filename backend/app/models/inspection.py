from datetime import datetime

class Inspection:
    STATUS_PENDING = 'pending'
    STATUS_SCHEDULED = 'scheduled'
    STATUS_COMPLETED = 'completed'
    STATUS_FAILED = 'failed'
    
    def __init__(self, loan_id, inspector_id, inspection_type):
        self.loan_id = loan_id
        self.inspector_id = inspector_id
        self.inspection_type = inspection_type  # 'asset', 'collateral', 'property'
        self.status = self.STATUS_PENDING
        self.scheduled_date = None
        self.completed_date = None
        self.report = None
        self.asset_value = None
        self.asset_condition = None
        self.photos = []
        self.created_at = datetime.utcnow()
    
    def to_dict(self):
        return {
            'loan_id': self.loan_id,
            'inspector_id': self.inspector_id,
            'inspection_type': self.inspection_type,
            'status': self.status,
            'scheduled_date': self.scheduled_date,
            'completed_date': self.completed_date,
            'report': self.report,
            'asset_value': self.asset_value,
            'asset_condition': self.asset_condition,
            'photos': self.photos,
            'created_at': self.created_at
        }
