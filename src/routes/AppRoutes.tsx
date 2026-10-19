import { Route, Routes } from "react-router-dom"
import { Home } from "@/pages/home"
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
} from "@/pages/auth"
import RoleBasedRoute from "./RoleBasedRoute"
import PublicOnlyRoute from "./PublicOnlyRoute"
import MainLayout from "@/layouts/MainLayout"
import AdminLayout from "@/layouts/AdminLayout"

// User Pages (buyers)
import { Dashboard as UserDashboard } from "@/pages/user/dashboard"
import { FindAgents } from "@/pages/user/agents/find-agents"
// import { FundWallet, Wallet } from "@/pages/user/wallet"
import {
  PropertyEscrowTransaction,
  PropertyPayment,
} from "@/pages/user/propertyPayment"
import { TransactionReceipt } from "@/pages/user/receipt"
import { Recent } from "@/pages/user/recent"
import { SavedProperties } from "@/pages/user/saved-properties"
import { UserTransactionDetails } from "@/pages/user/transaction/transaction-details"
import { UserVisitDetails } from "@/pages/user/transaction/visit-details"
import { UserConfirmVisit } from "@/pages/user/transaction/confirm-visit"
import { UserTransactionReceipt } from "@/pages/user/transaction/transaction-receipt"
import {
  PurchasePaymentCallback,
  UserPropertyPayment,
} from "@/pages/user/transaction/property-payment"
import { AgentProfile } from "@/pages/user/agents/agent-profile"
import { Profile } from "@/pages/user/profile/my-profile"
import { EditPersonalInfo } from "@/pages/user/profile/edit-personal-info"
import { ChangePassword as UserChangePassword } from "@/pages/user/profile/change-password"
import { Feedback as UserFeedback } from "@/pages/user/profile/feedback"

// Agent Pages
import { Dashboard as AgentDashboard } from "@/pages/agent/dashboard"
import { AddProperty, PropertyPreview } from "@/pages/agent/add-property"
import { Profile as MyAgentProfile } from "@/pages/agent/profile/my-profile"

// Admin Pages
import { Dashboard as AdminDashboard } from "@/pages/admin/dashboard"
import { Users as AdminUsers } from "@/pages/admin/users"
import { Agents as AdminAgents } from "@/pages/admin/agents"
import { Settings as AdminSettings } from "@/pages/admin/settings"
import { AllProperties } from "@/pages/properties"
import { SearchResults } from "@/pages/search"
import { PropertyDetails } from "@/pages/propertyDetails"
import NormalLayout from "@/layouts/NormalLayout"
import {
  Properties as AdminProperties,
  PropertyDetails as AdminPropertyDetails,
} from "@/pages/admin/properties"

import { Miscellaneous } from "@/a"
import { MyListings } from "@/pages/agent/my-listings"
import { MyTransactions } from "@/pages/agent/my-transaction"
import Chats from "@/components/shared/Chats"
// import { TransactionDetails } from "@/pages/agent/transaction-details"
import { MyDisputes } from "@/pages/disputes/my-dispute"
// import { DisputeDetails } from "@/pages/user/dispute/dispute-detail"
import { OpenDispute } from "@/pages/disputes/open-dispute"
import AgentLayout from "@/layouts/AgentLayout"
import { MyAds } from "@/pages/agent/ads/my-ads"
import { ChangePassword } from "@/pages/agent/profile/change-password"
import { AgentOnboarding, OnboardingSuccess } from "@/pages/agent/onboarding"
import BlockRoleRoute from "./BlockedRoleRoute"
import { CreateAd } from "@/pages/agent/ads/create-ad"
import AgentTransactionDetails from "@/pages/agent/my-transaction/AgentTransactionDetails"
import AgentVisitDetails from "@/pages/agent/my-transaction/AgentVisitDetails"
import AgentConfirmVisit from "@/pages/agent/my-transaction/AgentConfirmVisit"
import ScheduleInspection from "@/pages/agent/my-transaction/ScheduleInspection"
import AdPreview from "@/pages/agent/ads/create-ad/AdPreview"
import AdPaymentSummary from "@/pages/agent/ads/create-ad/AdPaymentSummary"
import { AdDetails } from "@/pages/agent/ads/ad-details"
import { EditAd } from "@/pages/agent/ads/edit-ad"
import { MyWallet } from "@/pages/agent/wallet/my-wallet"
import { ManageAccount } from "@/pages/agent/wallet/manage-account"
import { AddAccount } from "@/pages/agent/wallet/add-account"
import { WithdrawFunds } from "@/pages/agent/wallet/withdraw-funds"
import {
  FundWallet,
  FundWalletCallback,
} from "@/pages/agent/wallet/fund-wallet"
import InspectionPaymentCallback from "@/components/shared/InspectionPaymentCallback"
import ScheduleHandover from "@/pages/agent/my-transaction/ScheduleHandover"
import { UserPurchaseConfirmVisit } from "@/pages/user/transaction/purchase-confirm-visit"
import AgentListings from "@/components/agent-profile/AgentListings"
import { UserOnboarding } from "@/pages/user/onboarding"
import AdminPlaceholder from "@/components/admin/ui/AdminPlaceholder"

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES
      cannot be accessed by the agent and admin*/}
      <Route element={<BlockRoleRoute blockedRoles={["agent"]} />}>
        <Route element={<MainLayout />}>
          <Route element={<BlockRoleRoute blockedRoles={["admin"]} />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>

        {/* public routes without the footer*/}
        <Route element={<NormalLayout />}>
          <Route path="/available-properties" element={<AllProperties />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Route>
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
        <Route path="/onboarding" element={<UserOnboarding />} />
        <Route path="/onboarding/success" element={<OnboardingSuccess />} />

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
          <Route path="/profile/edit" element={<EditPersonalInfo />} />
          <Route
            path="/profile/change-password"
            element={<UserChangePassword />}
          />
          <Route path="/profile/feedback" element={<UserFeedback />} />
          <Route
            path="/inspection-payment/callback"
            element={<InspectionPaymentCallback />}
          />

          <Route path="/agents" element={<FindAgents />} />
          <Route path="/agents/:agentId" element={<AgentProfile />} />
          <Route path="/agents/:agentId/listings" element={<AgentListings />} />
        </Route>
      </Route>

      <Route element={<NormalLayout />}>
        {/* user transactions */}
        <Route
          path="/transactions/:transactionId"
          element={<UserTransactionDetails />}
        />
        <Route
          path="/transactions/:transactionId/visit"
          element={<UserVisitDetails />}
        />
        <Route
          path="/transactions/:transactionId/confirm-inspection"
          element={<UserConfirmVisit />}
        />
        <Route
          path="/property-payment/:transactionId"
          element={<UserPropertyPayment />}
        />
        <Route
          path="/property-payment/callback"
          element={<PurchasePaymentCallback />}
        />
        <Route
          path="/transactions/:transactionId/receipt"
          element={<UserTransactionReceipt />}
        />

        <Route path="/recent-activities" element={<Recent />} />

        {/* wallet */}
        {/* <Route path="/wallet" element={<Wallet />} /> */}
        {/* fund wallet */}
        {/* <Route path="/fund-wallet" element={<FundWallet />} /> */}
        {/* escrow transaction details */}
        <Route
          path="/escrow-transactions-details"
          element={<PropertyEscrowTransaction />}
        />
        {/* <Route path="/visit-details" element={<InspectionVisitDetails />} /> */}

        {/* <Route
          path="/confirm-inspection"
          element={<InspectionConfirmation />}
        /> */}

        {/* <Route path="/confirm-handover" element={<ConfirmHandover />} /> */}
        <Route path="/property-payment" element={<PropertyPayment />} />
        <Route
          path="/transactions/:transactionId/confirm-handover"
          element={<UserPurchaseConfirmVisit />}
        />

        <Route path="/transaction-receipt" element={<TransactionReceipt />} />

        {/* user transaction details */}
        {/* <Route
          path="/transaction-details"
          element={<UserTransactionDetails />}
        /> */}
      </Route>

      {/* ==================== AGENT ROUTES ==================== */}
      {/* Only for users with role: "agent" */}
      <Route element={<RoleBasedRoute allowedRoles={["agent"]} />}>
        <Route path="/agent/onboarding" element={<AgentOnboarding />} />
        <Route
          path="/agent/onboarding/success"
          element={<OnboardingSuccess />}
        />

        <Route element={<AgentLayout />}>
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route path="/agent/my-listings" element={<MyListings />} />
          <Route path="/agent/add-property" element={<AddProperty />} />
          <Route path="/agent/edit-property/:id" element={<AddProperty />} />
          <Route path="/agent/my-ads" element={<MyAds />} />
          <Route path="/agent/ad-details/:id" element={<AdDetails />} />
          <Route path="/agent/create-ad" element={<CreateAd />} />
          <Route path="/agent/ad-preview" element={<AdPreview />} />
          <Route
            path="/agent/ad-payment-summary"
            element={<AdPaymentSummary />}
          />
          <Route path="/agent/edit-ad/:id" element={<EditAd />} />
          <Route path="/agent/wallet" element={<MyWallet />} />
          <Route path="/agent/manage-account" element={<ManageAccount />} />
          <Route path="/agent/add-account" element={<AddAccount />} />
          <Route path="/agent/withdraw-funds" element={<WithdrawFunds />} />
          <Route path="/agent/fund-wallet" element={<FundWallet />} />
          <Route
            path="/agent/fund-wallet/callback"
            element={<FundWalletCallback />}
          />

          {/* any cleared or confirmed route goes up */}

          <Route path="/agent/transactions" element={<MyTransactions />} />
          <Route
            path="/agent/transactions/:transactionId"
            element={<AgentTransactionDetails />}
          />
          <Route
            path="/agent/transactions/:transactionId/schedule-inspection"
            element={<ScheduleInspection />}
          />
          <Route
            path="/agent/transactions/:transactionId/schedule-handover"
            element={<ScheduleHandover />}
          />
          <Route
            path="/agent/transactions/:transactionId/visit"
            element={<AgentVisitDetails />}
          />
          <Route
            path="/agent/transactions/:transactionId/confirm-inspection"
            element={<AgentConfirmVisit />}
          />
          <Route
            path="/agent/transactions/:transactionId/confirm-handover"
            element={<AgentConfirmVisit />}
          />

          <Route
            path="/agent/property-preview/:id"
            element={<PropertyPreview />}
          />
          <Route path="/agent/profile" element={<MyAgentProfile />} />

          <Route path="/agent/change-password" element={<ChangePassword />} />
        </Route>

        <Route path="/agent/onboarding" element={<AgentOnboarding />} />
      </Route>

      <Route element={<NormalLayout />}>
        {/* don't forget to add the links for the different dashboards route */}

        <Route path="/agent/mis" element={<Miscellaneous />} />
      </Route>

      {/* ==================== ADMIN ROUTES ==================== */}
      {/* Only for users with role: "admin" */}
      <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/agents" element={<AdminAgents />} />
          <Route path="/admin/properties" element={<AdminProperties />} />
          <Route
            path="/admin/properties/:propertyId"
            element={<AdminPropertyDetails />}
          />
          <Route
            path="/admin/transactions"
            element={<div>Admin Transactions</div>}
          />
          <Route path="/admin/reports" element={<div>Admin Reports</div>} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/ads" element={<AdminPlaceholder />} />
          <Route path="/admin/transactions" element={<AdminPlaceholder />} />
          <Route path="/admin/payouts" element={<AdminPlaceholder />} />
          <Route path="/admin/reports" element={<AdminPlaceholder />} />
          <Route path="/admin/disputes" element={<AdminPlaceholder />} />
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
          <Route path="/messages/:chatId" element={<Chats />} />
          <Route
            path="/open-dispute/:transactionId?"
            element={<OpenDispute />}
          />
          <Route path="/disputes" element={<MyDisputes />} />
          <Route path="/disputes/:disputeId" element={<MyDisputes />} />
        </Route>
      </Route>

      {/* ==================== 404 - NOT FOUND ==================== */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  )
}
