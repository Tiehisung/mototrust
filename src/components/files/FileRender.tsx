 
import { getFileIconByExtension } from "@/data/file";
import { cn } from "@/lib/utils";
import { IFileProps } from "@/types/file.interface";
 

interface FileRendererProps {
  file?: IFileProps;
  className?: string;
  controls?: boolean;
}

const FileRenderer: React.FC<FileRendererProps> = ({
  file,
  className,
  controls, 
}) => {
  const fileUrl = file?.thumbnail_url as string;
  const fileType = file?.resource_type as string;
  const fileName = file?.original_filename;

  switch (fileType) {
    case "image":
      return (
        <img
          src={fileUrl}
          alt={fileName!}
          width={500}
          height={500}
       
          className={cn(`max-w-full h-auto`,className)}
     
        />
      );

    case "audio":
      return (
        <audio
          src={fileUrl}
          controls={controls}
          className={`w-full ${className}`}
        />
      );
    case "video":
      return (
        <video
          src={fileUrl}
          controls={controls}
          className={cn(`max-w-full h-auto`,className)}
        />
      );
    case "pdf":
    case "raw":
      return (
        <iframe
          src={fileUrl}
          title={fileName}
          className={cn(`w-full h-64`,className)}
          frameBorder="0"
        />
      );

    case "unknown":
      return (
        <div
          className="text-sm text-Red tooltip flex gap-5 max-sm:flex-col justify-center items-center "
          data-tip={`Unsupported file type: ${fileName}`}
        >
          <span className="text-3xl">{getFileIconByExtension(fileUrl)}</span>
          Unsupported file type: {fileName}
        </div>
      );
    default:
      return (
        <div
          className={`text-3xl form-control justify-center items-center h-full ${className}`}
        >
          {getFileIconByExtension(fileUrl)}
        </div>
      );
  }
};

export default FileRenderer;
