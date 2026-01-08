# Markos Microfinance - Microfinance Platform for University Staff

A secure, transparent digital microfinance platform for university employees.

## Tech Stack
- **Frontend**: React.js (JSX)
- **Backend**: Flask (Python)
- **Database**: MongoDB (Real database - no mock data)
- **Currency**: Ethiopian Birr (ETB)

## Features
- **Loan Management**: Application, Committee Review, Inspection, Approval, Disbursement
- **Insurance**: Automatic 4.5% insurance deducted at disbursement
- **Maximum Loan**: 500,000 Birr
- **Savings & Contributions**: Thrift Society model
- **Automated Salary-Linked Repayments**
- **Role-Based Access Control**:
  - Staff (Borrowers)
  - Loan Officer
  - Loan Committee
  - Inspector
  - Accountant
  - Admin
- **Real-time Dashboards & Reports**

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- **MongoDB** (see [MongoDB Setup Guide](MONGODB_SETUP.md))

### MongoDB Setup
1. Install MongoDB on your system
2. Start MongoDB service
3. The database will be created automatically

For detailed instructions, see [MONGODB_SETUP.md](MONGODB_SETUP.md)

### Backend Setup
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env if needed (default MongoDB URI: mongodb://localhost:27017/markosmicrofinance)

# Check MongoDB connection (optional but recommended)
python check_mongodb.py

# Seed initial data (loan products, users, and employees)
python seed_data.py

# Start the server
python run.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Sample Login Credentials

After running `python seed_data.py`, you can login with:

| Role | Email | Password |
|------|-------|----------|
| Staff | staff@uni.edu | password123 |
| Loan Officer | officer@uni.edu | password123 |
| Loan Committee | committee@uni.edu | password123 |
| Inspector | inspector@uni.edu | password123 |
| Accountant | accountant@uni.edu | password123 |
| Admin | admin@uni.edu | password123 |

## Loan Products

1. **Emergency Loan**: Up to 50,000 Birr @ 8% (12 months)
2. **Personal Loan**: Up to 150,000 Birr @ 10% (24 months)
3. **Asset Finance Loan**: Up to 500,000 Birr @ 12% (60 months)
4. **School Fees Advance**: Up to 100,000 Birr @ 7% (12 months)

## Loan Workflow

1. **Staff** applies for loan
2. **Loan Officer** reviews application
3. **Loan Committee** approves/rejects or requests inspection
4. **Inspector** (if needed) inspects collateral/asset
5. **Committee** final approval
6. **Accountant** disburses loan (4.5% insurance auto-deducted)
7. **System** manages repayments via salary deduction

## Insurance

- **Rate**: 4.5% of loan amount
- **Payment**: Deducted at disbursement time
- **Coverage**: Full loan amount
- **Example**: 100,000 Birr loan = 4,500 Birr insurance, 95,500 Birr net disbursement

## Environment Variables
Create `.env` files in both backend and frontend directories (see `.env.example` files).

### Backend Environment Variables
- `MONGO_URI`: MongoDB connection string (default: `mongodb://localhost:27017/markosmicrofinance`)
- `SECRET_KEY`: Flask secret key
- `JWT_SECRET_KEY`: JWT token secret
- `HRMS_API_URL`: (Optional) External HRMS API - leave empty to use local employee database
- `SMTP_SERVER`: (Optional) Email server - leave empty to log notifications to database
- `SMS_API_KEY`: (Optional) SMS gateway - leave empty to log notifications to database

## Database Collections

The application uses MongoDB with the following collections:
- `users` - User accounts and authentication
- `employees` - Employee data (local cache or primary source)
- `loans` - Loan applications and records
- `loan_products` - Available loan products
- `savings` - Savings accounts
- `shareholders` - Shareholder information
- `profit_distribution` - Profit distribution records
- `assets` - Asset records for asset-backed loans
- `inspections` - Asset inspection records
- `insurance` - Insurance records
- `notifications` - Email/SMS notification logs
- `salary_deductions` - Salary deduction requests

All data is persisted in MongoDB - no mock data or in-memory storage.
