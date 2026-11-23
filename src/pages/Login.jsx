import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { loginUser } from "../services/api.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { token, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const t = loginUser(email, password);
    if (t) {
      login(t);
      navigate("/dashboard");
    } else {
      setError("Wrong email or password");
    }
  };

  return (
    <div className="login-page">
      <form className="box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <p className="error">{error}</p>
        <button className="btn" type="submit">Login</button>

        <p className="note">email: admin@gmail.com, password: 123456</p>
      </form>
    </div>
  );
}

export default Login;
