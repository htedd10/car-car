from django.urls import path

from .views import api_list_salesperson, api_list_customers, api_list_automobilesVO, api_list_salerecords, api_show_salesperson, api_show_customer, api_show_salerecord

urlpatterns = [
    path("automobiles/", api_list_automobilesVO, name="api_list_automobilesVO"),
    path("salesperson/", api_list_salesperson, name="api_list_salesperson"),
    path("salesperson/<int:id>/", api_show_salesperson, name="api_show_salesperson"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:id>/", api_show_customer, name="api_show_customer"),
    path("salerecords/", api_list_salerecords, name="api_list_salerecords"),
    path("salerecords/<int:id>/", api_show_salerecord, name="api_show_salerecord")
]
