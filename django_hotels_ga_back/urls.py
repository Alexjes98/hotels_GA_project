"""
URL configuration for django_hotels_ga_back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path, include

from hotels import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('state/',views.test),
    path('recommendation/',views.get_recommendation),
    path('zones/',views.get_zones),
    path('zone/',views.get_zone_content),
    path('zone/add/',views.add_zone),
    path('zone/modify/',views.modify_zone),
    path('zone/delete/',views.delete_zone),
    path('hotel/',views.hotel_request),
    path('login/',views.login),
]
