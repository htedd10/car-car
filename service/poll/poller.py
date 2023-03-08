import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
from service_rest.models import AutomobileVO

def poll():
    while True:
        print('Service poller polling for data')
        try:
            response = requests.get("http://inventory-api:8000/api/automobiles/")
            content = json.loads(response.content)
            for automobile in content["autos"]:
                AutomobileVO.objects.update_or_create(

                    import_href= automobile["href"],
                    color= automobile["color"],
                    year= automobile["year"],
                    vin= automobile["vin"],

                )

                # Do something with the automobile

            # Write your polling logic, here

        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(30)


if __name__ == "__main__":
    poll()
