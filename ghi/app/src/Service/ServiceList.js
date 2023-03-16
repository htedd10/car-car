import { React, useEffect, useState } from "react";

function ServiceList() {
    const [serviceAppointments, setServiceAppointments] = useState([]);
    const [saleRecords, setSaleRecords] = useState([]);
    const [soldInventory, setSoldInventory] = useState([]);

    const handleCancel = async (event) => {
        event.preventDefault();

        const service_id = event.target.value;

        const serviceAppointmentUrl = `http://localhost:8080/api/services/${service_id}/`;
        const fetchConfig = {
            method: "delete"
        }

        const response = await fetch(serviceAppointmentUrl, fetchConfig);
        if (response.ok) {
            const deletedServiceAppointment = await response.json();
            fetchData();
        }
    }

    const handleFinish = async (event) => {
        event.preventDefault();

        const data = {
            "status": true
        }

        const service_id = event.target.value;
        const serviceAppointmentUrl = `http://localhost:8080/api/services/${service_id}/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(serviceAppointmentUrl, fetchConfig);
        if (response.ok) {
            const updatedServiceAppointment = await response.json();
            fetchData();
        }
    }

    const fetchData = async () => {
        const saleRecordUrl = 'http://localhost:8090/api/salerecords/';
        const saleRecordResponse = await fetch(saleRecordUrl);
        if (saleRecordResponse.ok) {
            const saleRecordData = await saleRecordResponse.json();
            setSaleRecords(saleRecordData.Salerecords);
        }

        const serviceAppointmentUrl = 'http://localhost:8080/api/services';
        const serviceAppointmentResponse = await fetch(serviceAppointmentUrl);
        if (serviceAppointmentResponse.ok) {
            const serviceAppointmentData = await serviceAppointmentResponse.json();
            setServiceAppointments(serviceAppointmentData.service_appointments);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const result = [];
        for (let saleRecord of saleRecords) {
            if (!(saleRecord.automobile.vin in soldInventory)) {
                result.push(saleRecord.automobile.vin)
            }
        }
        setSoldInventory(result);
    }, [saleRecords]);

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-sm">
            <h2>List of Service Appointments</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>VIP</th>
                        <th>Owner Name</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceAppointments.map(serviceAppointment => {
                        const date = new Date(serviceAppointment.date);
                        if (serviceAppointment.status === false) {
                            if (soldInventory.includes(serviceAppointment.vin)) {
                                return (
                                    <tr key={serviceAppointment.id}>
                                        <td>{serviceAppointment.vin}</td>
                                        <td>Yes</td>
                                        <td>{serviceAppointment.owner_name}</td>
                                        <td>{serviceAppointment.reason}</td>
                                        <td>{date.toLocaleDateString()}</td>
                                        <td>{date.toLocaleTimeString()}</td>
                                        <td>{serviceAppointment.technician.name}</td>
                                        <td>
                                            <button onClick={handleCancel} value={serviceAppointment.id} type="button" className="btn btn-danger">Cancel</button>
                                            <button onClick={handleFinish} value={serviceAppointment.id} type="button" className="btn btn-success">Finished</button>
                                        </td>
                                    </tr>
                                );
                            } else {
                                return (
                                    <tr key={serviceAppointment.id}>
                                        <td>{serviceAppointment.vin}</td>
                                        <td>No</td>
                                        <td>{serviceAppointment.owner_name}</td>
                                        <td>{serviceAppointment.reason}</td>
                                        <td>{date.toLocaleDateString()}</td>
                                        <td>{date.toLocaleTimeString()}</td>
                                        <td>{serviceAppointment.technician.name}</td>
                                        <td>
                                            <button onClick={handleCancel} value={serviceAppointment.id} type="button" className="btn btn-danger">Cancel</button>
                                            <button onClick={handleFinish} value={serviceAppointment.id} type="button" className="btn btn-success">Finished</button>
                                        </td>
                                    </tr>
                                )
                            }
                        }
                    })}
                </tbody>
            </table>
            </div>
        </div>
    </div>
    )
}

export default ServiceList
