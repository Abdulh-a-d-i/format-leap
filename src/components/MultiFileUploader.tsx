import React, { useState, useCallback } from 'react';
import { Upload, X, File } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MultiFileUploaderProps {
  onFilesSelect: (files: File[]) => void;
  selectedFiles: File[];
  supportedTypes: string[];
  maxFiles?: number;
}

const MultiFileUploader: React.FC<MultiFileUploaderProps> = ({
  onFilesSelect,
  selectedFiles,
  supportedTypes,
  maxFiles = 10
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = useCallback((files: FileList): File[] => {
    const validFiles: File[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (supportedTypes.includes(extension)) {
        validFiles.push(file);
      }
    }
    
    return validFiles;
  }, [supportedTypes]);

  const handleFilesSelect = useCallback((newFiles: File[]) => {
    setError(null);
    
    const totalFiles = selectedFiles.length + newFiles.length;
    if (totalFiles > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }
    
    const allFiles = [...selectedFiles, ...newFiles];
    onFilesSelect(allFiles);
  }, [selectedFiles, maxFiles, onFilesSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(e.dataTransfer.files);
    
    if (validFiles.length !== files.length) {
      setError('Some files were not supported and were ignored');
    }
    
    if (validFiles.length > 0) {
      handleFilesSelect(validFiles);
    }
  }, [validateFiles, handleFilesSelect]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const validFiles = validateFiles(e.target.files);
      
      if (validFiles.length !== e.target.files.length) {
        setError('Some files were not supported and were ignored');
      }
      
      if (validFiles.length > 0) {
        handleFilesSelect(validFiles);
      }
    }
  }, [validateFiles, handleFilesSelect]);

  const removeFile = useCallback((index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    onFilesSelect(newFiles);
  }, [selectedFiles, onFilesSelect]);

  const clearAllFiles = useCallback(() => {
    onFilesSelect([]);
    setError(null);
  }, [onFilesSelect]);

  return (
    <div className="space-y-4">
      {selectedFiles.length === 0 ? (
        <div
          className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept={supportedTypes.join(',')}
            onChange={handleInputChange}
            className="hidden"
            id="multi-file-input"
          />
          <label htmlFor="multi-file-input" className="cursor-pointer">
            <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Select Multiple Files
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here or click to browse
            </p>
            <Button type="button" className="cyber-card">
              Choose Files
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Supported formats: {supportedTypes.join(', ')}
            </p>
            <p className="text-xs text-muted-foreground">
              Maximum {maxFiles} files
            </p>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">
              Selected Files ({selectedFiles.length})
            </h3>
            <Button
              onClick={clearAllFiles}
              variant="outline"
              size="sm"
            >
              Clear All
            </Button>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="file-display">
                <File className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  onClick={() => removeFile(index)}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-error"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <input
            type="file"
            multiple
            accept={supportedTypes.join(',')}
            onChange={handleInputChange}
            className="hidden"
            id="add-more-files"
          />
          <label htmlFor="add-more-files">
            <Button type="button" variant="outline" className="w-full">
              Add More Files
            </Button>
          </label>
        </div>
      )}
      
      {error && (
        <div className="message-error">
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default MultiFileUploader;