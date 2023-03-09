import { React, useEffect, useState } from "react";

function ManufacturerList(props) {
    const [manufacturers, setManufacturers] = useState([]);

    const fetchData = async() => {
        const response = await fetch ('http://localhost:8100/api/manufacturers/');
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className="container">
         <h2>Manufacturers</h2>
         <div className="row">
             <table className="table table-striped">
                 <thead>
                 <tr>
                     <th>Name</th>
                 </tr>
                 </thead>
                 <tbody>
                 {manufacturers.map(manufacturer => {
                     return (
                     <tr key={manufacturer.id}>
                         <td>{ manufacturer.name }</td>
                     </tr>
                     );
                 })}
                 </tbody>
             </table>
         </div>
     </div>
    )
}

export default ManufacturerList
