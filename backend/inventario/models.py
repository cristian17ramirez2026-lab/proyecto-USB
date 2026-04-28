from django.db import models


class Activo(models.Model):
    class Estado(models.TextChoices):
        DISPONIBLE = 'DISPONIBLE', 'Disponible'
        ASIGNADO = 'ASIGNADO', 'Asignado'
        DANADO = 'DAÑADO', 'Dañado'

    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    tipo = models.CharField(max_length=100)
    serial = models.CharField(max_length=100, unique=True)
    valor = models.DecimalField(max_digits=12, decimal_places=2)
    fecha_compra = models.DateField()
    estado = models.CharField(
        max_length=20,
        choices=Estado.choices,
        default=Estado.DISPONIBLE,
    )

    def __str__(self):
        return f"{self.nombre} ({self.serial})"

    class Meta:
        ordering = ['-id']


class Empleado(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    cedula = models.CharField(max_length=20, unique=True)
    departamento = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

    class Meta:
        ordering = ['-id']


class Asignacion(models.Model):
    activo = models.ForeignKey(
        Activo, on_delete=models.PROTECT, related_name='asignaciones'
    )
    empleado = models.ForeignKey(
        Empleado, on_delete=models.PROTECT, related_name='asignaciones'
    )
    fecha_asignacion = models.DateTimeField(auto_now_add=True)
    fecha_devolucion = models.DateTimeField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.activo.nombre} → {self.empleado}"

    class Meta:
        ordering = ['-fecha_asignacion']
