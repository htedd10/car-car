from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import AutomobileVO, Technician, ServiceAppointment
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'vin',
    ]


class TechnicianEncoder(ModelEncoder):
   model = Technician
   properties = [
       "id",
       "name",
       "employee_number",
    ]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "id",
        "vin",
        "owner_name",
        "reason",
        "date",
        "technician",
        "status"

    ]
    encoders = {
        "technician": TechnicianEncoder(),
        }


@require_http_methods(["GET"])
def ListAutomobileVO(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder = AutomobileVOEncoder
        )

@require_http_methods(["GET", "POST", "DELETE"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder = TechnicianEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_service_appointments(request):
    if request.method == "GET":
        service_appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {"service_appointments": service_appointments},
            encoder = ServiceAppointmentEncoder,
            safe=False
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        technician = Technician.objects.get(id=content["technician"])
        content["technician"] = technician
        service_appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            service_appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT" ,"DELETE"])
def api_show_service_appointment(request, id):
    if request.method == "GET":
        service_appointment = ServiceAppointment.objects.get(id=id)
        return JsonResponse(
            service_appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False
        )
    if request.method == "PUT":
        content = json.loads(request.body)
        ServiceAppointment.objects.filter(id=id).update(**content)
        service_appointment = ServiceAppointment.objects.get(id=id)
        return JsonResponse(
            service_appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )
    else:
        count, _ = ServiceAppointment.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0 }
        )
