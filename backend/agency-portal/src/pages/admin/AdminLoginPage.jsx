import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAdminAuth } from "../../context/AdminAuthContext.jsx";

function AdminLoginPage() {
  const navigate = useNavigate();

  const { signIn } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signIn(email, password);

      navigate("/admin");
    } catch (error) {
      console.error("Super admin login failed:", error);

      setError(error.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section>
        <p>HomeRoots</p>

        <h1>Platform Administration</h1>

        <p>Sign in to manage the HomeRoots platform.</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="admin-email">Email</label>

            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="admin-password">Password</label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AdminLoginPage;
