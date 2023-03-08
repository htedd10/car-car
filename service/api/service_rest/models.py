from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    color = models.CharField(max_length = 50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length= 17, unique=True)
    import_href = models.CharField(max_length=50)


    def __str__(self):
        return self.import_href



class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    # def __int__(self):
    #     return self.id
    def __str__(self):
        return self.name



class ServiceAppoitment(models.Model):
    vin = models.CharField(max_length = 17)
    owner_name = models.EmailField(max_length=50)
    reason = models.TextField(max_length=50)
    date = models.DateTimeField()
    time = models.DateTimeField()
    technician = models.ForeignKey(Technician, related_name = 'Technician', on_delete=models.CASCADE)

    def __str__(self):
        return self.owner_name
