from rest_framework import serializers
from .models import *


class RelatedFieldAlternative(serializers.PrimaryKeyRelatedField):
    def __init__(self, **kwargs):
        self.serializer = kwargs.pop('serializer', None)
        if self.serializer is not None and not issubclass(self.serializer, serializers.Serializer):
            raise TypeError('"serializer" is not a valid serializer class')

        super().__init__(**kwargs)

    def use_pk_only_optimization(self):
        return False if self.serializer else True

    def to_representation(self, instance):
        if self.serializer:
            return self.serializer(instance, context=self.context).data
        return super().to_representation(instance)


class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = '__all__'


class DiarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Librodiario
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
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
