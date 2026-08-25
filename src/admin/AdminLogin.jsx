import { useState } from "react";
import "./Admin.css";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (username === "admin" && password === "admin123") {
      onLogin();
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-brand">
          EA<span>.</span>
        </div>

        <p className="admin-login-label">
          EA TECH • ADMIN
        </p>

        <h1>
          Welcome back.
        </h1>

        <p className="admin-login-description">
          Sign in to manage your portfolio.
        </p>

        <form onSubmit={handleLogin}>

          <div className="admin-input-group">
            <label>
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
            />
          </div>


          <div className="admin-input-group">
            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>


          {error && (
            <p className="admin-login-error">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="admin-login-button"
          >
            Sign In ↗
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;