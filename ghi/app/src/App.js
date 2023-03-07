import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelList from './VehicleModelsList';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobilesList';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="models" element={<VehicleModelList />} />
          <Route path="manufacturers">
            <Route path="" element={<ManufacturerList manufacturers={props.manufacturers} />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobileList automobiles={props.automobiles} />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
