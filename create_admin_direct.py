
import os
import datetime
import django
from django.conf import settings
from django.contrib.auth.hashers import make_password
from pymongo import MongoClient

# Configure minimal Django settings for password hashing
if not settings.configured:
    settings.configure(DEBUG=True, SECRET_KEY='temp_secret')
    django.setup()

def create_admin_direct():
    uri = os.environ.get('MONGODB_URI')
    db_name = os.environ.get('MONGODB_NAME', 'muchatrodol_db')
    username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
    email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
    password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')

    print(f"Connecting to MongoDB: {db_name}")
    try:
        client = MongoClient(uri)
        db = client[db_name]
        users = db['auth_user']
        
        # Check if user exists
        if users.find_one({'username': username}):
            print(f"User '{username}' already exists. Updating password...")
            hashed_pw = make_password(password)
            users.update_one(
                {'username': username},
                {'$set': {'password': hashed_pw}}
            )
            print("✅ Password updated successfully!")
        else:
            print(f"Creating new superuser '{username}'...")
            hashed_pw = make_password(password)
            now = datetime.datetime.now()
            
            user_doc = {
                'password': hashed_pw,
                'last_login': now,
                'is_superuser': True,
                'username': username,
                'first_name': '',
                'last_name': '',
                'email': email,
                'is_staff': True,
                'is_active': True,
                'date_joined': now,
                # Django/Djongo might expect 'groups' and 'user_permissions' as lists
                'groups': [],
                'user_permissions': []
            }
            
            # Djongo often uses 'id' as integer, but MongoDB uses _id as ObjectId.
            # We need to find the max ID to auto-increment or let Djongo handle it?
            # Djongo maps 'id' to a field. If we assume auto-increment behavior is expected...
            # Safest is to check max id.
            max_id = 0
            last_user = users.find_one(sort=[('id', -1)])
            if last_user and 'id' in last_user:
                max_id = last_user['id']
            
            user_doc['id'] = max_id + 1
            
            users.insert_one(user_doc)
            print(f"✅ User created with ID {user_doc['id']}")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    create_admin_direct()
