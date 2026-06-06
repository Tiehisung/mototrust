import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetListingsQuery } from "../services/listingsApi";
import { HiOutlineMapPin, HiOutlineShieldCheck } from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";

const BRANDS = ["Haojue", "Bajaj", "Royal", "Honda", "Yamaha", "TVS"];
const LOCATIONS = ["Wa", "Lawra", "Tumu", "Jirapa", "Nadowli", "Bamahu"];

const HomePage = () => {
  const [filters, setFilters] = useState({
    brand: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });
  const { data, isLoading } = useGetListingsQuery({ limit: 12, ...filters });

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center pt-8 pb-4">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-900 leading-tight">
          Buy & Sell Motorbikes
          <br />
          <span className="text-brand-500">Safely in Upper West</span>
        </h1>
        <p className="mt-4 text-surface-500 text-lg max-w-xl mx-auto">
          Verified sellers, inspected bikes, trusted deals. The smarter way to
          buy your next motorbike.
        </p>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
        {[
          {
            icon: FaMotorcycle,
            label: "Listings",
            value: data?.pagination?.total || "0",
          },
          { icon: HiOutlineShieldCheck, label: "Verified", value: "100%" },
          { icon: HiOutlineMapPin, label: "Towns", value: "6+" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center p-4 bg-white rounded-2xl shadow-card"
          >
            <stat.icon className="w-5 h-5 text-brand-500 mx-auto mb-1" />
            <div className="font-display font-bold text-xl text-surface-900">
              {stat.value}
            </div>
            <div className="text-xs text-surface-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <select
          className="px-4 py-2 bg-white border border-surface-200 rounded-xl text-sm text-surface-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        >
          <option value="">All Brands</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select
          className="px-4 py-2 bg-white border border-surface-200 rounded-xl text-sm text-surface-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">All Locations</option>
          {LOCATIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min price"
          className="w-28 px-4 py-2 bg-white border border-surface-200 rounded-xl text-sm text-surface-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max price"
          className="w-28 px-4 py-2 bg-white border border-surface-200 rounded-xl text-sm text-surface-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-card"
              >
                <div className="aspect-4/3 shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-3/4 shimmer rounded" />
                  <div className="h-5 w-1/3 shimmer rounded" />
                  <div className="h-3 w-1/2 shimmer rounded" />
                </div>
              </div>
            ))
          : data?.data?.map((listing) => (
              <Link
                key={listing._id}
                to={`/listing/${listing._id}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-card card-hover"
              >
                <div className="aspect-4/3 bg-surface-100 relative overflow-hidden">
                  {listing.images[0] ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.brand}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-surface-300">
                      <FaMotorcycle className="w-12 h-12" />
                    </div>
                  )}
                  {listing.listingType === "premium" && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-brand-500 text-white text-xs font-medium rounded-lg">
                      Featured
                    </span>
                  )}
                  {listing.isPhysicallyVerified && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-accent-emerald text-white text-xs font-medium rounded-lg flex items-center gap-1">
                      <HiOutlineShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-surface-900 truncate">
                    {listing.brand} {listing.model}{" "}
                    {listing.year && `(${listing.year})`}
                  </h3>
                  <div className="mt-1 font-display font-bold text-xl text-brand-600">
                    GHS {listing.price.toLocaleString()}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-surface-400">
                    <HiOutlineMapPin className="w-3 h-3" />
                    {listing.location}
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HomePage;
