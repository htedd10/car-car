from django.urls import path, include
from .views import ListAutomobileVO, api_list_technicians, api_list_service_appointments, api_show_service_appointment


urlpatterns = [
    path("automobiles/", ListAutomobileVO, name="list_automobiles"),
    path("technicians/", api_list_technicians, name="list_technicians"),
    path("services/", api_list_service_appointments, name="list_service_appointments"),
    path("services/<int:id>/", api_show_service_appointment, name="show_service_appointment")
]
