import {React, useEffect,useState} from "react";

function ServiceHistory(props) {
    const [serviceApointments, setServiceApointments] = useState([]);

    const [vins, setVins] = useState([]);
    const handleVinsChange = (event) => {
        const value = event.target.value;
        setVins(value);
    }
    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const fetchData = async() => {
        const serviceAppointmentsUrl = 'http://localhost:8080/api/services/';
        const response = await fetch (serviceAppointmentsUrl);
        if (response.ok) {
            const data = await response.json();
            setServiceApointments(data.Appointments);
        }
    }

    useEffect(() => {
        fetchData();
      }, []);

    return(
    <div className="container">
        <h5>Select a Vin to view its service history</h5>
        <div className="mb-3">
        <form onSubmit={handleVinsChange} id="vin-input-form">
            <div className="form-floating mb-3">
                <input onChange={handleVinChange} value={vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control"/>
                <label htmlFor="vin">Input a Vin</label>
            </div>
        </form>
        </div>
        <div className="container">
        <h2>Service History</h2>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Owner Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Service Technician</th>
                        <th>Reason for Service</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceApointments.map(appt => {
                        if (appt.completed === true) {
                            var status = "Completed"
                        }if (appt.cancelled === true) {
                            var status = "Canceled"
                        }if (appt.completed === false && appt.cancelled === false) {
                            var status = "In Progress"
                        }
                        if(appt.vin == vin) {
                            return(
                                <tr key={appt.id}>
                                    <td>{appt.vin}</td>
                                    <td>{appt.owner_name}</td>
                                    <td>{new Date(appt.date).toLocaleDateString()}</td>
                                    <td>{new Date(appt.time).toLocaleTimeString()}</td>
                                    <td>{appt.technician.name}</td>
                                    <td>{appt.reason}</td>
                                    <td>{status}</td>
                                </tr>
                                );
                            }
                    })}
                </tbody>
            </table>
        </div>
    </div>
    )
}
export default ServiceHistory;
