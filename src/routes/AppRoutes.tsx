import { Route, Routes } from "react-router-dom";
import { Home } from "@/pages/home";
import {
  AuthLayout,
  ForgotPassword,
  Login,
  ResetPassword,
  ResetPasswordSuccess,
  RoleSelection,
  Signup,
  VerifyEmail,
  VerifyEmailSuccess,
} from "@/pages/auth";
import RoleBasedRoute from "./RoleBasedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import MainLayout from "@/layouts/MainLayout";

// User Pages (buyers)
import { Dashboard as UserDashboard } from "@/pages/user/dashboard";
import { AgentProfile, Agents } from "@/pages/user/agents";

// Agent Pages
import { Dashboard as AgentDashboard } from "@/pages/agent/dashboard";
import { Properties as AgentProperties } from "@/pages/agent/properties";
import { AddProperty, PropertyPreview } from "@/pages/agent/add-property";
import { Clients as AgentClients } from "@/pages/agent/clients";
import { Profile as MyAgentProfile } from "@/pages/agent/profile";

// Admin Pages
import { Dashboard as AdminDashboard } from "@/pages/admin/dashboard";
import { Users as AdminUsers } from "@/pages/admin/users";
import { Agents as AdminAgents } from "@/pages/admin/agents";
import { Properties as AdminProperties } from "@/pages/admin/properties";
import { Settings as AdminSettings } from "@/pages/admin/settings";
import { AllProperties } from "@/pages/properties";
import { SearchResults } from "@/pages/search";
import { PropertyDetails } from "@/pages/propertyDetails";
import NormalLayout from "@/layouts/NormalLayout";
// import { ChatMessages, Chats } from "@/pages/user/chats";
import {
  // EscrowTransactionsDetails,
  FundWallet,
  Wallet,
} from "@/pages/user/wallet";
import {
  Inspection,
  InspectionConfirmation,
  InspectionVisitDetails,
} from "@/pages/user/inspection";
import {
  PropertyEscrowTransaction,
  PropertyPayment,
} from "@/pages/user/propertyPayment";
import { PropertyHandoverSchedule } from "@/pages/user/propertyHandover";
import { PropertyVisitDetails } from "@/pages/user/visitDetails";
import { ConfirmHandover } from "@/pages/user/confirmHandover";
import { TransactionReceipt } from "@/pages/user/receipt";
import { Recent } from "@/pages/user/recent";
import { Profile } from "@/pages/user/profile";
import {
  DisputeDetail,
  Disputes,
  DisputeSubmitted,
  OpenDispute,
} from "@/pages/user/disputes";
import { Miscellaneous } from "@/a";
import { MyListings } from "@/pages/agent/my-listings";
import { MyTransactions } from "@/pages/agent/my-transaction";
import { SavedProperties } from "@/pages/user/saved-properties";
import Chats from "@/components/Chats";
import ChatMessages from "@/components/ChatMessages";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* public routes without the footer */}
      <Route path="/properties" element={<AllProperties />} />
      <Route element={<NormalLayout />}>
        <Route path="/search" element={<SearchResults />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Route>

      {/* AUTH ROUTES */}
      {/* Only accessible when NOT logged in */}
      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<RoleSelection />} />
          <Route path="/signup/:role" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/reset-password/success"
            element={<ResetPasswordSuccess />}
          />
        </Route>
      </Route>

      {/* VERIFICATION ROUTES */}
      {/* Accessible during signup/login flow */}
      <Route element={<AuthLayout />}>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-email/success" element={<VerifyEmailSuccess />} />
      </Route>

      {/* ==================== USER ROUTES (BUYERS) ==================== */}
      {/* Only for users with role: "user" */}
      <Route element={<RoleBasedRoute allowedRoles={["user"]} />}>
        {/* routes with both navbar and footer  for the user*/}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          {/* <Route path="/properties" element={<div>User Properties</div>} /> */}

          <Route path="/settings" element={<div>User Settings</div>} />
        </Route>

        {/* routes without the footer for the user */}
        <Route element={<NormalLayout />}>
          <Route path="/saved-properties" element={<SavedProperties />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<NormalLayout />}>
        <Route path="/my-dispute" element={<Disputes />} />
        <Route path="/dispute-detail" element={<DisputeDetail />} />
        <Route path="/open-dispute" element={<OpenDispute />} />
        <Route path="/open-dispute/submitted" element={<DisputeSubmitted />} />
        <Route path="/recent-activities" element={<Recent />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agent-profile" element={<AgentProfile />} />

        {/* wallet */}
        <Route path="/wallet" element={<Wallet />} />
        {/* fund wallet */}
        <Route path="/fund-wallet" element={<FundWallet />} />
        {/* escrow transaction details */}
        <Route
          path="/escrow-transactions-details"
          element={<PropertyEscrowTransaction />}
        />
        <Route path="/inspection" element={<Inspection />} />
        <Route path="/visit-details" element={<InspectionVisitDetails />} />
        <Route
          path="/property-visit-details"
          element={<PropertyVisitDetails />}
        />
        <Route
          path="/confirm-inspection"
          element={<InspectionConfirmation />}
        />
        <Route path="/confirm-handover" element={<ConfirmHandover />} />
        <Route path="/property-payment" element={<PropertyPayment />} />
        <Route
          path="/property-handover-schedule"
          element={<PropertyHandoverSchedule />}
        />
        <Route path="/transaction-receipt" element={<TransactionReceipt />} />
      </Route>

      {/* ==================== AGENT ROUTES ==================== */}
      {/* Only for users with role: "agent" */}
      <Route element={<RoleBasedRoute allowedRoles={["agent"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/agent/properties" element={<AgentProperties />} />
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

        <Route element={<NormalLayout />}>
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route path="/agent/add-property" element={<AddProperty />} />
          <Route path="/agent/profile" element={<MyAgentProfile />} />
        </Route>
      </Route>

      <Route element={<NormalLayout />}>
        {/* don't forget to add the links for the different dashboards route */}
        <Route path="/agent/mis" element={<Miscellaneous />} />
        <Route path="/agent/my-listings" element={<MyListings />} />
        <Route path="/agent/preview" element={<PropertyPreview />} />
        <Route path="/agent/my-transactions" element={<MyTransactions />} />
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
          <Route path="/help" element={<div>Help Center</div>} />
        </Route>

        <Route element={<NormalLayout />}>
          {/* chats list */}
          <Route path="/messages" element={<Chats />} />
          {/* single chat */}
          <Route path="/messages/chat" element={<ChatMessages />} />
          <Route path="/messages/:chatId" element={<ChatMessages />} />
        </Route>
      </Route>

      {/* ==================== 404 - NOT FOUND ==================== */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}
