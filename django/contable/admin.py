from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Cuenta)
admin.site.register(Librodiario)
admin.site.register(Libromayor)
admin.site.register(Cliente)
admin.site.register(Proveedor)
admin.site.register(Periodo)
admin.site.register(Usuario)