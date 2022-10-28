"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from contable import views
from contable.views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", front, name="front"),

    path('cuentas/', views.CuentaList.as_view()),
    path('cuentas/<int:pk>/', views.CuentaDetail.as_view()),

    path('diario/', views.DiarioList.as_view()),
    path('diario/<int:pk>/', views.DiarioDetail.as_view()),

    path('mayor/', views.MayorList.as_view()),
    path('mayor/<int:pk>/', views.MayorDetail.as_view()),

    path('periodo/', views.PeriodoList.as_view()),
    path('periodo/<int:pk>/', views.PeriodoDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)