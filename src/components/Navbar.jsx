import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">P</span>
        <div>
          <strong>Stockroom</strong>
          <span>PRODUCT MANAGEMENT</span>
        </div>
      </div>
      <div className="navbar-actions">
        <span className="user-avatar" aria-hidden="true">A</span>
        <span className="user-name">Admin</span>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}

export default Navbar;
