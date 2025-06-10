import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Licitaciones from "./pages/Licitaciones";
import Proveedores from "./pages/Proveedores";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/licitaciones" element={<Licitaciones />} />
            <Route path="/proveedores" element={<Proveedores />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;