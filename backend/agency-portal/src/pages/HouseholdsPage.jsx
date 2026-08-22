import { useEffect, useState } from "react";

import { getAgencyHouseholds } from "../services/household.service.js";

function HouseholdsPage() {
  const [households, setHouseholds] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHouseholds() {
      try {
        const result = await getAgencyHouseholds();

        setHouseholds(result.households);
      } catch (error) {
        console.error("Households load failed:", error);

        setError(error.message || "Unable to load households.");
      } finally {
        setLoading(false);
      }
    }

    loadHouseholds();
  }, []);

  if (loading) {
    return <p>Loading households...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="households-page">
      <div className="page-header">
        <div>
          <h1>Households</h1>

          <p>Homes activated through your agency.</p>
        </div>
      </div>

      {households.length === 0 ? (
        <p>No activated households yet.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Household</th>
                <th>Activation Code</th>
                <th>City</th>
                <th>Activated</th>
              </tr>
            </thead>

            <tbody>
              {households.map((item) => (
                <tr key={item.activationCodeId}>
                  <td>{item.household.familyName}</td>

                  <td>{item.activationCode}</td>

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
    </section>
  );
}

export default HouseholdsPage;
