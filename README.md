<h1 style="text-align: center;">CarCar</h1>
<h4>A car dealership management application that can handle an inventory, service center, and sales </h4>

<br>

<h3>Team</h3>

| Person | Microservice |
| --- | --- |
| Vincent Manfre | Service |
| Ted Hwang | Sales |

<h3>How to Start CarCar</h3>
<p>Once you have succesfully cloned the car car repo onto your local machine navigate
to your terminal. Once there, change your working directory to the top level of this
project and run the following commands:</p>

| Steps | Command |
| --- | --- |
| 1 | docker volume create beta-data |
| 2 | docker-compose build |
| 3 | docker-compose up |

<h2 style="text-align: center;">Design</h2>



<h3 style="text-align:center;">Inventory Microservice</h3>

<h4>CRUD Routes</h4>

| Action | Method | URL |
| --- | --- | --- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/ |
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/:id/ |
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/:id/ |
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/:id/
| ——————————————  | ————  | ———————————————————— |
| List vehicle Models | GET | http://localhost:8100/api/models/ |
| Create a vehicle model | POST | http://localhost:8100/api/models/ |
| Get a specific vehicle model | GET | 	http://localhost:8100/api/models/:id/ |
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/:id/ |
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/:id/
| ——————————————  | ————  | ———————————————————— |
| List automobiles | GET | http://localhost:8100/api/automobiles/|
| Create an automobile | POST | http://localhost:8100/api/automobiles/ |
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/:vin/ |
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/:vin/ |
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/:vin/ |

<br />

<details>
    <summary>Inventory "GET" Requests</summary>
<br>
<h4>List Manufacturers</h4>

    {
        "manufacturers": [
            {
                "href": "/api/manufacturers/1/",
                "id": 1,
                "name": "Toyota"
            },
            {
                "href": "/api/manufacturers/2/",
                "id": 2,
                "name": "Hyundai"
            },
            {
                "href": "/api/manufacturers/3/",
                "id": 3,
                "name": "Audi"
            },
        ]
    }

<h4>Get a specific manufacturer</h4>

    {
	"href": "/api/manufacturers/1/",
	"id": 1,
	"name": "Toyota"
    }

<h4>List vehicle models</h4>

    {
        "models": [
            {
                "href": "/api/models/1/",
                "id": 1,
                "name": "Prius ",
                "picture_url": "https://media.ed.edmunds-media.com/toyota/prius/2019/ot/2019_toyota_prius_actf34_ot_100819_717.jpg",
                "manufacturer": {
                    "href": "/api/manufacturers/1/",
                    "id": 1,
                    "name": "Toyota"
                }
            },
            {
                "href": "/api/models/2/",
                "id": 2,
                "name": "Camry",
                "picture_url": "https://cdn.motor1.com/images/mgl/eooKq8/s1/2023-toyota-camry-hybrid-nightshade-special-edition.jpg",
                "manufacturer": {
                    "href": "/api/manufacturers/1/",
                    "id": 1,
                    "name": "Toyota"
                }
            },
            {
                "href": "/api/models/3/",
                "id": 3,
                "name": "CHR",
                "picture_url": "https://www.ihwanburhan.com/wp-content/uploads/2021/03/2023-Toyota-CHR-Exterior-1024x498.png",
                "manufacturer": {
                    "href": "/api/manufacturers/1/",
                    "id": 1,
                    "name": "Toyota"
                }
            },
        ]
    }

<h4>Get a specific vehicle model</h4>

    {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Prius ",
        "picture_url": "https://media.ed.edmunds-media.com/toyota/prius/2019/ot/2019_toyota_prius_actf34_ot_100819_717.jpg",
        "manufacturer": {
            "href": "/api/manufacturers/1/",
            "id": 1,
            "name": "Toyota"
        }
    }

<h4>List automobiles</h4>

    {
        "autos": [
            {
                "href": "/api/automobiles/1G1AF1F57A7194000/",
                "id": 1,
                "color": "White",
                "year": 2022,
                "vin": "1G1AF1F57A7194000",
                "model": {
                    "href": "/api/models/1/",
                    "id": 1,
                    "name": "Prius ",
                    "picture_url": "https://media.ed.edmunds-media.com/toyota/prius/2019/ot/2019_toyota_prius_actf34_ot_100819_717.jpg",
                    "manufacturer": {
                        "href": "/api/manufacturers/1/",
                        "id": 1,
                        "name": "Toyota"
                    }
                }
            },
            {
                "href": "/api/automobiles/1G1AF1F57A7194001/",
                "id": 2,
                "color": "Yellow",
                "year": 2022,
                "vin": "1G1AF1F57A7194001",
                "model": {
                    "href": "/api/models/2/",
                    "id": 2,
                    "name": "Camry",
                    "picture_url": "https://cdn.motor1.com/images/mgl/eooKq8/s1/2023-toyota-camry-hybrid-nightshade-special-edition.jpg",
                    "manufacturer": {
                        "href": "/api/manufacturers/1/",
                        "id": 1,
                        "name": "Toyota"
                    }
                }
            },
        ]
    }

<h4>Get a specific automobile</h4>

    {
        "href": "/api/automobiles/1G1AF1F57A7194000/",
        "id": 1,
        "color": "White",
        "year": 2022,
        "vin": "1G1AF1F57A7194000",
        "model": {
            "href": "/api/models/1/",
            "id": 1,
            "name": "Prius ",
            "picture_url": "https://media.ed.edmunds-media.com/toyota/prius/2019/ot/2019_toyota_prius_actf34_ot_100819_717.jpg",
            "manufacturer": {
                "href": "/api/manufacturers/1/",
                "id": 1,
                "name": "Toyota"
            }
        }
    }

</details>

<details>
    <summary>Inventory "POST" Requests</summary>
<br>
<h4>Create a manufacturer</h4>
<h5>JSON Body</h5>

    {
        "name": "BMW"
    }

<h5>JSON Response</h5>

    {
        "href": "/api/manufacturers/5/",
        "id": 5,
        "name": "BMW"
    }

<h4>Create a specific vehicle model</h5>
<h5>JSON Body</h5>

    {
        "name": "Prius Prime",
        "picture_url": "https://autonxt.net/wp-content/uploads/2016/10/autocontentexp.comwp-contentuploads2016102017-Toyota-Prius-Prime-OEM27-915e717b507cb0c0b170c8e37fa3b0f439c22db1.jpg",
        "manufacturer_id": 2
    }

<h5>JSON Response</h5>

    {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Prius Prime",
        "picture_url": "https://autonxt.net/wp-content/uploads/2016/10/autocontentexp.comwp-contentuploads2016102017-Toyota-Prius-Prime-OEM27-915e717b507cb0c0b170c8e37fa3b0f439c22db1.jpg",
        "manufacturer": {
            "href": "/api/manufacturers/2/",
            "id": 2,
            "name": "Toyota"
        }
    }

<h4>Create an automobile</h5>
<h5>JSON Body</h5>

    {
        "color": "White",
        "year": 2022,
        "vin": "1C3CC5FB2AN12024",
        "model_id": 1
    }

<h5>JSON Response</h5>

    {
        "href": "/api/automobiles/1C3CC5FB2AN12024/",
        "id": 38,
        "color": "White",
        "year": 2022,
        "vin": "1C3CC5FB2AN12024",
        "model": {
            "href": "/api/models/1/",
            "id": 1,
            "name": "Prius Prime",
            "picture_url": "https://autonxt.net/wp-content/uploads/2016/10/autocontentexp.comwp-contentuploads2016102017-Toyota-Prius-Prime-OEM27-915e717b507cb0c0b170c8e37fa3b0f439c22db1.jpg",
            "manufacturer": {
                "href": "/api/manufacturers/2/",
                "id": 2,
                "name": "Toyota"
            }
        }
    }
</details>

<details>
    <summary>Inventory "PUT" Requests</summary>
<br>
<h4>Update a specific manufacturer</h4>
<h5>JSON Body</h5>

    {
        "name": "Chrysler"
    }

<h5>JSON Response</h5>

    {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Chrysler"
    }

<h4>Update a specific vehicle model</h4>
<h5>JSON Body</h5>

    {
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
    }

<h5>JSON Response</h5>

    {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
            "href": "/api/manufacturers/1/",
            "id": 1,
            "name": "Daimler-Chrysler"
        }
    }

<h4>Update a specific automobile</h4>
<h5>JSON Body</h5>

    {
        "color": "white",
        "year": 2022
    }

<h5>JSON Response</h5>

    {
        "href": "/api/automobiles/1G1AF1F57A7194000/",
        "id": 1,
        "color": "white",
        "year": "2022",
        "vin": "1G1AF1F57A7194000",
        "model": {
            "href": "/api/models/1/",
            "id": 1,
            "name": "Prius ",
            "picture_url": "https://media.ed.edmunds-media.com/toyota/prius/2019/ot/2019_toyota_prius_actf34_ot_100819_717.jpg",
            "manufacturer": {
                "href": "/api/manufacturers/1/",
                "id": 1,
                "name": "Toyota"
            }
        }
    }

</details>

<br />

<h3 style="text-align:center;">Services Microservice</h3>

<h4>CRUD Routes</h4>

| Action | Method | URL |
| --- | --- | --- |
| List services | GET | http://localhost:8080/api/services |
| Create a service | POST | http://localhost:8080/api/services/ |
| ————————————  | ————  | ———————————————— |
| List technicians | GET | http://localhost:8080/api/technician/ |
| Create a technician | POST | http://localhost:8080/api/technician/ |
| ———————————— | ————  | ———————————————— |
| Get a list of automobile VO's | GET | http://localhost:8080/api/autos/ |

<br />

<details>
    <summary>Services "GET" Request</summary>
<br>

<h4>List services</h4>

    {
        "Appointments": [
            {
                "vin": "1G1AF1F57A7194000",
                "owner_name": "Bill Horst",
                "reason": "Car Broke Down",
                "date": "2023-03-17T02:29:00+00:00",
                "time": "2023-03-17T02:29:00+00:00",
                "technician": {
                    "name": "Josh Elder",
                    "employee_number": 12312,
                    "id": 1
                },
                "cancelled": true,
                "completed": false,
                "id": 1
            }
        ]
    }

<h4>List technicians</h4>

    {
        "Technicians": [
            {
                "name": "Josh Elder",
                "employee_number": 12312,
                "id": 1
            }
        ]
    }

<h4>Get a list of automobile value objects</h4>

    {
        "automobiles": [
            {
                "color": "White",
                "year": 2022,
                "vin": "1G1AF1F57A7194000",
                "import_href": "/api/automobiles/1G1AF1F57A7194000/"
            },
            {
                "color": "Yellow",
                "year": 2022,
                "vin": "1G1AF1F57A7194001",
                "import_href": "/api/automobiles/1G1AF1F57A7194001/"
            },
            {
                "color": "Red",
                "year": 2022,
                "vin": "1G1AF1F57A7194003",
                "import_href": "/api/automobiles/1G1AF1F57A7194003/"
            },
        ]
    }



</details>

<details>
    <summary>Services "POST" Request</summary>
<br>

<h4>Create a service</h4>
<h5>JSON Body</h5>

    {
        "vin": "1C3CC5FB2AN12023",
        "owner_name": "Bill Horst",
        "reason": "Oil Change",
        "date": "2010-12-01 08:15",
        "time": "2010-12-01 08:15",
        "technician": 1
    }

<h5>JSON Response</h5>

    {
        "vin": "1C3CC5FB2AN12023",
        "owner_name": "Bill Horst",
        "reason": "Oil Change",
        "date": "2010-12-01 08:15",
        "time": "2010-12-01 08:15",
        "technician": {
            "name": "Josh Elder",
            "employee_number": 12312,
            "id": 1
        },
        "cancelled": false,
        "completed": false,
        "id": 2
    }

<h4>Create technician</h4>
<h5>JSON Body</h5>

    {
        "name": "Ted",
        "employee_number": 1231
    }

<h5>JSON Response</h5>

    {
        "name": "Ted",
        "employee_number": 1231
    }

</details>

<br />
<br />

<h3 style="text-align:center;">Sales Microservice</h3>

<h4>CRUD Routes</h4>

| Action | Method | URL |
| --- | --- | --- |
| Get a list of salespeople | GET | http://localhost:8090/api/salesperson |
| Create a salesperson | POST | http://localhost:8090/api/salesperson/ |
| ———————————— | ——  | ————————————————— |
| Get a list of customers | GET | http://localhost:8090/api/customers |
| Create a customer | POST | http://localhost:8090/api/customers/ |
| ———————————— | ——  | ————————————————— |
| Get a list of salerecords | GET | http://localhost:8090/api/salerecords/ |
| Create a salerecord | POST | http://localhost:8090/api/salerecords/ |
| ———————————— | ——  | ————————————————— |
| Get a list of automobileVO's | GET | http://localhost:8090/api/automobiles |

<br />

<details>
    <summary>Sales "GET" Request</summary>
<br>
<h4>Get a list of salespeople</h4>

    {
        "salesperson": [
            {
                "id": 1,
                "name": "Brandon Jang",
                "employee_number": 3444412
            },
            {
                "id": 2,
                "name": "Ted Hwang",
                "employee_number": 1231313
            }
        ]
    }

<h4>Get a list of customers</h4>

    {
        "customers": [
            {
                "id": 1,
                "name": "Bobby Oh",
                "address": "This is not a real address",
                "phone_number": "1234567891"
            },
            {
                "id": 2,
                "name": "Andrew Neeme",
                "address": "This is not a real address",
                "phone_number": "1234567890"
            },
        ]
    }

<h4>Get a list of salerecords</h4>

    {
        "Salerecords": [
            {
                "id": 1,
                "automobile": {
                    "vin": "1C3CC5FB2AN12014"
                },
                "salesperson": {
                    "id": 1,
                    "name": "Ted Hwang",
                    "employee_number": 123456
                },
                "customer": {
                    "id": 1,
                    "name": "Bobby Oh",
                    "address": "This is not a real address",
                    "phone_number": "1234567891"
                },
                "sales_price": 28000
            },
            {
                "id": 2,
                "automobile": {
                    "vin": "1C3CC5FB2AN12015"
                },
                "salesperson": {
                    "id": 2,
                    "name": "Billy Jr",
                    "employee_number": 308550
                },
                "customer": {
                    "id": 1,
                    "name": "Bobby Oh",
                    "address": "This is not a real address",
                    "phone_number": "1234567891"
                },
                "sales_price": 28000
            },
        ]
    }

<h4>Get a list of automobile value objects</h4>

    {
        "automobileVOs": [
            {
                "vin": "1G1AF1F57A7194001"
            },
            {
                "vin": "1G1AF1F57A7194003"
            },
        ]
    }

</details>

<details>
    <summary>Sales "POST" Request</summary>
<br>
<h4>Create a salesperson</h4>
<h5>JSON Body</h5>

    {
        "name": "Ted Hwang",
        "employee_number": 1231313
    }

<h5>JSON Response</h5>

    {
        "id": 2,
        "name": "Ted Hwang",
        "employee_number": 1231313
    }

<h4>Create a customer</h4>
<h5>JSON Body</h5>

    {
        "name": "Rock Rock",
        "address": "Fake",
        "phone_number": 1230001234
    }

<h5>JSON Response</h5>

    {
        "id": 1,
        "name": "Rock Rock",
        "address": "Fake",
        "phone_number": 1230001234
    }

<h4>Create a salerecord</h4>
<h5>JSON Body</h5>

    {
        "automobile": "1G1AF1F57A7194000",
        "salesperson": 1,
        "customer": 1,
        "sales_price": 28000
    }

<h5>JSON Response</h5>

    {
        "id": 1,
        "automobile": {
            "vin": "1G1AF1F57A7194000"
        },
        "salesperson": {
            "id": 1,
            "name": "Brandon Jang",
            "employee_number": 3444412
        },
        "customer": {
            "id": 1,
            "name": "Rock Rock",
            "address": "Fake",
            "phone_number": "1230001234"
        },
        "sales_price": 28000
    }

</details>
