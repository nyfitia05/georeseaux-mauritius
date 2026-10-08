import { useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { File as FileIcon, UploadCloud, X } from "lucide-react";
import { EASE_SIGNATURE } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  accept: string;
  hint: string;
  files: File[];
  onChange: (files: File[]) => void;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

/**
 * Drag-and-drop uploader for the devis form's "Documents à joindre". Accepts
 * the plans/photos/croquis/documents techniques the brief lists, plus DWG
 * where possible, per the developer brief's "pièces jointes PDF/JPG/PNG et,
 * si possible, DWG".
 */
export function DropZone({ accept, hint, files, onChange }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    onChange([...files, ...Array.from(list)]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files as FileList | null);
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        onDragOver={(event: DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed px-6 py-10 text-center transition-colors duration-300",
          dragging ? "border-yellow-500 bg-yellow-50" : "border-blue-200 bg-blue-50/40 hover:border-blue-400",
        )}
      >
        <UploadCloud className={cn("h-7 w-7", dragging ? "text-yellow-600" : "text-blue-500")} aria-hidden />
        <p className="text-sm font-medium text-ink">Glissez vos documents ici, ou cliquez pour parcourir</p>
        <p className="text-xs text-ink-soft">{hint}</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="sr-only"
          onChange={(event: ChangeEvent<HTMLInputElement>) => addFiles(event.target.files)}
        />
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 space-y-2"
          >
            {files.map((file, index) => (
              <motion.li
                key={`${file.name}-${file.lastModified}`}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.3, ease: EASE_SIGNATURE }}
                className="flex items-center justify-between gap-3 rounded-sm bg-blue-50 px-4 py-2.5 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2 text-ink">
                  <FileIcon className="h-4 w-4 shrink-0 text-blue-500" aria-hidden />
                  <span className="truncate">{file.name}</span>
                  <span className="shrink-0 text-xs text-ink-soft">{formatSize(file.size)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  aria-label={`Retirer ${file.name}`}
                  className="shrink-0 text-blue-400 hover:text-blue-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
