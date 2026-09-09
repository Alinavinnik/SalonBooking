import { Link, NavLink } from "react-router";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={`container ${css.content}`}>
        <Link to="/">Logo</Link>
        <nav className={css.nav}>
          <NavLink to="/">Головна</NavLink>
          <NavLink to="/services">Послуги</NavLink>
          <NavLink to="/masters">Прайс</NavLink>
          <NavLink to="/about">Про нас</NavLink>
          <NavLink to="/contacts">Контакти</NavLink>
        </nav>
        <Link className={css.btn} to="/booking">
          Записатись
        </Link>
      </div>
    </header>
  );
};

export default Header;
