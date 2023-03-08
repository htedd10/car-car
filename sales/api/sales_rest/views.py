import json
from common.json import ModelEncoder

from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import SaleRecord, AutomobileVO, Customer, Salesperson

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "name",
        "employee_number",
    ]

class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "sales_price",
    ]

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }

@require_http_methods(["GET"])
def api_list_automobilesVO(request):
    automobiles = AutomobileVO.objects.all()
    return JsonResponse(
        {"automobileVOs": automobiles},
        encoder=AutomobileVOEncoder
    )

@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_salerecords(request):
    if request.method == "GET":
        salerecords = SaleRecord.objects.all()
        return JsonResponse(
            {"Salerecords": salerecords},
            encoder=SaleRecordEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        sold_inventory = []
        salerecords = SaleRecord.objects.all()
        for salerecord in salerecords:
            sold_inventory.append(salerecord.automobile.vin)
        if content["automobile"] not in sold_inventory:
            try:
                automobile = AutomobileVO.objects.get(vin=content["automobile"])
                content["automobile"] = automobile
            except AutomobileVO.DoesNotExist:
                return JsonResponse(
                    {"Automobile": "Invalid automobile VIN"},
                    status=400
                )
        else:
            return JsonResponse(
                {"Automobile": "Vehicle VIN has been sold already"},
                status=400
            )
        try:
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"Salesperson": "Invalid salesperson ID"},
                status=400
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"Customer": "Invalid customer ID"},
                status=400
            )
        salerecord = SaleRecord.objects.create(**content)
        return JsonResponse(
            salerecord,
            encoder=SaleRecordEncoder,
            safe=False,
        )
