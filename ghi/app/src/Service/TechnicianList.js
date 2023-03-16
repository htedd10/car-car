import { React, useEffect, useState } from "react";

function TechnicianList() {
    const [technicians, setTechnicians] = useState([])

    const fetchData = async () => {
        const technicianUrl = 'http://localhost:8080/api/technicians/'
        const technicianResponse = await fetch(technicianUrl)

        if (technicianResponse.ok) {
            const data = await technicianResponse.json()
            setTechnicians(data.technicians)
        }
    }

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className="my-5 container">
            <h2>Technicians</h2>
            <table className="table table-stripped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Employee Number</th>
                </tr>
            </thead>
            <tbody>
                {technicians.map(technician => {
                return(
                    <tr key={technician.id}>
                        <td>{technician.name}</td>
                        <td>{technician.employee_number}</td>
                    </tr>
                );
            })}
            </tbody>
            </table>
        </div>
    )
}

export default TechnicianList
