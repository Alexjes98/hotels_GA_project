from django.urls import path, include
from rest_framework import routers
 # api versioning
router = routers.DefaultRouter()

urlpatters = [
    path('', include(router.urls)),
]