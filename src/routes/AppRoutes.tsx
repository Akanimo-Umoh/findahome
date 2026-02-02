import { Route, Routes } from "react-router-dom";
import { Home } from "@/pages/home";
import {
  AuthLayout,
  ForgotPassword,
  Login,
  ResetPassword,
  ResetPasswordSuccess,
  Signup,
  VerifyEmail,
  VerifyEmailSuccess,
} from "@/pages/auth";
import RoleBasedRoute from "./RoleBasedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import MainLayout from "@/layouts/MainLayout";

// User Pages (buyers)
import { Dashboard as UserDashboard } from "@/pages/user/dashboard";
import { Agents } from "@/pages/user/agents";

// Agent Pages
import { Dashboard as AgentDashboard } from "@/pages/agent/dashboard";
import { Properties as AgentProperties } from "@/pages/agent/properties";
import { AddProperty } from "@/pages/agent/add-property";
import { Clients as AgentClients } from "@/pages/agent/clients";

// Admin Pages
import { Dashboard as AdminDashboard } from "@/pages/admin/dashboard";
import { Users as AdminUsers } from "@/pages/admin/users";
import { Agents as AdminAgents } from "@/pages/admin/agents";
import { Properties as AdminProperties } from "@/pages/admin/properties";
import { Settings as AdminSettings } from "@/pages/admin/settings";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ==================== PUBLIC ROUTES ==================== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* ==================== AUTH ROUTES ==================== */}
      {/* Only accessible when NOT logged in */}
      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/reset-password/success"
            element={<ResetPasswordSuccess />}
          />
        </Route>
      </Route>

      {/* ==================== VERIFICATION ROUTES ==================== */}
      {/* Accessible during signup/login flow */}
      <Route element={<AuthLayout />}>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-email/success" element={<VerifyEmailSuccess />} />
      </Route>

      {/* ==================== USER ROUTES (BUYERS) ==================== */}
      {/* Only for users with role: "user" */}
      <Route element={<RoleBasedRoute allowedRoles={["user"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/properties" element={<div>User Properties</div>} />
          <Route path="/favorites" element={<div>Favorites</div>} />
          <Route path="/profile" element={<div>User Profile</div>} />
          <Route path="/settings" element={<div>User Settings</div>} />
        </Route>
      </Route>

      {/* ==================== AGENT ROUTES ==================== */}
      {/* Only for users with role: "agent" */}
      <Route element={<RoleBasedRoute allowedRoles={["agent"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route path="/agent/properties" element={<AgentProperties />} />
          <Route path="/agent/properties/add" element={<AddProperty />} />
          <Route
            path="/agent/properties/edit/:id"
            element={<div>Edit Property</div>}
          />
          <Route path="/agent/clients" element={<AgentClients />} />
          <Route
            path="/agent/appointments"
            element={<div>Agent Appointments</div>}
          />
          <Route path="/agent/analytics" element={<div>Agent Analytics</div>} />
          <Route path="/agent/profile" element={<div>Agent Profile</div>} />
          <Route path="/agent/settings" element={<div>Agent Settings</div>} />
        </Route>
      </Route>

      {/* ==================== ADMIN ROUTES ==================== */}
      {/* Only for users with role: "admin" */}
      <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/agents" element={<AdminAgents />} />
          <Route path="/admin/properties" element={<AdminProperties />} />
          <Route
            path="/admin/transactions"
            element={<div>Admin Transactions</div>}
          />
          <Route path="/admin/reports" element={<div>Admin Reports</div>} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* ==================== SHARED PROTECTED ROUTES ==================== */}
      {/* Accessible by all authenticated users */}
      <Route
        element={<RoleBasedRoute allowedRoles={["user", "agent", "admin"]} />}
      >
        <Route element={<MainLayout />}>
          <Route path="/notifications" element={<div>Notifications</div>} />
          <Route path="/messages" element={<div>Messages</div>} />
          <Route path="/help" element={<div>Help Center</div>} />
        </Route>
      </Route>

      {/* ==================== 404 - NOT FOUND ==================== */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}
