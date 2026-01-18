from django.urls import path
from . import views

urlpatterns = [
    # API Root
    path('', views.api_root, name='api-root'),
    
    # Site content endpoints
    path('site-settings', views.get_site_settings, name='site-settings'),
    path('hero-sections', views.get_hero_sections, name='hero-sections'),
    path('about', views.get_about, name='about'),
    path('services', views.get_services, name='services'),
    path('team', views.get_team, name='team'),
    path('testimonials', views.get_testimonials, name='testimonials'),
    path('gallery', views.get_gallery, name='gallery'),
    path('faqs', views.get_faqs, name='faqs'),
    
    # Content endpoints
    path('events', views.get_events, name='events'),
    path('news', views.get_news, name='news'),
    path('news/<slug:slug>', views.get_news_detail, name='news-detail'),
    
    # Form submission endpoints
    path('contact', views.contact_form, name='contact'),
    path('subscribe', views.subscribe_newsletter, name='subscribe'),
    path('register-event', views.register_event, name='register-event'),
    path('donate-blood', views.donate_blood, name='donate-blood'),
    
    # Stats
    path('stats', views.get_stats, name='stats'),
]
