import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import {
  HiOutlineMagnifyingGlass,
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlinePhone,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa";
import { useVerifyUserMutation } from "@/services/adminApi";
import {
  useGetAdminUsersQuery,
  useToggleUserActiveMutation,
  useDeleteUserMutation,
} from "@/services/userApi";

const ROLES = ["all", "seller", "buyer", "admin"];
const STATUS_FILTERS = ["all", "active", "inactive", "verified", "unverified"];

const AdminUsersPage = () => {
  const [page, setPage] = useState(1);
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const queryParams: Record<string, any> = { page, limit: 15 };
  if (role !== "all") queryParams.role = role;
  if (status === "active") queryParams.isActive = "true";
  if (status === "inactive") queryParams.isActive = "false";
  if (status === "verified") queryParams.isVerified = "true";
  if (status === "unverified") queryParams.isVerified = "false";
  if (search) queryParams.search = search;

  const { data, isLoading } = useGetAdminUsersQuery(queryParams);
  const [toggleActive] = useToggleUserActiveMutation();
  const [verifyUser] = useVerifyUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.data || [];
  const stats = data?.stats;
  const pagination = data?.pagination;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleToggleActive = async (id: string) => {
    try {
      const r = await toggleActive(id).unwrap();
      toast.success(r.message);
    } catch {
      toast.error("Failed");
    }
  };

  const handleVerify = async (id: string) => {
    try {
      await verifyUser(id).unwrap();
      toast.success("User verified");
    } catch {
      toast.error("Failed");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Delete "${name}" and all their listings? This cannot be undone.`,
      )
    )
      return;
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-foreground">Users</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {stats?.total || 0} total users
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            {
              label: "Total",
              value: stats.total,
              color: "bg-surface-elevated",
              onClick: () => {
                setRole("all");
                setStatus("all");
              },
            },
            {
              label: "Sellers",
              value: stats.seller || 0,
              color: "bg-brand-muted",
              onClick: () => {
                setRole("seller");
                setStatus("all");
              },
            },
            {
              label: "Buyers",
              value: stats.buyer || 0,
              color: "bg-info/10",
              onClick: () => {
                setRole("buyer");
                setStatus("all");
              },
            },
            {
              label: "Verified",
              value: stats.verified,
              color: "bg-success/10",
              onClick: () => {
                setStatus("verified");
                setRole("all");
              },
            },
            {
              label: "Unverified",
              value: stats.unverified,
              color: "bg-warning/10",
              onClick: () => {
                setStatus("unverified");
                setRole("all");
              },
            },
          ].map((stat) => (
            <button
              key={stat.label}
              onClick={stat.onClick}
              className={`${stat.color} rounded-2xl p-4 text-left hover:shadow-md transition-all border border-border`}
            >
              <div className="text-2xl font-bold text-surface-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name or phone..."
            className="w-full pl-9 pr-4 py-2.5 bg-surface-elevated border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </form>
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2.5 bg-surface-elevated border border-border rounded-xl text-sm"
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r === "all"
                ? "All Roles"
                : r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2.5 bg-surface-elevated border border-border rounded-xl text-sm"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s} value={s}>
              {s === "all"
                ? "All Status"
                : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Users Table */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-16 bg-surface-elevated rounded-2xl _shimmer"
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface-elevated border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                    User
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">
                    Phone
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                    Role
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">
                    Listings
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr
                    key={user._id}
                    className={`border-b border-border last:border-0 ${!user.isActive ? "opacity-60" : ""}`}
                  >
                    {/* User info */}
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/users/${user._id}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 bg-brand-muted rounded-full flex items-center justify-center text-brand font-bold text-sm shrink-0">
                          {user.fullName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-surface-foreground group-hover:text-brand transition-colors">
                            {user.fullName}
                          </p>
                          <p className="text-xs text-muted-foreground sm:hidden">
                            {user.phoneNumber}
                          </p>
                        </div>
                      </Link>
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <HiOutlinePhone className="w-3.5 h-3.5" />
                        {user.phoneNumber}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize
                        ${
                          user.role === "admin"
                            ? "bg-red-50 text-red-600"
                            : user.role === "seller"
                              ? "bg-brand-muted text-brand"
                              : "bg-info/10 text-info"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Listings count */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <FaMotorcycle className="w-3.5 h-3.5" />
                        {user.listingCount || 0}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {user.isActive ? (
                          <span className="inline-flex items-center gap-1 text-xs text-success bg-success/10 px-2 py-0.5 rounded-full">
                            <HiOutlineEye className="w-3 h-3" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                            <HiOutlineEyeSlash className="w-3 h-3" /> Banned
                          </span>
                        )}
                        {user.isVerified ? (
                          <HiOutlineShieldCheck
                            className="w-4 h-4 text-success shrink-0"
                            title="Verified"
                          />
                        ) : (
                          <HiOutlineShieldExclamation
                            className="w-4 h-4 text-warning shrink-0"
                            title="Not verified"
                          />
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {!user.isVerified && (
                          <button
                            onClick={() => handleVerify(user._id)}
                            className="p-1.5 hover:bg-success/10 rounded-lg transition-colors"
                            title="Verify user"
                          >
                            <HiOutlineCheck className="w-4 h-4 text-success" />
                          </button>
                        )}
                        <button
                          onClick={() => handleToggleActive(user._id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            user.isActive
                              ? "hover:bg-warning/10"
                              : "hover:bg-success/10"
                          }`}
                          title={user.isActive ? "Deactivate" : "Activate"}
                        >
                          {user.isActive ? (
                            <HiOutlineXMark className="w-4 h-4 text-warning" />
                          ) : (
                            <HiOutlineCheck className="w-4 h-4 text-success" />
                          )}
                        </button>
                        <Link
                          to={`/admin/users/${user._id}`}
                          className="p-1.5 hover:bg-surface-muted rounded-lg transition-colors"
                          title="View details"
                        >
                          <HiOutlineUser className="w-4 h-4 text-muted-foreground" />
                        </Link>
                        {user.role !== "admin" && (
                          <button
                            onClick={() =>
                              handleDelete(user._id, user.fullName)
                            }
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete user"
                          >
                            <HiOutlineTrash className="w-4 h-4 text-red-400" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {users.length === 0 && (
            <div className="text-center py-12">
              <HiOutlineUser className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 bg-surface-elevated border border-border rounded-lg text-sm disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
            className="px-3 py-1.5 bg-surface-elevated border border-border rounded-lg text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
