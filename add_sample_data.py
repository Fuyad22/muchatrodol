import os
import django
from datetime import datetime, timedelta

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Event, NewsArticle

# Clear existing data
Event.objects.all().delete()
NewsArticle.objects.all().delete()

# Add sample events
events_data = [
    {
        'title': 'Blood Donation Camp',
        'date': datetime.now().date() + timedelta(days=3),
        'start_time': '09:00:00',
        'end_time': '16:00:00',
        'location': 'Main Campus Hall',
        'description': 'Join us for our quarterly blood donation drive. Save lives!',
        'image': 'https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=400',
        'is_active': True
    },
    {
        'title': 'Leadership Workshop',
        'date': datetime.now().date() + timedelta(days=8),
        'start_time': '14:00:00',
        'end_time': '17:00:00',
        'location': 'Conference Room A',
        'description': 'Develop your leadership skills with expert facilitators.',
        'image': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
        'is_active': True
    },
    {
        'title': 'Annual Cultural Festival',
        'date': datetime.now().date() + timedelta(days=16),
        'start_time': '10:00:00',
        'end_time': '20:00:00',
        'location': 'University Grounds',
        'description': 'Celebrate diversity with music, dance, food, and more!',
        'image': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
        'is_active': True
    }
]

for event_data in events_data:
    Event.objects.create(**event_data)
    print(f"✓ Created event: {event_data['title']}")

# Add sample news articles
news_data = [
    {
        'title': 'Record-Breaking Blood Donation Drive',
        'slug': 'record-breaking-blood-donation-drive',
        'image': 'https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=800',
        'excerpt': 'Our latest blood donation camp collected 150 units, helping save over 450 lives. Thank you to all our amazing donors!',
        'content': '''Our latest blood donation camp was a tremendous success! With the support of our dedicated volunteers and generous donors, we collected 150 units of blood, which will help save over 450 lives.

The event, held on campus, saw participation from students, faculty, and community members. Medical professionals from the City Hospital ensured a safe and smooth donation process.

We extend our heartfelt gratitude to everyone who contributed to making this event a success. Your generosity will make a real difference in saving lives.''',
        'author': 'Admin',
        'is_published': True
    },
    {
        'title': 'Partnership with Local Hospital',
        'slug': 'partnership-with-local-hospital',
        'image': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        'excerpt': "We're excited to announce our new partnership with City Hospital for enhanced healthcare initiatives.",
        'content': '''We are thrilled to announce our new partnership with City Hospital to bring enhanced healthcare initiatives to our campus community.

This collaboration will enable us to:
• Organize regular health camps and screenings
• Provide emergency medical support during events
• Conduct health awareness programs
• Facilitate internship opportunities for students

The partnership marks a significant milestone in our commitment to student welfare and community health. We look forward to the positive impact this collaboration will bring.''',
        'author': 'Admin',
        'is_published': True
    },
    {
        'title': 'Best Student Organization Award',
        'slug': 'best-student-organization-award',
        'image': 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800',
        'excerpt': 'Proud to receive the Best Student Organization Award for our outstanding community service efforts!',
        'content': '''We are incredibly proud to announce that our organization has been awarded the Best Student Organization Award at the Annual University Awards Ceremony.

This recognition is a testament to the hard work and dedication of our members who have tirelessly served the community throughout the year. From organizing blood donation camps to conducting educational workshops, our team has made a significant impact.

Highlights of our achievements:
• 15+ community service events
• 500+ volunteer hours
• 3 major health initiatives
• Strong collaboration with local institutions

Thank you to all our members, supporters, and the university for this honor. This award motivates us to continue our mission of serving the community with even greater enthusiasm.''',
        'author': 'Admin',
        'is_published': True
    }
]

for news in news_data:
    NewsArticle.objects.create(**news)
    print(f"✓ Created news: {news['title']}")

print("\n✅ Sample data added successfully!")
print(f"Total Events: {Event.objects.count()}")
print(f"Total News Articles: {NewsArticle.objects.count()}")
