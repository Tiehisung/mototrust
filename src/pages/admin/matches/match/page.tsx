import { IMatch, ITeam } from "@/types/match.interface";
import { checkTeams, checkMatchMetrics } from "@/lib/compute/match";
import { MatchEventsAdmin } from "../live-match/EventsUpdator";
import MatchActions from "./Actions";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";

import Loader from "@/components/loaders/Loader";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetMatchQuery } from "@/services/match.endpoints";
import { useGetTeamsQuery } from "@/services/team.endpoints";
import { AVATAR } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MatchPage() {
  const slug = useParams().matchSlug;

  const { data: matchData, isLoading: matchLoading } = useGetMatchQuery(
    slug || "",
  );

  const { data: teamsData, isLoading: teamsLoading } = useGetTeamsQuery({});
  const match = matchData?.data;

  const { home, away } = checkTeams(match);

  const matchMetrics = checkMatchMetrics(match);
  const isMobile = useIsMobile();

  const isLoading = matchLoading || teamsLoading;

  const teams = teamsData;

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 _page">
        <div className="flex justify-center items-center min-h-100">
          <Loader message="Loading match details..." />
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="container mx-auto p-4 _page">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Match Not Found</AlertTitle>
          <AlertDescription>
            The match you're looking for doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 _page">
      <h1 className="text-2xl font-bold mb-4 text-primaryRed">
        {match?.title} <Badge className="ml-auto">{match?.status}</Badge>
      </h1>
      <MatchActions match={match} teams={teams?.data as ITeam[]} />

      <div className="my-6 flex items-center justify-between gap-6 border p-3 bg-secondary">
        <section className="flex flex-col justify-center items-center gap-2.5 pointer-events-none">
          <AVATAR
            src={home?.logo as string}
            alt={home?.name}
            size={isMobile ? "lg" : "2xl"}
          />
          <p className="text-lg md:text-xl font-semibold ">{home?.name}</p>
        </section>

        <section className="flex flex-col justify-center items-center">
          {match?.status === "UPCOMING" ? (
            <div className="font-semibold text-2xl">VS</div>
          ) : (
            <div className="mx-auto text-2xl text-center">
              {matchMetrics?.goals?.home ?? 0} -{matchMetrics?.goals?.away ?? 0}
            </div>
          )}
        </section>

        <section className="flex flex-col justify-center items-center gap-2.5">
          <AVATAR
            src={away?.logo as string}
            alt={away?.name}
            size={isMobile ? "lg" : "2xl"}
            shape="rounded"
          />
          <p className="text-lg md:text-xl font-semibold ">{away?.name} </p>
        </section>
      </div>

      <br />

      {match && (
        <MatchEventsAdmin
          opponent={match?.opponent as ITeam}
          match={match as IMatch}
        />
      )}
    </div>
  );
}
