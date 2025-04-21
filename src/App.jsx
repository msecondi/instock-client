import './styles/app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { warehousesPageIndex } from './data/appData';
import Header from './components/Header/Header';
import Warehouses from './pages/Warehouses/Warehouses';
import AddWarehouse from './pages/AddWarehouse/AddWarehouse';
import Warehouse from './pages/Warehouse/Warehouse';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import DeleteModal from './components/DeleteModal/DeleteModal';
import Inventories from './pages/Inventories/Inventories';
import Inventory from './pages/Inventory/Inventory';
import AddInventory from './pages/Inventory/Inventory';
import EditInventory from './pages/EditInventory/EditInventory';
import Footer from './components/Footer/Footer';

function App() {
  const [navIndex, setNavIndex] = useState(warehousesPageIndex);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div className={`app__header ${deleteModal ? 'app__header--delete-modal-hide' : ''}`}>
          <Header navIndex={navIndex} />
          { deleteModal && <div className="app__header--delete-modal-overlay"></div> }
        </div>
        <Routes>
            <Route path="/" element={ <Warehouses setNavIndex={setNavIndex} setDeleteModal={setDeleteModal}/> }>
              <Route path="/warehouses/:id/delete" element={ <DeleteModal /> }/>
            </Route>
            <Route path="/warehouses/add" element={ <AddWarehouse setNavIndex={setNavIndex}/> }/>
            <Route path="/warehouses/:id" element={ <Warehouse setNavIndex={setNavIndex} setDeleteModal={setDeleteModal}/> }>
              <Route path="/warehouses/:id/delete" element={ <DeleteModal /> }/>
            </Route>
            <Route path="/warehouses/:id/edit" element={ <EditWarehouse setNavIndex={setNavIndex}/> }/>
            <Route path="/inventories" element={ <Inventories setNavIndex={setNavIndex} setDeleteModal={setDeleteModal}/> }>
              <Route path="/inventories/:id/delete" element={ <DeleteModal /> }/>
            </Route>
            <Route path="/inventories/add" element={ <AddInventory setNavIndex={setNavIndex}/> }/>
            <Route path="/inventories/:id" element={ <Inventory setNavIndex={setNavIndex}/> }/>
            <Route path="/inventories/:id/edit" element={ <EditInventory setNavIndex={setNavIndex}/> }/>
        </Routes>
        <div className={`app__footer ${deleteModal ? 'app__footer--delete-modal-hide' : ''}`}>
          <Footer />
          { deleteModal && <div className="app__footer--delete-modal-overlay"></div> }
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
