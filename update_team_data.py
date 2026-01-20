import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import TeamMember

print("Updating Team Members...")

# Clear existing team data to avoid duplicates/old data
deleted_count, _ = TeamMember.objects.all().delete()
print(f"Deleted {deleted_count} existing team members.")

# Define the new 16 team members
team_data = [
    {
        'name': 'Kawser Ahmed',
        'position': 'president',
        'email': 'kawser.ahmed@studentorg.edu',
        'phone': '+880 171-1111111',
        'bio': 'Leading the organization since 2024 with exceptional dedication.',
        'achievements': 'Led 20+ successful events',
        'photo': None,
        'order': 1
    },
    {
        'name': 'Abu Tanim',
        'position': 'vice_president',
        'email': 'abu.tanim@studentorg.edu',
        'phone': '+880 171-2222222',
        'bio': 'Coordinating all organizational activities and supporting various committees.',
        'achievements': 'Coordinated 15+ major events',
        'photo': None,
        'order': 2
    },
    {
        'name': 'Fuyad Hassan',
        'position': 'secretary',
        'email': 'fuyad.hassan@studentorg.edu',
        'phone': '+880 171-3333333',
        'bio': 'Ensures all organizational communications run smoothly.',
        'achievements': 'Improved response time by 60%',
        'photo': None,
        'order': 3
    },
    {
        'name': 'SNaimur Rahman Nafees',
        'position': 'treasurer',
        'email': 'snaimur.rahman@studentorg.edu',
        'phone': None,
        'bio': 'Manages all financial aspects of the organization.',
        'achievements': 'Secured $30,000 in grants',
        'photo': None,
        'order': 4
    },
    {
        'name': 'Md Jakaria Ahmed',
        'position': 'event_coordinator',
        'email': 'jakaria.ahmed@studentorg.edu',
        'phone': None,
        'bio': 'Brings creativity and meticulous planning to every event.',
        'achievements': 'Organized 25+ events',
        'photo': None,
        'order': 5
    },
    {
        'name': 'Marjan Ahmed Shimul',
        'position': 'public_relations',
        'email': 'marjan.ahmed@studentorg.edu',
        'phone': None,
        'bio': 'Manages our public image and builds strong relationships.',
        'achievements': 'Grew social media following to 5000+',
        'photo': None,
        'order': 6
    },
    {
        'name': 'Emad Ahmed Rigve',
        'position': 'public_relations',
        'email': 'emad.ahmed@studentorg.edu',
        'phone': None,
        'bio': 'Passionate about community engagement and brand storytelling.',
        'achievements': 'Launched successful campus campaign',
        'photo': None,
        'order': 7
    },
    {
        'name': 'Ishtiaq Uddin Shafi',
        'position': 'public_relations',
        'email': 'ishtiaq.shafi@studentorg.edu',
        'phone': None,
        'bio': 'Specializes in digital media and content creation.',
        'achievements': 'Created viral social media content',
        'photo': None,
        'order': 8
    },
    {
        'name': 'Ashraf Ahmed',
        'position': 'public_relations',
        'email': 'ashraf.ahmed@studentorg.edu',
        'phone': None,
        'bio': 'Connects with local student bodies and organizations.',
        'achievements': 'Established 5 new partnerships',
        'photo': None,
        'order': 9
    },
    {
        'name': 'Rifat Ahmed',
        'position': 'public_relations',
        'email': 'rifat.ahmed@studentorg.edu',
        'phone': None,
        'bio': 'Expert in press releases and media communication.',
        'achievements': 'Got featured in local newspaper',
        'photo': None,
        'order': 10
    },
    {
        'name': 'Nadir Hossain',
        'position': 'public_relations',
        'email': 'nadir.hossain@studentorg.edu',
        'phone': None,
        'bio': 'Focuses on internal communication and member engagement.',
        'achievements': 'Increased member participation by 30%',
        'photo': None,
        'order': 11
    },
    {
        'name': 'Muzaddid Chowdhury',
        'position': 'public_relations',
        'email': 'muzaddid.chowdhury@studentorg.edu',
        'phone': None,
        'bio': 'Coordinates outreach programs and volunteer activities.',
        'achievements': 'Organized 3 successful outreach events',
        'photo': None,
        'order': 12
    },
    {
        'name': 'Rahib',
        'position': 'public_relations',
        'email': 'rahib@studentorg.edu',
        'phone': None,
        'bio': 'Dedicated to spreading our mission across campus.',
        'achievements': 'Recruited 50+ new volunteers',
        'photo': None,
        'order': 13
    },
    {
        'name': 'Ishtiaq Uddin Jamee',
        'position': 'public_relations',
        'email': 'ishtiaq.jamee@studentorg.edu',
        'phone': None,
        'bio': 'Assists in event promotion and marketing materials.',
        'achievements': 'Designed posters for annual fest',
        'photo': None,
        'order': 14
    },
    {
        'name': 'Fahim Sadi',
        'position': 'public_relations',
        'email': 'fahim.sadi@studentorg.edu',
        'phone': None,
        'bio': 'Engages with online community and manages forums.',
        'achievements': 'Moderated 2 online webinars',
        'photo': None,
        'order': 15
    },
    {
        'name': 'Priobroto Drubo',
        'position': 'public_relations',
        'email': 'priobroto.drubo@studentorg.edu',
        'phone': None,
        'bio': 'Supports PR team in various administrative tasks.',
        'achievements': 'Volunteer of the month - June',
        'photo': None,
        'order': 16
    }
]

# Create new members
for member_data in team_data:
    TeamMember.objects.create(**member_data)
    print(f"Created: {member_data['name']}")

print(f"\nSuccessfully created {len(team_data)} team members.")
