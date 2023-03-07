from django.db import models
from django.core.validators import RegexValidator
# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

class Salesperson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.BigIntegerField()

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number_regex = RegexValidator(regex = r"^\+?1?\d{8,15}$")
    phone_number = models.CharField(validators = [phone_number_regex], max_length = 16, unique = True)

    def __str__(self):
        return self.name

class Salerecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="salerecords",
        on_delete=models.CASCADE
        )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="+",
        on_delete=models.CASCADE
    )
    sales_price = models.BigIntegerField()
