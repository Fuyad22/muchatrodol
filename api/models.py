from django.db import models
from django.utils import timezone


class Event(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=255)
    description = models.TextField()
    image = models.CharField(max_length=500, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    show_in_slider = models.BooleanField(default=False, help_text="Show this event in the homepage slider")
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['date', 'start_time']
    
    def __str__(self):
        return f"{self.title} - {self.date}"


class NewsArticle(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    image = models.CharField(max_length=500)
    excerpt = models.TextField()
    content = models.TextField()
    author = models.CharField(max_length=100, default='Admin')
    published_date = models.DateTimeField(default=timezone.now)
    is_published = models.BooleanField(default=True)
    show_in_slider = models.BooleanField(default=False, help_text="Show this article in the homepage slider")
    
    class Meta:
        ordering = ['-published_date']
    
    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('read', 'Read'),
        ('replied', 'Replied'),
        ('archived', 'Archived'),
    ]
    
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-subscribed_at']
    
    def __str__(self):
        return self.email


class EventRegistration(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    event_id = models.CharField(max_length=255)
    additional_info = models.TextField(blank=True, null=True)
    registered_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-registered_at']
    
    def __str__(self):
        return f"{self.name} - {self.event_id}"


class BloodDonation(models.Model):
    BLOOD_TYPE_CHOICES = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    blood_type = models.CharField(max_length=3, choices=BLOOD_TYPE_CHOICES)
    age = models.IntegerField()
    address = models.TextField()
    medical_conditions = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    registered_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-registered_at']
    
    def __str__(self):
        return f"{self.name} - {self.blood_type}"


class SiteSettings(models.Model):
    site_name = models.CharField(max_length=255, default='Student Organization')
    site_tagline = models.CharField(max_length=255, default='Empowering Students, Building Communities')
    logo = models.CharField(max_length=500, blank=True, null=True, help_text='URL to logo image')
    favicon = models.CharField(max_length=500, blank=True, null=True, help_text='URL to favicon')
    email = models.EmailField(default='info@studentorg.com')
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    footer_text = models.TextField(default='© 2026 Student Organization. All rights reserved.')
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'
    
    def __str__(self):
        return self.site_name
    
    def save(self, *args, **kwargs):
        if not self.pk and SiteSettings.objects.exists():
            # Ensure only one instance exists
            return SiteSettings.objects.first()
        return super().save(*args, **kwargs)


class HeroSection(models.Model):
    title = models.CharField(max_length=255, default='Welcome to Our Student Organization')
    subtitle = models.TextField(default='Join us in making a difference in our community')
    background_image = models.CharField(max_length=500, blank=True, null=True)
    cta_text = models.CharField(max_length=100, default='Get Involved')
    cta_link = models.CharField(max_length=255, default='#about')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Hero Section'
        verbose_name_plural = 'Hero Sections'
    
    def __str__(self):
        return self.title


class AboutSection(models.Model):
    heading = models.CharField(max_length=255, default='About Us')
    subheading = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField()
    image = models.CharField(max_length=500, blank=True, null=True)
    mission = models.TextField(blank=True, null=True)
    vision = models.TextField(blank=True, null=True)
    values = models.TextField(blank=True, null=True, help_text='Enter values separated by new lines')
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'About Section'
        verbose_name_plural = 'About Section'
    
    def __str__(self):
        return self.heading


class Service(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon = models.CharField(max_length=100, help_text='Font Awesome icon class (e.g., fas fa-users)')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Service/Feature'
        verbose_name_plural = 'Services/Features'
    
    def __str__(self):
        return self.title


class TeamMember(models.Model):
    POSITION_CHOICES = [
        ('president', 'President'),
        ('vice_president', 'Vice President'),
        ('secretary', 'Secretary'),
        ('treasurer', 'Treasurer'),
        ('event_coordinator', 'Event Coordinator'),
        ('public_relations', 'Public Relations'),
        ('member', 'Member'),
        ('advisor', 'Advisor'),
    ]
    
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=50, choices=POSITION_CHOICES)
    bio = models.TextField(blank=True, null=True)
    achievements = models.TextField(blank=True, null=True)
    photo = models.CharField(max_length=500, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'
    
    def __str__(self):
        return f"{self.name} - {self.get_position_display()}"


class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255, help_text='e.g., Student, Alumni, Member')
    content = models.TextField()
    photo = models.CharField(max_length=500, blank=True, null=True)
    rating = models.IntegerField(default=5, choices=[(i, i) for i in range(1, 6)])
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'
    
    def __str__(self):
        return f"{self.name} - {self.role}"


class Gallery(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.CharField(max_length=500)
    category = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    show_in_slider = models.BooleanField(default=False, help_text="Show this image in the homepage slider")
    created_at = models.DateTimeField(default=timezone.now)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Gallery Image'
        verbose_name_plural = 'Gallery'
    
    def __str__(self):
        return self.title


class FAQ(models.Model):
    question = models.CharField(max_length=500)
    answer = models.TextField()
    category = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'
    
    def __str__(self):
        return self.question
