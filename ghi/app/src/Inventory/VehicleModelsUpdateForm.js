import {React, useEffect, useState} from "react";

function UpdateVehicleModelForm(props) {
    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const [models, setModels] = useState([]);
    const [model, setModel] = useState('');
    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            name
        }

        const ModelUrl = `http://localhost:8100/api/models/${model}/`
            const fetchConfig = {
                method: "put",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch (ModelUrl, fetchConfig);
            if (response.ok) {
                setName('');
                setModel('');
                fetchData();
            }


    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models);

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Update a vehicle model</h1>
                    <form onSubmit={handleSubmit} id="update-model-form">
                        <div className="mb-3">
                            <select onChange={handleModelChange} value={model} name="model" id="model" className="form-select">
                                <option value="">Choose a Model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Name"
                            required type="text" name="name" id="name"
                            className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <button className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default UpdateVehicleModelForm;
