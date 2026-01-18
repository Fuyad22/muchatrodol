from django.contrib import admin
from .models import (ContactMessage, NewsletterSubscriber, EventRegistration, BloodDonation, 
                     Event, NewsArticle, SiteSettings, HeroSection, AboutSection, Service,
                     TeamMember, Testimonial, Gallery, FAQ)

# Customize admin site
admin.site.site_header = 'Student Organization Admin'
admin.site.site_title = 'Student Org Admin Portal'
admin.site.index_title = 'Welcome to Student Organization Administration'


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Basic Information', {
            'fields': ('site_name', 'site_tagline', 'logo', 'favicon')
        }),
        ('Contact Information', {
            'fields': ('email', 'phone', 'address')
        }),
        ('Social Media', {
            'fields': ('facebook', 'twitter', 'instagram', 'linkedin')
        }),
        ('Footer', {
            'fields': ('footer_text',)
        }),
    )
    
    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'order']
    list_filter = ['is_active']
    search_fields = ['title', 'subtitle']
    actions = ['activate', 'deactivate']
    
    def activate(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f'{queryset.count()} items activated.')
    activate.short_description = 'Activate selected'
    
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f'{queryset.count()} items deactivated.')
    deactivate.short_description = 'Deactivate selected'


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Heading', {
            'fields': ('heading', 'subheading')
        }),
        ('Content', {
            'fields': ('content', 'image')
        }),
        ('Mission & Vision', {
            'fields': ('mission', 'vision', 'values')
        }),
    )
    
    def has_add_permission(self, request):
        return not AboutSection.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'is_active', 'order']
    list_filter = ['is_active']
    search_fields = ['title', 'description']
    actions = ['activate', 'deactivate']
    
    def activate(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f'{queryset.count()} items activated.')
    activate.short_description = 'Activate selected'
    
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f'{queryset.count()} items deactivated.')
    deactivate.short_description = 'Deactivate selected'


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'email', 'is_active', 'order']
    list_filter = ['position', 'is_active']
    search_fields = ['name', 'email', 'bio']
    actions = ['activate', 'deactivate']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'position', 'bio', 'photo')
        }),
        ('Contact', {
            'fields': ('email', 'phone')
        }),
        ('Social Media', {
            'fields': ('facebook', 'twitter', 'linkedin')
        }),
        ('Display', {
            'fields': ('is_active', 'order')
        }),
    )
    
    def activate(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f'{queryset.count()} items activated.')
    activate.short_description = 'Activate selected'
    
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f'{queryset.count()} items deactivated.')
    deactivate.short_description = 'Deactivate selected'


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'rating', 'is_active', 'created_at', 'order']
    list_filter = ['is_active', 'rating', 'created_at']
    search_fields = ['name', 'role', 'content']
    actions = ['activate', 'deactivate']
    
    def activate(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f'{queryset.count()} items activated.')
    activate.short_description = 'Activate selected'
    
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f'{queryset.count()} items deactivated.')
    deactivate.short_description = 'Deactivate selected'


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_active', 'created_at', 'order']
    list_filter = ['is_active', 'category', 'created_at']
    search_fields = ['title', 'description', 'category']
    actions = ['activate', 'deactivate']
    
    def activate(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f'{queryset.count()} items activated.')
    activate.short_description = 'Activate selected'
    
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f'{queryset.count()} items deactivated.')
    deactivate.short_description = 'Deactivate selected'


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'category', 'is_active', 'order']
    list_filter = ['is_active', 'category', 'created_at']
    search_fields = ['question', 'answer', 'category']
    actions = ['activate', 'deactivate']
    
    def activate(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f'{queryset.count()} items activated.')
    activate.short_description = 'Activate selected'
    
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f'{queryset.count()} items deactivated.')
    deactivate.short_description = 'Deactivate selected'


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'location', 'is_active', 'created_at']
    list_filter = ['is_active', 'date', 'created_at']
    search_fields = ['title', 'location', 'description']
    readonly_fields = ['created_at']
    ordering = ['-date']
    list_per_page = 20
    date_hierarchy = 'date'
    actions = ['mark_active', 'mark_inactive']
    
    fieldsets = (
        ('Event Information', {
            'fields': ('title', 'date', 'start_time', 'end_time', 'location')
        }),
        ('Details', {
            'fields': ('description', 'image')
        }),
        ('Status', {
            'fields': ('is_active', 'created_at')
        }),
    )
    
    def mark_active(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f'{queryset.count()} events marked as active.')
    mark_active.short_description = 'Mark selected events as active'
    
    def mark_inactive(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f'{queryset.count()} events marked as inactive.')
    mark_inactive.short_description = 'Mark selected events as inactive'


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'is_published', 'published_date']
    list_filter = ['is_published', 'published_date', 'author']
    search_fields = ['title', 'excerpt', 'content', 'author']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['published_date']
    ordering = ['-published_date']
    list_per_page = 20
    date_hierarchy = 'published_date'
    actions = ['publish_articles', 'unpublish_articles']
    
    fieldsets = (
        ('Article Information', {
            'fields': ('title', 'slug', 'author')
        }),
        ('Content', {
            'fields': ('excerpt', 'content', 'image')
        }),
        ('Publishing', {
            'fields': ('is_published', 'published_date')
        }),
    )
    
    def publish_articles(self, request, queryset):
        queryset.update(is_published=True)
        self.message_user(request, f'{queryset.count()} articles published.')
    publish_articles.short_description = 'Publish selected articles'
    
    def unpublish_articles(self, request, queryset):
        queryset.update(is_published=False)
        self.message_user(request, f'{queryset.count()} articles unpublished.')
    unpublish_articles.short_description = 'Unpublish selected articles'


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    list_per_page = 25
    date_hierarchy = 'created_at'
    actions = ['mark_as_read', 'mark_as_replied', 'mark_as_archived']
    
    fieldsets = (
        ('Sender Information', {
            'fields': ('name', 'email')
        }),
        ('Message', {
            'fields': ('subject', 'message')
        }),
        ('Status', {
            'fields': ('status', 'created_at')
        }),
    )
    
    def mark_as_read(self, request, queryset):
        queryset.update(status='read')
        self.message_user(request, f'{queryset.count()} messages marked as read.')
    mark_as_read.short_description = 'Mark as read'
    
    def mark_as_replied(self, request, queryset):
        queryset.update(status='replied')
        self.message_user(request, f'{queryset.count()} messages marked as replied.')
    mark_as_replied.short_description = 'Mark as replied'
    
    def mark_as_archived(self, request, queryset):
        queryset.update(status='archived')
        self.message_user(request, f'{queryset.count()} messages archived.')
    mark_as_archived.short_description = 'Archive selected messages'


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'is_active', 'subscribed_at']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['email']
    readonly_fields = ['subscribed_at']
    ordering = ['-subscribed_at']
    list_per_page = 50
    date_hierarchy = 'subscribed_at'
    actions = ['activate_subscribers', 'deactivate_subscribers']
    
    def activate_subscribers(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f'{queryset.count()} subscribers activated.')
    activate_subscribers.short_description = 'Activate selected subscribers'
    
    def deactivate_subscribers(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f'{queryset.count()} subscribers deactivated.')
    deactivate_subscribers.short_description = 'Deactivate selected subscribers'
    
    def export_emails(self, request, queryset):
        emails = ', '.join([sub.email for sub in queryset])
        self.message_user(request, f'Emails: {emails}')
    export_emails.short_description = 'Export selected emails'


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'event_id', 'registered_at']
    list_filter = ['event_id', 'registered_at']
    search_fields = ['name', 'email', 'event_id', 'phone']
    readonly_fields = ['registered_at']
    ordering = ['-registered_at']
    list_per_page = 30
    date_hierarchy = 'registered_at'
    actions = ['export_registrations']
    
    fieldsets = (
        ('Participant Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Event Details', {
            'fields': ('event_id', 'additional_info')
        }),
        ('Registration Info', {
            'fields': ('registered_at',)
        }),
    )
    
    def export_registrations(self, request, queryset):
        count = queryset.count()
        self.message_user(request, f'{count} registrations selected for export.')
    export_registrations.short_description = 'Export selected registrations'


@admin.register(BloodDonation)
class BloodDonationAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'blood_type', 'age', 'status', 'registered_at']
    list_filter = ['blood_type', 'status', 'registered_at']
    search_fields = ['name', 'email', 'phone', 'blood_type']
    readonly_fields = ['registered_at']
    ordering = ['-registered_at']
    list_per_page = 30
    date_hierarchy = 'registered_at'
    actions = ['mark_confirmed', 'mark_completed', 'mark_cancelled']
    
    fieldsets = (
        ('Donor Information', {
            'fields': ('name', 'email', 'phone', 'age')
        }),
        ('Blood Details', {
            'fields': ('blood_type', 'medical_conditions')
        }),
        ('Location', {
            'fields': ('address',)
        }),
        ('Status & Date', {
            'fields': ('status', 'registered_at')
        }),
    )
    
    def mark_confirmed(self, request, queryset):
        queryset.update(status='confirmed')
        self.message_user(request, f'{queryset.count()} donations confirmed.')
    mark_confirmed.short_description = 'Mark as confirmed'
    
    def mark_completed(self, request, queryset):
        queryset.update(status='completed')
        self.message_user(request, f'{queryset.count()} donations completed.')
    mark_completed.short_description = 'Mark as completed'
    
    def mark_cancelled(self, request, queryset):
        queryset.update(status='cancelled')
        self.message_user(request, f'{queryset.count()} donations cancelled.')
    mark_cancelled.short_description = 'Mark as cancelled'

