import {React,useEffect, useState} from "react";


function ListServiceApointments() {
    const [serviceApointments, setServiceApointments] = useState([]);
    const [sales, setSales] = useState([]);

    const [canceled, setCanceled] = useState("");
    const handleCanceledChange = (event) => {
        const value = event.target.value;
        setCanceled(value);
    }
    const [completed, setCompleted] = useState("");
    const handleCompletedChange = (event) => {
        const value = event.target.value;
        setCompleted(value);
    }
    const fetchData = async() => {
        const serviceAppointmentsUrl = 'http://localhost:8080/api/services/';
        const response = await fetch (serviceAppointmentsUrl);
        if (response.ok) {
            const data = await response.json();
            setServiceApointments(data.Appointments);
        }

        const salesUrl = 'http://localhost:8090/api/salerecords/';
        const salesResponse = await fetch (salesUrl);
        if (salesResponse.ok) {
            const salesData = await salesResponse.json();
            setSales(salesData.Salerecords);
        }
    }

    const HandleSumbit = async (event) => {
        event.preventDefault();
        if (! (canceled === "")) {
            const data = {
                "id": canceled,
                "cancelled": "cancelled"
            }
            const statusUrl = `http://localhost:8080/api/status/${canceled}/`;
            const fetchConfig = {
                method: "put",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const statusResponse = await fetch (statusUrl, fetchConfig);
            if (statusResponse.ok) {
                const newStatus = await statusResponse.json();
                setCanceled("")
                fetchData();
            }

        }if (! (completed === "")) {
            const data = {
                "id": completed,
                "completed": "completed"
            }
            const statusUrl = `http://localhost:8080/api/status/${completed}/`;
            const fetchConfig = {
                method: "put",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const statusResponse = await fetch (statusUrl, fetchConfig);
            if (statusResponse.ok) {
                const newStatus = await statusResponse.json();
                setCompleted("")
                fetchData();

            }
        }

    }
    const filtered = []
        for (let a of serviceApointments){
            if (a.cancelled === false && a.completed === false) {
            filtered.push(a)
            }
        }
    var vip = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
            </svg>

    useEffect(() => {
        fetchData();
      }, []);

    return (
    <div className="container">
        <div className="row">
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
                    {filtered.map(appt => {
                        const soldVins = []
                        for (let record of sales) {
                            soldVins.push(record.automobile.vin)
                        }if (soldVins.includes(appt.vin)) {
                            var noVip = vip
                        }else {
                            var noVip = ""
                        }


                    return(
                        <tr key={appt.id}>
                            <td>{appt.vin}</td>
                            <td>{appt.owner_name}</td>
                            <td>{new Date(appt.date).toLocaleDateString()}</td>
                            <td>{new Date(appt.time).toLocaleTimeString()}</td>
                            <td>{appt.technician.name}</td>
                            <td>{appt.reason}</td>
                            <td>{noVip}</td>
                            <td>
                                <form onClick={HandleSumbit}>
                                    <div className="btn-group btn-group-sm" role="group" aria-label="...">
                                        <button onClick={handleCanceledChange} value={appt.id} type="button" className="btn btn-danger">Cancel</button>
                                        <button type="button" className="btn btn-primary">In Progress</button>
                                        <button onClick={handleCompletedChange} value={appt.id} type="button" className="btn btn-success">Completed</button>
                                    </div>
                                </form>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    </div>
    )

}

export default ListServiceApointments
