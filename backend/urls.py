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

def serve_index(request):
    index_path = os.path.join(settings.BASE_DIR, 'index.html')
    return FileResponse(open(index_path, 'rb'), content_type='text/html')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

# Serve static files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += [
        re_path(r'^(?P<path>.*\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot))$', serve, {
            'document_root': settings.BASE_DIR,
        }),
        path('index.html', serve_index, name='home-index'),
        path('', serve_index, name='home'),
    ]
