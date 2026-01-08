"""
Quick script to check MongoDB connection and database status
"""
from pymongo import MongoClient
from config import Config
import sys

def check_mongodb():
    print("=" * 60)
    print("MongoDB Connection Check")
    print("=" * 60)
    
    try:
        # Try to connect
        print(f"\n1. Connecting to: {Config.MONGO_URI}")
        client = MongoClient(Config.MONGO_URI, serverSelectionTimeoutMS=5000)
        
        # Test connection
        client.admin.command('ping')
        print("   ✓ MongoDB is running and accessible")
        
        # Get database
        db = client.get_database()
        db_name = db.name
        print(f"\n2. Database: {db_name}")
        
        # List collections
        collections = db.list_collection_names()
        print(f"\n3. Collections ({len(collections)}):")
        
        if not collections:
            print("   ⚠ No collections found - database is empty")
            print("   → Run 'python seed_data.py' to initialize")
        else:
            for collection in collections:
                count = db[collection].count_documents({})
                print(f"   - {collection}: {count} documents")
        
        # Check critical collections
        print("\n4. Critical Collections Check:")
        critical = ['users', 'employees', 'loan_products']
        all_good = True
        
        for coll in critical:
            count = db[coll].count_documents({})
            if count > 0:
                print(f"   ✓ {coll}: {count} records")
            else:
                print(f"   ✗ {coll}: empty")
                all_good = False
        
        if not all_good:
            print("\n   ⚠ Some critical collections are empty")
            print("   → Run 'python seed_data.py' to initialize")
        
        print("\n" + "=" * 60)
        print("✓ MongoDB is ready!")
        print("=" * 60)
        return True
        
    except Exception as e:
        print(f"\n✗ Error: {e}")
        print("\n" + "=" * 60)
        print("MongoDB Connection Failed!")
        print("=" * 60)
        print("\nTroubleshooting:")
        print("1. Ensure MongoDB is installed")
        print("2. Start MongoDB service:")
        print("   - Windows: net start MongoDB")
        print("   - macOS: brew services start mongodb-community")
        print("   - Linux: sudo systemctl start mongod")
        print("3. Check MONGO_URI in .env file")
        print("\nSee MONGODB_SETUP.md for detailed instructions")
        print("=" * 60)
        return False

if __name__ == '__main__':
    success = check_mongodb()
    sys.exit(0 if success else 1)
