import FixturesSection from "./Fixtures";
import { H } from "@/components/Element";
import { useGetMatchesQuery } from "@/services/match.endpoints";
import PageLoader from "@/components/loaders/Page";
import DataErrorAlert from "@/components/error/DataError";
import { getErrorMessage } from "@/lib/error";
import { PageSEO } from "@/utils/PageSEO";

export default function MatchesPage() {
  const { data: fixtures, isLoading, error } = useGetMatchesQuery({});

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <DataErrorAlert message={getErrorMessage(error)} />;
  }

  return (
    <div>
      <PageSEO page="matches" />
      <H>Scores & Fixtures</H>
      <section className="pb-6 pt-10 px-6 _page">
        <FixturesSection fixtures={fixtures} />
      </section>
    </div>
  );
}
