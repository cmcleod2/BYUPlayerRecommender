from django.db import models
import django_extensions

# Create your models here.
class IfThen(models.Model):
    lineup = models.TextField()
    player = models.TextField()
    conf = models.DecimalField(max_digits=10, decimal_places=2)
    lift = models.DecimalField(max_digits=10, decimal_places=2)
