import React, { useCallback, useState } from 'react';
import { Upload, X, Camera, FileImage } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  maxFiles = 3,
  className,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      
      const droppedFiles = Array.from(e.dataTransfer.files);
      const newFiles = [...files, ...droppedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onFilesChange(newFiles);
    },
    [files, maxFiles, onFilesChange]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);
        setFiles(newFiles);
        onFilesChange(newFiles);
      }
    },
    [files, maxFiles, onFilesChange]
  );

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onFilesChange(newFiles);
    },
    [files, onFilesChange]
  );

  return (
    <div className={cn('space-y-4', className)}>
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
          'hover:border-primary/50 hover:bg-primary/5',
          isDragOver && 'border-primary bg-primary/10',
          'focus-within:border-primary focus-within:bg-primary/5'
        )}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
          disabled={files.length >= maxFiles}
        />
        
        {files.length === 0 ? (
          <label htmlFor="file-upload" className="cursor-pointer block">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground mb-1">
              Adicione fotos ou vídeos do problema
            </p>
            <p className="text-xs text-muted-foreground">
              Arraste arquivos ou clique para selecionar (máx. {maxFiles})
            </p>
          </label>
        ) : (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              {files.length} de {maxFiles} arquivos adicionados
            </p>
            {files.length < maxFiles && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="h-8"
              >
                <Camera className="h-4 w-4 mr-2" />
                Adicionar mais
              </Button>
            )}
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative bg-card border rounded-lg p-3 group hover:shadow-soft transition-shadow"
            >
              <div className="flex items-center space-x-2">
                <FileImage className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};