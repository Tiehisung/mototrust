// components/Squad.tsx
import Loader from "@/components/loaders/Loader";
import { symbols } from "@/data";
import { shortText } from "@/lib";
import { formatDate, getTimeLeftOrAgo } from "@/lib/timeAndDate";
import { useGetSquadsQuery } from "@/services/squad.endpoints";
import { ISquad } from "@/types/squad.interface";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  squad?: ISquad;
}
// Large Screen Component (Desktop)
const Desktop: React.FC<Props> = ({ squad }) => {
  if (!squad) return;
  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden">
      {/* Trending Header */}
      <div className="flex items-center gap-2 my-6">
        <span className=" font-semibold text-3xl tracking-wide">
          SQUAD - {squad?.title || "Latest Fixture Squad"}
        </span>
      </div>

      {/* Hero Section with Main Image */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={squad?.coach?.avatar || (squad?.assistant?.avatar as string)}
          alt="International break action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
            {squad?.title}
          </h2>
          <p className="text-white/90 text-sm md:text-base max-w-2xl">
            {squad?.description}
          </p>
          {squad?.match && (
            <div className="flex items-center gap-2 pt-2 text-white">
              <Calendar size={14} />
              {formatDate(squad?.match?.date, "MAR 28, 2025")}{" "}
              {`${symbols.dot} ${getTimeLeftOrAgo(squad?.match?.date).formatted}`}
            </div>
          )}
        </div>
      </div>

      {/* Trending Items Grid */}
      <div className="py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {squad?.players?.slice(0, 3)?.map((player) => (
            <div
              key={player?._id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={player?.avatar}
                  alt={player?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                  {player?.position}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-2 group-hover:text-primary transition-colors">
                      {player?.name}
                    </h3>
                    <Link
                      to={`/players/details?playerId=${player?._id}`}
                      className="flex items-center gap-1 text-primary text-sm font-medium"
                    >
                      <span>Read more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Link */}
        <div className="flex justify-end border-t pt-6 mt-4">
          <Link
            to={"/squad"}
            className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
          >
            <span>SQUAD {shortText(squad?.title as string)} - SEE MORE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Mobile Screen Component
const Mobile: React.FC<Props> = ({ squad }) => {
  return (
    <div className="w-full overflow-hidden">
      {/* Trending Header - Compact */}
      <div className=" my-5 flex items-center gap-2">
        <span className=" font-semibold text-3xl tracking-wide">
          SQUAD- {squad?.title || "Latest Fixture Squad"}
        </span>
      </div>

      {/* Hero Section with Main Image - Mobile */}
      <div className="relative max-sm:h-[80vw] overflow-hidden">
        <img
          src={squad?.coach?.avatar || (squad?.assistant?.avatar as string)}
          alt="International break action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-lg font-bold text-white mb-1 leading-tight">
            {squad?.title}
          </h2>
          <p className="text-white/80 text-xs line-clamp-2">
            {squad?.description}
          </p>
          {squad?.match?.date && (
            <div className="flex items-center gap-2 pt-2 text-white">
              <Calendar size={14} />
              {formatDate(squad?.match?.date, "MAR 28, 2025")}{" "}
              {`${symbols.dot} ${getTimeLeftOrAgo(squad?.match?.date)}`}
            </div>
          )}
        </div>
      </div>

      {/* Trending Items List - Mobile with Images */}
      <div className="my-5">
        <div className="space-y-4 mb-5">
          {squad?.players?.slice(0, 3)?.map((player) => (
            <div
              key={player?._id}
              className="bg-gray-50 overflow-hidden active:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex">
                <div className="w-24 h-24 shrink-0">
                  <img
                    src={player?.avatar}
                    alt={player?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
                        {player?.name}
                      </h3>
                      <Link
                        to={`/players/details?playerId=${player?._id}`}
                        className="flex items-center gap-1 text-primary text-xs font-medium mt-2"
                      >
                        <span>Read more</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Link - Compact */}
        <div className="border-t pt-4">
          <Link
            to={`/squad`}
            className="flex items-center justify-between w-full text-primary font-semibold text-sm"
          >
            <span>
              SQUAD {shortText(squad?.title as string) || "SQUAD"} - SEE MORE
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main Responsive Component
interface TrendingProps {
  className?: string;
  // data: INewsSectionProps;
}

const LandingMatchSquad: React.FC<TrendingProps> = ({ className = "" }) => {
  const { data: squadsData, isLoading } = useGetSquadsQuery("");
  const squad = squadsData?.data ? squadsData?.data[0] : undefined;

  console.log({squad})

  if (isLoading) {
    return (
      <div className="py-12 px-4 space-y-8 _page flex justify-center items-center min-h-100">
        <Loader message="Loading squad..." />
      </div>
    );
  }
  return (
    <div className={`container ${className}`} id='squad'>
      <div className="hidden md:block">
        <Desktop squad={squad} />
      </div>

      <div className="block md:hidden">
        <Mobile squad={squad} />
      </div>
    </div>
  );
};

export default LandingMatchSquad;
