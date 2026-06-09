import { useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import { Plus, X, Loader2, AlertCircle } from "lucide-react";
import {
  useDeleteFileMutation,
  useUploadImagesMutation,
} from "@/services/uploadApi";
import { extractPublicIdFromUrl } from "@/lib/file";

interface ImageUploadProps {
  label?: string;
  value?: string[];
  onChange?: (urls: string[]) => void;
  error?: string;
  maxFiles?: number;
  maxFileSize?: number;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DEFAULT_MAX_SIZE = 5; // 5MB

export const ImageUpload = ({
  label = "Images",
  value = [],
  onChange,
  error,
  maxFiles = 8,
  maxFileSize = DEFAULT_MAX_SIZE,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const [uploadImages] = useUploadImagesMutation();
  const [deleteFile] = useDeleteFileMutation();

  const validateFiles = useCallback(
    (files: File[]): string | null => {
      // Check total count
      if (value.length + files.length > maxFiles) {
        return `You can only upload ${maxFiles} images total. You already have ${value.length}.`;
      }

      // Check each file
      for (const file of files) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          return `"${file.name}" is not a supported format. Use JPEG, PNG, or WebP.`;
        }
        if (file.size > maxFileSize * 1024 * 1024) {
          return `"${file.name}" exceeds ${maxFileSize}MB limit.`;
        }
      }

      return null;
    },
    [value.length, maxFiles, maxFileSize],
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Reset input
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (files.length === 0) return;

    // Validate
    const validationError = validateFiles(files);
    if (validationError) {
      setLocalError(validationError);
      toast.error("Invalid file", { description: validationError });
      return;
    }

    setLocalError(null);
    setUploading(true);

    try {
      // ============================================
      // BULK UPLOAD - Send all files at once
      // ============================================
      const formData = new FormData();

      // Append ALL files to the same FormData
      files.forEach((file) => {
        formData.append("images", file);
      });

      // Single API call for all files
      const result = await uploadImages(formData).unwrap();

      // result.data should be an array of Cloudinary files
      if (result.data?.length) {
        const newUrls = [
          ...value,
          ...result.data.map((file) => file.secure_url),
        ];
        onChange?.(newUrls);
        toast.success(
          `${result.data.length} image${result.data.length > 1 ? "s" : ""} uploaded`,
        );
      }
    } catch (err: any) {
      const message = err?.data?.message || "Upload failed";
      setLocalError(message);
      toast.error("Upload failed", { description: message });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (index: number) => {
    const newUrls = value.filter((_, i) => i !== index);
    const fileToDelete = extractPublicIdFromUrl(value[index]);
    onChange?.(newUrls);

    await deleteFile({
      public_id: fileToDelete as string,
    }).unwrap();
  };

  const handleReorder = (fromIndex: number, direction: "left" | "right") => {
    const toIndex = direction === "left" ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= value.length) return;

    const newUrls = [...value];
    [newUrls[fromIndex], newUrls[toIndex]] = [
      newUrls[toIndex],
      newUrls[fromIndex],
    ];
    onChange?.(newUrls);
  };

  const displayError = error || localError;

  return (
    <div className="space-y-3">
      {/* Label + Counter */}
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-surface-foreground">
            {label} <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-muted-foreground">
            {value.length}/{maxFiles}
          </span>
        </div>
      )}

      {/* Uploading Indicator */}
      {uploading && (
        <div className="bg-brand-muted/30 rounded-xl p-3 flex items-center gap-3">
          <Loader2 className="w-4 h-4 animate-spin text-brand shrink-0" />
          <span className="text-sm text-brand font-medium">
            Uploading images...
          </span>
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {/* Existing Images */}
        {value.map((fileUrl, urlIndex) => (
          <div key={fileUrl} className="relative group aspect-square">
            <img
              src={fileUrl}
              alt={`Bike photo ${urlIndex + 1}`}
              className="w-full h-full object-cover rounded-xl border border-border"
              loading="lazy"
            />

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => handleRemove(urlIndex)}
              className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full 
                opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Cover Badge */}
            {urlIndex === 0 && (
              <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-md">
                Cover
              </span>
            )}

            {/* Image Number */}
            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-md">
              {urlIndex + 1}
            </span>

            {/* Reorder Arrows */}
            <div
              className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1
              opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            >
              {urlIndex > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReorder(urlIndex, "left");
                  }}
                  className="pointer-events-auto p-1 bg-black/40 backdrop-blur-sm text-white rounded-full
                    hover:bg-black/60 transition-colors"
                >
                  ‹
                </button>
              )}
              {urlIndex < value.length - 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReorder(urlIndex, "right");
                  }}
                  className="pointer-events-auto p-1 bg-black/40 backdrop-blur-sm text-white rounded-full
                    hover:bg-black/60 transition-colors ml-auto"
                >
                  ›
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add Button */}
        {value.length < maxFiles && !uploading && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-square border-2 border-dashed border-border rounded-xl 
              flex flex-col items-center justify-center gap-1.5 
              hover:border-brand hover:bg-brand-muted/10 transition-all
              bg-surface-muted/30 group"
          >
            <div
              className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center
              group-hover:bg-brand-muted/20 transition-colors"
            >
              <Plus className="w-5 h-5 text-muted-foreground group-hover:text-brand" />
            </div>
            <span className="text-[11px] text-muted-foreground group-hover:text-brand">
              Add photo
            </span>
          </button>
        )}

        {/* Uploading Placeholder */}
        {uploading && value.length < maxFiles && (
          <div
            className="aspect-square border-2 border-dashed border-brand/30 rounded-xl 
            flex items-center justify-center bg-brand-muted/10"
          >
            <Loader2 className="w-6 h-6 animate-spin text-brand/50" />
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Info Footer */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {value.length === 0
            ? "Add at least 1 photo"
            : `${value.length} of ${maxFiles} photos`}
        </p>
        <p className="text-xs text-muted-foreground">
          JPEG, PNG, WebP • Max {maxFileSize}MB each
        </p>
      </div>

      {/* Error */}
      {displayError && (
        <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 dark:bg-red-950/20 rounded-lg px-3 py-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {displayError}
        </div>
      )}

      {/* Tips */}
      {value.length === 0 && !uploading && !displayError && (
        <div className="bg-brand-muted/10 rounded-xl p-3 space-y-1.5">
          <p className="text-[11px] font-medium text-brand">📸 Photo tips:</p>
          <ul className="text-[11px] text-muted-foreground space-y-0.5 list-disc list-inside">
            <li>Bright, natural lighting works best</li>
            <li>Show all 4 sides of the bike</li>
            <li>Include close-ups of any damage</li>
            <li>Photograph the odometer</li>
          </ul>
        </div>
      )}
    </div>
  );
};

// ============================================
// VALIDATION HELPER
// ============================================
export const validateImages = (urls: string[] | undefined): string | null => {
  if (!urls || urls.length === 0) {
    return "At least one image is required";
  }
  return null;
};
