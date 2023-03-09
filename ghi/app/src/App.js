import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelList from './Inventory/VehicleModelsList';
import ManufacturerList from './Inventory/ManufacturerList';
import ManufacturerForm from './Inventory/ManufacturerForm';
import AutomobileForm from './Inventory/AutomobileForm';
import AutomobileList from './Inventory/AutomobilesList';
import CreateVehicleModelForm from './Inventory/VehicleModelsForm';
import CustomerForm from './Sales/CustomerForm';
import SalesPersonForm from './Sales/SalespersonForm';
import SalesRecordForm from './Sales/SalesRecordForm';
import SalesRecordList from './Sales/SalesRecordList';
import TechnicianForm from './Service/TechnicianForm';
import ListServiceApointments from './Service/ListServiceApointments';
import CreateServiceApointments from './Service/CreateServiceAppointment';
import ServiceHistory from './Service/ServiceHistory';

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
            <Route path="" element={<SalespersonList salespersons={props.salespersons}/>} />
            <Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomerList customers={props.customers}/>} />
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
            <Route path="new" element={<CreateServiceApointments />} />{/* create service appointment here */}
            <Route path="appointments" element={<ListServiceApointments />} />
            <Route path="history" element={< ServiceHistory />} />{/* service history here*/}
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
