from datetime import date
from decimal import Decimal

from django.test import TestCase, override_settings

from inventario.models import Activo
from inventario.serializers import ActivoSerializer

TEST_DB = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
    }
}


@override_settings(DATABASES=TEST_DB)
class ActivoSerializerTest(TestCase):
    def setUp(self):
        self.valid_data = {
            'nombre': 'Laptop Dell',
            'descripcion': 'Laptop de trabajo',
            'tipo': 'Computador',
            'serial': 'SN-001',
            'valor': '1500.00',
            'fecha_compra': '2024-01-15',
            'estado': 'DISPONIBLE',
        }

    def test_valid_data_creates_activo(self):
        serializer = ActivoSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_id_is_read_only(self):
        serializer = ActivoSerializer(data={**self.valid_data, 'id': 999})
        self.assertTrue(serializer.is_valid(), serializer.errors)
        activo = serializer.save()
        self.assertNotEqual(activo.id, 999)

    def test_duplicate_serial_rejected_on_create(self):
        Activo.objects.create(
            nombre='Otro', tipo='Otro', serial='SN-001',
            valor=Decimal('100.00'), fecha_compra=date(2024, 1, 1),
        )
        serializer = ActivoSerializer(data=self.valid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('serial', serializer.errors)
        self.assertEqual(
            serializer.errors['serial'][0],
            'Ya existe un activo con este serial.',
        )

    def test_duplicate_serial_allowed_on_update_same_instance(self):
        activo = Activo.objects.create(
            nombre='Laptop', tipo='Computador', serial='SN-001',
            valor=Decimal('1500.00'), fecha_compra=date(2024, 1, 15),
        )
        serializer = ActivoSerializer(activo, data=self.valid_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_duplicate_serial_rejected_on_update_different_instance(self):
        Activo.objects.create(
            nombre='Otro', tipo='Otro', serial='SN-001',
            valor=Decimal('100.00'), fecha_compra=date(2024, 1, 1),
        )
        activo2 = Activo.objects.create(
            nombre='Segundo', tipo='Otro', serial='SN-002',
            valor=Decimal('200.00'), fecha_compra=date(2024, 1, 1),
        )
        data = {**self.valid_data, 'serial': 'SN-001'}
        serializer = ActivoSerializer(activo2, data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('serial', serializer.errors)

    def test_negative_valor_rejected(self):
        data = {**self.valid_data, 'valor': '-100.00'}
        serializer = ActivoSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('valor', serializer.errors)
        self.assertEqual(
            serializer.errors['valor'][0],
            'El valor debe ser un número positivo.',
        )

    def test_zero_valor_rejected(self):
        data = {**self.valid_data, 'valor': '0.00'}
        serializer = ActivoSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('valor', serializer.errors)

    def test_positive_valor_accepted(self):
        data = {**self.valid_data, 'valor': '0.01'}
        serializer = ActivoSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_invalid_estado_rejected(self):
        data = {**self.valid_data, 'estado': 'INVALIDO'}
        serializer = ActivoSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('estado', serializer.errors)

    def test_all_valid_estados_accepted(self):
        for estado in ['DISPONIBLE', 'ASIGNADO', 'DAÑADO']:
            data = {**self.valid_data, 'estado': estado, 'serial': f'SN-{estado}'}
            serializer = ActivoSerializer(data=data)
            self.assertTrue(serializer.is_valid(), f"Estado {estado} should be valid: {serializer.errors}")

    def test_serializer_includes_all_fields(self):
        expected_fields = {'id', 'nombre', 'descripcion', 'tipo', 'serial', 'valor', 'fecha_compra', 'estado'}
        serializer = ActivoSerializer()
        self.assertEqual(set(serializer.fields.keys()), expected_fields)
