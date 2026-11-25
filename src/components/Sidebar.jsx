import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="sidebar-label">WORKSPACE</p>
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        <span aria-hidden="true">▦</span> Dashboard
      </NavLink>
      <NavLink to="/products" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        <span aria-hidden="true">▤</span> Products
      </NavLink>
      <NavLink to="/add-product" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        <span aria-hidden="true">＋</span> Add product
      </NavLink>
      <div className="sidebar-tip">
        <span aria-hidden="true">✦</span>
        <strong>Stay on top of stock</strong>
        <p>Check low-stock items regularly to keep your shelves ready.</p>
      </div>
    </aside>
  );
}

export default Sidebar;
