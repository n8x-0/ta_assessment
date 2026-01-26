import { useState } from "react";
import { NavLink } from "react-router-dom";

interface NavLinksProps {
  name: string;
  path: string;
}
const HeaderNavigations = ({ navLinks }: { navLinks: NavLinksProps[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="navbar-toggler border-0"
        type="button"
        onClick={toggleNavbar}
        aria-expanded={isOpen}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav ms-auto">
          {navLinks.map((dat, index) => (
            <li className="nav-item mx-2" key={index}>
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary fw-bold" : "text-dark"}`
                }
                to={dat.path}
                onClick={() => setIsOpen(false)}
              >
                {dat.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HeaderNavigations;
