from django.test import TestCase
from usuarios.models import Usuario
from usuarios.serializers import RegisterSerializer, UserSerializer


class RegisterSerializerTest(TestCase):

    def test_valid_registration(self):
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'securepass123',
            'password_confirm': 'securepass123',
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.rol, Usuario.Rol.USER)
        self.assertTrue(user.check_password('securepass123'))

    def test_duplicate_username_rejected(self):
        Usuario.objects.create_user(username='existing', email='a@b.com', password='pass1234')
        data = {
            'username': 'existing',
            'email': 'new@example.com',
            'password': 'securepass123',
            'password_confirm': 'securepass123',
        }
        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('username', serializer.errors)

    def test_duplicate_email_rejected(self):
        Usuario.objects.create_user(username='user1', email='dup@example.com', password='pass1234')
        data = {
            'username': 'newuser',
            'email': 'dup@example.com',
            'password': 'securepass123',
            'password_confirm': 'securepass123',
        }
        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

    def test_short_password_rejected(self):
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'short',
            'password_confirm': 'short',
        }
        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)

    def test_password_mismatch_rejected(self):
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'securepass123',
            'password_confirm': 'differentpass',
        }
        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('password_confirm', serializer.errors)

    def test_password_fields_are_write_only(self):
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'securepass123',
            'password_confirm': 'securepass123',
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        # password and password_confirm should not appear in serializer.data
        self.assertNotIn('password', serializer.data)
        self.assertNotIn('password_confirm', serializer.data)


class UserSerializerTest(TestCase):

    def test_serializes_user_data(self):
        user = Usuario.objects.create_user(
            username='admin1', email='admin@test.com', password='pass1234',
            rol=Usuario.Rol.ADMIN,
        )
        serializer = UserSerializer(user)
        self.assertEqual(serializer.data['id'], user.id)
        self.assertEqual(serializer.data['username'], 'admin1')
        self.assertEqual(serializer.data['email'], 'admin@test.com')
        self.assertEqual(serializer.data['rol'], 'ADMIN')

    def test_fields_are_read_only(self):
        serializer = UserSerializer()
        for field_name in ['id', 'username', 'email', 'rol']:
            self.assertTrue(serializer.fields[field_name].read_only)
