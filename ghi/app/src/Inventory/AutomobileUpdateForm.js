import { React, useEffect, useState } from "react";

function AutomobileUpdateForm() {
    const [automobiles, setAutomobiles] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            "picture_url": picture,
            color,
            year,
        }

        const automobileUrl = `http://localhost:8100/api/automobiles/${automobile}/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch (automobileUrl, fetchConfig);

        if (response.ok) {
            const newAutomobile = await response.json();
            setAutomobile('');
            setColor('');
            setYear('');
            setPicture('');
            fetchData('');
        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
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
              <h1>Update an automobile</h1>
              <form onSubmit={handleSubmit} id="update-automobile-form">
                <div className="mb-3">
                  <select onChange={handleAutomobileChange} value={automobile} required id="automobile" name="automobile" className="form-select">
                    <option value="">Choose an automobile</option>
                    {automobiles.map(automobile => {
                        return (
                            <option key={automobile.vin} value={automobile.vin}>
                                {automobile.vin}
                            </option>
                        );
                    })};
                  </select>
                </div>
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
                <button className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AutomobileUpdateForm
