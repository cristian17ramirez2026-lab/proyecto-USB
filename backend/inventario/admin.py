from django.contrib import admin

from .models import Activo, Empleado, Asignacion

admin.site.register(Activo)
admin.site.register(Empleado)
admin.site.register(Asignacion)
