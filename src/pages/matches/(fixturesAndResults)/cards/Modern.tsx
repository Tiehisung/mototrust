import { checkTeams } from "@/lib/compute/match";
import { formatDate } from "@/lib/timeAndDate";
import { IMatch } from "@/types/match.interface";
import { Link } from "react-router-dom";

interface Props {
  match?: IMatch;
}
const ModernFixtureCard = ({ match }: Props) => {
  const { home, away } = checkTeams(match);
  return (
    <div className="bg-white rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex items-center gap-4 w-full md:w-auto ">
        <div className="min-w-25">
          <span className="text-gray-600 text-sm font-medium">
            {formatDate(match?.date,'MAR 28, 2025') }
          </span>
          <span className="text-gray-400 text-xs block">
            {match?.competition||'Friendly'}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-left border-l-2 border-Gold/30 pl-2">
          <span className="font-semibold text-gray-800">
            {home?.name}
          </span>
          <span className="text-emerald-600 font-bold text-lg">vs</span>
          <span className="font-semibold text-gray-800">{away?.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        {match?.result ? (
          <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-bold">
            {match?.result}
          </span>
        ) : (
          <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-semibold">
            ⏱️ {match?.time}
          </span>
        )}
        <Link
          to={match?.result ? "/highlights?tag=a-vrs-b" : "/donation"}
          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
        >
          {match?.result ? "📺 Highlights →" : "🎫 Support Match →"}
        </Link>
      </div>
    </div>
  );
};

export default ModernFixtureCard;
