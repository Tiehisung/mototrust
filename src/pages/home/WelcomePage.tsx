import { Link } from "react-router-dom";
import { useGetListingsQuery } from "@/services/listingsApi";
import { useGetBrandsQuery } from "@/services/brandApi";
import {
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineStar,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";
import { ContactSection } from "../Contact/ContactForm";
import Footer from "../Footer";
import LandingBikeCard from "./BikeCard";
import Hero from "./Hero";
import { useScrollProgressBar } from "@/hooks/useScroll";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import HomeNav from "./HomeNav";

const LandingPage = () => {
  useScrollReveal({});
  useScrollProgressBar();
  const {
    data: listingsData,
    isLoading,
    isError,
  } = useGetListingsQuery({ limit: 6 });
  const { data: brandsData } = useGetBrandsQuery();
  const popularBrands = brandsData?.data?.filter((b) => b.isPopular) || [];
  const featuredListings = listingsData?.data || [];
  return (
    <div className="bg-background text-foreground overflow-x-hidden min-h-screen relative selection:bg-primary/30">
      {/* ============ SCROLL PROGRESS ============ */}
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 h-0.5 w-full z-70 bg-linear-to-r from-transparent via-primary to-primary pointer-events-none"
        style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
      />

      {/* ============ NAVBAR ============ */}
      <HomeNav />

      {/* ============ HERO ============ */}
      <Hero />

      {/* ============ TRUST STRIP ============ */}
      <section className="relative bg-card border-y border-border">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border py-10">
            {[
              {
                icon: HiOutlineShieldCheck,
                title: "Verified Sellers",
                desc: "Identity checked & approved",
              },
              {
                icon: FaMotorcycle,
                title: `${featuredListings.length}+ Listings`,
                desc: "Across Upper West Region",
              },
              {
                icon: HiOutlineStar,
                title: "Trusted Platform",
                desc: "Safe transactions guaranteed",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center reveal-on-scroll py-6 md:py-0"
                style={{ "--reveal-delay": `${i * 100}ms` } as any}
              >
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-xl text-foreground mb-1">
                  {item.title}
                </h4>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="relative py-24 bg-muted/30">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16 reveal-on-scroll">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                How It Works
              </span>
              <span className="w-12 h-px bg-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Three Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-px bg-border z-0" />

            {[
              {
                step: "01",
                title: "Create Listing",
                desc: "Post your motorbike with photos, price, and details. Choose standard or premium listing.",
              },
              {
                step: "02",
                title: "Get Verified",
                desc: "Our team reviews your listing and verifies your identity for buyer confidence.",
                highlighted: true,
              },
              {
                step: "03",
                title: "Sell Safely",
                desc: "Connect with verified buyers. Meet in person, inspect the bike, and close the deal.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative z-10 reveal-on-scroll text-center group"
                style={{ "--reveal-delay": `${i * 100}ms` } as any}
              >
                <div
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                    item.highlighted
                      ? "bg-primary/10 border-2 border-primary shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                      : "bg-card border border-border group-hover:border-primary/50"
                  }`}
                >
                  <span
                    className={`font-bold text-2xl ${item.highlighted ? "text-primary" : "text-foreground group-hover:text-primary"} transition-colors`}
                  >
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-foreground uppercase tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED LISTINGS ============ */}
      <section
        id="browse"
        className="relative py-24 bg-background border-t border-border"
      >
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 reveal-on-scroll">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-primary" />
                <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                  Latest Bikes
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                Featured Listings
              </h2>
            </div>
            <Link
              to="/browse"
              className="hidden md:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors pb-2 border-b border-border hover:border-primary"
            >
              View All Bikes
              <HiOutlineArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

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
            ) : featuredListings?.length === 0 ? (
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
                {listingsData?.data?.slice(0, 6)?.map((listing, i) => (
                  <LandingBikeCard listing={listing} index={i} />
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              to="/browse"
              className="inline-flex items-center justify-center gap-3 border border-border text-foreground font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all hover:bg-muted w-full"
            >
              View All Bikes
            </Link>
          </div>
        </div>
      </section>

      {/* ============ POPULAR BRANDS ============ */}
      <section className="relative py-24 bg-muted/30">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-12 reveal-on-scroll">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                Popular Brands
              </span>
              <span className="w-12 h-px bg-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Trusted Manufacturers
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 reveal-on-scroll">
            {popularBrands.map((brand) => (
              <Link
                key={brand._id}
                to={`/browse?brand=${brand.name}`}
                className="px-6 py-4 bg-card border border-border rounded-2xl text-foreground font-semibold text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
              >
                {brand.name}
              </Link>
            ))}
            <Link
              to="/browse"
              className="px-6 py-4 bg-primary/10 border border-primary/30 rounded-2xl text-primary font-semibold text-sm hover:bg-primary/20 transition-all duration-300 hover:scale-105"
            >
              View All Brands →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-24 overflow-hidden bg-primary/5 border-t border-border">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal-on-scroll">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                Ready to Ride?
              </span>
              <span className="w-12 h-px bg-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-[1.1]">
              Find Your Perfect
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60">
                Motorbike Today
              </span>
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-10 text-lg max-w-xl mx-auto">
              Join hundreds of buyers and sellers across Upper West. The trusted
              way to buy and sell motorbikes in Ghana.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/browse"
                className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider px-10 py-5 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-[0_0_40px_rgba(249,115,22,0.2)] w-full sm:w-auto"
              >
                Browse Bikes Now
                <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/auth/register"
                className="group inline-flex items-center justify-center gap-3 border border-border text-foreground font-semibold text-sm uppercase tracking-wider px-10 py-5 rounded-full transition-all duration-300 hover:bg-muted w-full sm:w-auto"
              >
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="relative py-24 bg-background border-t border-border">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-24">
          <ContactSection />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
