import {React,useEffect, useState} from "react";
import TechnicianForm from "./TechnicianForm";
// UNFINISHED
function CreateServiceApointments() {
    const [owner_name, setOwnerName] = useState('');
    const handleOwnerNameChange = (event) => {
        const value = event.target.value;
        setOwnerName(value);
    }

    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
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

    const [technician, setTechnician] = useState('');
    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    const [technicians, setTechnicians] = useState([]);
    const dateDateTime = new Date(date + ' ' + time);
    const timeDateTime = new Date(date + ' ' + time);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            "owner_name" : owner_name,
            "vin" : vin,
            "reason" : reason,
            "date" : dateDateTime,
            "time" : timeDateTime,
            "technician" : technician,
        }
        console.log("data", data);

        const serviceApointmentUrl = 'http://localhost:8080/api/services/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch (serviceApointmentUrl, fetchConfig);

        if (response.ok) {
            const newServiceApointment = await response.json();

            setOwnerName('');
            setVin('');
            setReason('');
            setDate('');
            setTime('');
            setTechnician('');
        }
    }

    const fetchData = async () => {
      const techniciansURL = 'http://localhost:8080/api/technician/';
      const techniciansResponse = await fetch(techniciansURL);
      if (techniciansResponse.ok) {
          const techniciansData = await techniciansResponse.json();
          setTechnicians(techniciansData.Technicians)
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
              <h1>Create a Service appoinment</h1>
              <form onSubmit={handleSubmit} id="create-automobile-form">
                <div className="form-floating mb-3">
                  <input onChange={handleOwnerNameChange} value={owner_name} placeholder="owner_name" required type="text" name="owner_name" id="owner_name" className="form-control"/>
                  <label htmlFor="owner_name">Owner Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleVinChange} value={vin} placeholder="vin" required type="text" name="vin" id="vin" className="form-control"/>
                  <label htmlFor="vin">VIN</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleReasonChange} value={reason} placeholder="reason" required type="text" name="reason" id="reason" className="form-control"/>
                  <label htmlFor="reason">Reason</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleDateChange} value={date} placeholder="date" required type="text" name="date" id="date" className="form-control"/>
                  <label htmlFor="date">Date - Please enter as YYYY-MM-DD </label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleTimeChange} value={time} placeholder="time" required type="text" name="time" id="time" className="form-control"/>
                  <label htmlFor="time">Time - Please enter as HH:MM</label>
                </div>
                <div className="mb-3">
                  <select onChange={handleTechnicianChange} value={technician} required id="technician" name="technician" className="form-select">
                    <option value="">Choose a Technician</option>
                    {technicians.map(technician => {
                        return (
                            <option key={technician.id} value={technician.id}>
                                {technician.name}
                            </option>
                        );
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

export default CreateServiceApointments;
