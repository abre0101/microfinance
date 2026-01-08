"""Seed initial data for Markos Microfinance"""
from app import create_app
from app.models.loan_product import LoanProduct
import bcrypt

app = create_app()

with app.app_context():
    # Import db after app context is created
    from app import db
    
    print("Seeding loan products...")
    
    # Clear existing products
    db.loan_products.delete_many({})
    
    # Create loan products
    products = [
        {
            'name': 'Emergency Loan',
            'description': 'Quick loan for emergency needs',
            'max_amount': 50000,  # 50,000 Birr
            'interest_rate': 8.0,  # 8% annual
            'max_tenure_months': 12,
            'is_active': True
        },
        {
            'name': 'Personal Loan',
            'description': 'General purpose personal loan',
            'max_amount': 150000,  # 150,000 Birr
            'interest_rate': 10.0,  # 10% annual
            'max_tenure_months': 24,
            'is_active': True
        },
        {
            'name': 'Asset Finance Loan',
            'description': 'Loan for purchasing assets (car, property, etc.)',
            'max_amount': 500000,  # 500,000 Birr (Maximum)
            'interest_rate': 12.0,  # 12% annual
            'max_tenure_months': 60,
            'is_active': True
        },
        {
            'name': 'School Fees Advance',
            'description': 'Advance for children school fees',
            'max_amount': 100000,  # 100,000 Birr
            'interest_rate': 7.0,  # 7% annual
            'max_tenure_months': 12,
            'is_active': True
        }
    ]
    
    for product in products:
        db.loan_products.insert_one(product)
    
    print(f"✓ Created {len(products)} loan products")
    
    # Create sample users with different roles
    print("\nSeeding sample users...")
    
    db.users.delete_many({})
    
    users = [
        {
            'email': 'staff@uni.edu',
            'password': bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt()),
            'employee_id': 'EMP001',
            'name': 'John Doe',
            'department': 'Computer Science',
            'grade': 'Lecturer',
            'basic_salary': 25000,
            'role': 'staff'
        },
        {
            'email': 'officer@uni.edu',
            'password': bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt()),
            'employee_id': 'EMP002',
            'name': 'Jane Smith',
            'department': 'Finance',
            'grade': 'Senior Officer',
            'basic_salary': 30000,
            'role': 'loan_officer'
        },
        {
            'email': 'committee@uni.edu',
            'password': bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt()),
            'employee_id': 'EMP003',
            'name': 'Michael Johnson',
            'department': 'Administration',
            'grade': 'Director',
            'basic_salary': 45000,
            'role': 'loan_committee'
        },
        {
            'email': 'inspector@uni.edu',
            'password': bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt()),
            'employee_id': 'EMP004',
            'name': 'Sarah Williams',
            'department': 'Asset Management',
            'grade': 'Inspector',
            'basic_salary': 28000,
            'role': 'inspector'
        },
        {
            'email': 'accountant@uni.edu',
            'password': bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt()),
            'employee_id': 'EMP005',
            'name': 'David Brown',
            'department': 'Finance',
            'grade': 'Senior Accountant',
            'basic_salary': 35000,
            'role': 'accountant'
        },
        {
            'email': 'admin@uni.edu',
            'password': bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt()),
            'employee_id': 'EMP006',
            'name': 'Admin User',
            'department': 'IT',
            'grade': 'System Admin',
            'basic_salary': 40000,
            'role': 'admin'
        }
    ]
    
    for user in users:
        db.users.insert_one(user)
    
    print(f"✓ Created {len(users)} sample users")
    print("\nSample Login Credentials:")
    print("=" * 50)
    for user in users:
        print(f"Role: {user['role']:20} | Email: {user['email']:25} | Password: password123")
    print("=" * 50)
    
    # Seed employee data (for HRMS integration)
    print("\nSeeding employee data...")
    
    db.employees.delete_many({})
    
    employees = [
        {
            'employee_id': 'EMP001',
            'name': 'John Doe',
            'department': 'Computer Science',
            'grade': 'Lecturer',
            'basic_salary': 25000
        },
        {
            'employee_id': 'EMP002',
            'name': 'Jane Smith',
            'department': 'Finance',
            'grade': 'Senior Officer',
            'basic_salary': 30000
        },
        {
            'employee_id': 'EMP003',
            'name': 'Michael Johnson',
            'department': 'Administration',
            'grade': 'Director',
            'basic_salary': 45000
        },
        {
            'employee_id': 'EMP004',
            'name': 'Sarah Williams',
            'department': 'Asset Management',
            'grade': 'Inspector',
            'basic_salary': 28000
        },
        {
            'employee_id': 'EMP005',
            'name': 'David Brown',
            'department': 'Finance',
            'grade': 'Senior Accountant',
            'basic_salary': 35000
        },
        {
            'employee_id': 'EMP006',
            'name': 'Admin User',
            'department': 'IT',
            'grade': 'System Admin',
            'basic_salary': 40000
        },
        {
            'employee_id': 'EMP007',
            'name': 'Emily Davis',
            'department': 'Mathematics',
            'grade': 'Associate Professor',
            'basic_salary': 38000
        },
        {
            'employee_id': 'EMP008',
            'name': 'Robert Wilson',
            'department': 'Physics',
            'grade': 'Senior Lecturer',
            'basic_salary': 32000
        }
    ]
    
    for employee in employees:
        db.employees.insert_one(employee)
    
    print(f"✓ Created {len(employees)} employee records")
    
    print("\n✓ Seeding completed successfully!")
