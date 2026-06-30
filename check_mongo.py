
import os
import sys
import django
from django.conf import settings
from pymongo import MongoClient

# Reconfigure stdout to use UTF-8 on Windows to prevent UnicodeEncodeError crashes
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

# Setup environment manually to test raw connection first
uri = "mongodb+srv://muchatrodol_admin:JeqbGTwEPjLCU9ei@cluster0.kq2zxku.mongodb.net/?appName=Cluster0"
print(f"Testing connection to: {uri.split('@')[1]}")  # Hide credentials in output

try:
    client = MongoClient(uri)
    # The ismaster command is cheap and does not require auth.
    client.admin.command('ismaster')
    print("[OK] Network connection successful!")
    
    # Check database access
    db_name = "muchatrodol_db"
    db = client[db_name]
    print(f"[OK] Database '{db_name}' selected found.")
    
    # List collections to verify auth
    collections = db.list_collection_names()
    print(f"[OK] Collections found: {len(collections)}")
    print(collections)
    
except Exception as e:
    print(f"[ERROR] Connection failed: {e}")

