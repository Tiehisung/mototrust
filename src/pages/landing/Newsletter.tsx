// components/Newsletter.tsx
import { Button } from "@/components/buttons/Button";
import { H } from "@/components/Element";
import { Input } from "@/components/input/Inputs";
import React, { useState } from "react";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}! You'll receive the latest updates.`);
      setEmail("");
    }
  };

  return (
    <section className="py-16 ">
        <H>NEWS LETTER</H>
      <div className="bg-emerald-50 container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-envelope-open-text text-emerald-600 text-2xl"></i>

          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Never Miss a Match
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to get fixtures, news, and exclusive offers delivered to
            your inbox.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex max-w-md mx-auto gap-3"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3 bg-white rounded-xl border border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
              required 
              name={"letter"}            />
            <Button
              type="submit"
              className=" text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-gray-400 text-xs mt-4">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
