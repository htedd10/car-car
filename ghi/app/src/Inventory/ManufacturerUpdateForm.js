import { React, useEffect, useState } from "react";

function ManufacturerCreateForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name,
        }

        const manufacturerUrl = `http://localhost:8100/api/manufacturers/${manufacturer}/`
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch (manufacturerUrl, fetchConfig);

        if (response.ok) {
            const newManufacturer = await response.json();
            setManufacturer('');
            setName('');
            fetchData();
        }
    }

    const fetchData = async () => {
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'
        const manufacturerResponse = await fetch(manufacturerUrl);

        if (manufacturerResponse.ok) {
            const manufacturerData = await manufacturerResponse.json();
            setManufacturers(manufacturerData.manufacturers);
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
              <h1>Update a manufacturer</h1>
              <form onSubmit={handleSubmit} id="create-manufacturer-form">
                <select onChange={handleManufacturerChange} value={manufacturer} required id="salespersons" name="salespersons" className="form-select">
                    <option value="">Choose a manufacturer</option>
                    {manufacturers.map(manufacturer => {
                        return (
                            <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                        )
                    })}
                </select>
                <div className="form-floating mb-3">
                  <input onChange={handleNameChange} placeholder="name" required type="text" name="name" id="name" className="form-control" value={name}/>
                  <label htmlFor="name">Name</label>
                </div>
                <button className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ManufacturerCreateForm
