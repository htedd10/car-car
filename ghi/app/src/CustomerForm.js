import { React, useState } from "react";

function CustomerForm() {
    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const [address, setAddress] = useState('');
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const [phone_number, setPhoneNumber] = useState('');
    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name,
            address,
            phone_number,
        }

        const customerUrl = 'http://localhost:8090/api/customers/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch (customerUrl, fetchConfig);

        if (response.ok) {
            const newCustomer = await response.json();
            setName('');
            setAddress('');
            setPhoneNumber('');
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
                  <label htmlFor="name">Name</label>
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea onChange={handleAddressChange} className="form-control" name="address" id="address" rows="3" value={address}></textarea>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handlePhoneNumberChange} value={phone_number} placeholder="Phone_number" required type="number" name="phone_number" id="phone_number" className="form-control" />
                  <label htmlFor="employee_number">Phone Number</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CustomerForm
