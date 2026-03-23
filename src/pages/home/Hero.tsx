// components/Hero.tsx
import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-800/20 to-white z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=2070&q=80"
          alt="Football stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      <div className="relative z-20 text-center px-4">
        <div className="inline-block px-4 py-1 bg-emerald-600/90 backdrop-blur-sm rounded-full mb-6 shadow-lg">
          <span className="text-white text-sm font-semibold tracking-wide">
            EST. 2024 • PRIDE OF THE COMMUNITY
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
          Bunyeni<span className="text-emerald-400"> FC</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto mb-8 drop-shadow">
          Where passion meets excellence. The pride of the community, the heart
          of the game.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            Buy Tickets
          </button>
          <button className="border-2 border-white bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-all">
            Latest News
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/80 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
