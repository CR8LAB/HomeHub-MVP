import { useEffect, useState } from "react";

import { getAllAgencies } from "../../services/admin-agency.service.js";

function AgenciesPage() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAgencies() {
      try {
        const result = await getAllAgencies();

        setAgencies(result.agencies);
      } catch (error) {
        console.error("Admin agencies load failed:", error);

        setError(error.message || "Unable to load agencies.");
      } finally {
        setLoading(false);
      }
    }

    loadAgencies();
  }, []);

  if (loading) {
    return <p>Loading agencies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="admin-agencies-page">
      <div className="page-header">
        <div>
          <p className="dashboard-eyebrow">Platform Management</p>

          <h1>Agencies</h1>

          <p>Manage agencies registered on the platform.</p>
        </div>
      </div>

      {agencies.length === 0 ? (
        <p>No agencies found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Agency</th>
                <th>City</th>
                <th>Prefix</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Codes</th>
                <th>Members</th>
              </tr>
            </thead>

            <tbody>
              {agencies.map((agency) => (
                <tr key={agency.id}>
                  <td>
                    <strong>{agency.name}</strong>

                    <div>{agency.slug}</div>
                  </td>

                  <td>{agency.city || "—"}</td>

                  <td>{agency.codePrefix || "—"}</td>

                  <td>{agency.status}</td>

                  <td>{agency.paymentStatus}</td>

                  <td>{agency.activationCodeCount}</td>

                  <td>{agency.memberCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AgenciesPage;
