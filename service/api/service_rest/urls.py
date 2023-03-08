from django.urls import path, include
from .views import ListAppointments, ListServices, CreateTechnician, ListAutomobileVO


urlpatterns = [
    path("technician/", CreateTechnician, name="create_technician"),
    path("services/", ListServices, name="list_services"),
    path("autos/", ListAutomobileVO, name="list_automobiles"),
]
