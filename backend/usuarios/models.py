from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    class Rol(models.TextChoices):
        ADMIN = 'ADMIN', 'Administrador'
        USER = 'USER', 'Usuario'

    rol = models.CharField(
        max_length=10,
        choices=Rol.choices,
        default=Rol.USER,
    )

    def __str__(self):
        return self.username
