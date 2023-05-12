from rest_framework import serializers

class HotelSerializer(serializers.Serializer):
    class Meta:
        
        fields = '__all__'
