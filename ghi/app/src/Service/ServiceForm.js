import { React, useEffect, useState } from "react";

function ServiceForm() {
    const [technicians, setTechnicians] = useState([]);

    const [technician, setTechnician] = useState('');
    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const [owner_name, setOwnerName] = useState('');
    const handleOwnerNameChange = (event) => {
        const value = event.target.value;
        setOwnerName(value);
    }

    const [reason, setReason] = useState('');
    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    const [date, setDate] = useState('');
    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }

    const [time, setTime] = useState('');
    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            vin,
            owner_name,
            reason,
            "date": `${date} ${time}`,
            technician,
            "status": false
        };

        const serviceAppointmentUrl = 'http://localhost:8080/api/services/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch (serviceAppointmentUrl, fetchConfig);

        if (response.ok) {
            const newServiceAppointment = await response.json();
            setVin('');
            setOwnerName('');
            setReason('');
            setDate('');
            setTime('');
            setTechnician('');
        }
    }

    const fetchData = async () => {
        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const technicianResponse = await fetch(technicianUrl);

        if (technicianResponse.ok) {
            const technicianData = await technicianResponse.json()
            setTechnicians(technicianData.technicians)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a Service Appointment</h1>
              <form onSubmit={handleSubmit} id="create-service-appointment-form">
                <div className="form-floating mb-3">
                  <input onChange={handleVinChange} value={vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control"/>
                  <label htmlFor="vin">Vin</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleOwnerNameChange} value={owner_name} placeholder="OwnerName" required type="text" name="ownerName" id="ownerName" className="form-control"/>
                  <label htmlFor="ownerName">Owner Name</label>
                </div>
                <div className="mb-3">
                  <label htmlFor="reason" className="form-label">Reason</label>
                  <textarea onChange={handleReasonChange} className="form-control" name="reason" id="reason" rows="3" value={reason}></textarea>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleDateChange} value={date} placeholder="Date" required type="date" name="date" id="date" className="form-control"/>
                  <label htmlFor="date">Date</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleTimeChange} value={time} placeholder="Time" required type="time" name="time" id="time" className="form-control"/>
                  <label htmlFor="time">Time</label>
                </div>
                <div className="mb-3">
                  <select onChange={handleTechnicianChange} value={technician} required id="technician" name="technician" className="form-select">
                    <option value="">Choose a technician</option>
                    {technicians.map(technician => {
                        return (
                            <option key={technician.id} value={technician.id}>
                                {technician.name}
                            </option>
                        )
                    })};
                  </select>
                  </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ServiceForm
