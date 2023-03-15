import { React, useEffect, useState } from "react";

function AutomobileForm() {
    const [models, setModels] = useState([]);

    const [picture, setPicture] = useState('');
    const handlePictureChange = (event) => {
      const value = event.target.value;
      setPicture(value);
    }

    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const [year, setYear] = useState('');
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const [model, setModel] = useState('');
    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            "picture_url": picture,
            color,
            year,
            vin,
            "model_id": model,
        }

        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch (automobileUrl, fetchConfig);

        if (response.ok) {
            const newAutomobile = await response.json();

            setColor('');
            setYear('');
            setVin('');
            setModel('');
            setPicture('');
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
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add an automobile to inventory</h1>
              <form onSubmit={handleSubmit} id="create-automobile-form">
                <div className="form-floating mb-3">
                  <input onChange={handlePictureChange} value={picture} placeholder="picture"
                  required type="text" name="picture" id="picture"
                  className="form-control" />
                  <label htmlFor="picture">Picture URL</label>
                </div>
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

export default AutomobileForm
