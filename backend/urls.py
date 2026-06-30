"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.http import HttpResponse, FileResponse
from django.conf import settings
from django.views.static import serve
from django.conf.urls.static import static
import os

def serve_dynamic_file(request, filename, content_type):
    file_path = os.path.join(settings.BASE_DIR, filename)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Dynamically inject correct domain/URL based on request host
        host = request.build_absolute_uri('/')[:-1] # strip trailing slash
        content = content.replace('https://yourwebsite.com', host)
        
        return HttpResponse(content, content_type=content_type)
    except FileNotFoundError:
        return HttpResponse(f"File {filename} not found", status=404)

def serve_index(request):
    return serve_dynamic_file(request, 'index.html', 'text/html')

def serve_blood_donation(request):
    return serve_dynamic_file(request, 'blood_donation.html', 'text/html')

def serve_gallery(request):
    return serve_dynamic_file(request, 'gallery.html', 'text/html')

def serve_robots(request):
    return serve_dynamic_file(request, 'robots.txt', 'text/plain')

def serve_sitemap(request):
    return serve_dynamic_file(request, 'sitemap.xml', 'application/xml')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', serve_index, name='home'),
    path('index.html', serve_index, name='home-index'),
    path('blood_donation.html', serve_blood_donation, name='blood-donation-page'),
    path('gallery.html', serve_gallery, name='gallery-page'),
    path('robots.txt', serve_robots, name='robots'),
    path('sitemap.xml', serve_sitemap, name='sitemap'),
]

# Serve static files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += [
        re_path(r'^(?P<path>.*\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot))$', serve, {
            'document_root': settings.BASE_DIR,
        }),
    ]
