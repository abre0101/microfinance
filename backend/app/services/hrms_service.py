import requests
from config import Config
from app import db
from datetime import datetime

def fetch_employee_data(employee_id):
    """Fetch employee data from HRMS API or local database"""
    try:
        # First, check if employee exists in local database
        employee = db.employees.find_one({'employee_id': employee_id})
        if employee:
            return {
                'employee_id': employee['employee_id'],
                'name': employee['name'],
                'department': employee['department'],
                'grade': employee['grade'],
                'basic_salary': employee['basic_salary']
            }
        
        # If HRMS API is configured, fetch from external system
        if Config.HRMS_API_URL:
            response = requests.get(
                f"{Config.HRMS_API_URL}/employees/{employee_id}",
                headers={'Authorization': f'Bearer {Config.HRMS_API_KEY}'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                # Cache employee data in local database
                db.employees.update_one(
                    {'employee_id': employee_id},
                    {'$set': data},
                    upsert=True
                )
                return data
        
        return None
    except Exception as e:
        print(f"HRMS API Error: {e}")
        return None

def submit_salary_deduction(employee_id, amount, loan_id):
    """Submit salary deduction request to HRMS"""
    try:
        # Store deduction request in database
        deduction = {
            'employee_id': employee_id,
            'amount': amount,
            'loan_id': loan_id,
            'type': 'loan_repayment',
            'status': 'pending',
            'created_at': datetime.utcnow()
        }
        db.salary_deductions.insert_one(deduction)
        
        # If HRMS API is configured, submit to external system
        if Config.HRMS_API_URL:
            response = requests.post(
                f"{Config.HRMS_API_URL}/deductions",
                json={
                    'employee_id': employee_id,
                    'amount': amount,
                    'reference': loan_id,
                    'type': 'loan_repayment'
                },
                headers={'Authorization': f'Bearer {Config.HRMS_API_KEY}'},
                timeout=10
            )
            
            if response.status_code == 200:
                db.salary_deductions.update_one(
                    {'loan_id': loan_id},
                    {'$set': {'status': 'submitted'}}
                )
                return True
        
        # If no HRMS API, mark as pending for manual processing
        return True
    except Exception as e:
        print(f"HRMS Deduction Error: {e}")
        return False
