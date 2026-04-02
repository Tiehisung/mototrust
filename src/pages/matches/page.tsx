import FixturesSection from "./Fixtures";
import { H } from "@/components/Element";
import { useGetMatchesQuery } from "@/services/match.endpoints";
import PageLoader from "@/components/loaders/Page";
import DataErrorAlert from "@/components/error/DataError";
import { getErrorMessage } from "@/lib/error";
 
import { getMatchFrontendUrl, getMatchShareUrl, matchOgImage } from "@/lib/seo";
import { useSEO } from "@/hooks/useSEO";
import { ShareButton } from "@/components/ShareButton";

export default function MatchesPage() {
  const { data: fixtures, isLoading, error } = useGetMatchesQuery({});

  const m = fixtures?.data ? fixtures.data[0] : null;

  const teamScore = m?.computed?.teamScore || 0;
  const opponentScore = m?.computed?.opponentScore || 0;
  const ogImageUrl = matchOgImage(m?._id || "");
  const shareUrl = getMatchShareUrl(m?._id || "");
  const frontendUrl = getMatchFrontendUrl(m?._id || "");

  useSEO({
    title: m?.title || "Match",
    description: `${m?.title} match. Score: ${teamScore} - ${opponentScore}`,
    ogImage: ogImageUrl,
    ogUrl: frontendUrl,
  });


  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <DataErrorAlert message={getErrorMessage(error)} />;
  }

  return (
    <div>
      {/* <PageSEO page="matches" /> */}
      <H>Scores & Fixtures</H>
      <ShareButton
        shareUrl={shareUrl}
        title={m?.title as string}
        text={`Check out the match: ${m?.title}!`}
      />
      <section className="pb-6 pt-10 px-6 _page">
        <FixturesSection fixtures={fixtures} />
      </section>
    </div>
  );
}
