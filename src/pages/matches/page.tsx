import FixturesSection from "./Fixtures";
import { H } from "@/components/Element";
import { useGetMatchesQuery } from "@/services/match.endpoints";
import PageLoader from "@/components/loaders/Page";
import DataErrorAlert from "@/components/error/DataError";
import { getErrorMessage } from "@/lib/error";
import { useSeo } from "@/hooks/useSEO";
import { matchOgImage } from "@/lib/seo";

export default function MatchesPage() {
  const { data: fixtures, isLoading, error } = useGetMatchesQuery({});

  const m = fixtures?.data ? fixtures.data[0] : null;

  useSeo({
      title: m?.title,
      description: m?.comment || `Check out the latest scores and fixtures for Bunyeni FC. Stay updated with our upcoming matches and results.`,
      ogImage: matchOgImage(m?._id as string),
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
      <section className="pb-6 pt-10 px-6 _page">
        <FixturesSection fixtures={fixtures} />
      </section>
    </div>
  );
}
