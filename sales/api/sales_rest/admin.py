from django.contrib import admin
from .models import Customer, Salesperson

# Register your models here.
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    pass
