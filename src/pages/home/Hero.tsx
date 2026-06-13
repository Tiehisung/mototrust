import { useAppSelector } from "@/store/hooks/store";
import {
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineMapPin,
  HiOutlineStar,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const Hero = ({ type = "primary" }: { type?: "primary" | "secondary" }) => {
  const { user } = useAppSelector((s) => s.auth);
  if (type == "primary")
    return (
      <div>
        <section className="relative w-full min-h-svh flex items-center overflow-hidden bg-background">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/5" />
            <div className="absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background" />
          </div>

          <div className="relative z-10 w-full max-w-350 mx-auto px-6 md:px-12 lg:px-24 mt-20">
            <div className="max-w-4xl">
              {/* Label */}
              <div className="flex items-center gap-4 mb-8 animate-fade-in">
                <span className="w-12 h-px bg-primary" />
                <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                  Ghana's Trusted Motorbike Marketplace
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-6 animate-fade-in-up">
                Buy & Sell
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60">
                  Motorbikes Safely
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-muted-foreground font-light max-w-xl leading-relaxed mb-10 animate-fade-in-up-delayed">
                Verified sellers, inspected bikes, trusted deals. The smarter
                way to find your next motorbike in Wa, Lawra, Tumu, and across
                Upper West.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up-delayed-more">
                <Link
                  to="/browse"
                  className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-[0_0_30px_rgba(249,115,22,0.2)] w-full sm:w-auto"
                >
                  Browse Bikes
                  <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={
                    user?.role === "seller"
                      ? "/dashboard/listings/create"
                      : "/auth/register?role=seller"
                  }
                  className="group inline-flex items-center justify-center gap-3 border border-border text-foreground font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:bg-muted w-full sm:w-auto"
                >
                  List Your Bike
                </Link>
              </div>

              {/* Trust stats */}
              <div className="flex items-center gap-6 mt-12 text-sm animate-fade-in-up-delayed-more">
                <div className="flex items-center gap-2">
                  <HiOutlineShieldCheck className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">100% Verified</span>
                </div>
                <span className="text-border">|</span>
                <div className="flex items-center gap-2">
                  <HiOutlineMapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Upper West</span>
                </div>
                <span className="text-border">|</span>
                <div className="flex items-center gap-2">
                  <HiOutlineStar className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Trusted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
            <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
              Scroll
            </span>
            <div className="w-px h-16 bg-linear-to-b from-muted-foreground/50 to-transparent" />
          </div>
        </section>
      </div>
    );

  return (
    <section className="text-center pb-4">
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
          to={
            user?.role == "seller"
              ? "/dashboard/listings/create"
              : "/auth/register"
          }
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated border border-border rounded-xl text-sm font-medium
                  text-surface-foreground hover:bg-surface-muted transition-colors"
        >
          Start selling
          <HiOutlineArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
