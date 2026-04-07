
import { FolderActions } from "./FolderActions";
import { PiFolderThin } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { useGetFoldersQuery } from "@/services/docs.endpoints";
import Loader from "@/components/loaders/Loader";

export default function DocumentFolders() {
  const { data: foldersData, isLoading } = useGetFoldersQuery();
  const { pathname } = useLocation();

  if (isLoading) return <Loader />;
  return (
    <main className="flex items-start gap-4 ">
      <ul className="grid grid-cols-2 sm:flex flex-wrap items-center justify-start gap-3 border rounded-2xl overflow-hidden w-fit">
        {foldersData?.data?.map((f, index) => {
          return (
            <li
              key={index}
              className="flex _hover relative group select-auto sm:w-32 "
            >
              <Link to={`${pathname}/folders/${f?._id}`} className="flex grow p-2">
                <div className=" flex flex-col justify-center items-center grow ">
                  <PiFolderThin
                    className={`text-Orange/80 text-7xl lg:text-8xl dark:text-Orange ${
                      f?.isDefault
                        ? "text-muted-foreground dark:text-muted-foreground"
                        : ""
                    }`}
                    size={44}
                  />
                  <span className="font-light text-sm text-muted-foreground mx-auto">
                    {f?.docsCount ?? 0} file{f?.documents?.length==1?'':'s'}
                  </span>

                  <span className="text-sm capitalize font-normal text line-clamp-2 text-center h-10 ">
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

        
      </ul>
    </main>
  );
}
