import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import PatientSearch from "./pages/PatientSearch";
import PatientRegistration from "./pages/PatientRegistration";
import MedicationCheck from "./pages/MedicationCheck";
import RiskResult from "./pages/RiskResult";
import PatientDashboard from "./pages/PatientDashboard";
import OTCSafetyCheck from "./pages/OTCSafetyCheck";
import PatientRiskResult from "./pages/PatientRiskResult";
import ProviderLogin from "./pages/ProviderLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PatientLogin from "./pages/PatientLogin";
import PatientProfile from "./pages/PatientProfile";
import HighRiskAnalytics from "./pages/HighRiskAnalytics";
import DrugFlagAnalytics from "./pages/DrugFlagAnalytics";
import SMSFallbackError from "./pages/SMSFallbackError";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Provider Routes */}
        <Route path="/provider/login" element={<ProviderLogin />} />
        <Route path="/provider/dashboard" element={<AdminDashboard />} />
        <Route
          path="/provider/patient-registration"
          element={<PatientRegistration />}
        />
        <Route path="/provider/patient-search" element={<PatientSearch />} />
        <Route
          path="/provider/medication-check"
          element={<MedicationCheck />}
        />
        <Route path="/provider/risk-result" element={<RiskResult />} />
        <Route path="/provider/patient-profile" element={<PatientProfile />} />
        <Route path="/provider/settings" element={<Settings />} />
        <Route path="/provider/reports" element={<Reports />} />

        {/* Analytics Routes */}
        <Route
          path="/provider/analytics/high-risk"
          element={<HighRiskAnalytics />}
        />
        <Route
          path="/provider/analytics/drug-flags"
          element={<DrugFlagAnalytics />}
        />
        <Route
          path="/provider/analytics/sms-error"
          element={<SMSFallbackError />}
        />

        {/* Patient Routes */}
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/otc-check" element={<OTCSafetyCheck />} />
        <Route path="/patient/risk-result" element={<PatientRiskResult />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
