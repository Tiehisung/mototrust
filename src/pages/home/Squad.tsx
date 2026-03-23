// components/Squad.tsx
import React from "react";

interface Player {
  name: string;
  position: string;
  number: number;
  nationality: string;
  image: string;
}

const players: Player[] = [
  {
    name: "James Mwangi",
    position: "Goalkeeper",
    number: 1,
    nationality: "Kenya",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Carlos Mendes",
    position: "Center Back",
    number: 4,
    nationality: "Portugal",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Samuel Okafor",
    position: "Midfielder",
    number: 8,
    nationality: "Nigeria",
    image:
      "https://images.unsplash.com/photo-1541866302-7b22e5f1cec8?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Lucas Hernandez",
    position: "Striker",
    number: 9,
    nationality: "Argentina",
    image:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "David Kimani",
    position: "Winger",
    number: 7,
    nationality: "Kenya",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Marco Rossi",
    position: "Defensive Mid",
    number: 6,
    nationality: "Italy",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Amadou Diallo",
    position: "Attacking Mid",
    number: 10,
    nationality: "Senegal",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Thomas Adebayor",
    position: "Striker",
    number: 11,
    nationality: "Togo",
    image:
      "https://images.unsplash.com/photo-1545912452-8f2e3c1e3d9a?auto=format&fit=crop&w=400&q=80",
  },
];

const Squad: React.FC = () => {
  return (
    <section id="squad" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
            The Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-800">
            First Team Squad
          </h2>
          <div className="w-20 h-1 bg-emerald-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Meet the talented players representing Bunyeni FC with pride and
            passion
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map((player, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                  {player.number}
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-xl text-gray-800">
                  {player.name}
                </h3>
                <p className="text-emerald-600 text-sm mb-1 font-semibold">
                  {player.position}
                </p>
                <p className="text-gray-500 text-xs">{player.nationality}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg">
            View Full Squad →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Squad;
