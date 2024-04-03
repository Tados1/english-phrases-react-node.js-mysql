import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar"; 
import Home from "./pages/Home"; 
import AllPhrases from "./pages/AllPhrases"; 
import Add from "./pages/Add"; 
import Update from "./pages/Update"; 

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/words" element={<AllPhrases />}/>
          <Route path="/add" element={<Add />}/>
          <Route path="/update/:id" element={<Update />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
