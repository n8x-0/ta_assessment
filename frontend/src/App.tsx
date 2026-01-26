import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CurrencyConvertor from "./pages/CurrencyConvertor";
import About from "./pages/About";
import Header from "./components/header/Header";
import History from "./pages/History";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<CurrencyConvertor />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
