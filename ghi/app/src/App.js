import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './Inventory/ManufacturerList';
import ManufacturerCreateForm from './Inventory/ManufacturerCreateForm';
import VehicleModelList from './Inventory/VehicleModelsList';
import CreateVehicleModelForm from './Inventory/VehicleModelsCreateForm';
import AutomobileCreateForm from './Inventory/AutomobileCreateForm';
import AutomobileList from './Inventory/AutomobilesList';
import CustomerList from './Sales/CustomerList';
import CustomerCreateForm from './Sales/CustomerCreateForm';
import SalespersonList from './Sales/SalespersonList';
import SalesPersonCreateForm from './Sales/SalespersonCreateForm';
import SalesRecordCreateForm from './Sales/SalesRecordCreateForm';
import SalesRecordList from './Sales/SalesRecordList';
import ServiceList from './Service/ServiceList';
import ServiceCreateForm from './Service/ServiceCreateForm';
import ServiceHistory from './Service/ServiceHistory';
import TechnicianList from './Service/TechnicianList';
import TechnicianCreateForm from './Service/TechnicianCreateForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />

          {/* Inventory Microservice */}
          <Route path="manufacturers">
            <Route path="" element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerCreateForm />} />
          </Route>
          <Route path="models">
            <Route path="" element={<VehicleModelList />} />
            <Route path="new" element={<CreateVehicleModelForm />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobileList />} />
            <Route path="new" element={<AutomobileCreateForm />} />
          </Route>

          {/* Sales Microservice */}
          <Route path="salesperson">
            <Route path="" element={<SalespersonList />} />
            <Route path="new" element={<SalesPersonCreateForm />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomerList />} />
            <Route path="new" element={<CustomerCreateForm />} />
          </Route>
          <Route path="sales">
            <Route path ="" element={<SalesRecordList />} />
            <Route path="new" element={<SalesRecordCreateForm />} />
          </Route>

          {/* Services Microservice */}
          <Route path="technicians">
            <Route path="" element={<TechnicianList />} />
            <Route path="new" element={<TechnicianCreateForm />} />
          </Route>
          <Route path="services">
            <Route path="" element={<ServiceList />} />
            <Route path="new" element={<ServiceCreateForm />} />
            <Route path="history" element={<ServiceHistory />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
