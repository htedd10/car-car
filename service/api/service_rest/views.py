from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import AutomobileVO, Technician, ServiceAppoitment, CustomerVO
import json

# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    properties = [
        'color',
        'year',
        'vin',
        'model'
    ]

class ServiceAppoitmentEncoder(ModelEncoder):
    properties = [
        'vin',
        'owner_name',
        'reason',
        'date',
        'time',
        'technician'
    ]

class TechnicianEncoder(ModelEncoder):
   model = Technician
   properties = [
       'name',
       'employee_number'
    ]


@require_http_methods(["GET"])
def ListAppointments(request):
    return

@require_http_methods(["GET", "POST"])
def ListServices(request):
    if request.method == "get":
        content = ServiceAppoitment.objects.all()
        return JsonResponse(
            {'content': content}
        )

    else:
        content = json.loads(request.body)
        ServiceAppoitment.objects.create(**content)
        return JsonResponse(
            content,
            encoder = ServiceAppoitmentEncoder,
        )

@require_http_methods(["GET", "POST"])
def CreateTechnician(request):
    if request.method == "GET":
        content = Technician.objects.all()
        return JsonResponse(
            content,
            encoder = TechnicianEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        Technician.objects.create(**content)
        return JsonResponse(
            content,
            encoder = TechnicianEncoder,

        )
