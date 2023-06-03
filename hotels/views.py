from rest_framework import viewsets
from .serializers import HotelSerializer
from .models import Hotel
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import uuid
import json

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

app = firebase.initialize_app(firebaseConfig)
DEFAULT_ZONE_ID = "zone_cartagena"

def test(request):
    return HttpResponse("Hello, world. You're at the polls index.")
@csrf_exempt
def hotel_request(request):
    if request.method == 'GET':
        return get_hotel(request)
    if request.method == 'POST':
        return add_hotel(request)
    if request.method == 'PUT':
        return modify_hotel(request)
    if request.method == 'DELETE':
        return delete_hotel(request)
    return JsonResponse({"Not Found": []})

def fix(request):
    zone_id = request.GET.get('zone_id') if request.GET.get('zone_id') is not None else DEFAULT_ZONE_ID
    try:
        db = app.firestore().collection("hotels").document(zone_id)
        doc = db.get()
        hotels = doc['hotels']
        for hotel in hotels:
            hotel['id'] = str(uuid.uuid4())
        app.firestore().collection("hotels").document(zone_id).update({"hotels": hotels})
        return JsonResponse({"Fixed": hotels})
    except Exception:
        traceback.print_exc() 
        return JsonResponse({"Error": []})
    
def get_hotel(request):
    zone_id = request.GET.get('zone_id') if request.GET.get('zone_id') is not None else DEFAULT_ZONE_ID
    hotel_id = request.GET.get('hotel_id')
    try:
        db = app.firestore().collection("hotels").document(zone_id)
        doc = db.get()
        hotels = doc['hotels']
        hotel = next((hotel for hotel in hotels if hotel['id'] == hotel_id), None)
        if hotel:
            return JsonResponse({"hotel": hotel})
    except Exception:
        traceback.print_exc() 
        return JsonResponse({"Get Error": []})
    return JsonResponse({"Hotel not found": {}})

def add_hotel(request):
    zone_id = request.GET.get('zone_id') if request.GET.get('zone_id') is not None else "zone_cartagena"
    try:
        data = json.loads(request.body)
        db = app.firestore().collection("hotels").document(zone_id)
        doc = db.get()
        hotels = doc['hotels']
        modify = data['hotel']
        modify['id'] = str(uuid.uuid4())
        hotels.append(modify)
        app.firestore().collection("hotels").document(zone_id).update({"hotels": hotels})
        return JsonResponse({"Hotel added": modify})
    except Exception:
        traceback.print_exc() 
        return JsonResponse({"Add Error": []})

def modify_hotel(request):
    zone_id = request.GET.get('zone_id') if request.GET.get('zone_id') is not None else DEFAULT_ZONE_ID
    try:
        data = json.loads(request.body)
        db = app.firestore().collection("hotels").document(zone_id)
        doc = db.get()
        hotels = doc['hotels']
        modify = data['hotel']
        for hotel in hotels:
            if hotel['id'] == modify['id']:
                hotels.remove(hotel)
                hotels.append(modify)
                app.firestore().collection("hotels").document(zone_id).update({"hotels": hotels})
                return JsonResponse({"Hotel modified": modify})
        return JsonResponse({"Hotel not found": []})
    except Exception:
        traceback.print_exc() 
        return JsonResponse({"Error": []})

def delete_hotel(request):
    zone_id = request.GET.get('zone_id') if request.GET.get('zone_id') is not None else DEFAULT_ZONE_ID
    hotel_id = request.GET.get('hotel_id')
    try:
        db = app.firestore().collection("hotels").document(zone_id)
        doc = db.get()
        hotels = doc['hotels']
        for hotel in hotels:
            if hotel['id'] == hotel_id:
                hotels.remove(hotel)
                app.firestore().collection("hotels").document(zone_id).update({"hotels": hotels})
                return JsonResponse({"Hotel removed": hotel})
    except Exception:
        traceback.print_exc() 
        return JsonResponse({"Error": []})
    return JsonResponse({"Hotel not found": []})

@csrf_exempt
def add_zone(request):
    zone_id = request.GET.get('zone_id') if request.GET.get('zone_id') is not None else DEFAULT_ZONE_ID
    try:
        db = app.firestore().collection("hotels").document(zone_id).set({"zone_id": zone_id, "hotels": []})
    except Exception:
        traceback.print_exc() 
        return JsonResponse({"Error": []})
    return JsonResponse({"Hotel added": db})

@csrf_exempt
def modify_zone(request):
    zone_id = request.GET.get('zone_id') if request.GET.get('zone_id') is not None else DEFAULT_ZONE_ID
    try:
        db = app.firestore().collection("hotels").document(zone_id).update({"zone_id": zone_id, "hotels": []})
    except Exception:
        traceback.print_exc() 
        return JsonResponse({"Error": []})
    return JsonResponse({"Zone modified": db})

@csrf_exempt
def delete_zone(request):
    zone_id = request.GET.get('zone_id') if request.GET.get('zone_id') is not None else DEFAULT_ZONE_ID
    try:
        db = app.firestore().collection("hotels").document(zone_id).delete()
    except Exception:
        traceback.print_exc() 
        return JsonResponse({"Error": []})
    return JsonResponse({"Zone deleted": db})

def get_zone_content(request):
    zone_id = request.GET.get('zone_id') if request.GET.get('zone_id') is not None else DEFAULT_ZONE_ID
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

def get_recommendation(request):
    zone_id = request.GET.get('zone_id') if request.GET.get('zone_id') is not None else DEFAULT_ZONE_ID   
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
