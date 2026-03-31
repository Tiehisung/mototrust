import { markupToPlainText } from "@/lib/dom";
import NewsCard from "./NewsCard";
import { useGetNewsQuery } from "@/services/news.endpoints";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { H } from "@/components/Element";
import PageLoader from "@/components/loaders/Page";

export function LatestNews() {
  const { data: newsData, isLoading, error } = useGetNewsQuery("");
  const news = newsData;

  console.log(newsData)

  if (isLoading) {
    return (
      <div>
        <H >LATEST NEWS</H>
        <div className="flex justify-center items-center min-h-75">
          <PageLoader />
        </div>
      </div>
    );
  }

  if (error || !news?.data?.length) {
    return (
      <div>
        <H >LATEST NEWS</H>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No News Available</AlertTitle>
          <AlertDescription>
            There are no news articles at the moment.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <H>LATEST NEWS</H>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-6">
        {news?.data?.slice(0, 5)?.map((item) => (
          <NewsCard
            key={item?._id}
            id={item?.slug}
            title={item?.headline?.text}
            summary={markupToPlainText(
              item?.details?.find((d) => d.text)?.text as string,
            )}
            image={item?.headline?.image}
            date={item?.createdAt}
            tags={item?.tags}
            reactions={[
              item?.likes?.length ?? 0,
              item?.comments?.length ?? 0,
              item?.shares?.length ?? 0,
              item?.views?.length ?? 0,
            ].reduce((acc, p) => acc + p, 0)}
          />
        ))}
      </section>
    </div>
  );
}
