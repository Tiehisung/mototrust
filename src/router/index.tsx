import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "@/utils/ScrollToTop";
 

// Auth Pages
import RegisterPage from "@/pages/auth/register/Page";
 

// Components
import ProtectedRoute from "@/pages/auth/ProtectedRoute";
import { EUserRole } from "@/types/user";
import HomePage from "@/pages/LandingPage";
import MainLayout from "@/pages/Layout";
import NotFound from "@/pages/NotFound";
import NotAuthorizedPage from "@/pages/auth/NotAuthorized";
import AuthLayout from "@/pages/auth/AuthLayout";
import SignInPage from "@/pages/auth/signin/Page";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ListingDetailPage from "@/pages/browse-listing/ListingDetailPage";
import CreateListingPage from "@/pages/dashboard/Listings/CreateListingPage";
import MyListingsPage from "@/pages/dashboard/Listings/MyListingsPage";
import ProfilePage from "@/pages/dashboard/ProfilePage";
import VerifyIdentityPage from "@/pages/dashboard/VerifyIdentityPage";
import MyInspectionsPage from "@/pages/dashboard/MyInspectionsPage";
import PaymentHistoryPage from "@/pages/dashboard/payments/PaymentHistoryPage";
import BrowseListingsPage from "@/pages/browse-listing/BrowseListingsPage";
import AdminInspectionsPage from "@/pages/admin/inspection/AdminInspectionsPage";
import AdminListingsPage from "@/pages/admin/listing/AdminListingsPage";
import AdminOverviewPage from "@/pages/admin/AdminOverviewPage";
import AdminPaymentsPage from "@/pages/admin/AdminPaymentsPage";
import AdminListingDetailPage from "@/pages/admin/listing/AdminListingDetailPage";
import AdminUserDetailPage from "@/pages/admin/users/AdminUserDetailPage";
import AdminInspectionDetailPage from "@/pages/admin/inspection/AdminInspectionDetailPage";
import DashboardLayout from "@/pages/dashboard/Layout";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminBrandsPage from "@/pages/admin/brand/AdminBrandsPage";
import AdminLocationsPage from "@/pages/admin/locations/AdminLocationsPage";
import AdminUsersPage from "@/pages/admin/users/AdminUsersPage";
import EditListingPage from "@/pages/dashboard/Listings/EditListingPage";
import LandingPage from "@/pages/home/WelcomePage";

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
    <DashboardLayout />
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
      { path: "welcome", element: <LandingPage /> },
      {
        path: "browse",
        element: <BrowseListingsPage />,
      },
      {
        path: "listing/:listingId",
        element: <ListingDetailPage />,
      },
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
        element: <SignInPage />,
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
      { index: true, element: <DashboardPage /> },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "verify-identity",
        element: <VerifyIdentityPage />,
      },
      {
        path: "listings",
        element: <MyListingsPage />,
      },
      {
        path: "listings/create",
        element: (
          <ProtectedRoute allowedRoles={[EUserRole.SELLER]}>
            <CreateListingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "listings/:listingId/edit",
        element: (
          <ProtectedRoute allowedRoles={[EUserRole.SELLER]}>
            <EditListingPage  />
          </ProtectedRoute>
        ),
      },
      {
        path: "payments",
        element: <PaymentHistoryPage />,
      },
      {
        path: "inspections",
        element: (
          <ProtectedRoute allowedRoles={[EUserRole.SELLER]}>
            <MyInspectionsPage />
          </ProtectedRoute>
        ),
      },
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
      { index: true, element: <AdminOverviewPage /> },
      {
        path: "listings",
        children: [
          { index: true, element: <AdminListingsPage /> },
          { path: ":listingId", element: <AdminListingDetailPage /> },
        ],
      },
      {
        path: "users",
        children: [
          { index: true, element: <AdminUsersPage /> },
          { path: ":userId", element: <AdminUserDetailPage /> },
        ],
      },
      {
        path: "inspections",
        children: [
          { index: true, element: <AdminInspectionsPage /> },
          { path: ":inspectionId", element: <AdminInspectionDetailPage /> },
        ],
      },
      { path: "payments", element: <AdminPaymentsPage /> },
      {
        path: "brands",
        element: <AdminBrandsPage />,
      },
      {
        path: "locations",
        element: <AdminLocationsPage />,
      },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

export default applicationRouter;
