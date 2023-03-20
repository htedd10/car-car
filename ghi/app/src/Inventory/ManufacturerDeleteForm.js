import { React, useEffect, useState } from "react";

function ManufacturerDeleteForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const manufacturerUrl = `http://localhost:8100/api/manufacturers/${manufacturer}/`
        const fetchConfig = {
            method: "delete",
        };
        const response = await fetch (manufacturerUrl, fetchConfig);

        if (response.ok) {
            const newManufacturer = await response.json();
            setManufacturer('');
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
              <h1>Delete a manufacturer</h1>
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
                <button className="btn btn-danger">Delete</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ManufacturerDeleteForm
