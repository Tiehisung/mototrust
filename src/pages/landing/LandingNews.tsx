import { broadcasters } from "@/assets/broadcaster/broadcaster";
import { Reveal } from "@/components/Animate/Reveal";
import { INewsProps } from "@/types/news.interface";
import { H } from "@/components/Element";
import { useGetNewsQuery } from "@/services/news.endpoints";
import Loader from "@/components/loaders/Loader";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import NewsCard from "../news/NewsCard";
import { markupToPlainText } from "@/lib/dom";
import { ResponsiveSwiper } from "@/components/carousel/ResponsiveSwiper";

const casters = Object.values(broadcasters);

const LandingNewsHeadlines = () => {
  const { data: newsData, isLoading, error } = useGetNewsQuery("");
  const news = newsData;
  console.log(newsData);
  if (isLoading) {
    return (
      <div className="">
        <H>NEWS </H>
        <div className="flex justify-center items-center min-h-50">
          <Loader message="Loading news..." />
        </div>
      </div>
    );
  }

  if (error || !news?.data?.length) {
    return (
      <div className="">
        <H>NEWS </H>
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
    <div className=" max-w-6xl mx-auto">
      <H>NEWS </H>
      <ResponsiveSwiper
        swiperStyles={{ width: "100%", height: "fit-content" }}
        slideStyles={{ borderRadius: "0" }}
        slides={
          news?.data?.map((item) => (
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
          )) ?? []
        }
      />
    </div>
  );
};

export default LandingNewsHeadlines;

export const NewsInPage = ({ news }: { news: INewsProps[] }) => {
  if (!news?.length) {
    return (
      <div className="relative flex items-start gap-2">
        <main className="my-5">
          <p className="text-muted-foreground">No news available</p>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex items-start gap-2 max-w-6xl mx-auto">
      <main className="my-5">
        {news?.map((item, index) => {
          return (
            <Reveal
              key={item._id}
              className="grid sm:flex items-start justify-start border-b _borderColor pb-4 mb-6 grow"
            >
              <section className="w-60 max-sm:grow container">
                <img
                  src={item?.headline?.image as string}
                  alt={item?.headline?.text as string}
                  className="h-44 rounded-badge min-w-60 object-cover _secondaryBg"
                />
                <img
                  src={
                    (casters[index % casters.length] as string) ?? casters[2]
                  }
                  alt={item?.headline?.text as string}
                  className="h-5 w-auto object-contain my-2"
                />
                <p className="font-semibold line-clamp-2 h-11 max-w-full">
                  {item?.headline?.text as string}
                </p>
              </section>
            </Reveal>
          );
        })}
      </main>
    </div>
  );
};
