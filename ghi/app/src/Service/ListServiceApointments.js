import {React,useEffect, useState} from "react";

function ListServiceApointments() {
    const [serviceApointments, setServiceApointments] = useState([]);
    const fetchData = async() => {

        const serviceAppointmentsUrl = 'http://localhost:8080/api/services/';
        const response = await fetch (serviceAppointmentsUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setServiceApointments(data.Appointments);
            // setServiceApointments(data.service);
            // may need to change data._______ based on props val
        }

    }

    useEffect(() => {
        fetchData();
      }, []);

    return (
    <div className="container">
        <h2>Service Appointments</h2>
            <table className="table table-stripped">
            <thead>
                <tr>
                    <th>Vin</th>
                    <th>Owner Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Service Technician</th>
                    <th>Reason for Service</th>
                    <th>VIP</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {serviceApointments.map(appt => {
                return(
                    <tr key={appt.id}>
                        <td>{appt.vin}</td>
                        <td>{appt.owner_name}</td>
                        <td>{appt.date }</td>
                        <td>{appt.time}</td>
                        <td>{appt.technician.name}</td>
                        <td>{appt.reason}</td>
                        <td>{appt.vip}</td>
                        <td>{appt.status}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    </div>
    )

}

export default ListServiceApointments;
