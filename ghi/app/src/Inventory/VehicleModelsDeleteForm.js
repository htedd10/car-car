import {React, useEffect, useState} from "react";

function UpdateVehicleModelForm(props) {
    const [models, setModels] = useState([]);
    const [model, setModel] = useState('');
    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const ModelUrl = `http://localhost:8100/api/models/${model}/`
            const fetchConfig = {
                method: "delete",
            };
            const response = await fetch (ModelUrl, fetchConfig);
            if (response.ok) {
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
                    <h1>Delete a vehicle model</h1>
                    <form onSubmit={handleSubmit} id="delete-model-form">
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
                        <button className="btn btn-danger">Delete</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default UpdateVehicleModelForm;
