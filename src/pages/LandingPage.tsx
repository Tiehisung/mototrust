import { useState } from "react";
import { useGetListingsQuery } from "@/services/listingsApi";
import { HiOutlineMapPin, HiOutlineShieldCheck } from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa";
import { useGetPopularBrandsQuery } from "@/services/brandApi";
import { BikeCard } from "./home/BikeCard";
import Hero from "./home/Hero";

const LOCATIONS = ["All", "Wa", "Lawra", "Tumu", "Jirapa", "Nadowli", "Bamahu"];

const HomePage = () => {
  const { data: popularBrandsData } = useGetPopularBrandsQuery();
  const popularBrands = [{ name: "All" }, popularBrandsData?.data].flat();

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
      <Hero type="secondary" />

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
          {popularBrands?.map((brand) => (
            <button
              key={brand?.name}
              onClick={() => setSelectedBrand(brand?.name as string)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all
                ${
                  selectedBrand === brand?.name
                    ? "bg-brand text-brand-foreground"
                    : "bg-surface-elevated text-muted-foreground border border-border hover:bg-surface-muted"
                }`}
            >
              {brand?.name}
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
            {data?.data?.map((listing, i) => (
              <BikeCard key={i} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
