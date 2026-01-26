import { Link } from "react-router-dom";
import HeaderNavigations from "./HeaderNavigations";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Converter",
    path: "/app",
  },
  {
    name: "History",
    path: "/history",
  },
  {
    name: "About",
    path: "/about",
  },
];
const Header = () => {
  return (
    <header className="sticky-top bg-white border-bottom shadow-sm">
      <nav className="navbar navbar-expand-lg container-fluid py-3">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="fs-3 me-2 fw-bold">n8x</span>
            <span className="h3 mb-0 fw-normal"> Currency Converter</span>
          </Link>

          <HeaderNavigations navLinks={navLinks} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
