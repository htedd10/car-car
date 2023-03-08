from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import AutomobileVO, Technician, ServiceAppoitment
import json

# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'color',
        'year',
        'vin',
        'import_href'
    ]

class TechnicianEncoder(ModelEncoder):
   model = Technician
   properties = [
       "name",
       "employee_number",
       "id",
    ]



class ServiceAppoitmentEncoder(ModelEncoder):
    model = ServiceAppoitment
    properties = [
        "vin",
        "owner_name",
        "reason",
        "date",
        "time",
        "technician"

    ]
    encoders = {
        "technician": TechnicianEncoder()
        }

    # def get_extra_data(self, o):
    #     return {"technician" : o.technician.employee_number}


@require_http_methods(["GET", "POST"])
def ListAutomobileVO(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder = AutomobileVOEncoder
        )

@require_http_methods(["GET"])
def ListAppointments(request):
    return

@require_http_methods(["GET", "POST"])
def ListServices(request):
    if request.method == "GET":
        content = ServiceAppoitment.objects.all()
        print(content)
        return JsonResponse(
            {'Appoitments': content},
            encoder = ServiceAppoitmentEncoder,
        )
    else:
        content = json.loads(request.body)
        employee = Technician.objects.get(id=content["technician"])
        content["technician"] = employee
        Appt = ServiceAppoitment.objects.create(**content)
        try:
            Appt = ServiceAppoitment.objects.create(**content)
            return JsonResponse(
                Appt,
                encoder=ServiceAppoitmentEncoder,
                safe=False
            )
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)})



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
            safe=False

        )
