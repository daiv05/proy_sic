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
        return {
            'idiario': instance.iddiario,
            'fecha_registro': instance.fecha_registro,
            'concepto': instance.concepto,
            'cargo': instance.cargo,
            'monto': instance.monto,
            'idcuenta': instance.idcuenta.nombre_cuenta,

        }


class PeriodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Periodo
        fields = '__all__'


class MayorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libromayor
        fields = '__all__'
