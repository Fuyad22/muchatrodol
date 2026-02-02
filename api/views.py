from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import traceback

from django.core.mail import send_mail
from django.conf import settings
from django.db.models import Count
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import (ContactMessage, NewsletterSubscriber, EventRegistration, BloodDonation, 
                     Event, NewsArticle, SiteSettings, HeroSection, AboutSection, Service,
                     TeamMember, Testimonial, Gallery, FAQ)
from .serializers import (
    ContactMessageSerializer, 
    NewsletterSubscriberSerializer, 
    EventRegistrationSerializer, 
    BloodDonationSerializer,
    EventSerializer,
    NewsArticleSerializer,
    SiteSettingsSerializer,
    HeroSectionSerializer,
    AboutSectionSerializer,
    ServiceSerializer,
    TeamMemberSerializer,
    TestimonialSerializer,
    GallerySerializer,
    FAQSerializer
)


@api_view(['GET'])
def api_root(request):
    """API root - list all available endpoints"""
    import os
    from django.conf import settings as django_settings
    
    # Get database engine info
    db_engine = django_settings.DATABASES['default']['ENGINE']
    db_type = 'MongoDB' if 'djongo' in db_engine else 'SQLite' if 'sqlite' in db_engine else 'Unknown'
    
    # Check if on Vercel
    is_vercel = os.getenv('VERCEL', False) or os.getenv('VERCEL_ENV', False)
    
    return Response({
        'success': True,
        'message': 'Student Organization API',
        'version': '1.0',
        'database': {
            'type': db_type,
            'engine': db_engine,
            'environment': 'Vercel' if is_vercel else 'Local/Other',
            'warning': '⚠️ Using SQLite on Vercel - data will be lost!' if (is_vercel and db_type == 'SQLite') else None
        },
        'endpoints': {
            'site_content': {
                'site_settings': '/api/site-settings',
                'hero_sections': '/api/hero-sections',
                'slider_content': '/api/slider-content',
                'about': '/api/about',
                'services': '/api/services',
                'team': '/api/team',
                'testimonials': '/api/testimonials',
                'gallery': '/api/gallery',
                'faqs': '/api/faqs',
            },
            'content': {
                'events': '/api/events',
                'news': '/api/news',
                'news_detail': '/api/news/<slug>',
            },
            'forms': {
                'contact': '/api/contact (POST)',
                'subscribe': '/api/subscribe (POST)',
                'register_event': '/api/register-event (POST)',
                'donate_blood': '/api/donate-blood (POST)',
            },
            'stats': '/api/stats',
        }
    })


@api_view(['GET'])
def get_site_settings(request):
    """Get site settings"""
    settings_obj = SiteSettings.objects.first()
    if settings_obj:
        serializer = SiteSettingsSerializer(settings_obj)
        return Response({'success': True, 'settings': serializer.data})
    return Response({'success': False, 'message': 'Settings not configured'})


@api_view(['GET'])
def get_hero_sections(request):
    """Get active hero sections"""
    heroes = HeroSection.objects.filter(is_active=True)
    serializer = HeroSectionSerializer(heroes, many=True)
    return Response({'success': True, 'heroes': serializer.data})


@api_view(['GET'])
def get_about(request):
    """Get about section"""
    about = AboutSection.objects.first()
    if about:
        serializer = AboutSectionSerializer(about)
        return Response({'success': True, 'about': serializer.data})
    return Response({'success': False, 'message': 'About section not configured'})


@api_view(['GET'])
def get_services(request):
    """Get active services"""
    services = Service.objects.filter(is_active=True)
    serializer = ServiceSerializer(services, many=True)
    return Response({'success': True, 'services': serializer.data})


@api_view(['GET'])
def get_team(request):
    """Get active team members"""
    team = TeamMember.objects.filter(is_active=True)
    serializer = TeamMemberSerializer(team, many=True)
    return Response({'success': True, 'team': serializer.data})


@api_view(['GET'])
def get_testimonials(request):
    """Get active testimonials"""
    testimonials = Testimonial.objects.filter(is_active=True)
    serializer = TestimonialSerializer(testimonials, many=True)
    return Response({'success': True, 'testimonials': serializer.data})


@api_view(['GET'])
def get_gallery(request):
    """Get active gallery images"""
    try:
        category = request.GET.get('category', None)
        gallery = Gallery.objects.filter(is_active=True)
        if category:
            gallery = gallery.filter(category=category)
        serializer = GallerySerializer(gallery, many=True)
        return Response({'success': True, 'gallery': serializer.data})
    except Exception as e:
        return Response({
            'success': False, 
            'message': 'Internal Server Error',
            'error': str(e),
            'traceback': traceback.format_exc()
        }, status=500)


@api_view(['GET'])
def get_faqs(request):
    """Get active FAQs"""
    category = request.GET.get('category', None)
    faqs = FAQ.objects.filter(is_active=True)
    if category:
        faqs = faqs.filter(category=category)
    serializer = FAQSerializer(faqs, many=True)
    return Response({'success': True, 'faqs': serializer.data})


@api_view(['GET'])
def get_events(request):
    """Get all active events"""
    events = Event.objects.filter(is_active=True)
    serializer = EventSerializer(events, many=True)
    return Response({
        'success': True,
        'events': serializer.data
    })


@api_view(['GET'])
def get_news(request):
    """Get all published news articles"""
    limit = request.GET.get('limit', None)
    news = NewsArticle.objects.filter(is_published=True)
    
    if limit:
        news = news[:int(limit)]
    
    serializer = NewsArticleSerializer(news, many=True)
    return Response({
        'success': True,
        'news': serializer.data
    })


@api_view(['GET'])
def get_news_detail(request, slug):
    """Get single news article by slug"""
    try:
        article = NewsArticle.objects.get(slug=slug, is_published=True)
        serializer = NewsArticleSerializer(article)
        return Response({
            'success': True,
            'article': serializer.data
        })
    except NewsArticle.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Article not found'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_slider_content(request):
    """Get content for homepage slider (Hero + Featured Items)"""
    slides = []
    
    # 1. Hero Sections
    heroes = HeroSection.objects.filter(is_active=True).order_by('order')
    for hero in heroes:
        slides.append({
            'type': 'hero',
            'id': hero.id,
            'title': hero.title,
            'subtitle': hero.subtitle,
            'image': hero.background_image,
            'link': hero.cta_link,
            'cta_text': hero.cta_text,
            'order': hero.order
        })
        
    # 2. Featured Events
    events = Event.objects.filter(is_active=True, show_in_slider=True).order_by('date')
    for event in events:
        slides.append({
            'type': 'event',
            'id': event.id,
            'title': event.title,
            'subtitle': f"Event: {event.date} at {event.location}",
            'image': event.image,
            'link': '#events',  # Could link to specific event detail if page existed
            'cta_text': 'View Event',
            'order': 10  # Default order for mixed content
        })
        
    # 3. Featured News
    news = NewsArticle.objects.filter(is_published=True, show_in_slider=True).order_by('-published_date')
    for article in news:
        slides.append({
            'type': 'news',
            'id': article.id,
            'title': article.title,
            'subtitle': article.excerpt[:100] + '...',
            'image': article.image,
            'link': f'#news-{article.slug}',
            'cta_text': 'Read Article',
            'order': 10
        })

    # 4. Gallery Images
    gallery = Gallery.objects.filter(is_active=True, show_in_slider=True).order_by('-created_at')
    for item in gallery:
        slides.append({
            'type': 'gallery',
            'id': item.id,
            'title': item.title,
            'subtitle': item.description[:100] if item.description else '',
            'image': item.image,  # Handles both URL and ImageField URL
            'link': '#gallery',
            'cta_text': 'View Gallery',
            'order': 10
        })

    # Sort slides
    # Hero sections have explicit order, others default to 10 so they appear after (or mixed)
    # We can create a simple strategy: Hero first, then others by date/creation?
    # For now, let's trust the user order or just append. 
    # Or strict sort by 'order' key if we want to manage it globally? 
    # Let's simple sort by order
    slides.sort(key=lambda x: x.get('order', 10))

    return Response({
        'success': True,
        'count': len(slides),
        'slides': slides
    })


@api_view(['POST'])
@csrf_exempt
def contact_form(request):
    """Handle contact form submissions"""
    serializer = ContactMessageSerializer(data=request.data)
    
    if serializer.is_valid():
        contact = serializer.save()
        
        # Try to send email notification (optional - won't block if email not configured)
        try:
            if settings.EMAIL_HOST_USER and settings.CONTACT_EMAIL:
                subject = f"Contact Form: {contact.subject}"
                message = f"""
New Contact Form Submission

Name: {contact.name}
Email: {contact.email}
Subject: {contact.subject}

Message:
{contact.message}

---
This email was sent from your Student Organization website contact form.
                """
                
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.CONTACT_EMAIL],
                    fail_silently=True,
                )
        except Exception as e:
            # Email failed but message is still saved
            print(f"Email sending failed: {e}")
        
        return Response({
            'success': True,
            'message': 'Message sent successfully! We will get back to you soon.'
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'message': 'Invalid data provided',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@csrf_exempt
def subscribe_newsletter(request):
    """Handle newsletter subscriptions"""
    email = request.data.get('email')
    
    if not email:
        return Response({
            'success': False,
            'message': 'Email is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if already subscribed
    if NewsletterSubscriber.objects.filter(email=email).exists():
        return Response({
            'success': False,
            'message': 'This email is already subscribed to our newsletter'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = NewsletterSubscriberSerializer(data={'email': email})
    
    if serializer.is_valid():
        subscriber = serializer.save()
        
        # Send confirmation email
        try:
            send_mail(
                'Welcome to Our Newsletter!',
                f"""
Hello!

Thank you for subscribing to our newsletter. You'll now receive updates about our events, activities, and announcements.

If you wish to unsubscribe at any time, please contact us.

Best regards,
Student Organization Team
                """,
                settings.DEFAULT_FROM_EMAIL,
                [subscriber.email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Email sending failed: {e}")
        
        return Response({
            'success': True,
            'message': 'Successfully subscribed to newsletter!'
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'message': 'Invalid email address',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@csrf_exempt
def register_event(request):
    """Handle event registrations"""
    serializer = EventRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        registration = serializer.save()
        
        # Send confirmation email
        try:
            send_mail(
                f'Event Registration Confirmation - {registration.event_id}',
                f"""
Hello {registration.name},

Thank you for registering for {registration.event_id}!

Registration Details:
- Name: {registration.name}
- Email: {registration.email}
- Phone: {registration.phone}

We look forward to seeing you at the event!

Best regards,
Student Organization Team
                """,
                settings.DEFAULT_FROM_EMAIL,
                [registration.email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Email sending failed: {e}")
        
        return Response({
            'success': True,
            'message': 'Successfully registered for the event!'
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'message': 'Invalid data provided',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@csrf_exempt
def donate_blood(request):
    """Handle blood donation registrations"""
    serializer = BloodDonationSerializer(data=request.data)
    
    if serializer.is_valid():
        donation = serializer.save()
        
        # Send confirmation email
        try:
            send_mail(
                'Blood Donation Registration Confirmation',
                f"""
Hello {donation.name},

Thank you for registering to donate blood!

Registration Details:
- Name: {donation.name}
- Blood Type: {donation.blood_type}
- Phone: {donation.phone}
- Age: {donation.age}

Our team will contact you soon with further details.

Thank you for your generous contribution!

Best regards,
Student Organization Team
                """,
                settings.DEFAULT_FROM_EMAIL,
                [donation.email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Email sending failed: {e}")
        
        return Response({
            'success': True,
            'message': 'Successfully registered for blood donation!'
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'message': 'Invalid data provided',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_stats(request):
    """Get statistics for the dashboard"""
    stats = {
        'contacts': ContactMessage.objects.count(),
        'subscribers': NewsletterSubscriber.objects.filter(is_active=True).count(),
        'event_registrations': EventRegistration.objects.count(),
        'blood_donations': BloodDonation.objects.count(),
        'recent_contacts': ContactMessage.objects.count()[:5],
        'blood_type_distribution': list(
            BloodDonation.objects.values('blood_type')
            .annotate(count=Count('id'))
            .order_by('-count')
        )
    }
    
    return Response({
        'success': True,
        'data': stats
    })
