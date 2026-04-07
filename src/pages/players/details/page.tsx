import { IPlayer } from "@/types/player.interface";
import PlayerProfile from "./Profile";
import { PlayerHeadList } from "./PlayerHeadList";
import { useSearchParams } from "react-router-dom";
import { useGetGalleriesQuery } from "@/services/gallery.endpoints";
import {
  useGetPlayersQuery,
  useGetPlayerStatsQuery,
} from "@/services/player.endpoints";
import PageLoader from "@/components/loaders/Page";
import DataErrorAlert from "@/components/error/DataError";

export default function PlayerProfilePage() {
  const [searchParams] = useSearchParams();
  const playerId = searchParams.get("playerId");

  const { data: playersData, isLoading: playersLoading } =
    useGetPlayersQuery("");
  const { data: galleriesData, isLoading: galleriesLoading } =
    useGetGalleriesQuery(`tags=${playerId}`);
  const {
    data: statsData,
    isLoading: statsLoading,
    error,
  } = useGetPlayerStatsQuery(playerId || "");

  const isLoading = playersLoading || galleriesLoading || statsLoading;
  const players = playersData;
  const galleries = galleriesData;
  const playerStats = statsData;

  const player = players?.data?.find((p) => p._id === playerId);

  const name = `${player?.firstName} ${player?.lastName}`;
  const title = `${player?.firstName} ${player?.lastName} • ${ENV.APP_NAME}`;
  const description = `Player profile for ${name}. ${player?.position} wearing jersey #${player?.number}. Stats, appearances, goals, and career highlights.`;
 
  
  useSEO({
    title: title,
    description: description,
    ogImage: playerOgImage(playerId as string),
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!player) {
    return <DataErrorAlert message={"Player Not Found"} />;
  }


  return (
    <>
      <PageSEO page="players" title={title} description={description}  />

      <main className="pl-2">
       
        <PlayerProfile
          players={players?.data as IPlayer[]}
          galleries={galleries?.data}
          stats={playerStats?.data}
        />
        <PlayerHeadList players={players?.data as IPlayer[]} />
      </main>
    </>
  );
}
