import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  supportedTypes: string[];
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  selectedFile,
  supportedTypes,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string>('');

  const validateFile = (file: File): boolean => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!supportedTypes.includes(fileExtension)) {
      setError(`Unsupported file type. Supported types: ${supportedTypes.join(', ')}`);
      return false;
    }
    setError('');
    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
    } else {
      onFileSelect(null);
    }
  };

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
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const clearFile = () => {
    onFileSelect(null);
    setError('');
    const input = document.getElementById('file-input') as HTMLInputElement;
    if (input) input.value = '';
  };

  return (
    <div className="text-center space-y-4">
      {!selectedFile ? (
        <div className="max-w-md mx-auto">
          <button
            className="btn-converter text-xl py-6 px-12 w-full mb-4"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            Select {supportedTypes.includes('.pdf') ? 'PDF' : supportedTypes[0].replace('.', '').toUpperCase()} file
          </button>
          <p className="text-muted-foreground">
            or drop {supportedTypes.includes('.pdf') ? 'PDF' : supportedTypes[0].replace('.', '').toUpperCase()} here
          </p>
          
          {/* Hidden drag and drop area */}
          <div
            className={`fixed inset-0 pointer-events-none ${dragOver ? 'bg-primary/10 pointer-events-auto' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
          
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept={supportedTypes.join(',')}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div className="file-display max-w-md mx-auto">
          <File className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={clearFile}
            className="p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Remove file"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      )}

      {error && (
        <div className="message-error">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;