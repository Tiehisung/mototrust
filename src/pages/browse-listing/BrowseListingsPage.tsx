import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetListingsQuery } from "@/services/listingsApi";
import { useGetBrandsQuery } from "@/services/brandApi";
import {
  HiOutlineMapPin,
  HiOutlineShieldCheck,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineXMark,
  HiOutlineStar,
  HiOutlineFire,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";
import { Select } from "@/components/form";

// ============================================
// STATIC FILTER OPTIONS
// ============================================
const LOCATIONS = [
  { value: "All", label: "All Locations" },
  { value: "Wa", label: "Wa" },
  { value: "Lawra", label: "Lawra" },
  { value: "Tumu", label: "Tumu" },
  { value: "Jirapa", label: "Jirapa" },
  { value: "Nadowli", label: "Nadowli" },
  { value: "Bamahu", label: "Bamahu" },
];

const CONDITIONS = [
  { value: "All", label: "Any Condition" },
  { value: "Excellent", label: "Excellent" },
  { value: "Good", label: "Good" },
  { value: "Fair", label: "Fair" },
  { value: "Needs Repair", label: "Needs Repair" },
];

const SORT_OPTIONS = [
  { value: "-createdAt", label: "Newest First" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-viewCount", label: "Most Viewed" },
];

// ============================================
// COMPONENT
// ============================================
const BrowseListingsPage = () => {
  // ============================================
  // BRANDS FROM API
  // ============================================
  const { data: brandsData } = useGetBrandsQuery();
  const allBrands = brandsData?.data || [];
  const popularBrands = [
    { name: "All" },
    allBrands?.filter((b) => b.isPopular),
  ].flat();
  const otherBrands = allBrands.filter((b) => !b.isPopular);

  // ============================================
  // STATE
  // ============================================
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

  // ============================================
  // QUERY PARAMS
  // ============================================
  const queryParams: Record<string, any> = { page, limit, sort: filters.sort };
  if (filters.brand !== "All") queryParams.brand = filters.brand;
  if (filters.location !== "All") queryParams.location = filters.location;
  if (filters.condition !== "All") queryParams.condition = filters.condition;
  if (filters.minPrice) queryParams.minPrice = filters.minPrice;
  if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;
  if (filters.verified) queryParams.isPhysicallyVerified = true;

  const { data, isLoading, isError, refetch } =
    useGetListingsQuery(queryParams);

  // ============================================
  // HELPERS
  // ============================================
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
  const totalListings = data?.pagination?.total || 0;

  // ============================================
  // PAGINATION LOGIC
  // ============================================
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [1];

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);
    return pages;
  };

  // ============================================
  // RENDER: LOADING SKELETON
  // ============================================
  const renderSkeletons = () => (
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
            <div className="h-3 w-1/2 _shimmer rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );

  // ============================================
  // RENDER: LISTING CARD
  // ============================================
  const renderListingCard = (listing: any) => (
    <Link
      key={listing._id}
      to={`/listing/${listing._id}`}
      className="group bg-surface-elevated rounded-2xl overflow-hidden border border-border 
        hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-4/3 bg-surface-muted relative overflow-hidden">
        {listing.images?.[0] ? (
          <img
            src={listing.images[0]}
            alt={`${listing.brand} ${listing.model || ""}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaMotorcycle className="w-12 h-12 text-muted-foreground/30" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between">
          <div className="flex gap-1.5">
            {listing.listingType === "premium" && (
              <span className="inline-flex items-center px-2 py-0.5 bg-brand text-white text-[10px] font-medium rounded-full">
                Featured
              </span>
            )}
          </div>
          <div className="flex gap-1.5">
            {listing.isPhysicallyVerified && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-success text-white text-[10px] font-medium rounded-full">
                <HiOutlineShieldCheck className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-surface-foreground truncate">
          {listing.brand}
          {listing.model && <span className="ml-1">{listing.model}</span>}
          {listing.year && (
            <span className="text-muted-foreground font-normal ml-1">
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
          <span className="capitalize shrink-0">{listing.condition}</span>
        </div>

        {/* Seller info */}
        {listing.seller && typeof listing.seller === "object" && (
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <span className="text-muted-foreground">By</span>
            <span className="text-surface-foreground font-medium truncate">
              {listing.seller.fullName}
            </span>
            {listing.seller.isVerified && (
              <HiOutlineShieldCheck className="w-3 h-3 text-success shrink-0" />
            )}
          </div>
        )}
      </div>
    </Link>
  );

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="space-y-6 pb-12">
      {/* ============ HEADER ============ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-foreground">
            Browse Bikes
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {totalListings} bike{totalListings !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Sort + Filter Toggle */}
        <div className="flex items-center gap-2">
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="px-3 py-2 bg-surface-elevated border border-border rounded-xl text-sm
              focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer"
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
                  ? "bg-brand text-brand-foreground shadow-glow"
                  : "bg-surface-elevated border border-border text-muted-foreground hover:bg-surface-muted"
              }`}
          >
            {showFilters ? (
              <HiOutlineXMark className="w-4 h-4" />
            ) : (
              <HiOutlineAdjustmentsHorizontal className="w-4 h-4" />
            )}
            Filters
            {hasActiveFilters && !showFilters && (
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* ============ POPULAR BRANDS QUICK FILTER (Always visible) ============ */}
      {popularBrands?.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <HiOutlineFire className="w-4 h-4 text-brand" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Popular Brands
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {popularBrands?.map((brand) => (
              <button
                key={brand?.name}
                onClick={() => {
                  setFilters({ ...filters, brand: brand.name });
                  setPage(1);
                }}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${
                    filters.brand === brand.name
                      ? "bg-brand text-brand-foreground shadow-glow"
                      : "bg-surface-elevated text-muted-foreground border border-border hover:bg-surface-muted"
                  }`}
              >
                {filters.brand === brand.name && (
                  <HiOutlineStar className="w-3 h-3" />
                )}
                {brand.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ============ FILTERS PANEL ============ */}
      {showFilters && (
        <div className="bg-surface-elevated border border-border rounded-2xl p-5 space-y-5 animate-in slide-in-from-top-2 duration-200">
          {/* All Brands */}
          {otherBrands.length > 0 && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                More Brands
              </label>
              <div className="flex flex-wrap gap-1.5">
                {otherBrands.map((brand) => (
                  <button
                    key={brand._id}
                    onClick={() => {
                      setFilters({ ...filters, brand: brand.name });
                      setPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                      ${
                        filters.brand === brand.name
                          ? "bg-brand text-brand-foreground"
                          : "bg-surface-muted text-muted-foreground border border-border hover:bg-surface-elevated"
                      }`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location + Condition */}
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Location"
              faintLabel
              value={filters.location}
              options={LOCATIONS}
              onChange={(e) => {
                setFilters({ ...filters, location: e.target.value });
                setPage(1);
              }}
            />

            <Select
              label="Condition"
              faintLabel
              value={filters.condition}
              onChange={(e) => {
                setFilters({ ...filters, condition: e.target.value });
                setPage(1);
              }}
              options={CONDITIONS}
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Price Range (GHS)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => {
                  setFilters({ ...filters, minPrice: e.target.value });
                  setPage(1);
                }}
                className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm
                  placeholder:text-muted-foreground/50
                  focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
              <span className="text-muted-foreground text-sm shrink-0">to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => {
                  setFilters({ ...filters, maxPrice: e.target.value });
                  setPage(1);
                }}
                className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm
                  placeholder:text-muted-foreground/50
                  focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </div>

          {/* Verified Only Toggle */}
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

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-surface-foreground transition-colors flex items-center gap-1"
            >
              <HiOutlineXMark className="w-3 h-3" />
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* ============ ACTIVE FILTER INDICATOR ============ */}
      {hasActiveFilters && !showFilters && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {filters.brand !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-muted text-brand text-xs rounded-lg">
                {filters.brand}
                <button
                  onClick={() => {
                    setFilters({ ...filters, brand: "All" });
                    setPage(1);
                  }}
                >
                  <HiOutlineXMark className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.location !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-muted text-brand text-xs rounded-lg">
                {filters.location}
                <button
                  onClick={() => {
                    setFilters({ ...filters, location: "All" });
                    setPage(1);
                  }}
                >
                  <HiOutlineXMark className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.condition !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-muted text-brand text-xs rounded-lg">
                {filters.condition}
                <button
                  onClick={() => {
                    setFilters({ ...filters, condition: "All" });
                    setPage(1);
                  }}
                >
                  <HiOutlineXMark className="w-3 h-3" />
                </button>
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-muted text-brand text-xs rounded-lg">
                GHS {filters.minPrice || "0"} - {filters.maxPrice || "∞"}
                <button
                  onClick={() => {
                    setFilters({ ...filters, minPrice: "", maxPrice: "" });
                    setPage(1);
                  }}
                >
                  <HiOutlineXMark className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success text-xs rounded-lg">
                Verified
                <button
                  onClick={() => {
                    setFilters({ ...filters, verified: false });
                    setPage(1);
                  }}
                >
                  <HiOutlineXMark className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* ============ RESULTS ============ */}
      {isLoading ? (
        renderSkeletons()
      ) : isError ? (
        <div className="text-center py-20">
          <FaMotorcycle className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-muted-foreground">Failed to load listings.</p>
          <button
            onClick={refetch}
            className="mt-2 text-sm text-brand hover:underline font-medium"
          >
            Try again
          </button>
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="text-center py-20">
          <FaMotorcycle className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="font-medium text-surface-foreground">
            {hasActiveFilters
              ? "No bikes match your filters"
              : "No bikes listed yet"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {hasActiveFilters
              ? "Try adjusting or clearing your filters"
              : "Be the first to list a bike for sale!"}
          </p>
          {hasActiveFilters ? (
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-brand text-brand-foreground rounded-xl text-sm font-medium"
            >
              Clear all filters
            </button>
          ) : (
            <Link
              to="/auth/register"
              className="mt-4 inline-block px-4 py-2 bg-brand text-brand-foreground rounded-xl text-sm font-medium"
            >
              Sell your bike
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Listings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.data?.map(renderListingCard)}
          </div>

          {/* ============ PAGINATION ============ */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 pt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 bg-surface-elevated border border-border rounded-lg text-sm 
                  disabled:opacity-40 disabled:cursor-not-allowed
                  hover:bg-surface-muted transition-colors"
              >
                Prev
              </button>

              {getPageNumbers().map((p, idx) =>
                p === "ellipsis" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-1 text-muted-foreground text-sm"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all
                      ${
                        p === page
                          ? "bg-brand text-brand-foreground shadow-glow"
                          : "bg-surface-elevated border border-border hover:bg-surface-muted"
                      }`}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 bg-surface-elevated border border-border rounded-lg text-sm 
                  disabled:opacity-40 disabled:cursor-not-allowed
                  hover:bg-surface-muted transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Results summary */}
          <p className="text-center text-xs text-muted-foreground">
            Showing {(page - 1) * limit + 1}–
            {Math.min(page * limit, totalListings)} of {totalListings} bikes
          </p>
        </>
      )}
    </div>
  );
};

export default BrowseListingsPage;
