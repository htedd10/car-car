import {React, useState} from "react";
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
    const handleTechniciansChange = (event) => {
        const value = event.target.value;
        setTechnicians(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            owner_name,
            vin,
            reason,
            date,
            time,
            technician,
        }

        const serviceApointmentUrl = 'http://localhost:8100/api/service_apointments/';
        const fetchConfig = {
            method: "get",
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
    return (
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add an automobile to inventory</h1>
              <form onSubmit={handleSubmit} id="create-automobile-form">
                <div className="form-floating mb-3">
                  <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleYearChange} value={year} placeholder="Year" required type="text" name="year" id="year" className="form-control"/>
                  <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleVinChange} value={vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control"/>
                  <label htmlFor="vin">VIN</label>
                </div>
                <div className="mb-3">
                  <select onChange={handleModelChange} value={model} required id="model" name="model" className="form-select">
                    <option value="">Choose a model</option>
                    {models.map(model => {
                        return (
                            <option key={model.id} value={model.id}>
                                {model.name}
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
