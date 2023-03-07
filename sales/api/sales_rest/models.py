from django.db import models
from django.core.validators import RegexValidator
# Create your models here.

# class AutomobileVO(models.Model):

class Salesperson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.BigIntegerField()

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number_regex = RegexValidator(regex = r"^\+?1?\d{8,15}$")
    phone_number = models.CharField(validators = [phone_number_regex], max_length = 16, unique = True)

    def __str__(self):
        return self.name

# class SalesRecord(models.Model):
