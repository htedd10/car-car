import {React, useState} from "react";

function TechnicianForm() {
  const [name, setName] = useState('');
  const handleNameChange = (event) => {
      const value = event.target.value;
      setName(value);
  }
  const [employee_number, setEmployeeNumber] = useState('');
  const handleEmployeeNumberChange = (event) => {
      const value = event.target.value;
      setEmployeeNumber(value);
  }
  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {
          name,
          employee_number,
      }
      const technicianUrl = 'http://localhost:8080/api/technician/'
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          }
      }
      const response = await fetch (technicianUrl, fetchConfig);
      if (response.ok) {
          const newTechnician = await response.json();
          setName('');
          setEmployeeNumber('');
      }
  }
    return (
    <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new customer</h1>
              <form onSubmit={handleSubmit} id="create-salesperson-form">
                <div className="form-floating mb-3">
                  <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                  <label htmlFor="name">Technician Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleEmployeeNumberChange} value={employee_number} placeholder="employee_number" required type="number" name="employee_number" id="employee_number" className="form-control" />
                  <label htmlFor="employee_number">Employee Number</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    </div>
    )
}
export default TechnicianForm;
