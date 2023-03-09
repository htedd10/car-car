import {React, useEffect, useState} from "react";

function CreateVehicleModelForm(props) {
    const [name, setName] = useState('');
    const [picture, setPicture] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handlePictureChange = (event) => {
        const value = event.target.value;
        setPicture(value);
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}

        data.name = name;
        data.picture_url = picture;
        data.manufacturer_id = manufacturer;


        const ModelUrl = 'http://localhost:8100/api/models/'
            const fetchConfig = {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch (ModelUrl, fetchConfig);
            if (response.ok) {
                setName('');
                setPicture('');
                setManufacturer('');
            }


    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a vehicle model</h1>
                    <form onSubmit={handleSubmit} id="create-conference-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Name"
                            required type="text" name="name" id="name"
                            className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureChange} value={picture} placeholder="picture"
                            required type="text" name="picture" id="picture"
                            className="form-control" />
                            <label htmlFor="picture">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleManufacturerChange} value={manufacturer} name="manufacturer" id="manufacturer" className="form-select">
                                <option value="">Choose a Manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key ={manufacturer.name} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default CreateVehicleModelForm;
