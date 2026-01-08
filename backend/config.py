import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/markosmicrofinance')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    
    # Email/SMS Gateway configs
    SMTP_SERVER = os.getenv('SMTP_SERVER', '')
    SMTP_PORT = os.getenv('SMTP_PORT', 587)
    SMS_API_KEY = os.getenv('SMS_API_KEY', '')
    
    # HRMS Integration
    HRMS_API_URL = os.getenv('HRMS_API_URL', '')
    HRMS_API_KEY = os.getenv('HRMS_API_KEY', '')
    
    # Payment Gateway
    PAYMENT_GATEWAY_URL = os.getenv('PAYMENT_GATEWAY_URL', '')
    PAYMENT_API_KEY = os.getenv('PAYMENT_API_KEY', '')
