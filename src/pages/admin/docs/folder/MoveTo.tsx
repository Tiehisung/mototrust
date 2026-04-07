import { COMBOBOX } from "@/components/ComboBox";
import { DIALOG } from "@/components/Dialog";
import { Badge } from "@/components/ui/badge";
import { ReactNode, useState } from "react";
import { IDocFile } from "@/types/doc";
import {
  useGetFoldersQuery,
  useMoveDocumentsMutation,
} from "@/services/docs.endpoints";
import { smartToast } from "@/utils/toast";
import { Button } from "@/components/buttons/Button";

interface IProps {
  document?: IDocFile;

  trigger: ReactNode;
}
export function DocMoveTo({ document, trigger }: IProps) {
  const { data: foldersData, isLoading } = useGetFoldersQuery();

  const otherFolders = foldersData?.data?.filter(
    (f) => f._id !== document?.folder?._id,
  ); //Exclude the source folder
  const [destFolderId, setDestFolderId] = useState("");

  const [moveFile, { isLoading: moving }] = useMoveDocumentsMutation();

  const handleMove = async () => {
    try {
      const result = await moveFile({
        destinationFolderId: destFolderId,
        fileIds: [document?._id as string],
      }).unwrap();
      smartToast(result);
    } catch (error) {
      smartToast({ error });
    }
  };

  return (
    <DIALOG
      trigger={trigger}
      variant={"ghost"}
      triggerStyles="w-full justify-start font-normal"
    >
      <div className="flex flex-col gap-3 justify-center items-center">
        <div>
          Move
          <Badge variant={"secondary"}>{document?.original_filename}</Badge>
          to{" "}
        </div>
        <COMBOBOX
          options={
            otherFolders?.map((f) => ({
              label: f.name,
              value: f.name,
            })) ?? []
          }
          onChange={(op) => setDestFolderId(op.value)}
          className="min-w-60 "
          isLoading={isLoading}
        />

        <Button
          onClick={handleMove}
          primaryText={"Move"}
          className="justify-center min-w-60"
          disabled={!destFolderId}
          waiting={moving}
        />
      </div>
    </DIALOG>
  );
}
