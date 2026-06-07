import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetListingsQuery } from "@/services/listingsApi";
import {
  HiOutlineMapPin,
  HiOutlineShieldCheck,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineXMark,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";

const BRANDS = [
  "All",
  "Haojue",
  "Bajaj",
  "Royal",
  "Honda",
  "Yamaha",
  "TVS",
  "KTM",
  "Suzuki",
  "Other",
];
const LOCATIONS = ["All", "Wa", "Lawra", "Tumu", "Jirapa", "Nadowli", "Bamahu"];
const CONDITIONS = ["All", "Excellent", "Good", "Fair", "Needs Repair"];
const SORT_OPTIONS = [
  { value: "-createdAt", label: "Newest" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-viewCount", label: "Most Viewed" },
];

const BrowseListingsPage = () => {
  const [filters, setFilters] = useState({
    brand: "All",
    location: "All",
    condition: "All",
    minPrice: "",
    maxPrice: "",
    sort: "-createdAt",
    verified: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 12;

  const queryParams: Record<string, any> = { page, limit, sort: filters.sort };
  if (filters.brand !== "All") queryParams.brand = filters.brand;
  if (filters.location !== "All") queryParams.location = filters.location;
  if (filters.condition !== "All") queryParams.condition = filters.condition;
  if (filters.minPrice) queryParams.minPrice = filters.minPrice;
  if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;
  if (filters.verified) queryParams.isPhysicallyVerified = true;

  const { data, isLoading, isError, refetch } =
    useGetListingsQuery(queryParams);

    console.log(data)

  const clearFilters = () => {
    setFilters({
      brand: "All",
      location: "All",
      condition: "All",
      minPrice: "",
      maxPrice: "",
      sort: "-createdAt",
      verified: false,
    });
    setPage(1);
  };

  const hasActiveFilters =
    filters.brand !== "All" ||
    filters.location !== "All" ||
    filters.condition !== "All" ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.verified;

  const totalPages = data?.pagination?.pages || 1;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-foreground">
            Browse Bikes
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {data?.pagination?.total || 0} bikes available
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="px-3 py-2 bg-surface-elevated border border-border rounded-xl text-sm
              focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all
              ${
                showFilters || hasActiveFilters
                  ? "bg-brand text-brand-foreground"
                  : "bg-surface-elevated border border-border text-muted-foreground hover:bg-surface-muted"
              }`}
          >
            {showFilters ? (
              <HiOutlineXMark className="w-4 h-4" />
            ) : (
              <HiOutlineAdjustmentsHorizontal className="w-4 h-4" />
            )}
            Filters
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-surface-elevated border border-border rounded-2xl p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {/* Brands */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Brand
            </label>
            <div className="flex flex-wrap gap-1.5">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => {
                    setFilters({ ...filters, brand });
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${filters.brand === brand ? "bg-brand text-brand-foreground" : "bg-surface-muted text-muted-foreground border border-border hover:bg-surface-elevated"}`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => {
                  setFilters({ ...filters, location: e.target.value });
                  setPage(1);
                }}
                className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "All" ? "All Locations" : loc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Condition
              </label>
              <select
                value={filters.condition}
                onChange={(e) => {
                  setFilters({ ...filters, condition: e.target.value });
                  setPage(1);
                }}
                className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm"
              >
                {CONDITIONS.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond === "All" ? "Any Condition" : cond}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min GHS"
              value={filters.minPrice}
              onChange={(e) => {
                setFilters({ ...filters, minPrice: e.target.value });
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm placeholder:text-muted-foreground/50"
            />
            <span className="text-muted-foreground text-sm">to</span>
            <input
              type="number"
              placeholder="Max GHS"
              value={filters.maxPrice}
              onChange={(e) => {
                setFilters({ ...filters, maxPrice: e.target.value });
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm placeholder:text-muted-foreground/50"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.verified}
              onChange={(e) => {
                setFilters({ ...filters, verified: e.target.checked });
                setPage(1);
              }}
              className="w-4 h-4 rounded border-border text-brand focus:ring-brand/20"
            />
            <span className="text-sm text-surface-foreground flex items-center gap-1.5">
              <HiOutlineShieldCheck className="w-4 h-4 text-success" />
              Verified bikes only
            </span>
          </label>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-surface-foreground transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface-elevated rounded-2xl overflow-hidden border border-border"
            >
              <div className="aspect-4/3 _shimmer" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 _shimmer rounded-lg" />
                <div className="h-5 w-1/3 _shimmer rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            Failed to load.{" "}
            <button onClick={refetch} className="text-brand hover:underline">
              Retry
            </button>
          </p>
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="text-center py-20">
          <FaMotorcycle className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="font-medium text-surface-foreground">No bikes found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your filters
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-brand hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.data?.map((listing) => (
              <Link
                key={listing._id}
                to={`/listing/${listing._id}`}
                className="group bg-surface-elevated rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-4/3 bg-surface-muted relative overflow-hidden">
                  {listing.images?.[0] ? (
                    <img
                      src={listing.images[0]}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaMotorcycle className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    {listing.listingType === "premium" && (
                      <span className="_badge _badgeFeatured">Featured</span>
                    )}
                    {listing.isPhysicallyVerified && (
                      <span className="_badge _badgeVerified">
                        <HiOutlineShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-surface-foreground truncate">
                    {listing.brand} {listing.model}{" "}
                    {listing.year && (
                      <span className="text-muted-foreground font-normal">
                        ({listing.year})
                      </span>
                    )}
                  </h3>
                  <div className="mt-1 text-xl font-bold text-brand">
                    GHS {listing.price.toLocaleString()}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <HiOutlineMapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{listing.location}</span>
                    <span className="shrink-0">·</span>
                    <span className="capitalize shrink-0">
                      {listing.condition}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 bg-surface-elevated border border-border rounded-lg text-sm disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all
                    ${p === page ? "bg-brand text-brand-foreground" : "bg-surface-elevated border border-border hover:bg-surface-muted"}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 bg-surface-elevated border border-border rounded-lg text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrowseListingsPage;
