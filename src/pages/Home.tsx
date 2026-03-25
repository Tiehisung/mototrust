// pages/Home.tsx or pages/index.tsx
import { lazy } from "react";

 
import { LiveMatchCard } from "./matches/live/Live";
import { PageSEO } from "@/utils/PageSEO";
import LandingPlayers from "./(landing)/Players";
import About from "./home/About";
import Contact from "./home/Contact";
import Newsletter from "./home/Newsletter";
import Hero from "./home/Hero";
import Navbar from "@/components/Navbar";
import { LandingSquad } from "./(landing)/Squad";
import LandingFixtures from "./home/Fixtures";

const LandingNewsHeadlines = lazy(() => import("./news/LandingNews"));

export default function Home() {
  return (
    <>
      <PageSEO page="home" />
      <Navbar />
      <main className="relative md:block space-y-10">
        <Hero />

        <LandingPlayers />

        <LandingSquad />

        <LiveMatchCard />

      

        <LandingFixtures />

        <LandingNewsHeadlines />

        <About />

        <Contact />

        <Newsletter />

        {/* 
          <Suspense fallback={<GridFallback />}>
            <PlayerStatistics />
          
        */}

        {/* Technical Management */}
        {/* 
         
            <TechnicalManagement />
          
        */}
      </main>
    </>
  );
}
