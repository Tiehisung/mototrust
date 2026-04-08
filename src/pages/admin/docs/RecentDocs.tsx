import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useGetDocumentsQuery } from "@/services/docs.endpoints";
import Divider from "@/components/Divider";
import DataErrorAlert from "@/components/error/DataError";
import { DocFilesDisplay } from "./DocFilesDisplay";
import DisplayType from "@/components/DisplayType";
import { LoadingSpinner } from "@/components/loaders/LoadingSpinner";

export function RecentDocs() {
  // Use the query hook instead of server-side fetch
  const {
    data: recentDocs,
    isLoading,
    error,
  } = useGetDocumentsQuery({ limit: 6 });

  if (isLoading) return <LoadingSpinner />;

  if (error && !isLoading && !recentDocs?.data)
    return <DataErrorAlert message={error} />;

  return (
    <div>
      <header className="items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Divider
            content={"RECENT DOCUMENTS "}
            className="text-xs font-light grow"
          />
          <DisplayType />
        </div>
      </header>
      <main>
        <div className="mb-6 space-y-2 divide-y">
          <DocFilesDisplay
            files={recentDocs?.data!}
            showMetadata={true}
            deletable={true}
          />
          <div className="py-6">
            <Link
              to="/admin/docs/files"
              className="_link border rounded-full py-2 px-5 flex items-center justify-between gap-3"
            >
              View More <ChevronRight />
            </Link>
          </div>
        </div>
      </main>
      <br />
    </div>
  );
}
