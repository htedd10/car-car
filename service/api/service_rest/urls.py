from django.urls import path, include
from .views import ListAppointments, ListServices, CreateTechnician


urlpatterns = [
    path("technician/", CreateTechnician, name="create_technician"),
    path("services/", ListServices, name="list_services"),
]
