import { React, useEffect, useState } from "react";

function AutomobileDeleteForm() {
    const [automobiles, setAutomobiles] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const automobileUrl = `http://localhost:8100/api/automobiles/${automobile}/`;
        const fetchConfig = {
            method: "delete",
        };
        const response = await fetch (automobileUrl, fetchConfig);

        if (response.ok) {
            const newAutomobile = await response.json();
            setAutomobile('');
            fetchData();
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
              <h1>Delete an automobile</h1>
              <form onSubmit={handleSubmit} id="delete-automobile-form">
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
                <button className="btn btn-danger">Delete</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AutomobileDeleteForm
