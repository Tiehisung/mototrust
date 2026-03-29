import HEADER from "@/components/Element";
import OurPlayers from "./Display";
import { useGetPlayersQuery } from "@/services/player.endpoints";
import Loader from "@/components/loaders/Loader";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Helmet } from "react-helmet";
import { TEAM } from "@/data/team";

const PlayersPage = () => {
  const { data: playersData, isLoading, error } = useGetPlayersQuery("");
  const players = playersData;

  if (isLoading) {
    return (
      <div className="">
        <HEADER title="Players" subtitle="Meet Our Gallant Players" />
        <div className="flex justify-center items-center min-h-100">
          <Loader message="Loading players..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="">
        <HEADER title="Players" subtitle="Meet Our Gallant Players" />
        <div className="p-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load players. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Players | {TEAM.name}</title>
        <meta
          name="description"
          content={`Meet the ${TEAM.name} squad, including stats, bios, and profiles.`}
        />
        <meta
          name="keywords"
          content={`${TEAM.name} players, squad, football team, player stats`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={`${TEAM.name} Squad`} />
        <meta
          property="og:description"
          content={`View all ${TEAM.name} players and their profiles.`}
        />
        <meta property="og:image" content={TEAM.logo} />
        <meta property="og:site_name" content={TEAM.name} />
      </Helmet>

      <div className="">
        <HEADER title="Players" subtitle="Meet Our Gallant Players" />
        <OurPlayers players={players} />
      </div>
    </>
  );
};

export default PlayersPage;
