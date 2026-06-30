
import os
import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

uri = os.getenv('MONGODB_URI')
if not uri:
    print("❌ Error: MONGODB_URI not found in .env")
    exit(1)

print(f"Connecting to MongoDB...")
client = MongoClient(uri)
db = client.get_default_database()

print(f"✅ Connected to database: {db.name}")

# 1. Team Members
print("Uploading Team Members...")
# Drop existing
try:
    db.api_teammember.delete_many({})
    
    team_data = [
        {'name': 'Kawser Ahmed', 'position': 'president', 'email': 'kawser.ahmed@studentorg.edu', 'phone': '+880 171-1111111', 'bio': 'Leading the organization since 2024 with exceptional dedication.', 'achievements': 'Led 20+ successful events', 'photo': None, 'order': 1, 'is_active': True},
        {'name': 'Abu Tanim', 'position': 'vice_president', 'email': 'abu.tanim@studentorg.edu', 'phone': '+880 171-2222222', 'bio': 'Coordinating all organizational activities and supporting various committees.', 'achievements': 'Coordinated 15+ major events', 'photo': None, 'order': 2, 'is_active': True},
        {'name': 'Fuyad Hassan', 'position': 'secretary', 'email': 'fuyad.hassan@studentorg.edu', 'phone': '+880 171-3333333', 'bio': 'Ensures all organizational communications run smoothly.', 'achievements': 'Improved response time by 60%', 'photo': None, 'order': 3, 'is_active': True},
        {'name': 'SNaimur Rahman Nafees', 'position': 'treasurer', 'email': 'snaimur.rahman@studentorg.edu', 'phone': None, 'bio': 'Manages all financial aspects of the organization.', 'achievements': 'Secured $30,000 in grants', 'photo': None, 'order': 4, 'is_active': True},
        {'name': 'Md Jakaria Ahmed', 'position': 'event_coordinator', 'email': 'jakaria.ahmed@studentorg.edu', 'phone': None, 'bio': 'Brings creativity and meticulous planning to every event.', 'achievements': 'Organized 25+ events', 'photo': None, 'order': 5, 'is_active': True},
        {'name': 'Marjan Ahmed Shimul', 'position': 'public_relations', 'email': 'marjan.ahmed@studentorg.edu', 'phone': None, 'bio': 'Manages our public image and builds strong relationships.', 'achievements': 'Grew social media following to 5000+', 'photo': None, 'order': 6, 'is_active': True},
        {'name': 'Emad Ahmed Rigve', 'position': 'public_relations', 'email': 'emad.ahmed@studentorg.edu', 'phone': None, 'bio': 'Passionate about community engagement and brand storytelling.', 'achievements': 'Launched successful campus campaign', 'photo': None, 'order': 7, 'is_active': True},
        {'name': 'Ishtiaq Uddin Shafi', 'position': 'public_relations', 'email': 'ishtiaq.shafi@studentorg.edu', 'phone': None, 'bio': 'Specializes in digital media and content creation.', 'achievements': 'Created viral social media content', 'photo': None, 'order': 8, 'is_active': True},
        {'name': 'Ashraf Ahmed', 'position': 'public_relations', 'email': 'ashraf.ahmed@studentorg.edu', 'phone': None, 'bio': 'Connects with local student bodies and organizations.', 'achievements': 'Established 5 new partnerships', 'photo': None, 'order': 9, 'is_active': True},
        {'name': 'Rifat Ahmed', 'position': 'public_relations', 'email': 'rifat.ahmed@studentorg.edu', 'phone': None, 'bio': 'Expert in press releases and media communication.', 'achievements': 'Got featured in local newspaper', 'photo': None, 'order': 10, 'is_active': True},
        {'name': 'Nadir Hossain', 'position': 'public_relations', 'email': 'nadir.hossain@studentorg.edu', 'phone': None, 'bio': 'Focuses on internal communication and member engagement.', 'achievements': 'Increased member participation by 30%', 'photo': None, 'order': 11, 'is_active': True},
        {'name': 'Muzaddid Chowdhury', 'position': 'public_relations', 'email': 'muzaddid.chowdhury@studentorg.edu', 'phone': None, 'bio': 'Coordinates outreach programs and volunteer activities.', 'achievements': 'Organized 3 successful outreach events', 'photo': None, 'order': 12, 'is_active': True},
        {'name': 'Rahib', 'position': 'public_relations', 'email': 'rahib@studentorg.edu', 'phone': None, 'bio': 'Dedicated to spreading our mission across campus.', 'achievements': 'Recruited 50+ new volunteers', 'photo': None, 'order': 13, 'is_active': True},
        {'name': 'Ishtiaq Uddin Jamee', 'position': 'public_relations', 'email': 'ishtiaq.jamee@studentorg.edu', 'phone': None, 'bio': 'Assists in event promotion and marketing materials.', 'achievements': 'Designed posters for annual fest', 'photo': None, 'order': 14, 'is_active': True},
        {'name': 'Fahim Sadi', 'position': 'public_relations', 'email': 'fahim.sadi@studentorg.edu', 'phone': None, 'bio': 'Engages with online community and manages forums.', 'achievements': 'Moderated 2 online webinars', 'photo': None, 'order': 15, 'is_active': True},
        {'name': 'Priobroto Drubo', 'position': 'public_relations', 'email': 'priobroto.drubo@studentorg.edu', 'phone': None, 'bio': 'Supports PR team in various administrative tasks.', 'achievements': 'Volunteer of the month - June', 'photo': None, 'order': 16, 'is_active': True}
    ]
    db.api_teammember.insert_many(team_data)
    print(f"✓ Uploaded {len(team_data)} team members")

    # 2. Events
    print("Uploading Events...")
    db.api_event.delete_many({})
    events_data = [
        {
            'title': 'Blood Donation Camp',
            'date': (datetime.datetime.now() + datetime.timedelta(days=3)).strftime('%Y-%m-%d'),
            'start_time': '09:00:00',
            'end_time': '16:00:00',
            'location': 'Main Campus Hall',
            'description': 'Join us for our quarterly blood donation drive. Save lives!',
            'image': 'https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=400',
            'is_active': True,
            'show_in_slider': True,
            'created_at': datetime.datetime.now()
        },
        {
            'title': 'Leadership Workshop',
            'date': (datetime.datetime.now() + datetime.timedelta(days=8)).strftime('%Y-%m-%d'),
            'start_time': '14:00:00',
            'end_time': '17:00:00',
            'location': 'Conference Room A',
            'description': 'Develop your leadership skills with expert facilitators.',
            'image': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
            'is_active': True,
            'show_in_slider': True,
            'created_at': datetime.datetime.now()
        },
        {
            'title': 'Annual Cultural Festival',
            'date': (datetime.datetime.now() + datetime.timedelta(days=16)).strftime('%Y-%m-%d'),
            'start_time': '10:00:00',
            'end_time': '20:00:00',
            'location': 'University Grounds',
            'description': 'Celebrate diversity with music, dance, food, and more!',
            'image': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
            'is_active': True,
            'show_in_slider': True,
            'created_at': datetime.datetime.now()
        }
    ]
    db.api_event.insert_many(events_data)
    print(f"✓ Uploaded {len(events_data)} events")

    # 3. News
    print("Uploading News...")
    db.api_newsarticle.delete_many({})
    news_data = [
        {
            'title': 'Record-Breaking Blood Donation Drive',
            'slug': 'record-breaking-blood-donation-drive',
            'image': 'https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=800',
            'excerpt': 'Our latest blood donation camp collected 150 units.',
            'content': 'Our latest blood donation camp was a tremendous success...',
            'author': 'Admin',
            'is_published': True,
            'show_in_slider': True,
            'published_date': datetime.datetime.now()
        },
        {
            'title': 'Partnership with Local Hospital',
            'slug': 'partnership-with-local-hospital',
            'image': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
            'excerpt': "We're excited to announce our new partnership with City Hospital.",
            'content': 'We are thrilled to announce our new partnership...',
            'author': 'Admin',
            'is_published': True,
            'show_in_slider': True,
            'published_date': datetime.datetime.now()
        },
        {
            'title': 'Best Student Organization Award',
            'slug': 'best-student-organization-award',
            'image': 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800',
            'excerpt': 'Proud to receive the Best Student Organization Award.',
            'content': 'We are incredibly proud to announce...',
            'author': 'Admin',
            'is_published': True,
            'show_in_slider': True,
            'published_date': datetime.datetime.now()
        }
    ]
    db.api_newsarticle.insert_many(news_data)
    print(f"✓ Uploaded {len(news_data)} news articles")

    print("\n✅ LIVE Database populated successfully!")

except Exception as e:
    print(f"❌ Upload failed: {e}")
