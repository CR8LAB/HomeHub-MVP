import { useEffect, useState } from "react";

import { getAgencyDashboard } from "../services/dashboard.service.js";

function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
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
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h1>Agency Dashboard</h1>

      <div>
        <h3>Total Activation Codes</h3>
        <strong>{dashboard.totalCodes}</strong>
      </div>

      <div>
        <h3>Activated Homes</h3>
        <strong>{dashboard.activatedCodes}</strong>
      </div>

      <div>
        <h3>Available Codes</h3>
        <strong>{dashboard.availableCodes}</strong>
      </div>

      <div>
        <h3>Households</h3>
        <strong>{dashboard.totalHouseholds}</strong>
      </div>
    </section>
  );
}

export default DashboardPage;
