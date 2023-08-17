import { React, useState, useEffect } from 'react';

function AutomobileColumn(props) {

  return (
    <div className="col">
      {props.list.map(data => {
        return (
            <div key={data.href} className="card mb-3 shadow">
              <img alt="car image" src={data.picture_url} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title fw-bold">{data.model.name}</h5>
                <h6 className="card-subtitle text-muted">{data.model.manufacturer.name}</h6>
                <p className="card-text fw-light mt-1 mb-0">Year: {data.year}</p>
                <p className="card-text fw-light mb-0">Color: {data.color}</p>
              </div>
              <div className="card-footer">
                <h6 className="card-subtitle text-muted">
                  {data.vin}
                </h6>
              </div>
            </div>
        );
      })}
    </div>
  )
}

const MainPage = (props) => {
  const [automobileColumns, setAutomobileColumns] = useState([], [], [], [], [], []);
  const [salerecords, setSalerecords] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    const salerecordsUrl = 'http://localhost:8090/api/salerecords/';
    const salerecordsResponse = await fetch(salerecordsUrl);
    if (salerecordsResponse.ok) {
      const salerecordsData = await salerecordsResponse.json();
      setSalerecords(salerecordsData.Salerecords)

      const automobileUrl = 'http://localhost:8100/api/automobiles/';
      const automobileResponse = await fetch(automobileUrl);
      if (automobileResponse.ok) {
        const automobileData = await automobileResponse.json();
        setAutomobiles(automobileData.autos)

        const requests = [];
        const soldInventory = [];
        for (let salerecord of salerecords) {
            soldInventory.push(salerecord.automobile.vin)
        }

        // Sort's the automobiles list so that the available vehicles are new each time the page refreshes
        for (let i = automobiles.length-1; i > 0; i--) {
          let j = Math.floor(Math.random() * i);
          let k = automobiles[i];
          automobiles[i] = automobiles[j];
          automobiles[j] = k;
        }

        for (let automobile of automobiles) {
          if (!(soldInventory.includes(automobile.vin))) {
            const detailUrl = `http://localhost:8100/api/automobiles/${automobile.vin}/`;
            requests.push(fetch(detailUrl));
          }
        }

        const responses = await Promise.all(requests);
        const columns = [[], [], [], [], [], []];
        let i = 0;
        for (const automobileResponse of responses) {
          if (automobileResponse.ok) {
            const details = await automobileResponse.json();
            columns[i].push(details);
            i = i + 1;
            if (i > 5) {
              break
            }
          } else {
            console.error(automobileResponse);
          }
        }
        setAutomobileColumns(columns);

        if (count == 0) {
          setCount(1);
        }
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [count]);

  return (
    <>
    <div className="px-4 py-5 text-center">
    <h1 className="display-5 fw-bold">CarCar</h1>
    <div className="col-lg-6 mx-auto">
      <p className="lead mb-4">
        The premiere solution for automobile dealership
        management!
      </p>
    </div>
  </div>
  <div className="container">
    <h2>Automobiles Available</h2>
    <hr></hr>
    <div className="row">
      {automobileColumns.map((inventoryList, index) => {
        return (
          <AutomobileColumn key={index} list={inventoryList} />
        )
      })}
    </div>
    <hr></hr>
  </div>
    </>
  );
}

export default MainPage;
