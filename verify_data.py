
import os
import django
import sys

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import TeamMember, Event, NewsArticle

print("START_VERIFICATION")

try:
    tm_count = TeamMember.objects.count()
    print(f"TeamMembers_Count: {tm_count}")
    if tm_count > 0:
        for m in TeamMember.objects.all():
            print(f"TM: {m.name} (Active: {m.is_active})")
    else:
        print("TeamMembers: NONE")

    ev_count = Event.objects.count()
    print(f"Events_Count: {ev_count}")
    if ev_count > 0:
        for e in Event.objects.all():
            print(f"EV: {e.title} (Active: {e.is_active})")

    na_count = NewsArticle.objects.count()
    print(f"News_Count: {na_count}")
    if na_count > 0:
        for n in NewsArticle.objects.all():
            print(f"NA: {n.title} (Published: {n.is_published})")

except Exception as e:
    print(f"ERROR: {e}")

print("END_VERIFICATION")
