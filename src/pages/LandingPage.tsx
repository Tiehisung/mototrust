import About from "./landing/About";
import LandingFixtures from "./home/Fixtures";
import Newsletter from "./landing/Newsletter";
import TrendingNews from "./landing/TrendingNews";

import NEWSSECTION from "./landing/LandingNewsSection";
import { LiveMatchCard } from "./matches/live/Live";
import LandingNewsHeadlines from "./landing/LandingNews";
import LandingMatchSquad from "./landing/LandingSquad";
import LandingPlayers from "./landing/LandingPlayers";
import Contact from "./landing/Contact";

const LandingPage = () => {
  return (
    <div className=" relative" id="home">
      <NEWSSECTION />

      <LandingPlayers />

      <LandingNewsHeadlines />

      <LandingMatchSquad />

      <LiveMatchCard />

      <LandingFixtures />

      <Contact />

      <About />

      <Newsletter />

      <TrendingNews />
    </div>
  );
};

export default LandingPage;
