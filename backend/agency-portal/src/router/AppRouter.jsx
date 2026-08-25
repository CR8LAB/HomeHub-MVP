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

import AdminProtectedRoute from "../components/AdminProtectedRoute.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

import AdminLoginPage from "../pages/admin/AdminLoginPage.jsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import AgenciesPage from "../pages/admin/AgenciesPage.jsx";
import AdminActivationCodesPage from "../pages/admin/ActivationCodesPage.jsx";
import PrintQueuePage from "../pages/admin/PrintQueuePage.jsx";
import PaymentsPage from "../pages/admin/PaymentsPage.jsx";

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

        {/* ======================================
    SUPER ADMIN
====================================== */}

        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />

          <Route path="agencies" element={<AgenciesPage />} />

          <Route path="codes" element={<AdminActivationCodesPage />} />

          <Route path="print-queue" element={<PrintQueuePage />} />

          <Route path="payments" element={<PaymentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
