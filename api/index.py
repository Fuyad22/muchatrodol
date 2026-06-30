import os
import django
from django.core.management import call_command

# Setup Django first
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# Auto-migrate and seed team data on Vercel if using SQLite fallback
is_vercel = os.getenv('VERCEL', False) or os.getenv('VERCEL_ENV', False)
mongodb_uri = os.getenv('MONGODB_URI', None)

if is_vercel and not mongodb_uri:
    try:
        print("Vercel SQLite Fallback: Running migrations...")
        call_command('migrate', no_input=True)
        
        from api.models import TeamMember
        if not TeamMember.objects.exists():
            print("No team members found in SQLite. Seeding database...")
            import update_team_data
            update_team_data.run()
        else:
            print("Team data already exists in SQLite.")
    except Exception as e:
        print(f"Error during Vercel SQLite setup: {e}")

from backend.wsgi import application
app = application
