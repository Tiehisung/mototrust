import UsersPage from "@/pages/Users";
import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./admin.routes";
import ScrollToTop from "@/utils/ScrollToTop";
import TestPage from "@/pages/test/page";
import SponsorsPage from "@/pages/sponsorship/page";
import MatchHighlightsPage from "@/pages/highlights/page";
import GalleryPage from "@/pages/gallery/page";
import MatchesPage from "@/pages/matches/page";
import PlayersPage from "@/pages/players/page";
import JoinUsPage from "@/pages/join-us/page";
import NewsPage from "@/pages/news/page";
import HomeLayout from "@/pages/Layout";

// Admin
import AdminLayout from "@/pages/admin/layout";
import PlayerProfilePage from "@/pages/players/details/page";
import NewsLayout from "@/pages/news/layout";
import NewsItemPage from "@/pages/news/newsItem/page";
import RegisterPage from "@/pages/auth/RegisterPage";
import LoginPage from "@/pages/auth/LoginPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { EUserRole } from "@/types/user";
import NotAuthorizedPage from "@/pages/auth/NotAuthorized";
import PlayerDashboardPage from "@/pages/players/dashboard/page";
import PlayerGalleriesPage from "@/pages/players/dashboard/galleries/page";
import TopFansPage from "@/pages/TopFans";
import LandingPage from "@/pages/LandingPage";
import LatestMatchSquadPage from "@/pages/squad/Squad";
import NotFound from "@/pages/NotFound";
import ContactPage from "@/pages/Contact/Page";
import AuthLayout from "@/pages/auth/AuthLayout";

// Wrapper component for AdminLayout with ScrollToTop
const AdminLayoutWithScrollToTop = () => (
  <>
    <ScrollToTop />

    <AdminLayout />
  </>
);

const applicationRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,

    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "news",
        element: <NewsLayout />,
        children: [
          { index: true, element: <NewsPage /> },
          { path: ":newsSlug", element: <NewsItemPage /> },
        ],
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "squad",
        element: <LatestMatchSquadPage />,
      },
      {
        path: "players",
        children: [
          {
            index: true,
            element: <PlayersPage />,
          },
          {
            path: "details",
            element: <PlayerProfilePage />,
          },
          {
            path: "dashboard",
            element: <PlayerDashboardPage />,
          },
          {
            path: "dashboard/galleries",
            element: <PlayerGalleriesPage />,
          },
        ],
      },
      {
        path: "matches",
        element: <MatchesPage />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "highlights",
        element: <MatchHighlightsPage />,
      },
      {
        path: "sponsorship",
        element: <SponsorsPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "join-us",
        element: <JoinUsPage />,
      },

      {
        path: "/test",
        element: <TestPage />,
      },
      {
        path: "/unauthorized",
        element: <NotAuthorizedPage />,
      },

      {
        path: "*", // Catch-all route for 404 pages
        element: <NotFound />,
      },
    ],
  },
  // --ADMIN-------------------------

  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={[EUserRole.ADMIN, EUserRole.SUPER_ADMIN]}>
        <AdminLayoutWithScrollToTop />
      </ProtectedRoute>
    ),
    children: adminRoutes,
  },
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

  {
    path: "/fans",
    element: <TopFansPage />,
  },
]);

export default applicationRouter;
