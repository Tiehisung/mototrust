import { Button } from "@/components/buttons/Button";
import { PrimaryDropdown } from "@/components/Dropdown";
import { DocMoveTo } from "./MoveTo";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { icons } from "@/assets/icons/icons";
import { downloadFile } from "@/lib/file";
import { IDocFile } from "@/types/doc";
import { useDeleteDocumentMutation } from "@/services/docs.endpoints";
import { smartToast } from "@/utils/toast";
import { fireEscape } from "@/hooks/Esc";

export function DocumentActions({
  document,
  className,
}: {
  document?: IDocFile;
  className?: string;
}) {
  const [deleteDoc, { isLoading: deleting }] = useDeleteDocumentMutation();

  const docName =   document?.original_filename;

  const handleDelete = async () => {
    if (!document?._id) return;

    try {
      const result = await deleteDoc(document._id).unwrap();
      smartToast(result);
      fireEscape();
    } catch (error) {
      smartToast({ error });
    }
  };

  return (
    <PrimaryDropdown
      id={document?._id}
      triggerStyles={`absolute top-1 right-1 md:invisible group-hover:visible ${className || ""}`}
    >
      <ul>
        <li>
          <Button
            onClick={() => {
              downloadFile(document?.secure_url as string, docName as string);
            }}
            className="justify-start w-full font-normal"
            variant="ghost"
          >
            <icons.download className="text-muted-foreground" /> Download
          </Button>
        </li>
        
        <li>
          <DocMoveTo
            trigger={
              <>
                <icons.move className="text-muted-foreground" size={24} /> Move
                To
              </>
            }
         
            document={document}

          />
        </li>
        <li>
          <ConfirmActionButton
            primaryText="Delete"
            trigger={
              <>
                <icons.trash size={24} /> Delete
              </>
            }
            triggerStyles="justify-start w-full"
            onConfirm={handleDelete}
            variant="ghost"
            confirmVariant={"delete"}
            title={`Delete Document [${docName ?? ""}]`}
            confirmText={`Are you sure you want to delete <b>"${docName}"</b>?`}
            isLoading={deleting}
          />
        </li>
      </ul>
    </PrimaryDropdown>
  );
}
