from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    color = models.CharField(max_length = 50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length= 17, unique=True)
    model = models.CharField(max_length=50)

    def __str__(self):
        return self.vin

class CustomerVO(models.Model):
    name = models.CharField(max_length=50)


class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class ServiceAppoitment(models.Model):
    vin = models.CharField(max_length = 17, unique=True)
    owner_name = models.EmailField(max_length=50)
    reason = models.TextField(max_length=50)
    date = models.DateField()
    time = models.TimeField()
    technician = models.ForeignKey(Technician, related_name = 'Technician', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
