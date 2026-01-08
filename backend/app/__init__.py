from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from config import Config

mongo_client = None
db = None

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Configure CORS to allow requests from React frontend
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
    JWTManager(app)
    
    # MongoDB connection
    global mongo_client, db
    mongo_client = MongoClient(app.config['MONGO_URI'])
    db = mongo_client.get_database()
    
    # Register blueprints
    from app.routes import auth, loans, savings, users, dashboard, committee, inspection, insurance, accountant, amortization, assets, shareholders, profit
    app.register_blueprint(auth.bp)
    app.register_blueprint(loans.bp)
    app.register_blueprint(savings.bp)
    app.register_blueprint(users.bp)
    app.register_blueprint(dashboard.bp)
    app.register_blueprint(committee.bp)
    app.register_blueprint(inspection.bp)
    app.register_blueprint(insurance.bp)
    app.register_blueprint(accountant.bp)
    app.register_blueprint(amortization.bp)
    app.register_blueprint(assets.bp)
    app.register_blueprint(shareholders.bp)
    app.register_blueprint(profit.bp)
    
    return app
