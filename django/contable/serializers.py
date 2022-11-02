from rest_framework import serializers
from .models import *

class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = '__all__'

class DiarioSerializer(serializers.ModelSerializer):

    cuenta = CuentaSerializer(read_only=True)
    idcuenta = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Cuenta.objects.all(), source='cuenta')

    class Meta:
        model = Librodiario
        fields = ('iddiario', 'cuenta', 'idcuenta', 'fecha_registro', 'concepto', 'cargo', 'monto')
    


class PeriodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Periodo
        fields = '__all__'

class MayorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libromayor
        fields = '__all__'