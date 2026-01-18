import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import (SiteSettings, HeroSection, AboutSection, Service, 
                        TeamMember, Testimonial, Gallery, FAQ)

print("Adding site content...")

# Add Site Settings
site_settings, created = SiteSettings.objects.get_or_create(
    id=1,
    defaults={
        'site_name': 'Student Organization',
        'site_tagline': 'Empowering Students, Building Communities',
        'email': 'info@studentorg.com',
        'phone': '+1 (555) 123-4567',
        'address': '123 University Ave, Campus Building, Room 101',
        'facebook': 'https://facebook.com/studentorg',
        'twitter': 'https://twitter.com/studentorg',
        'instagram': 'https://instagram.com/studentorg',
        'linkedin': 'https://linkedin.com/company/studentorg',
        'footer_text': '© 2026 Student Organization. All rights reserved. Empowering students to make a difference.'
    }
)
print(f"✓ Site Settings {'created' if created else 'updated'}")

# Add Hero Section
hero, created = HeroSection.objects.get_or_create(
    order=1,
    defaults={
        'title': 'Welcome to Our Student Organization',
        'subtitle': 'Join us in making a positive impact on our campus and community through service, leadership, and friendship',
        'background_image': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
        'cta_text': 'Get Involved',
        'cta_link': '#about',
        'is_active': True
    }
)
print(f"✓ Hero Section {'created' if created else 'exists'}")

# Add About Section
about, created = AboutSection.objects.get_or_create(
    id=1,
    defaults={
        'heading': 'About Our Organization',
        'subheading': 'Making a Difference Since 2020',
        'content': 'We are a dedicated group of students committed to serving our community and creating positive change. Through various initiatives, events, and partnerships, we strive to make our campus and local community a better place for everyone.',
        'image': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
        'mission': 'To empower students to become leaders and changemakers through community service, educational programs, and collaborative initiatives.',
        'vision': 'A campus where every student has the opportunity to make a meaningful impact and develop their full potential.',
        'values': 'Leadership\nService\nIntegrity\nCommunity\nInnovation\nDiversity'
    }
)
print(f"✓ About Section {'created' if created else 'updated'}")

# Add Services
services_data = [
    {'title': 'Community Service', 'description': 'Organize and participate in various community service projects and volunteer opportunities', 'icon': 'fas fa-hands-helping', 'order': 1},
    {'title': 'Leadership Development', 'description': 'Workshops and training sessions to develop leadership skills and personal growth', 'icon': 'fas fa-user-tie', 'order': 2},
    {'title': 'Networking Events', 'description': 'Connect with peers, alumni, and professionals through various networking opportunities', 'icon': 'fas fa-users', 'order': 3},
    {'title': 'Educational Programs', 'description': 'Seminars, workshops, and guest speaker events on various topics', 'icon': 'fas fa-graduation-cap', 'order': 4},
    {'title': 'Social Activities', 'description': 'Fun events and activities to build friendships and create memorable experiences', 'icon': 'fas fa-calendar-alt', 'order': 5},
    {'title': 'Mentorship Program', 'description': 'Connect with mentors for guidance and support throughout your academic journey', 'icon': 'fas fa-handshake', 'order': 6}
]

for service_data in services_data:
    service, created = Service.objects.get_or_create(
        title=service_data['title'],
        defaults=service_data
    )
    if created:
        print(f"✓ Service: {service_data['title']}")

# Add Team Members
team_data = [
    {'name': 'Sarah Johnson', 'position': 'president', 'bio': 'Senior in Business Administration, passionate about community service', 'photo': 'https://i.pravatar.cc/300?img=5', 'email': 'sarah@studentorg.com', 'order': 1},
    {'name': 'Michael Chen', 'position': 'vice_president', 'bio': 'Junior in Computer Science, focused on innovation and technology', 'photo': 'https://i.pravatar.cc/300?img=13', 'email': 'michael@studentorg.com', 'order': 2},
    {'name': 'Emily Rodriguez', 'position': 'secretary', 'bio': 'Sophomore in Communications, excellent organizer and communicator', 'photo': 'https://i.pravatar.cc/300?img=9', 'email': 'emily@studentorg.com', 'order': 3},
    {'name': 'David Kim', 'position': 'treasurer', 'bio': 'Senior in Accounting, managing our finances with precision', 'photo': 'https://i.pravatar.cc/300?img=12', 'email': 'david@studentorg.com', 'order': 4}
]

for member_data in team_data:
    member, created = TeamMember.objects.get_or_create(
        name=member_data['name'],
        defaults=member_data
    )
    if created:
        print(f"✓ Team Member: {member_data['name']}")

# Add Testimonials
testimonials_data = [
    {'name': 'Jessica Martinez', 'role': 'Alumni Member', 'content': 'Being part of this organization was the best decision I made in college. The friendships and experiences I gained here shaped who I am today.', 'photo': 'https://i.pravatar.cc/300?img=1', 'rating': 5, 'order': 1},
    {'name': 'Alex Thompson', 'role': 'Current Member', 'content': 'The leadership opportunities and community service projects have helped me grow both personally and professionally. Highly recommend joining!', 'photo': 'https://i.pravatar.cc/300?img=14', 'rating': 5, 'order': 2},
    {'name': 'Priya Patel', 'role': 'Event Participant', 'content': 'I attended their blood donation camp and was impressed by the professionalism and dedication of the team. They truly make a difference!', 'photo': 'https://i.pravatar.cc/300?img=20', 'rating': 5, 'order': 3}
]

for testimonial_data in testimonials_data:
    testimonial, created = Testimonial.objects.get_or_create(
        name=testimonial_data['name'],
        defaults=testimonial_data
    )
    if created:
        print(f"✓ Testimonial: {testimonial_data['name']}")

# Add Gallery Images
gallery_data = [
    {'title': 'Community Cleanup Day', 'description': 'Members volunteering at local park cleanup', 'image': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800', 'category': 'Community Service', 'order': 1},
    {'title': 'Leadership Workshop', 'description': 'Annual leadership development workshop', 'image': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', 'category': 'Events', 'order': 2},
    {'title': 'Blood Donation Drive', 'description': 'Successful blood donation campaign', 'image': 'https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=800', 'category': 'Health', 'order': 3},
    {'title': 'Team Building Activity', 'description': 'Fun team bonding activities', 'image': 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800', 'category': 'Social', 'order': 4}
]

for gallery_item in gallery_data:
    image, created = Gallery.objects.get_or_create(
        title=gallery_item['title'],
        defaults=gallery_item
    )
    if created:
        print(f"✓ Gallery: {gallery_item['title']}")

# Add FAQs
faqs_data = [
    {'question': 'How can I join the organization?', 'answer': 'You can join by filling out our membership form on the website or attending one of our events. Membership is open to all students.', 'category': 'Membership', 'order': 1},
    {'question': 'Are there any membership fees?', 'answer': 'Yes, there is a small annual membership fee of $20 which helps cover event costs and organizational expenses.', 'category': 'Membership', 'order': 2},
    {'question': 'What types of events do you organize?', 'answer': 'We organize community service projects, leadership workshops, social events, blood donation drives, and educational seminars throughout the year.', 'category': 'Events', 'order': 3},
    {'question': 'Can I volunteer without being a member?', 'answer': 'Absolutely! Many of our events are open to all students, and we welcome volunteers even if they are not official members.', 'category': 'Volunteering', 'order': 4},
    {'question': 'How often do you meet?', 'answer': 'We have general meetings twice a month and various committee meetings weekly. Check our events calendar for specific dates.', 'category': 'General', 'order': 5}
]

for faq_data in faqs_data:
    faq, created = FAQ.objects.get_or_create(
        question=faq_data['question'],
        defaults=faq_data
    )
    if created:
        print(f"✓ FAQ: {faq_data['question'][:50]}...")

print("\n✅ Site content added successfully!")
print(f"Total Services: {Service.objects.count()}")
print(f"Total Team Members: {TeamMember.objects.count()}")
print(f"Total Testimonials: {Testimonial.objects.count()}")
print(f"Total Gallery Images: {Gallery.objects.count()}")
print(f"Total FAQs: {FAQ.objects.count()}")
