from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import *
from decimal import Decimal


def front(request):
    context = {}
    return render(request, "index.html", context)

# -------------------------------------------------------------------------------------
# -------------------------------------------------------------------------------------


class CuentaList(APIView):
    """
    List all Cuentas, or create a new cuenta.
    """

    def get(self, request, format=None):
        cuentas = Cuenta.objects.all()
        serializer = CuentaSerializer(cuentas, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CuentaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CuentaDetail(APIView):
    """
    Retrieve, update or delete a Cuenta instance.
    """

    def get_object(self, pk):
        try:
            return Cuenta.objects.get(pk=pk)
        except Cuenta.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        cuenta = self.get_object(pk)
        serializer = CuentaSerializer(cuenta)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        cuenta = self.get_object(pk)
        serializer = CuentaSerializer(cuenta, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        cuenta = self.get_object(pk)
        cuenta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# -------------------------------------------------------------------------------------
# -------------------------------------------------------------------------------------


class DiarioList(APIView):
    """
    List all LibroDiario, or create a new LibroDiario.
    """

    def get(self, request, format=None):
        diarios = Librodiario.objects.all()
        serializer = DiarioSerializer(diarios, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DiarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            cuentaAfectada = Cuenta.objects.get(
                idcuenta=request.data['idcuenta'])
            mayorAfectado = Libromayor.objects.get(
                idcuenta=cuentaAfectada.idcuenta)
            # print(type(request.data['cargo']))

            if (request.data['cargo'] == True):
                mayorAfectado.sum_debe = mayorAfectado.sum_debe + \
                    Decimal(request.data['monto'])
                #print(cuentaAfectada.nombre_cuenta, mayorAfectado.sum_debe)
            elif (request.data['cargo'] == False):
                mayorAfectado.sum_haber = mayorAfectado.sum_haber + \
                    Decimal(request.data['monto'])

            if(mayorAfectado.sum_debe >= mayorAfectado.sum_haber):
                mayorAfectado.saldo = mayorAfectado.saldo + \
                    (mayorAfectado.sum_debe - mayorAfectado.sum_haber)
            elif (mayorAfectado.sum_debe < mayorAfectado.sum_haber):
                mayorAfectado.saldo = mayorAfectado.saldo + \
                    (mayorAfectado.sum_haber - mayorAfectado.sum_debe)

            mayorAfectado.save()
            #print(cuentaAfectada.nombre_cuenta, mayorAfectado.sum_debe)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DiarioDetail(APIView):
    """
    Retrieve, update or delete a LibroDiario instance.
    """

    def get_object(self, pk):
        try:
            return Librodiario.objects.get(pk=pk)
        except Librodiario.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        diario = self.get_object(pk)
        serializer = DiarioSerializer(diario)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        diario = self.get_object(pk)
        serializer = DiarioSerializer(diario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        diario = self.get_object(pk)
        diario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# -------------------------------------------------------------------------------------
# -------------------------------------------------------------------------------------


class PeriodoList(APIView):
    """
    List all Periodo, or create a new Periodo.
    """

    def get(self, request, format=None):
        periodo = Periodo.objects.all()
        serializer = PeriodoSerializer(periodo, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PeriodoSerializer(data=request.data)
        if serializer.is_valid():
            cerrarPeriodo()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def cerrarPeriodo():
    periodoActivo = Periodo.objects.get(activo=True)
    periodoActivo.activo = False
    periodoActivo.save()
    Librodiario.objects.all().delete()
    mayores = Libromayor.objects.all()
    for may in mayores:
        if (may.sum_debe >= may.sum_haber):
            may.sum_debe = may.saldo
            may.sum_haber = Decimal(0)
        if (may.sum_haber > may.sum_debe):
            may.sum_haber = may.saldo
            may.sum_debe = Decimal(0)
        may.save()
    return 0


class PeriodoDetail(APIView):
    """
    Retrieve, update or delete a Periodo instance.
    """

    def get_object(self, pk):
        try:
            return Periodo.objects.get(pk=pk)
        except Periodo.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        periodo = self.get_object(pk)
        serializer = PeriodoSerializer(periodo)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        periodo = self.get_object(pk)
        serializer = PeriodoSerializer(periodo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        periodo = self.get_object(pk)
        periodo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# -------------------------------------------------------------------------------------
# -------------------------------------------------------------------------------------


class MayorList(APIView):
    """
    List all LibroMayor, or create a new LibroMayor.
    """

    def get(self, request, format=None):
        mayor = Libromayor.objects.all()
        serializer = MayorSerializer(mayor, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MayorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MayorDetail(APIView):
    """
    Retrieve, update or delete a Periodo instance.
    """

    def get_object(self, pk):
        try:
            return Libromayor.objects.get(pk=pk)
        except Libromayor.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        mayor = self.get_object(pk)
        serializer = MayorSerializer(mayor)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        mayor = self.get_object(pk)
        serializer = MayorSerializer(mayor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        mayor = self.get_object(pk)
        mayor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
