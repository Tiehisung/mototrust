import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetListingsQuery } from "@/services/listingsApi";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineMapPin,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa";

const BRANDS = ["All", "Haojue", "Bajaj", "Royal", "Honda", "Yamaha", "TVS"];
const LOCATIONS = ["All", "Wa", "Lawra", "Tumu", "Jirapa", "Nadowli", "Bamahu"];

const HomePage = () => {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const { data, isLoading, isError } = useGetListingsQuery({
    limit: 12,
    brand: selectedBrand !== "All" ? selectedBrand : undefined,
    location: selectedLocation !== "All" ? selectedLocation : undefined,
    minPrice: priceRange.min || undefined,
    maxPrice: priceRange.max || undefined,
  });

  return (
    <div className="space-y-10 pb-12">
      {/* ============ HERO ============ */}
      <section className="text-center pt-16 pb-4">
        <div className="inline-flex items-center gap-2 bg-brand-muted text-brand text-xs font-medium px-3 py-1 rounded-full mb-4">
          <HiOutlineShieldCheck className="w-3.5 h-3.5" />
          Trusted marketplace in Upper West
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-foreground leading-[1.1] tracking-tight">
          Buy & Sell
          <br />
          <span className="text-brand">Motorbikes Safely</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Verified sellers, real bikes, trusted deals. The smarter way to find
          your next motorbike in Wa and beyond.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-medium
              hover:opacity-90 transition-opacity"
          >
            <HiOutlineMagnifyingGlass className="w-4 h-4" />
            Browse bikes
          </Link>
          <Link
            to="/auth/register"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated border border-border rounded-xl text-sm font-medium
              text-surface-foreground hover:bg-surface-muted transition-colors"
          >
            Start selling
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        {[
          {
            icon: FaMotorcycle,
            value: data?.pagination?.total || 0,
            label: "Listings",
          },
          { icon: HiOutlineShieldCheck, value: "100%", label: "Verified" },
          { icon: HiOutlineMapPin, value: "6+", label: "Towns" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center p-4 bg-surface-elevated rounded-2xl border border-border"
          >
            <stat.icon className="w-5 h-5 text-brand mx-auto mb-1.5" />
            <div className="text-xl font-bold text-surface-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ============ FILTERS ============ */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-surface-foreground">
          Find your bike
        </h2>

        {/* Brands */}
        <div className="flex flex-wrap gap-1.5">
          {BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all
                ${
                  selectedBrand === brand
                    ? "bg-brand text-brand-foreground"
                    : "bg-surface-elevated text-muted-foreground border border-border hover:bg-surface-muted"
                }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Location + Price */}
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 bg-surface-elevated border border-border rounded-xl text-sm text-surface-foreground
              focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc === "All" ? "All Locations" : loc}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min GHS"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
            className="w-28 px-3 py-2 bg-surface-elevated border border-border rounded-xl text-sm
              focus:outline-none focus:ring-2 focus:ring-brand/20
              placeholder:text-muted-foreground/50"
          />
          <span className="self-center text-muted-foreground text-sm">—</span>
          <input
            type="number"
            placeholder="Max GHS"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
            className="w-28 px-3 py-2 bg-surface-elevated border border-border rounded-xl text-sm
              focus:outline-none focus:ring-2 focus:ring-brand/20
              placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      {/* ============ LISTINGS GRID ============ */}
      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface-elevated rounded-2xl overflow-hidden border border-border"
              >
                <div className="aspect-4/3 _shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-3/4 _shimmer rounded" />
                  <div className="h-5 w-1/3 _shimmer rounded" />
                  <div className="h-3 w-1/2 _shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-16">
            <FaMotorcycle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Could not load listings. Please try again.
            </p>
          </div>
        ) : data?.data?.length === 0 ? (
          <div className="text-center py-16">
            <FaMotorcycle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-surface-foreground font-medium">
              No listings found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.data?.map((listing) => (
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
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    {listing.listingType === "premium" && (
                      <span className="_badge _badgeFeatured">Featured</span>
                    )}
                  </div>
                  <div className="absolute top-2 right-2">
                    {listing.isPhysicallyVerified && (
                      <span className="_badge _badgeVerified">
                        <HiOutlineShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
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
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <HiOutlineMapPin className="w-3 h-3" />
                    {listing.location}
                    <span className="mx-1">·</span>
                    <span className="capitalize">{listing.condition}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
