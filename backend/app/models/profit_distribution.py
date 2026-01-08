from datetime import datetime

class ProfitDistribution:
    """Profit distribution model for annual dividend payments"""
    
    STATUS_PENDING = 'pending'
    STATUS_APPROVED = 'approved'
    STATUS_DISTRIBUTED = 'distributed'
    
    def __init__(self, year, total_profit, distribution_percentage):
        self.year = year
        self.total_profit = total_profit
        self.distribution_percentage = distribution_percentage  # % of profit to distribute
        self.distributable_amount = total_profit * (distribution_percentage / 100)
        self.retained_earnings = total_profit - self.distributable_amount
        self.status = self.STATUS_PENDING
        self.approved_by = None
        self.approved_at = None
        self.distributed_at = None
        self.total_shares = 0
        self.dividend_per_share = 0
        self.created_at = datetime.utcnow()
    
    def to_dict(self):
        return {
            'year': self.year,
            'total_profit': self.total_profit,
            'distribution_percentage': self.distribution_percentage,
            'distributable_amount': self.distributable_amount,
            'retained_earnings': self.retained_earnings,
            'status': self.status,
            'approved_by': self.approved_by,
            'approved_at': self.approved_at,
            'distributed_at': self.distributed_at,
            'total_shares': self.total_shares,
            'dividend_per_share': self.dividend_per_share,
            'created_at': self.created_at
        }
