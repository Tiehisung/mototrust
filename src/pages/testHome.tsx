// TestHome.tsx - Main homepage component for Bunyeni FC
import React, { useState, useEffect } from "react";

const TestHome: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="font-bold text-xl">B</span>
            </div>
            <span className="font-bold text-xl tracking-tight">
              Bunyeni<span className="text-emerald-500">FC</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8">
            {["Home", "About", "Squad", "Fixtures", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-300 hover:text-emerald-400 transition-colors font-medium"
              >
                {item}
              </button>
            ))}
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-full font-semibold transition-colors">
            Join Us
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=2070&q=80"
            alt="Football stadium"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-900 to-transparent"></div>
        </div>
        <div className="relative z-20 text-center px-4">
          <div className="inline-block px-4 py-1 bg-emerald-500/20 backdrop-blur-sm rounded-full mb-6">
            <span className="text-emerald-400 text-sm font-semibold">
              EST. 2024
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Bunyeni<span className="text-emerald-500"> FC</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
            Where passion meets excellence. The pride of the community, the
            heart of the game.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-full font-semibold transition-colors">
              Buy Tickets
            </button>
            <button className="border border-white/30 hover:border-emerald-500 px-8 py-3 rounded-full font-semibold transition-colors">
              Latest News
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-500 font-semibold tracking-wide uppercase text-sm">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              More Than a Club
            </h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Bunyeni FC was born from the dream of bringing world-class
                football to our community. With a rich heritage and a vision for
                excellence, we stand for determination, teamwork, and the
                beautiful game.
              </p>
              <p className="text-gray-400 mb-8">
                From our academy to the first team, we nurture talent and create
                legends. Our philosophy combines attacking football with
                unwavering defensive discipline — a style that has won hearts
                across the region.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-emerald-500">15+</div>
                  <div className="text-gray-400 text-sm">Trophies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-500">50+</div>
                  <div className="text-gray-400 text-sm">Academy Graduates</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-500">
                    10k+
                  </div>
                  <div className="text-gray-400 text-sm">Passionate Fans</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=600&q=80"
                alt="Football action"
                className="rounded-2xl w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=600&q=80"
                alt="Fans cheering"
                className="rounded-2xl w-full h-48 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80"
                alt="Stadium"
                className="rounded-2xl w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1522778119026-d364f97c3a8d?auto=format&fit=crop&w=600&q=80"
                alt="Team celebration"
                className="rounded-2xl w-full h-48 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Squad Section */}
      <section id="squad" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-500 font-semibold tracking-wide uppercase text-sm">
              The Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              First Team Squad
            </h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {players.map((player, index) => (
              <div
                key={index}
                className="group bg-gray-800/50 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-emerald-500/50"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-500 text-black font-bold w-10 h-10 rounded-full flex items-center justify-center">
                    {player.number}
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-xl">{player.name}</h3>
                  <p className="text-emerald-400 text-sm mb-2">
                    {player.position}
                  </p>
                  <p className="text-gray-400 text-xs">{player.nationality}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors">
              View Full Squad →
            </button>
          </div>
        </div>
      </section>

      {/* Fixtures Section */}
      <section id="fixtures" className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-500 font-semibold tracking-wide uppercase text-sm">
              Upcoming Matches
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Fixtures & Results
            </h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {fixtures.map((match, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-gray-750 transition-colors border border-gray-700"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <span className="text-gray-400 text-sm min-w-20">
                    {match.date}
                  </span>
                  <div className="flex items-center gap-3 flex-1 md:flex-none">
                    <span className="font-semibold text-right min-w-25">
                      {match.home}
                    </span>
                    <span className="text-emerald-500 font-bold">vs</span>
                    <span className="font-semibold min-w-25">
                      {match.away}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  {match.result ? (
                    <span className="bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-sm font-semibold">
                      {match.result}
                    </span>
                  ) : (
                    <span className="bg-yellow-500/20 text-yellow-400 px-4 py-1 rounded-full text-sm font-semibold">
                      {match.time}
                    </span>
                  )}
                  <button className="text-emerald-500 hover:text-emerald-400 text-sm font-medium">
                    {match.result ? "Highlights →" : "Get Tickets →"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-500 font-semibold tracking-wide uppercase text-sm">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Join the Family
            </h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-emerald-500"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Stadium Address</h3>
                  <p className="text-gray-400">
                    Bunyeni Sports Complex, Main Road, Bunyeni District
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope text-emerald-500"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email Us</h3>
                  <p className="text-gray-400">
                    info@bunyeni.fc | tickets@bunyeni.fc
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-phone-alt text-emerald-500"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <p className="text-gray-400">
                    +123 456 7890 | Office Hours: Mon-Fri 9AM-6PM
                  </p>
                </div>
              </div>
              <div className="flex gap-6 pt-4">
                {["facebook", "twitter", "instagram", "youtube"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
                    >
                      <i className={`fab fa-${social}`}></i>
                    </a>
                  ),
                )}
              </div>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-5 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-5 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full px-5 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
              ></textarea>
              <button className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-xl font-semibold transition-colors w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-emerald-500/10 border-y border-emerald-500/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h3 className="text-2xl font-bold mb-2">Never Miss a Match</h3>
          <p className="text-gray-400 mb-6">
            Subscribe to get fixtures, news, and exclusive offers.
          </p>
          <div className="flex max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-5 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-emerald-500 focus:outline-none"
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-400 text-sm">
          <p>
            © 2025 Bunyeni Football Club. All rights reserved. Built with
            passion for the beautiful game.
          </p>
          <p className="mt-2">
            <a href="#" className="hover:text-emerald-500">
              Privacy Policy
            </a>{" "}
            •
            <a href="#" className="hover:text-emerald-500 ml-2">
              Terms of Use
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

// Mock data
const players = [
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
];

const fixtures = [
  {
    date: "MAR 28",
    home: "Bunyeni FC",
    away: "City Rangers",
    result: "3 - 1",
    time: "FT",
  },
  {
    date: "APR 04",
    home: "Mountain Eagles",
    away: "Bunyeni FC",
    result: null,
    time: "15:00",
  },
  {
    date: "APR 11",
    home: "Bunyeni FC",
    away: "Coastal United",
    result: null,
    time: "17:30",
  },
  {
    date: "APR 18",
    home: "Northern Stars",
    away: "Bunyeni FC",
    result: null,
    time: "14:00",
  },
];

export default TestHome;
