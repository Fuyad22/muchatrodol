from rest_framework import serializers
from .models import (ContactMessage, NewsletterSubscriber, EventRegistration, BloodDonation, 
                     Event, NewsArticle, SiteSettings, HeroSection, AboutSection, Service, 
                     TeamMember, Testimonial, Gallery, FAQ)


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'


class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = '__all__'


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'date', 'start_time', 'end_time', 'location', 
                  'description', 'image', 'is_active', 'created_at']
        read_only_fields = ['id', 'created_at']


class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'slug', 'image', 'excerpt', 'content', 
                  'author', 'published_date', 'is_published']
        read_only_fields = ['id', 'published_date']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'created_at', 'status']


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'subscribed_at', 'is_active']
        read_only_fields = ['id', 'subscribed_at']


class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = ['id', 'name', 'email', 'phone', 'event_id', 'additional_info', 'registered_at']
        read_only_fields = ['id', 'registered_at']


class BloodDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodDonation
        fields = ['id', 'name', 'email', 'phone', 'blood_type', 'age', 'address', 
                  'medical_conditions', 'status', 'registered_at']
        read_only_fields = ['id', 'registered_at', 'status']
