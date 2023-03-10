from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import AutomobileVO, Technician, ServiceAppoitment
import json


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
        "technician",
        "cancelled",
        "completed",
        "id"

    ]
    encoders = {
        "technician": TechnicianEncoder()
        }


@require_http_methods(["GET", "POST"])
def ListAutomobileVO(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder = AutomobileVOEncoder
        )


@require_http_methods(["PUT"])
def UpdateStatus(request, id):
    content = json.loads(request.body)
    if "completed" in content:
        appt = ServiceAppoitment.objects.get(id=id)
        appt.completed = True
        appt.save()
        return JsonResponse(
            appt,
            encoder=ServiceAppoitmentEncoder,
            safe=False
        )
    elif "cancelled" in content:
        appt = ServiceAppoitment.objects.get(id=id)
        appt.cancelled = True
        appt.save()
        return JsonResponse(
            appt,
            encoder=ServiceAppoitmentEncoder,
            safe=False
        )
    else:
        return JsonResponse(
            {"error": "Invalid request"}
        )


@require_http_methods(["GET"])
def ListAppointments(request, vin):
    if vin is not None:
        content = ServiceAppoitment.objects.filter(vin=vin)
        return JsonResponse(
            {"History": content},
            encoder = ServiceAppoitmentEncoder,
            safe=False
        )
    else:
        content = ServiceAppoitment.objects.all()
        return JsonResponse(
            {"": content},
            encoder = ServiceAppoitmentEncoder,
            safe= False
        )


@require_http_methods(["GET", "POST"])
def ListServices(request):
    if request.method == "GET":
        content = ServiceAppoitment.objects.all()
        return JsonResponse(
            {"Appointments": content},
            encoder=ServiceAppoitmentEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        employee = Technician.objects.get(id=content["technician"])
        content["technician"] = employee
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
            {"Technicians": content},
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
