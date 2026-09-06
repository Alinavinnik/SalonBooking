import { Link, NavLink } from "react-router";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <Link to="/">Logo</Link>
      <nav>
        <NavLink to="/">Головна</NavLink>
        <NavLink to="/services">Послуги</NavLink>
        <NavLink to="/masters" end>
          Наші Майстри
        </NavLink>
      </nav>
      <Link to="/booking">Записатись</Link>
    </header>
  );
};

export default Header;
