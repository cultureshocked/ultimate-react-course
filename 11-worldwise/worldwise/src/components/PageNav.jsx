import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <Logo />
      </Link>
      <ul>
        <li></li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Log In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
