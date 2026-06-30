
import os
import django
import sys
import traceback

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    django.setup()
    print("Django setup success.")
    
    print("Importing api.urls...")
    import api.urls
    print("Importing backend.urls...")
    import backend.urls
    
    print("All imports success.")
except Exception:
    traceback.print_exc()
