import OtherAdminNews from "./OtherNews";
import { SearchAndFilterNews } from "./SearchAndFilter";
import NewsItemClient from "./NewsClient";
import { useParams, useSearchParams } from "react-router-dom";
import {
  useGetNewsItemQuery,
  useGetNewsQuery,
} from "@/services/news.endpoints";

import { TEAM } from "@/data/team";
import { PageSEO } from "@/utils/PageSEO";
import PageLoader from "@/components/loaders/Page";

export default function NewsItemPage() {
  const newsSlug = useParams().newsSlug;
  const [searchParams] = useSearchParams();
  const paramsString = searchParams.toString();

  const { data: newsItemData, isLoading: itemLoading } = useGetNewsItemQuery(
    newsSlug || "",
  );

  const newsItem = newsItemData?.data;

  const { data: newsData, isLoading: newsLoading } =
    useGetNewsQuery(paramsString);

  const isLoading = itemLoading || newsLoading;

  const news = newsData;

  const title = `${TEAM.name} - ${newsItem?.headline?.text}`;
  const description =
    newsItem?.details?.find((d) => d.text)?.text ||
    "Read the latest news and updates from bunyenifc.";
  const image = newsItem?.headline?.image || TEAM.logo;
  const url = `${TEAM.url}/news/${newsSlug}`;
  const ogImage = image.replace(
    "/upload/",
    "/upload/c_fill,w_1200,h_630,f_auto,q_auto/",
  );
 
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <PageSEO
        page="news"
        description={description}
        title={title}
        image={ogImage}
        url={url}
      />

      <div className="flex max-lg:flex-wrap items-start gap-6 relative pt-6 md:pl-10">
        <section className="grow min-w-3/4">
          <NewsItemClient newsItem={newsItem} />
        </section>
        <section className="sticky top-0 pt-4">
          <SearchAndFilterNews />
          <br />
          <OtherAdminNews news={news} />
        </section>
      </div>
    </>
  );
}
