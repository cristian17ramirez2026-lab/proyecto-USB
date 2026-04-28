from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ActivoViewSet,
    AsignacionViewSet,
    EmpleadoViewSet,
    ReporteAsignadosView,
    ReporteDanadosView,
    ReporteDisponiblesView,
    ReportePorEmpleadoView,
)

router = DefaultRouter()
router.register('activos', ActivoViewSet)
router.register('empleados', EmpleadoViewSet)
router.register('asignaciones', AsignacionViewSet)

urlpatterns = [
    path('reportes/disponibles/', ReporteDisponiblesView.as_view(), name='reporte-disponibles'),
    path('reportes/asignados/', ReporteAsignadosView.as_view(), name='reporte-asignados'),
    path('reportes/danados/', ReporteDanadosView.as_view(), name='reporte-danados'),
    path('reportes/por-empleado/', ReportePorEmpleadoView.as_view(), name='reporte-por-empleado'),
] + router.urls
