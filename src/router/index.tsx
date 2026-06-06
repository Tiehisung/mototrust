import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "@/utils/ScrollToTop";
import AdminLayout from "@/pages/admin/layout";

// Layouts
// import MainLayout from "@/layouts/MainLayout";
// import AuthLayout from "@/layouts/AuthLayout";

// import DashboardLayout from "@/layouts/DashboardLayout";

// Public Pages
// import HomePage from "@/pages/public/HomePage";
// import BrowseListingsPage from "@/pages/public/BrowseListingsPage";
// import ListingDetailPage from "@/pages/public/ListingDetailPage";
// import NotFound from "@/pages/public/NotFound";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
// import NotAuthorizedPage from "@/pages/auth/NotAuthorizedPage";

// Dashboard Pages (Seller/Buyer)
// import DashboardPage from "@/pages/dashboard/DashboardPage";
// import MyListingsPage from "@/pages/dashboard/MyListingsPage";
// import CreateListingPage from "@/pages/dashboard/CreateListingPage";
// import EditListingPage from "@/pages/dashboard/EditListingPage";
// import PaymentHistoryPage from "@/pages/dashboard/PaymentHistoryPage";
// import MyInspectionsPage from "@/pages/dashboard/MyInspectionsPage";
// import ProfilePage from "@/pages/dashboard/ProfilePage";
// import VerifyIdentityPage from "@/pages/dashboard/VerifyIdentityPage";

// Admin Pages
// import AdminOverviewPage from "@/pages/admin/AdminOverviewPage";
// import AdminListingsPage from "@/pages/admin/AdminListingsPage";
// import AdminUsersPage from "@/pages/admin/AdminUsersPage";
// import AdminInspectionsPage from "@/pages/admin/AdminInspectionsPage";
// import AdminPaymentsPage from "@/pages/admin/AdminPaymentsPage";

// Components
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { EUserRole } from "@/types/user";
import HomePage from "@/pages/LandingPage";
import MainLayout from "@/pages/Layout";
import NotFound from "@/pages/NotFound";
import NotAuthorizedPage from "@/pages/auth/NotAuthorized";
import AuthLayout from "@/pages/auth/AuthLayout";

// Wrapper for Admin with ScrollToTop
const AdminLayoutWithScroll = () => (
  <>
    <ScrollToTop />
    <AdminLayout />
  </>
);

const DashboardLayoutWithScroll = () => (
  <>
    <ScrollToTop />
    {/* <DashboardLayout /> */}
  </>
);

const applicationRouter = createBrowserRouter([
  // ============================================
  // PUBLIC ROUTES
  // ============================================
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // {
      //   path: "browse",
      //   element: <BrowseListingsPage />,
      // },
      // {
      //   path: "listing/:listingId",
      //   element: <ListingDetailPage />,
      // },
      {
        path: "unauthorized",
        element: <NotAuthorizedPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  // ============================================
  // AUTH ROUTES
  // ============================================
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },

  // ============================================
  // DASHBOARD ROUTES (Seller & Buyer)
  // ============================================
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={[EUserRole.SELLER, EUserRole.BUYER]}>
        <DashboardLayoutWithScroll />
      </ProtectedRoute>
    ),
    children: [
      // { index: true, element: <DashboardPage /> },
      // {
      //   path: "profile",
      //   element: <ProfilePage />,
      // },
      // {
      //   path: "verify-identity",
      //   element: <VerifyIdentityPage />,
      // },
      // {
      //   path: "listings",
      //   element: <MyListingsPage />,
      // },
      // {
      //   path: "listings/create",
      //   element: (
      //     <ProtectedRoute allowedRoles={[EUserRole.SELLER]}>
      //       <CreateListingPage />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "listings/:listingId/edit",
      //   element: (
      //     <ProtectedRoute allowedRoles={[EUserRole.SELLER]}>
      //       <EditListingPage />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "payments",
      //   element: <PaymentHistoryPage />,
      // },
      // {
      //   path: "inspections",
      //   element: (
      //     <ProtectedRoute allowedRoles={[EUserRole.SELLER]}>
      //       <MyInspectionsPage />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },

  // ============================================
  // ADMIN ROUTES
  // ============================================
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={[EUserRole.ADMIN]}>
        <AdminLayoutWithScroll />
      </ProtectedRoute>
    ),
    children: [
      // { index: true, element: <AdminOverviewPage /> },
      // {
      //   path: "listings",
      //   element: <AdminListingsPage />,
      // },
      // {
      //   path: "listings/:listingId",
      //   element: <AdminListingsPage />,
      // },
      // {
      //   path: "users",
      //   element: <AdminUsersPage />,
      // },
      // {
      //   path: "users/:userId",
      //   element: <AdminUsersPage />,
      // },
      // {
      //   path: "inspections",
      //   element: <AdminInspectionsPage />,
      // },
      // {
      //   path: "inspections/:inspectionId",
      //   element: <AdminInspectionsPage />,
      // },
      // {
      //   path: "payments",
      //   element: <AdminPaymentsPage />,
      // },
    ],
  },
]);

export default applicationRouter;
