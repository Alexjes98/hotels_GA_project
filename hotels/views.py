from rest_framework import viewsets
from .serializers import HotelSerializer
from .models import Hotel
from django.http import HttpResponse, JsonResponse
import asyncio


from .scripts import hotels_algorithm

import firebase
from dotenv import load_dotenv
import os
import traceback

load_dotenv()

firebaseConfig = {
  'apiKey': os.getenv("API_KEY"),
  'authDomain': os.getenv("AUTH_DOMAIN"),
  'databaseURL': os.getenv("DATABASE_URL"),
  'projectId': os.getenv("PROJECT_ID"),
  'storageBucket': os.getenv("STORAGE_BUCKET"),
  'messagingSenderId': os.getenv("MESSAGING_SENDER_ID"),
  'appId': os.getenv("APP_ID")
}

def test(request):
    return HttpResponse("Hello, world. You're at the polls index.")
# Create your views here.
def get_zone_content(request):
    zone_id = request.GET.get('zone_id') if request.GET.get('zone_id') is not None else "zone_cartagena"
    try:
        app = firebase.initialize_app(firebaseConfig)
        db = app.firestore().collection("hotels")
        document = db.document(zone_id)
        zone = document.get()
        hotels = zone['hotels']
    except Exception:
        traceback.print_exc() 
        return JsonResponse({"hotels": []})
    return JsonResponse({"hotels": hotels })

def generate_data(request):
    return HttpResponse("Data generated")

def get_recommendation(request):
    zone_id = request.GET.get('zone_id') if request.GET.get('zone_id') is not None else "zone_cartagena"    
    num_recommendations = request.GET.get('num_recommendations') if request.GET.get('num_recommendations') is not None else 5
    sustainable_trip = request.GET.get('sustainable_trip') if request.GET.get('sustainable_trip') is not None else False
    accept_pay_cards = request.GET.get('accept_pay_cards') if request.GET.get('accept_pay_cards') is not None else False
    accept_cash = request.GET.get('accept_cash') if request.GET.get('accept_cash') is not None else False
    security_cameras = request.GET.get('security_cameras') if request.GET.get('security_cameras') is not None else False
    includes_breakfast = request.GET.get('includes_breakfast') if request.GET.get('includes_breakfast') is not None else False
    english = request.GET.get('english') if request.GET.get('english') is not None else False
    try:        
        num_recommendations = int(num_recommendations)
        app = firebase.initialize_app(firebaseConfig)
        db = app.firestore().collection("hotels")
        document = db.document(zone_id)
        zone = document.get()
        hotels = zone['hotels']
        user_preferences = {"sustainable_trip": sustainable_trip,"accept_pay_cards": accept_pay_cards,"accept_cash": accept_cash,"security_cameras": security_cameras,"includes_breakfast": includes_breakfast,"english": english}
        pop, logbook, pareto, hotel_selection = hotels_algorithm.generateRecommendation(hotels,num_recommendations,user_preferences)
    except Exception:
        traceback.print_exc() 
        return JsonResponse({"hotels": []})
    return JsonResponse({"hotels": hotel_selection })

class HotelView(viewsets.ModelViewSet):
    serializer_class = HotelSerializer
    queryset = Hotel.objects.all()
