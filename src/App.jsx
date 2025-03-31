import './styles/app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { warehousesPageIndex } from './data/appData';
import Header from './components/Header/Header';
import Warehouses from './pages/Warehouses/Warehouses';
import AddWarehouse from './pages/AddWarehouse/AddWarehouse';
import Warehouse from './pages/Warehouse/Warehouse';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import DeleteWarehouse from './pages/DeleteWarehouse/DeleteWarehouse';
import Inventory from './pages/Inventory/Inventory';
import Footer from './components/Footer/Footer';

function App() {
  const [navIndex, setNavIndex] = useState(warehousesPageIndex);

  return (
    <>
      <BrowserRouter>
        <Header navIndex={navIndex}/>
        <Routes>
            <Route path="/" element={ <Warehouses setNavIndex={setNavIndex}/> }/>
            <Route path="/warehouses/add-warehouse" element={ <AddWarehouse setNavIndex={setNavIndex}/> }/>
            <Route path="/warehouses/:id" element={ <Warehouse setNavIndex={setNavIndex}/> }/>
            <Route path="/warehouses/:id/edit-warehouse" element={ <EditWarehouse setNavIndex={setNavIndex}/> }/>
            <Route path="/warehouses/:id/delete-warehouse" element={ <DeleteWarehouse setNavIndex={setNavIndex}/> }/>
            <Route path="/inventory" element={ <Inventory setNavIndex={setNavIndex}/> }/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
