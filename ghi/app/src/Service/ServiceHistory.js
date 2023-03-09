import {React, useEffect,useState} from "react";

function ServiceHistory(props) {
    const [serviceApointments, setServiceApointments] = useState([]);
    const [vins, setVins] = useState([]);
    const [history, setHistory] = useState("");

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
    console.log(serviceApointments)
    const listedVins = [];
    console.log(listedVins)
    for (let apointment of serviceApointments){
        if(! listedVins.includes(apointment.vin)) {
            listedVins.push({"id":serviceApointments[apointment],"vin": apointment.vin});
        }
    }
    useEffect(() => {
        fetchData();
      }, []);

    return(
    <div className="container">
        <h5>Select a Vin to view its service history</h5>
        <div className="mb-3">
            <select onChange={handleVinChange} value={vin} required id="vin" name="vin" className="form-select">
            <option value="">Choose a Vin</option>
            {listedVins.map(Vnum => {

                return (
                    <option key={Vnum.id} value={Vnum.vin}>
                        {Vnum.vin}
                    </option>
                );

            })};
            </select>
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
                        if(appt.vin == vin) {
                            return(
                                <tr key={appt.id}>
                                    <td>{appt.vin}</td>
                                    <td>{appt.owner_name}</td>
                                    <td>{appt.date }</td>
                                    <td>{appt.time}</td>
                                    <td>{appt.technician.name}</td>
                                    <td>{appt.reason}</td>
                                    <td>{appt.status}</td>
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
