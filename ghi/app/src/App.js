import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelList from './VehicleModelsList';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobilesList';
import CreateVehicleModelForm from './VehicleModelsForm';
import CustomerForm from './CustomerForm';
import SalesPersonForm from './SalesPersonForm';
import SalesRecordForm from './SalesRecordForm';
import SalesRecordList from './SalesRecordList';
import TechnicianForm from './TechnicianForm';
import ListServiceApointments from './ListServiceApointments';
import CreateServiceApointments from './CreateServiceAppointment';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="models" element={<VehicleModelList />} />
          <Route path="models/new" element={<CreateVehicleModelForm />} />
          <Route path="manufacturers">
            <Route path="" element={<ManufacturerList manufacturers={props.manufacturers} />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobileList automobiles={props.automobiles} />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="salesperson">
            <Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="customers">
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route path ="" element={<SalesRecordList salerecords={props.salerecords}/>} />
            <Route path="new" element={<SalesRecordForm />} />
          </Route>
          <Route path="technician">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="service">
            <Route path="new" element={<TechnicianForm />} />{/* create service appointment here */}
            <Route path="appointments" element={<ListServiceApointments />} />
            <Route path="history" element={<  ListServiceApointments />} />{/* service history here*/}
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
