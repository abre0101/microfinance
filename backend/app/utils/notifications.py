import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import Config
from app import db
from datetime import datetime

def send_email(to_email, subject, body):
    """Send email notification"""
    try:
        # Log notification in database
        notification = {
            'type': 'email',
            'recipient': to_email,
            'subject': subject,
            'body': body,
            'status': 'pending',
            'created_at': datetime.utcnow()
        }
        
        if not Config.SMTP_SERVER:
            print(f"Email notification logged (SMTP not configured): {to_email} - {subject}")
            notification['status'] = 'logged'
            db.notifications.insert_one(notification)
            return True
        
        msg = MIMEMultipart()
        msg['From'] = 'noreply@markosmicrofinance.edu'
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'html'))
        
        server = smtplib.SMTP(Config.SMTP_SERVER, Config.SMTP_PORT)
        server.starttls()
        server.login(Config.SMTP_USERNAME, Config.SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        notification['status'] = 'sent'
        notification['sent_at'] = datetime.utcnow()
        db.notifications.insert_one(notification)
        return True
    except Exception as e:
        print(f"Email Error: {e}")
        notification['status'] = 'failed'
        notification['error'] = str(e)
        db.notifications.insert_one(notification)
        return False

def send_sms(phone, message):
    """Send SMS notification"""
    try:
        # Log notification in database
        notification = {
            'type': 'sms',
            'recipient': phone,
            'message': message,
            'status': 'pending',
            'created_at': datetime.utcnow()
        }
        
        if not Config.SMS_API_KEY:
            print(f"SMS notification logged (SMS gateway not configured): {phone} - {message}")
            notification['status'] = 'logged'
            db.notifications.insert_one(notification)
            return True
        
        # Implement SMS gateway integration here
        # Example: requests.post(SMS_GATEWAY_URL, json={'phone': phone, 'message': message})
        
        notification['status'] = 'sent'
        notification['sent_at'] = datetime.utcnow()
        db.notifications.insert_one(notification)
        return True
    except Exception as e:
        print(f"SMS Error: {e}")
        notification['status'] = 'failed'
        notification['error'] = str(e)
        db.notifications.insert_one(notification)
        return False
