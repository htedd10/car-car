from django.urls import path

from .views import api_list_salesperson, api_list_customers, api_list_automobilesVO, api_list_salerecords

urlpatterns = [
    path("automobiles/", api_list_automobilesVO, name="api_list_automobilesVO"),
    path("salesperson/", api_list_salesperson, name="api_list_salesperson"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("salerecords/", api_list_salerecords, name="api_list_salerecords"),
]
