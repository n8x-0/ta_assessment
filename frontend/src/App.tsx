import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CurrencyConvertor from "./pages/CurrencyConvertor";
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

        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
