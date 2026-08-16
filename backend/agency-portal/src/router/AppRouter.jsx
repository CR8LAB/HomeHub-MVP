import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout.jsx";
import PortalLayout from "../layouts/PortalLayout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";

import ActivationCodesPage from "../pages/ActivationCodesPage.jsx";
import HouseholdsPage from "../pages/HouseholdsPage.jsx";
import ServicesPage from "../pages/ServicesPage.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />

          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* AGENCY PORTAL */}
        <Route
          path="/portal"
          element={
            <ProtectedRoute>
              <PortalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />

          <Route path="codes" element={<ActivationCodesPage />} />

          <Route path="households" element={<HouseholdsPage />} />

          <Route path="services" element={<ServicesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
