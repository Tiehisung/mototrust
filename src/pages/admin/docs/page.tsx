import HEADER, { H } from "@/components/Element";
import DocumentFolders from "./Folders";
import { DocumentUploader } from "./DocUploader";
import { ConsentForm } from "@/components/pdf/ConsentForm";
import { RecentDocs } from "./RecentDocs";
import { useGetPlayersQuery } from "@/services/player.endpoints";
import Loader from "@/components/loaders/Loader";
import Divider from "@/components/Divider";
import DocsAddBtn from "./Add";

export default function DocsPage() {
  const { data: playersData, isLoading: playersLoading } =
    useGetPlayersQuery("");

  const isLoading = playersLoading;
  const players = playersData;

  if (isLoading) {
    return (
      <div>
        <HEADER title="DOCUMENTATION" />
        <main className="_page mt-6 pb-6">
          <div className="flex justify-center items-center min-h-100">
            <Loader message="Loading documents..." />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <H>DOCUMENTATION</H>
      <main className="mt-6 pb-6">
        <RecentDocs />

        <section className=" my-6">
          <DocumentUploader className="w-fit my-2 " />
        </section>

        <DocumentFolders />

        <br />

        <Divider
          content="GENERATE CONSENT FORMS"
          className="text-Orange my-6"
        />

        <ConsentForm players={players?.data} />
      </main>

      <DocsAddBtn />
    </div>
  );
}
