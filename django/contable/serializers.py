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

    def to_representation(self, instance):
        response = super().to_representation(instance);
        response['idcuenta'] = CuentaSerializer(instance.idcuenta).data
        return response


class PeriodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Periodo
        fields = '__all__'


class MayorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libromayor
        fields = '__all__'
