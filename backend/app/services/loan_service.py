def calculate_emi(principal, annual_rate, tenure_months):
    """Calculate monthly EMI using reducing balance method"""
    monthly_rate = annual_rate / (12 * 100)
    if monthly_rate == 0:
        return principal / tenure_months
    
    emi = principal * monthly_rate * ((1 + monthly_rate) ** tenure_months) / (((1 + monthly_rate) ** tenure_months) - 1)
    return round(emi, 2)

def check_eligibility(user, product, requested_amount):
    """Check if user is eligible for the loan"""
    # Maximum loan limit is 500,000 Birr
    max_loan_limit = 500000
    
    if requested_amount > max_loan_limit:
        return False, f'Maximum loan amount is {max_loan_limit:,} Birr'
    
    # Check product-specific maximum
    if requested_amount > product['max_amount']:
        return False, f'Maximum amount for this loan type is {product["max_amount"]:,} Birr'
    
    # Check if user's salary can support the loan (basic check)
    # Assuming EMI should not exceed 40% of salary
    monthly_rate = product['interest_rate'] / (12 * 100)
    tenure = product['max_tenure_months']
    estimated_emi = requested_amount * monthly_rate * ((1 + monthly_rate) ** tenure) / (((1 + monthly_rate) ** tenure) - 1)
    
    max_affordable_emi = user['basic_salary'] * 0.4
    if estimated_emi > max_affordable_emi:
        return False, f'Loan EMI exceeds 40% of your salary. Maximum affordable loan is approximately {int(max_affordable_emi * tenure):,} Birr'
    
    if product.get('min_grade') and user['grade'] < product['min_grade']:
        return False, 'Grade requirement not met'
    
    return True, 'Eligible'

def generate_amortization_schedule(principal, annual_rate, tenure_months):
    """Generate loan amortization schedule"""
    monthly_rate = annual_rate / (12 * 100)
    emi = calculate_emi(principal, annual_rate, tenure_months)
    
    schedule = []
    balance = principal
    
    for month in range(1, tenure_months + 1):
        interest = balance * monthly_rate
        principal_payment = emi - interest
        balance -= principal_payment
        
        schedule.append({
            'month': month,
            'emi': emi,
            'principal': round(principal_payment, 2),
            'interest': round(interest, 2),
            'balance': round(max(balance, 0), 2)
        })
    
    return schedule
