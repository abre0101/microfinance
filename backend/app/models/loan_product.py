class LoanProduct:
    def __init__(self, name, description, max_amount, interest_rate, max_tenure_months, min_grade=None):
        self.name = name
        self.description = description
        self.max_amount = max_amount  # Maximum loan amount in Birr
        self.interest_rate = interest_rate  # Annual percentage
        self.max_tenure_months = max_tenure_months
        self.min_grade = min_grade
        self.is_active = True
    
    def to_dict(self):
        return {
            'name': self.name,
            'description': self.description,
            'max_amount': self.max_amount,
            'interest_rate': self.interest_rate,
            'max_tenure_months': self.max_tenure_months,
            'min_grade': self.min_grade,
            'is_active': self.is_active
        }
