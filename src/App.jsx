import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Warehouse from "./pages/Warehouses";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <main>
            <Route path="/warehouses/*" element={<Warehouse />} />
          </main>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
