import { useEffect, useState } from "react";

import {
  getAgencyActivationCodes,
  createAgencyActivationCode,
} from "../services/activationCode.service.js";

function ActivationCodesPage() {
  const [codes, setCodes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function loadCodes() {
    try {
      setError("");

      const result = await getAgencyActivationCodes();

      setCodes(result.activationCodes);
    } catch (error) {
      console.error("Activation codes load failed:", error);

      setError(error.message || "Unable to load activation codes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCodes();
  }, []);

  async function handleCreateCode() {
    try {
      setCreating(true);
      setError("");
      setSuccessMessage("");

      const result = await createAgencyActivationCode();

      setSuccessMessage(
        `Activation code ${result.activationCode.code} created successfully.`,
      );

      await loadCodes();
    } catch (error) {
      console.error("Create activation code failed:", error);

      setError(error.message || "Unable to create activation code.");
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return <p>Loading activation codes...</p>;
  }

  return (
    <section className="activation-codes-page">
      <div className="page-header">
        <div>
          <h1>Activation Codes</h1>

          <p>Manage activation codes assigned to your agency.</p>
        </div>

        <button type="button" onClick={handleCreateCode} disabled={creating}>
          {creating ? "Generating..." : "Generate Activation Code"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {successMessage && <p className="success-message">{successMessage}</p>}

      {codes.length === 0 ? (
        <p>No activation codes found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Status</th>
                <th>Household</th>
                <th>City</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {codes.map((item) => (
                <tr key={item.id}>
                  <td>{item.code}</td>

                  <td>{item.isClaimed ? "Activated" : "Available"}</td>

                  <td>{item.household?.familyName || "—"}</td>

                  <td>{item.household?.city || "—"}</td>

                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ActivationCodesPage;
