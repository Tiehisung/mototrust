import { useGetDashboardStatsQuery } from "@/services/adminApi";
import { FaMotorcycle } from "react-icons/fa6";
import {
  HiOutlineUsers,
 
  HiOutlineClipboardDocumentCheck,
  HiOutlineBanknotes,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const AdminOverviewPage = () => {
  const { data, isLoading } = useGetDashboardStatsQuery();

  const stats = data?.data;

  const cards = [
    {
      label: "Total Users",
      value: stats?.users || 0,
      icon: HiOutlineUsers,
      color: "text-info bg-info/10",
      link: "/admin/users",
    },
    {
      label: "Total Listings",
      value: stats?.listings?.total || 0,
      icon: FaMotorcycle,
      color: "text-brand bg-brand/10",
      link: "/admin/listings",
      sub: `${stats?.listings?.pending || 0} pending approval`,
    },
    {
      label: "Pending Inspections",
      value: stats?.inspections?.pending || 0,
      icon: HiOutlineClipboardDocumentCheck,
      color: "text-warning bg-warning/10",
      link: "/admin/inspections",
    },
    {
      label: "Total Revenue",
      value: `GHS ${(stats?.revenue || 0).toLocaleString()}`,
      icon: HiOutlineBanknotes,
      color: "text-success bg-success/10",
      link: "/admin/payments",
      sub: `${stats?.payments || 0} transactions`,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-surface-foreground">
          Admin Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Platform at a glance
        </p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface-elevated rounded-2xl p-5 space-y-3"
            >
              <div className="h-4 w-1/2 _shimmer rounded-lg" />
              <div className="h-8 w-1/3 _shimmer rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              to={card.link}
              className="bg-surface-elevated border border-border rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}
                >
                  <card.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-surface-foreground">
                {card.value}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {card.label}
              </p>
              {card.sub && (
                <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/admin/listings"
          className="bg-surface-elevated border border-border rounded-2xl p-5 hover:shadow-md transition-all flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
            <FaMotorcycle className="w-5 h-5 text-brand" />
          </div>
          <div>
            <p className="font-semibold text-surface-foreground text-sm">
              Review Listings
            </p>
            <p className="text-xs text-muted-foreground">
              Approve or reject pending listings
            </p>
          </div>
        </Link>
        <Link
          to="/admin/users"
          className="bg-surface-elevated border border-border rounded-2xl p-5 hover:shadow-md transition-all flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
            <HiOutlineUsers className="w-5 h-5 text-info" />
          </div>
          <div>
            <p className="font-semibold text-surface-foreground text-sm">
              Verify Users
            </p>
            <p className="text-xs text-muted-foreground">
              Review identity submissions
            </p>
          </div>
        </Link>
        <Link
          to="/admin/inspections"
          className="bg-surface-elevated border border-border rounded-2xl p-5 hover:shadow-md transition-all flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
            <HiOutlineClipboardDocumentCheck className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="font-semibold text-surface-foreground text-sm">
              Inspections
            </p>
            <p className="text-xs text-muted-foreground">
              Manage physical verifications
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
