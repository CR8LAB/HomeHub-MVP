import { getCurrentAgencyUser } from "../services/auth.service.js";
import { useEffect } from "react";

function DashboardPage() {
  useEffect(() => {
    async function testCurrentUser() {
      try {
        const result = await getCurrentAgencyUser();

        console.log("CURRENT AGENCY USER:", result);
      } catch (error) {
        console.error("CURRENT USER TEST FAILED:", error);
      }
    }

    testCurrentUser();
  }, []);

  return <h1>Agency Dashboard</h1>;
}

export default DashboardPage;
