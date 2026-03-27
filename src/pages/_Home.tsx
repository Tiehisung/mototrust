// pages/Home.tsx or pages/index.tsx
import { lazy } from "react";

import { LiveMatchCard } from "./matches/live/Live";
import { PageSEO } from "@/utils/PageSEO";
import About from "./landing/About";
import Contact from "./landing/Contact";
import Newsletter from "./landing/Newsletter";
import Hero from "./home/Hero";
 
import LandingFixtures from "./home/Fixtures";

const LandingNewsHeadlines = lazy(() => import("./landing/LandingNews"));

export default function Home() {
  return (
    <>
      <PageSEO page="home" />
    
      <main className="relative md:block space-y-10">
        <Hero />


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
