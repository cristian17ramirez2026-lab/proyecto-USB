from django.db import transaction
from django.db.models import Count, Q
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from usuarios.permissions import IsAdminRole

from .models import Activo, Asignacion, Empleado
from .serializers import (
    ActivoSerializer,
    AsignacionCreateSerializer,
    AsignacionSerializer,
    EmpleadoSerializer,
)


class ActivoViewSet(viewsets.ModelViewSet):
    queryset = Activo.objects.all()
    serializer_class = ActivoSerializer

    def get_permissions(self):
        if self.action == 'destroy':
            return [IsAuthenticated(), IsAdminRole()]
        return [IsAuthenticated()]

    def destroy(self, request, *args, **kwargs):
        activo = self.get_object()
        if activo.asignaciones.filter(fecha_devolucion__isnull=True).exists():
            return Response(
                {"detail": "No se puede eliminar: el activo está actualmente asignado."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().destroy(request, *args, **kwargs)


class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

    def get_permissions(self):
        if self.action == 'destroy':
            return [IsAuthenticated(), IsAdminRole()]
        return [IsAuthenticated()]

    def destroy(self, request, *args, **kwargs):
        empleado = self.get_object()
        if empleado.asignaciones.filter(fecha_devolucion__isnull=True).exists():
            return Response(
                {"detail": "No se puede eliminar: el empleado tiene activos asignados."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().destroy(request, *args, **kwargs)


class AsignacionViewSet(viewsets.ModelViewSet):
    queryset = Asignacion.objects.select_related('activo', 'empleado').all()

    def get_serializer_class(self):
        if self.action == 'create':
            return AsignacionCreateSerializer
        return AsignacionSerializer

    def get_permissions(self):
        if self.action == 'destroy':
            return [IsAuthenticated(), IsAdminRole()]
        return [IsAuthenticated()]

    def get_queryset(self):
        qs = super().get_queryset()
        empleado = self.request.query_params.get('empleado')
        activo = self.request.query_params.get('activo')
        if empleado:
            qs = qs.filter(empleado_id=empleado)
        if activo:
            qs = qs.filter(activo_id=activo)
        return qs

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = AsignacionCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        activo = serializer.validated_data['activo_id']
        empleado = serializer.validated_data['empleado_id']
        observaciones = serializer.validated_data.get('observaciones', '')
        asignacion = Asignacion.objects.create(
            activo=activo, empleado=empleado, observaciones=observaciones
        )
        activo.estado = 'ASIGNADO'
        activo.save()
        return Response(
            AsignacionSerializer(asignacion).data,
            status=status.HTTP_201_CREATED,
        )

    @action(detail=True, methods=['post'], url_path='devolver')
    @transaction.atomic
    def devolver(self, request, pk=None):
        asignacion = self.get_object()
        if asignacion.fecha_devolucion is not None:
            return Response(
                {"detail": "La devolución ya fue registrada para esta asignación."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        asignacion.fecha_devolucion = timezone.now()
        asignacion.save()
        asignacion.activo.estado = 'DISPONIBLE'
        asignacion.activo.save()
        return Response(AsignacionSerializer(asignacion).data)


class ReporteDisponiblesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        activos = Activo.objects.filter(estado='DISPONIBLE')
        serializer = ActivoSerializer(activos, many=True)
        return Response(serializer.data)


class ReporteAsignadosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        activos = Activo.objects.filter(estado='ASIGNADO')
        resultado = []
        for activo in activos:
            asignacion = Asignacion.objects.filter(
                activo=activo, fecha_devolucion__isnull=True
            ).select_related('empleado').first()
            activo_data = ActivoSerializer(activo).data
            activo_data['empleado_asignado'] = (
                EmpleadoSerializer(asignacion.empleado).data if asignacion else None
            )
            resultado.append(activo_data)
        return Response(resultado)


class ReporteDanadosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        activos = Activo.objects.filter(estado='DAÑADO')
        serializer = ActivoSerializer(activos, many=True)
        return Response(serializer.data)


class ReportePorEmpleadoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        empleados = Empleado.objects.annotate(
            activos_asignados_count=Count(
                'asignaciones',
                filter=Q(asignaciones__fecha_devolucion__isnull=True),
            )
        )
        resultado = []
        for empleado in empleados:
            empleado_data = EmpleadoSerializer(empleado).data
            empleado_data['activos_asignados_count'] = empleado.activos_asignados_count
            historial = Asignacion.objects.filter(empleado=empleado).select_related('activo')
            empleado_data['historial'] = AsignacionSerializer(historial, many=True).data
            resultado.append(empleado_data)
        return Response(resultado)
