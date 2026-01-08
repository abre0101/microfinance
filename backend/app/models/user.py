from datetime import datetime
from bson import ObjectId

class User:
    # User roles
    ROLE_STAFF = 'staff'
    ROLE_LOAN_OFFICER = 'loan_officer'
    ROLE_LOAN_COMMITTEE = 'loan_committee'
    ROLE_INSPECTOR = 'inspector'
    ROLE_ACCOUNTANT = 'accountant'
    ROLE_ADMIN = 'admin'
    
    def __init__(self, email, employee_id, name, department, grade, basic_salary, role='staff'):
        self.email = email
        self.employee_id = employee_id
        self.name = name
        self.department = department
        self.grade = grade
        self.basic_salary = basic_salary
        self.role = role
        self.created_at = datetime.utcnow()
        self.is_active = True
    
    def to_dict(self):
        return {
            'email': self.email,
            'employee_id': self.employee_id,
            'name': self.name,
            'department': self.department,
            'grade': self.grade,
            'basic_salary': self.basic_salary,
            'role': self.role,
            'created_at': self.created_at,
            'is_active': self.is_active
        }
