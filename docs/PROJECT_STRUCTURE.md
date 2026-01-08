# Project Structure

This document describes the organized folder structure of the Markos Microfinance application.

## Root Structure

```
microfinance/
├── backend/              # Flask backend API
├── frontend/             # React frontend application
├── docs/                 # Documentation files
├── .gitignore           # Git ignore rules
└── README.md            # Main project documentation
```

## Backend Structure

```
backend/
├── app/
│   ├── models/          # Database models
│   │   ├── asset.py
│   │   ├── inspection.py
│   │   ├── insurance.py
│   │   ├── loan.py
│   │   ├── loan_product.py
│   │   ├── profit_distribution.py
│   │   ├── shareholder.py
│   │   └── user.py
│   │
│   ├── routes/          # API endpoints
│   │   ├── accountant.py      # Accountant-specific routes
│   │   ├── admin.py           # Admin routes (if exists)
│   │   ├── amortization.py    # Loan amortization
│   │   ├── assets.py          # Asset management
│   │   ├── auth.py            # Authentication
│   │   ├── committee.py       # Loan committee routes
│   │   ├── dashboard.py       # Dashboard data
│   │   ├── inspection.py      # Asset inspection
│   │   ├── insurance.py       # Insurance management
│   │   ├── loans.py           # Loan operations
│   │   ├── profit.py          # Profit distribution
│   │   ├── savings.py         # Savings accounts
│   │   ├── shareholders.py    # Shareholder management
│   │   └── users.py           # User management
│   │
│   ├── services/        # Business logic
│   │   ├── hrms_service.py    # HRMS integration
│   │   └── loan_service.py    # Loan calculations
│   │
│   ├── utils/           # Utility functions
│   │   └── notifications.py   # Email/SMS notifications
│   │
│   └── __init__.py      # App initialization
│
├── .env.example         # Environment variables template
├── check_mongodb.py     # MongoDB connection checker
├── config.py            # Application configuration
├── requirements.txt     # Python dependencies
├── run.py              # Application entry point
└── seed_data.py        # Database seeding script
```

## Frontend Structure (Organized by Role)

```
frontend/
├── public/
│   └── index.html
│
├── src/
│   ├── assets/          # Images and static files
│   │   ├── clients-2.png
│   │   ├── Debre_Markos_University_logo.png
│   │   ├── disb-1.png
│   │   ├── for_login.jpg
│   │   ├── microfinance_pic.jpg
│   │   ├── PIC1.png
│   │   ├── PIC2.png
│   │   ├── register_pic.webp
│   │   └── saving1-2.png
│   │
│   ├── components/      # Reusable components
│   │   └── Navigation.jsx
│   │
│   ├── context/         # React context providers
│   │   └── AuthContext.jsx
│   │
│   ├── pages/           # Page components (organized by role)
│   │   │
│   │   ├── accountant/  # Accountant role pages
│   │   │   └── AccountantDashboard.jsx
│   │   │
│   │   ├── admin/       # Admin role pages
│   │   │   └── AdminDashboard.jsx
│   │   │
│   │   ├── auth/        # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── inspector/   # Inspector role pages
│   │   │   └── InspectorDashboard.jsx
│   │   │
│   │   ├── loan-committee/  # Loan Committee role pages
│   │   │   └── CommitteeDashboard.jsx
│   │   │
│   │   ├── loan-officer/    # Loan Officer role pages
│   │   │   └── OfficerDashboard.jsx
│   │   │
│   │   ├── public/      # Public pages (no auth required)
│   │   │   ├── CompanyProfile.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Office.jsx
│   │   │   └── PublicDocument.jsx
│   │   │
│   │   ├── shared/      # Shared pages (all roles)
│   │   │   └── Dashboard.jsx  # Role-based dashboard router
│   │   │
│   │   └── staff/       # Staff role pages
│   │       ├── LoanApplication.jsx
│   │       ├── LoanSchedule.jsx
│   │       ├── MyLoans.jsx
│   │       ├── Savings.jsx
│   │       └── StaffDashboard.jsx
│   │
│   ├── services/        # API service layer
│   │   └── api.js
│   │
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── index.js         # App entry point
│
├── .env.example         # Environment variables template
├── package.json         # Node dependencies
├── package-lock.json    # Locked dependencies
├── postcss.config.js    # PostCSS configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## Role-Based Organization

### Frontend Pages by Role

1. **Public** (`pages/public/`)
   - Accessible without authentication
   - Home, FAQ, Company Profile, Office, Public Documents

2. **Auth** (`pages/auth/`)
   - Login and Registration pages

3. **Staff** (`pages/staff/`)
   - Regular staff member pages
   - Loan applications, My Loans, Savings, Loan Schedule

4. **Loan Officer** (`pages/loan-officer/`)
   - Loan officer dashboard and operations

5. **Loan Committee** (`pages/loan-committee/`)
   - Committee review and approval pages

6. **Inspector** (`pages/inspector/`)
   - Asset inspection pages

7. **Accountant** (`pages/accountant/`)
   - Financial operations and disbursement pages

8. **Admin** (`pages/admin/`)
   - System administration pages

9. **Shared** (`pages/shared/`)
   - Dashboard router that directs users to role-specific dashboards

### Backend Routes by Role

Routes are organized by functionality in `backend/app/routes/`:
- `auth.py` - Authentication (all users)
- `loans.py` - Loan operations (staff, officers, committee)
- `accountant.py` - Disbursement operations (accountant only)
- `committee.py` - Committee operations (committee members)
- `inspection.py` - Inspection operations (inspectors)
- `users.py` - User management (all authenticated users)
- `dashboard.py` - Dashboard data (role-specific)

## Key Features of This Structure

✅ **Role-Based Organization**: Easy to find and manage role-specific features
✅ **Clear Separation**: Public, auth, and role-specific pages are clearly separated
✅ **Scalability**: Easy to add new features for specific roles
✅ **Maintainability**: Developers can quickly locate relevant code
✅ **Security**: Role-based access control is easier to implement and audit

## MongoDB Collections

The application uses the following MongoDB collections:

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

## Environment Variables

### Backend (.env)
```env
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
MONGO_URI=mongodb://localhost:27017/markosmicrofinance
HRMS_API_URL=
SMTP_SERVER=
SMS_API_KEY=
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Getting Started

1. **Install MongoDB** (see MongoDB setup guide)
2. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python check_mongodb.py
   python seed_data.py
   python run.py
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Notes

- All `.env` files are gitignored for security
- `__pycache__` and `node_modules` are excluded from version control
- Documentation is organized in the `docs/` folder
- The structure supports easy addition of new roles and features
