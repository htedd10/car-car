from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.BigIntegerField(unique=True)

    def __str__(self):
        return self.name


class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17)
    owner_name = models.EmailField(max_length=50)
    reason = models.TextField(max_length=100)
    date = models.DateTimeField()
    technician = models.ForeignKey(
        Technician,
        related_name = 'Technician',
        on_delete=models.PROTECT
    )
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.vin
