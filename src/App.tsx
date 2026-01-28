import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import {
  AuthLayout,
  Login,
  Signup,
  VerifyEmail,
  VerifyEmailSuccess,
} from "./pages/auth";
import { Dashboard } from "./pages/dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import GuestRoute from "./routes/GuestRoute";
import VerificationRoute from "./routes/VerificationRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* auth routes */}
          <Route element={<AuthLayout />}>
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route element={<VerificationRoute />}>
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route
                path="/verify-email/success"
                element={<VerifyEmailSuccess />}
              />
            </Route>
          </Route>

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
