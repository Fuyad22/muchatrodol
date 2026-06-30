#!/usr/bin/env python
"""Create Django superuser automatically"""
import os
import sys
import django

# Reconfigure stdout to use UTF-8 on Windows to prevent UnicodeEncodeError crashes
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Get credentials from environment or use defaults
username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')

try:
    user = User.objects.get(username=username)
    print(f'[INFO] User {username} already exists. Updating password...')
    user.set_password(password)
    user.save()
    print('[OK] Password updated successfully!')
except User.DoesNotExist:
    print(f'Creating new superuser: {username}')
    User.objects.create_superuser(username=username, email=email, password=password)
    print('[OK] Superuser created successfully!')

