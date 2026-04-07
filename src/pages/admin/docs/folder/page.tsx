import FolderDocuments from "./FolderDocs";
import { DocumentUploader } from "../DocUploader";
import { PrimarySearch } from "@/components/Search";
import { useGetPlayersQuery } from "@/services/player.endpoints";

export default function FolderPage() {
  // Fetch players for tagging
  const { data: players } = useGetPlayersQuery("");

  return (
    <div>
      <header className="flex items-center justify-between gap-4 my-3.5">
        <DocumentUploader className="w-fit " />
        <PrimarySearch
          type="search"
          datalist={(players?.data ?? [])?.map(
            (p) => `${p?.firstName} ${p?.lastName}`,
          )}
          listId="folder-search"
          searchKey="doc_search"
          placeholder={`Search docs`}
          inputStyles="h-8 placeholder:capitalize"
          className=""
        />
      </header>

      <FolderDocuments />
    </div>
  );
}
