from rest_framework import serializers
from .models import *

class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = '__all__'

class DiarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Librodiario
        fields = '__all__'