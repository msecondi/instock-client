import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Warehouse from './pages/Warehouse';
import Footer from './components/Footer/Footer';
import './styles/app.scss';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={
              <main>
                <Warehouse />
              </main>
            } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
