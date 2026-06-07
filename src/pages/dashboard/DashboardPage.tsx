import { Link } from "react-router-dom";

import { useGetMeQuery } from "@/services/authApi";
import { useGetMyListingsQuery } from "@/services/listingsApi";
import {
  HiOutlinePlusCircle,
  HiOutlineShieldCheck,
  HiOutlineExclamationTriangle,
  HiOutlineArrowRight,
  HiOutlineUser,
} from "react-icons/hi2";
import { useAppSelector } from "@/store/hooks/store";
import { FaMotorcycle } from "react-icons/fa6";

const DashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile } = useGetMeQuery();
  const { data: myListings } = useGetMyListingsQuery({ limit: 5 });

  const currentUser = profile?.user || user;
  const listings = myListings?.data || [];
  const stats = {
    approved: listings.filter((l) => l.status === "approved").length,
    pending: listings.filter((l) => l.status === "pending").length,
    sold: listings.filter((l) => l.status === "sold").length,
  };

  const quickActions = [
    ...(currentUser?.role === "seller"
      ? [
          {
            icon: HiOutlinePlusCircle,
            label: "Post New Listing",
            to: "/dashboard/listings/create",
            color: "text-brand bg-brand-muted",
          },
        ]
      : []),
    {
      icon: FaMotorcycle,
      label: "Browse Listings",
      to: "/browse",
      color: "text-info bg-info/10",
    },
    {
      icon: HiOutlineUser,
      label: "Edit Profile",
      to: "/dashboard/profile",
      color: "text-surface-foreground bg-surface-muted",
    },
    {
      icon: HiOutlineShieldCheck,
      label: "Verify Identity",
      to: "/dashboard/verify-identity",
      color: "text-success bg-success/10",
    },
  ];

  console.log("Current User:", currentUser,listings);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-foreground">
          Welcome back
          {currentUser?.fullName
            ? `, ${currentUser.fullName.split(" ")[0]}`
            : ""}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {currentUser?.role === "seller"
            ? "Manage your listings and sales"
            : "Find your perfect bike"}
        </p>
      </div>

      {/* Verification alert */}
      {!currentUser?.isVerified && (
        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
          <HiOutlineExclamationTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Verify your identity
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
              {currentUser?.role === "seller"
                ? "You need to verify your identity before posting listings."
                : "Verified buyers get faster responses from sellers."}
            </p>
            <Link
              to="/dashboard/verify-identity"
              className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-300 mt-2 hover:underline"
            >
              Verify now <HiOutlineArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="flex flex-col items-center gap-2 p-4 bg-surface-elevated border border-border rounded-2xl
                hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}
              >
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-surface-foreground text-center">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats (Sellers) */}
      {currentUser?.role === "seller" && (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Your Listings
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "Active",
                value: stats?.approved || 0,
                color: "text-success",
              },
              {
                label: "Pending",
                value: stats?.pending || 0,
                color: "text-warning",
              },
              { label: "Sold", value: stats?.sold || 0, color: "text-info" },
              {
                label: "Total",
                value: listings.length || 0,
                color: "text-surface-foreground",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-elevated border border-border rounded-2xl p-4 text-center"
              >
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Listings */}
      {listings.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Recent Listings
            </h2>
            <Link
              to="/dashboard/listings"
              className="text-xs text-brand hover:underline flex items-center gap-1"
            >
              View all <HiOutlineArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {listings.slice(0, 3).map((listing) => (
              <Link
                key={listing._id}
                to={`/listing/${listing._id}`}
                className="flex items-center gap-4 bg-surface-elevated border border-border rounded-2xl p-3
                  hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 bg-surface-muted rounded-xl overflow-hidden shrink-0">
                  {listing.images?.[0] ? (
                    <img
                      src={listing.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaMotorcycle className="w-6 h-6 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-surface-foreground truncate">
                    {listing.brand} {listing.model}
                  </p>
                  <p className="text-brand font-bold">
                    GHS {listing.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span
                    className={`_badge text-xs ${
                      listing.status === "approved"
                        ? "_badgeVerified"
                        : listing.status === "pending"
                          ? "_badgePending"
                          : listing.status === "sold"
                            ? "bg-info/10 text-info"
                            : "bg-red-50 text-red-600"
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
