from django.contrib import admin
from .models import AutomobileVO, Technician, ServiceAppoitment

# Register your models here.

# @admin.site.register(AutomobileVO)
# class AutomobileVOAdmin(admin.ModelAdmin):
#     list_display = ('color', 'year', 'vin', 'model')


# @admin.site.register(Technician)
# class TechnicianAdmin(admin.ModelAdmin):
#     list_display = ('name', 'employee_number')

# @admin.site.register(ServiceAppoitment)
# class ServiceAppoitmentAdmin(admin.ModelAdmin):
#     list_display = ('vin', 'owner_name', 'reason', 'date', 'time', 'technician')
