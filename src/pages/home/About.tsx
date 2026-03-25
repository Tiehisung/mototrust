// components/About.tsx
import React from "react";

const About: React.FC = () => {
  const stats = [
    { value: "5+", label: "Trophies" },
    { value: "25+", label: "Juvennile Players" },
    { value: "1000+", label: "Passionate Fans" },
    { value: `${new Date().getFullYear() - 2024}+`, label: "Years of Legacy" },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-800">
            More Than a Club
          </h2>
          <div className="w-20 h-1 bg-emerald-600 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Bunyeni FC was born from the dream of bringing world-class
              football to our community. With a rich heritage and a vision for
              excellence, we stand for determination, teamwork, and the
              beautiful game.
            </p>
            <p className="text-gray-600 mb-8">
              From our academy to the first team, we nurture talent and create
              legends. Our philosophy combines attacking football with
              unwavering defensive discipline — a style that has won hearts
              across the region.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <div className="text-3xl font-bold text-emerald-600">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=600&q=80"
              alt="Football action"
              className="rounded-2xl w-full h-48 object-cover shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=600&q=80"
              alt="Fans cheering"
              className="rounded-2xl w-full h-48 object-cover mt-8 shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80"
              alt="Stadium"
              className="rounded-2xl w-full h-48 object-cover shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1522778119026-d364f97c3a8d?auto=format&fit=crop&w=600&q=80"
              alt="Team celebration"
              className="rounded-2xl w-full h-48 object-cover mt-8 shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
