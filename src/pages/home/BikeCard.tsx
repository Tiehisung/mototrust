import { getRandomIndex } from "@/lib";
import { IListing } from "@/types/listing";
import { FaMotorcycle } from "react-icons/fa";
import { HiOutlineMapPin, HiOutlineShieldCheck } from "react-icons/hi2";
import { Link } from "react-router-dom";

interface IBikeCard {
  listing?: IListing;
  index?: number;
}

const LandingBikeCard = ({
  listing,
  index = getRandomIndex(10),
}: IBikeCard) => {
  return (
    <div>
      <Link
        key={listing?._id}
        to={`/listing/${listing?._id}`}
        className="group relative overflow-hidden rounded-4xl aspect-4/3 reveal-on-scroll block bg-card border border-border"
        style={{ "--reveal-delay": `${index * 100}ms` } as any}
      >
        {listing?.images?.[0] ? (
          <img
            src={listing?.images[0]}
            alt={`${listing?.brand} ${listing?.model || ""}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <FaMotorcycle className="w-16 h-16 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 top-[20%] bg-linear-to-t from-modalOverlay via-card/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
          <h3 className="text-xl font-bold text-white line-clamp-2">
            {listing?.brand} {listing?.model}{" "}
            {listing?.year && `(${listing?.year})`}
          </h3>
          <p className="text-lg font-bold text-primary mt-1">
            GHS {listing?.price.toLocaleString()}
          </p>
          <div className="flex items-center justify-between gap-1 text-xs mt-1 text-white font-normal">
            <span className="text-xs uppercase tracking-widest mb-2">
              {listing?.condition}
            </span> 
            <div className="flex items-center gap-1">
              <HiOutlineMapPin className="w-3 h-3" />
              {listing?.location}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LandingBikeCard;

export const BikeCard = ({ listing }: IBikeCard) => {
  return (
    <Link
      key={listing?._id}
      to={`/listing/${listing?._id}`}
      className="group bg-surface-elevated rounded-2xl overflow-hidden border border-border
                      hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-4/3 bg-surface-muted relative overflow-hidden">
        {listing?.images?.[0] ? (
          <img
            src={listing?.images[0]}
            alt={`${listing?.brand} ${listing?.model || ""}`}
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
          {listing?.listingType === "premium" && (
            <span className="_badge _badgeFeatured">Featured</span>
          )}
        </div>
        <div className="absolute top-2 right-2">
          {listing?.isPhysicallyVerified && (
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
          {listing?.brand} {listing?.model}{" "}
          {listing?.year && (
            <span className="text-muted-foreground font-normal">
              ({listing?.year})
            </span>
          )}
        </h3>
        <div className="mt-1 text-xl font-bold text-brand">
          GHS {listing?.price.toLocaleString()}
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <HiOutlineMapPin className="w-3 h-3" />
          {listing?.location}
          <span className="mx-1">·</span>
          <span className="capitalize">{listing?.condition}</span>
        </div>
      </div>
    </Link>
  );
};
