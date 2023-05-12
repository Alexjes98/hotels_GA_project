from rest_framework import viewsets
from .serializers import HotelSerializer
from .models import Hotel
from django.http import HttpResponse, JsonResponse
import asyncio


from .scripts import hotels_algorithm

import firebase, json
from dotenv import load_dotenv
import os

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
def get_recommendation(request, num_recommendations):
    try:
        print(firebaseConfig,"CONFIG")
        num_recommendations = num_recommendations if num_recommendations is not None else 5
        num_recommendations = int(num_recommendations)
        app = firebase.initialize_app(firebaseConfig)
        db = app.firestore().collection("hotels")
        document = db.document("zone_cartagena")
        zone = document.get()
        hotels = zone['hotels']
        distances = zone['distances']
        distances = json.loads(distances)
        pop, logbook, pareto, hotel_selection = hotels_algorithm.generateRecommendation(hotels,distances,num_recommendations)
    except:
        
        return JsonResponse({"hotels": []})
    return JsonResponse({"hotels": hotel_selection})

class HotelView(viewsets.ModelViewSet):
    serializer_class = HotelSerializer
    queryset = Hotel.objects.all()
