from rest_framework import serializers

from .models import Activo, Asignacion, Empleado


class ActivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activo
        fields = ['id', 'nombre', 'descripcion', 'tipo', 'serial', 'valor', 'fecha_compra', 'estado']
        read_only_fields = ['id']

    def validate_serial(self, value):
        """Validate serial uniqueness, excluding current instance on update."""
        qs = Activo.objects.filter(serial=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("Ya existe un activo con este serial.")
        return value

    def validate_valor(self, value):
        """Validate valor is a positive number."""
        if value is not None and value <= 0:
            raise serializers.ValidationError("El valor debe ser un número positivo.")
        return value

    def validate_estado(self, value):
        """Validate estado is one of the allowed values."""
        allowed = [choice[0] for choice in Activo.Estado.choices]
        if value not in allowed:
            raise serializers.ValidationError(
                f"Estado inválido. Los valores permitidos son: {', '.join(allowed)}."
            )
        return value


class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = ['id', 'nombre', 'apellido', 'cedula', 'departamento', 'cargo']
        read_only_fields = ['id']

    def validate_cedula(self, value):
        """Validate cedula uniqueness, excluding current instance on update."""
        qs = Empleado.objects.filter(cedula=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("Ya existe un empleado con esta cédula.")
        return value


class AsignacionSerializer(serializers.ModelSerializer):
    activo = ActivoSerializer(read_only=True)
    empleado = EmpleadoSerializer(read_only=True)

    class Meta:
        model = Asignacion
        fields = ['id', 'activo', 'empleado', 'fecha_asignacion', 'fecha_devolucion', 'observaciones']
        read_only_fields = ['fecha_asignacion', 'fecha_devolucion']


class AsignacionCreateSerializer(serializers.Serializer):
    activo_id = serializers.PrimaryKeyRelatedField(queryset=Activo.objects.all())
    empleado_id = serializers.PrimaryKeyRelatedField(queryset=Empleado.objects.all())
    observaciones = serializers.CharField(required=False, allow_blank=True)

    def validate_activo_id(self, value):
        if value.estado == 'DAÑADO':
            raise serializers.ValidationError("No se pueden asignar activos con estado DAÑADO.")
        if value.estado == 'ASIGNADO':
            raise serializers.ValidationError("El activo ya está asignado a otro empleado.")
        if value.estado != 'DISPONIBLE':
            raise serializers.ValidationError("Solo se pueden asignar activos con estado DISPONIBLE.")
        return value
