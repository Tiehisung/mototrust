import { FolderActions } from "./FolderActions";
import { PiFolderThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useGetFoldersQuery } from "@/services/docs.endpoints";
import { Button } from "@/components/buttons/Button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import TableLoader from "@/components/loaders/Table";

export default function DocumentFolders({
  defaultsOnly,
}: {
  defaultsOnly?: boolean;
}) {
  const navigate = useNavigate();
  const { data: foldersData, isLoading } = useGetFoldersQuery({
    isDefault: defaultsOnly ? "true" : "",
  });

  if (isLoading) return <TableLoader rows={3} cols={4} size="lg" />;
  return (
    <main className="flex items-start gap-4 ">
      <ul className="flex flex-wrap items-center justify-start border rounded-2xl w-full overflow-hidden ">
        {foldersData?.data?.map((f, index) => {
          return (
            <li
              key={index}
              className="flex _hover relative group select-auto w-28 overflow-hidden"
            >
              <Link
                to={`/admin/docs/folders/${f?._id}`}
                className="flex grow px-2"
              >
                <div className=" flex flex-col justify-center items-center grow ">
                  <PiFolderThin
                    className={cn(
                      `text-muted-foreground text-7xl lg:text-8xl`,
                      f?.isDefault ? " text-primary" : "",
                    )}
                    size={44}
                  />
                  <span className="font-light text-sm text-muted-foreground mx-auto">
                    {f?.docsCount ?? 0} file
                    {f?.documents?.length == 1 ? "" : "s"}
                  </span>

                  <span className="text-xs capitalize font-normal text line-clamp-2 text-center h-10 w-28 wrap-break-word ">
                    {f?.name}
                  </span>
                </div>
              </Link>
              <div className="absolute right-1 top-1 md:invisible group-hover:visible">
                <FolderActions folder={f} />
              </div>
            </li>
          );
        })}

        {defaultsOnly && (
          <li className="flex items-center justify-center relative sm:w-32 ">
            <Button
              variant={"ghost"}
              className="h-20 px-6 font-normal items-center flex "
              onClick={() => navigate("/admin/docs/folders")}
            >
              More <ChevronRight />
            </Button>
          </li>
        )}
      </ul>
    </main>
  );
}
