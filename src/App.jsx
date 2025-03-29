import './styles/app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Warehouse from './pages/Warehouse';
import Inventory from './pages/Inventory';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={ <Warehouse /> }/>
            <Route path="/inventory" element={ <Inventory /> }/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
