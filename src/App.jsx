import './styles/app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Warehouses from './pages/Warehouses/Warehouses';
import AddWarehouse from './pages/AddWarehouse/AddWarehouse';
import Warehouse from './pages/Warehouse/Warehouse';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import DeleteWarehouse from './pages/DeleteWarehouse/DeleteWarehouse';
import Inventory from './pages/Inventory/Inventory';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={ <Warehouses /> }/>
            <Route path="/warehouses/add-warehouse" element={ <AddWarehouse /> }/>
            <Route path="/warehouses/:id" element={ <Warehouse /> }/>
            <Route path="/warehouses/:id/edit-warehouse" element={ <EditWarehouse /> }/>
            <Route path="/warehouses/:id/delete-warehouse" element={ <DeleteWarehouse /> }/>
            <Route path="/inventory" element={ <Inventory /> }/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
