import { React, useEffect, useState } from "react";


function ServiceHistory() {
    const [serviceAppointments, setServiceAppointments] = useState([]);
    const [vinInput, setVinInput] = useState('');
    const handleVinInputChange = (event) => {
        const value = event.target.value;
        setVinInput(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchData();
    }

    const fetchData = async () => {
        const serviceAppointmentUrl = 'http://localhost:8080/api/services';
        const serviceAppointmentResponse = await fetch(serviceAppointmentUrl);

        if (serviceAppointmentResponse.ok) {
            const serviceAppointmentData = await serviceAppointmentResponse.json();
            const search = vinInput;
            const result = [];
            for (let serviceAppointment of serviceAppointmentData.service_appointments) {
                if (vinInput == serviceAppointment.vin) {
                    result.push(serviceAppointment)
                }
            }
            setServiceAppointments(result);
        }
    }

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-sm">
            <form onSubmit={handleSubmit} className="d-flex mt-2 mb-2">
                <input onChange={handleVinInputChange} value={vinInput} className="form-control me-2" type="search" placeholder="Search VIN" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <h2>Service Appointment History</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>VIP</th>
                        <th>Finished</th>
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
                        return (
                            <tr key={serviceAppointment.id}>
                                <th>{serviceAppointment.vin}</th>
                                <th>VIP</th>
                                <th>{serviceAppointment.status}</th>
                                <th>{serviceAppointment.owner_name}</th>
                                <th>{serviceAppointment.reason}</th>
                                <th>{date.toLocaleDateString()}</th>
                                <th>{date.toLocaleTimeString()}</th>
                                <th>{serviceAppointment.technician.name}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    )
}

export default ServiceHistory
