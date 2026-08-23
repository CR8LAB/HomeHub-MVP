import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAgencyDashboard } from "../services/dashboard.service.js";

import { useAuth } from "../context/AuthContext.jsx";

import "../styles/dashboard.css";

function DashboardPage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setError("");

        const result = await getAgencyDashboard();

        setDashboard(result.dashboard);
      } catch (error) {
        console.error("Dashboard load failed:", error);

        setError(error.message || "Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="dashboard-state">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-state error">{error}</div>;
  }

  const activationRate =
    dashboard.totalCodes > 0
      ? Math.round((dashboard.activatedCodes / dashboard.totalCodes) * 100)
      : 0;

  return (
    <section className="agency-dashboard">
      {/* PAGE HEADER */}

      <div className="dashboard-heading">
        <div>
          <p className="dashboard-eyebrow">Agency Overview</p>

          <h1>Welcome back, {user?.firstName}</h1>

          <p className="dashboard-subtitle">
            Here's what's happening with <strong>{user?.agencyName}</strong>.
          </p>
        </div>

        <button
          className="primary-action"
          type="button"
          onClick={() => navigate("/portal/codes")}
        >
          Manage Activation Codes
        </button>
      </div>

      {/* STATS */}

      <div className="stats-grid">
        <article className="stat-card">
          <div className="stat-card-top">
            <span className="stat-label">Total Codes</span>

            <span className="stat-icon">#</span>
          </div>

          <strong className="stat-value">{dashboard.totalCodes}</strong>

          <span className="stat-description">
            Codes assigned to your agency
          </span>
        </article>

        <article className="stat-card">
          <div className="stat-card-top">
            <span className="stat-label">Available</span>

            <span className="stat-icon">✓</span>
          </div>

          <strong className="stat-value">{dashboard.availableCodes}</strong>

          <span className="stat-description">Ready for new homeowners</span>
        </article>

        <article className="stat-card">
          <div className="stat-card-top">
            <span className="stat-label">Activated</span>

            <span className="stat-icon">↗</span>
          </div>

          <strong className="stat-value">{dashboard.activatedCodes}</strong>

          <span className="stat-description">Successfully activated kits</span>
        </article>

        <article className="stat-card">
          <div className="stat-card-top">
            <span className="stat-label">Households</span>

            <span className="stat-icon">⌂</span>
          </div>

          <strong className="stat-value">{dashboard.totalHouseholds}</strong>

          <span className="stat-description">Connected households</span>
        </article>
      </div>

      {/* SECONDARY DASHBOARD AREA */}

      <div className="dashboard-grid">
        {/* ACTIVATION PERFORMANCE */}

        <article className="dashboard-card performance-card">
          <div className="card-heading">
            <div>
              <h2>Activation Performance</h2>

              <p>Current activation rate</p>
            </div>

            <strong className="percentage">{activationRate}%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${activationRate}%`,
              }}
            />
          </div>

          <div className="performance-stats">
            <div>
              <strong>{dashboard.activatedCodes}</strong>

              <span>Activated</span>
            </div>

            <div>
              <strong>{dashboard.availableCodes}</strong>

              <span>Available</span>
            </div>
          </div>
        </article>

        {/* QUICK ACTIONS */}

        <article className="dashboard-card">
          <div className="card-heading">
            <div>
              <h2>Quick Actions</h2>

              <p>Common agency tasks</p>
            </div>
          </div>

          <div className="quick-actions">
            <button type="button" onClick={() => navigate("/portal/codes")}>
              <span>Activation Codes</span>

              <span>→</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/portal/households")}
            >
              <span>View Households</span>

              <span>→</span>
            </button>

            <button type="button" onClick={() => navigate("/portal/services")}>
              <span>Services</span>

              <span>→</span>
            </button>
          </div>
        </article>
      </div>

      {/* RECENT ACTIVATIONS */}

      <article className="dashboard-card recent-card">
        <div className="card-heading">
          <div>
            <h2>Recent Activations</h2>

            <p>Latest households activated through your agency</p>
          </div>

          <button
            className="text-action"
            type="button"
            onClick={() => navigate("/portal/households")}
          >
            View All
          </button>
        </div>

        {dashboard.recentActivations?.length === 0 ? (
          <div className="empty-state">
            <strong>No activations yet</strong>

            <p>Activated households will appear here.</p>
          </div>
        ) : (
          <div className="recent-table-wrapper">
            <table className="recent-table">
              <thead>
                <tr>
                  <th>Household</th>
                  <th>Activation Code</th>
                  <th>City</th>
                  <th>Activated</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recentActivations?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.household.familyName}</td>

                    <td>
                      <span className="code-badge">{item.code}</span>
                    </td>

                    <td>{item.household.city}</td>

                    <td>
                      {item.claimedAt
                        ? new Date(item.claimedAt).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </section>
  );
}

export default DashboardPage;
