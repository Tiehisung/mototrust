// components/Fixtures.tsx
import React from "react";

interface Match {
  date: string;
  home: string;
  away: string;
  result: string | null;
  time: string;
  competition: string;
}

const fixtures: Match[] = [
  {
    date: "MAR 28, 2025",
    home: "Bunyeni FC",
    away: "City Rangers",
    result: "3 - 1",
    time: "FT",
    competition: "Premier League",
  },
  {
    date: "APR 04, 2025",
    home: "Mountain Eagles",
    away: "Bunyeni FC",
    result: null,
    time: "15:00",
    competition: "Premier League",
  },
  {
    date: "APR 11, 2025",
    home: "Bunyeni FC",
    away: "Coastal United",
    result: null,
    time: "17:30",
    competition: "Cup Quarterfinal",
  },
  {
    date: "APR 18, 2025",
    home: "Northern Stars",
    away: "Bunyeni FC",
    result: null,
    time: "14:00",
    competition: "Premier League",
  },
  {
    date: "APR 25, 2025",
    home: "Bunyeni FC",
    away: "Western Warriors",
    result: null,
    time: "16:00",
    competition: "Premier League",
  },
];

const Fixtures: React.FC = () => {
  return (
    <section id="fixtures" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
            Calendar
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-800">
            Fixtures & Results
          </h2>
          <div className="w-20 h-1 bg-emerald-600 mx-auto"></div>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {fixtures.map((match, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="min-w-[100px]">
                  <span className="text-gray-600 text-sm font-medium">
                    {match.date}
                  </span>
                  <span className="text-gray-400 text-xs block">
                    {match.competition}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-1 md:flex-none">
                  <span className="font-semibold text-right min-w-[110px] text-gray-800">
                    {match.home}
                  </span>
                  <span className="text-emerald-600 font-bold text-lg">vs</span>
                  <span className="font-semibold min-w-[110px] text-gray-800">
                    {match.away}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                {match.result ? (
                  <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-bold">
                    {match.result}
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-semibold">
                    ⏱️ {match.time}
                  </span>
                )}
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
                  {match.result ? "📺 Highlights →" : "🎫 Get Tickets →"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="#"
            className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1"
          >
            View Full Schedule <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Fixtures;
