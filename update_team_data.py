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
        'email': 'TBU',
        'phone': 'TBU',
        'bio': 'Leading the organization since 2024 with exceptional dedication.',
        'achievements': 'Led 20+ successful events',
        'photo': 'images/kawser.jpg',
        'order': 1
    },
    {
        'name': 'Abu Tanim',
        'position': 'vice_president',
        'email': 'TBU',
        'phone': 'TBU',
        'bio': 'Coordinating all organizational activities and supporting various committees.',
        'achievements': 'Coordinated 15+ major events',
        'photo': 'images/tanim.jpg',
        'order': 2
    },
    {
        'name': 'Fuyad Hassan',
        'position': 'secretary',
        'email': 'TBU',
        'phone': 'TBU',
        'bio': 'Ensures all organizational communications run smoothly.',
        'achievements': 'Improved response time by 60%',
        'photo': 'images/fuyad.jpg',
        'order': 3
    },
    {
        'name': 'SNaimur Rahman Nafees',
        'position': 'treasurer',
        'email': 'TBU',
        'phone': 'TBU',
        'bio': 'Manages all financial aspects of the organization.',
        'achievements': 'Secured $30,000 in grants',
        'photo': 'images/nafees.jpg',
        'order': 4
    },
    {
        'name': 'Md Jakaria Ahmed',
        'position': 'event_coordinator',
        'email': 'TBU',
        'phone': 'TBU',
        'bio': 'Brings creativity and meticulous planning to every event.',
        'achievements': 'Organized 25+ events',
        'photo': 'images/jakaria.jpg',
        'order': 5
    },
    {
        'name': 'Marjan Ahmed Shimul',
        'position': 'public_relations',
        'email': 'TBU',
        'phone': 'TBU',
        'bio': 'Manages our public image and builds strong relationships.',
        'achievements': 'Grew social media following to 5000+',
        'photo': 'images/shimul.jpg',
        'order': 6
    },
    {
        'name': 'Emad Ahmed Rigve',
        'position': 'public_relations',
        'email': 'TBU',
        'phone': 'TBU',
        'bio': 'Passionate about community engagement and brand storytelling.',
        'achievements': 'Launched successful campus campaign',
        'photo': 'images/emad.jpg',
        'order': 7
    },
    {
        'name': 'Ishtiaq Uddin Shafi',
        'position': 'public_relations',
        'email': 'TBU',
        'phone': 'TBU',
        'bio': 'Specializes in digital media and content creation.',
        'achievements': 'Created viral social media content',
        'photo': 'images/shafi.jpeg',
        'order': 8
    },
    {
        'name': 'Ashraf Ahmed',
        'position': 'public_relations',
        'email': 'TBU',
        'phone': 'TBU',
        'bio': 'Connects with local student bodies and organizations.',
        'achievements': 'Established 5 new partnerships',
        'photo': 'images/ashraf.jpg',
        'order': 9
    },
    {
        'name': 'Rifat Ahmed',
        'position': 'public_relations',
        'email': 'TBU',
        'phone': 'TBU',
        'bio': 'Expert in press releases and media communication.',
        'achievements': 'Got featured in local newspaper',
        'photo': 'images/rifat.jpg',
        'order': 10
    },
    {
        'name': 'Nadir Hossain',
        'position': 'public_relations',
        'email': 'nadir.hossain@studentorg.edu',
        'phone': None,
        'bio': 'Focuses on internal communication and member engagement.',
        'achievements': 'Increased member participation by 30%',
        'photo':None,
        'order': 11
    },
    {
        'name': 'Muzaddid Chowdhury',
        'position': 'public_relations',
        'email': 'muzaddid.chowdhury@studentorg.edu',
        'phone': None,
        'bio': 'Coordinates outreach programs and volunteer activities.',
        'achievements': 'Organized 3 successful outreach events',
        'photo': 'images/muzaddid.jpg',
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
