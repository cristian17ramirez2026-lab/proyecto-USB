from django.test import TestCase, RequestFactory
from rest_framework.views import APIView

from usuarios.models import Usuario
from usuarios.permissions import IsAdminRole


class IsAdminRoleTest(TestCase):

    def setUp(self):
        self.factory = RequestFactory()
        self.permission = IsAdminRole()
        self.view = APIView()
        self.admin_user = Usuario.objects.create_user(
            username='admin', email='admin@test.com',
            password='adminpass123', rol=Usuario.Rol.ADMIN,
        )
        self.regular_user = Usuario.objects.create_user(
            username='user', email='user@test.com',
            password='userpass123', rol=Usuario.Rol.USER,
        )

    def test_admin_user_has_permission(self):
        request = self.factory.get('/')
        request.user = self.admin_user
        self.assertTrue(self.permission.has_permission(request, self.view))

    def test_regular_user_denied(self):
        request = self.factory.get('/')
        request.user = self.regular_user
        self.assertFalse(self.permission.has_permission(request, self.view))

    def test_unauthenticated_user_denied(self):
        from django.contrib.auth.models import AnonymousUser
        request = self.factory.get('/')
        request.user = AnonymousUser()
        self.assertFalse(self.permission.has_permission(request, self.view))

    def test_permission_message(self):
        self.assertEqual(
            self.permission.message,
            "Solo los administradores pueden realizar esta acción.",
        )
