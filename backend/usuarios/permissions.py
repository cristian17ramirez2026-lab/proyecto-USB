from rest_framework.permissions import BasePermission


class IsAdminRole(BasePermission):
    """
    Permite acceso solo a usuarios con rol ADMIN.
    """
    message = "Solo los administradores pueden realizar esta acción."

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'ADMIN'
