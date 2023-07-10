import styles from "./SideBar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import AppFooter from "./AppFooter";
import { Outlet } from "react-router-dom";
export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <AppFooter />
    </div>
  );
}
