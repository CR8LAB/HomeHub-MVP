import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAgency } from "../services/auth.service.js";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await loginAgency(email, password);
      console.log("LOGIN RESULT:", result);
      localStorage.setItem("homehubAgencyToken", result.token);

      navigate("/portal");
    } catch (error) {
      console.error("Agency login failed:", error);

      setError(error.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h1>Agency Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
