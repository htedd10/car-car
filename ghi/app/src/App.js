import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelList from './Inventory/VehicleModelsList';
import ManufacturerList from './Inventory/ManufacturerList';
import ManufacturerForm from './Inventory/ManufacturerForm';
import AutomobileForm from './Inventory/AutomobileForm';
import AutomobileList from './Inventory/AutomobilesList';
import CreateVehicleModelForm from './Inventory/VehicleModelsForm';
import CustomerList from './Sales/CustomerList';
import CustomerForm from './Sales/CustomerForm';
import SalespersonList from './Sales/SalespersonList';
import SalesPersonForm from './Sales/SalespersonForm';
import SalesRecordForm from './Sales/SalesRecordForm';
import SalesRecordList from './Sales/SalesRecordList';
import ServiceList from './Service/ServiceList';
import ServiceForm from './Service/ServiceForm';
import TechnicianList from './Service/TechnicianList';
import TechnicianForm from './Service/TechnicianForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />

          {/* Inventory Microservice */}
          <Route path="manufacturers">
            <Route path="" element={<ManufacturerList/>} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route path="" element={<VehicleModelList/>} />
            <Route path="new" element={<CreateVehicleModelForm />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobileList/>} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>

          {/* Sales Microservice */}
          <Route path="salesperson">
            <Route path="" element={<SalespersonList/>} />
            <Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomerList/>} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route path ="" element={<SalesRecordList/>} />
            <Route path="new" element={<SalesRecordForm />} />
          </Route>

          {/* Services Microservice */}
          <Route path="technicians">
            <Route path="" element={<TechnicianList/>} />
            <Route path="new" element={<TechnicianForm />} />
          <Route path="services">
            <Route path="" element={<ServiceList/>} />
            <Route path="new" element={<ServiceList />} />
          </Route>
          </Route>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
