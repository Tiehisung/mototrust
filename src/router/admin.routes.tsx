import LAYOUT from "@/components/Layout";
import AdminDashboardPage from "@/pages/admin/Dashboard";
import { RouteObject } from "react-router-dom";
import DocsPage from "@/pages/admin/docs/page";
import AllDocsPage from "@/pages/admin/docs/files/page";
import FolderPage from "@/pages/admin/docs/folders/folder/page";

import LogsPage from "@/pages/admin/activity-logs/page";
import UsersPage from "@/pages/admin/users/page";

import NewStaffPage from "@/pages/admin/staff/new/Page";
import StaffDetailPage from "@/pages/admin/staff/member/page";
import EditStaffPage from "@/pages/admin/staff/edit/EditStaff";
import AllStaffPage from "@/pages/admin/staff/AllStaffPage";
import { ProtectedRoute } from "@/pages/auth/ProtectedRoute";
import { EUserRole } from "@/types/user";

import FoldersPage from "@/pages/admin/docs/folders/Page";

export const adminRoutes: RouteObject[] = [
  { path: "", element: <AdminDashboardPage /> },

  {
    path: "staff",
    element: <LAYOUT />,
    children: [
      { index: true, element: <AllStaffPage /> },
      { path: ":staffSlug", element: <StaffDetailPage /> },
      { path: "new", element: <NewStaffPage /> },
      { path: "edit", element: <EditStaffPage /> },
    ],
  },
  {
    path: "docs",
    element: <LAYOUT />,
    children: [
      { index: true, element: <DocsPage /> },
      { path: "files", element: <AllDocsPage /> },
      {
        path: "folders",
        children: [
          { index: true, element: <FoldersPage /> },
          { path: ":folderId", element: <FolderPage /> },
        ],
      },
    ],
  },

  {
    path: "users",
    element: (
      <ProtectedRoute allowedRoles={[EUserRole.ADMIN]}>
        <UsersPage />
      </ProtectedRoute>
    ),
  },
  { path: "logs", element: <LogsPage /> },
];
