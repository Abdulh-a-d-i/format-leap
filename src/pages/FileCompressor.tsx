// FileCompressor.tsx
// Note: This is modeled after FileConverter.tsx.
// - ConversionSelector renamed to CompressionLevelSelector (create it to select 'low', 'medium', 'high').
// - ConvertButton renamed to CompressButton (create similar).
// - utils/api.ts needs to export compressFile(file: File, level: string) which posts to /compress with FormData (append 'compress_type' from file extension or param, and 'level').
// - For individual pages like /compress-pdf, hardcode level and type, remove selector if not needed.

import React, { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import CompressionLevelSelector from '@/components/CompressionLevelSelector'; // Assume created similar to ConversionSelector
import CompressButton from '@/components/CompressButton'; // Assume created similar to ConvertButton
import DownloadSection from '@/components/DownloadSection';
import { compressFile } from '@/utils/api';
import { FileText } from 'lucide-react';

const SUPPORTED_TYPES = ['.pdf', '.docx', '.pptx', '.xlsx', '.csv', '.jpg', '.jpeg'];

const FileCompressor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<string>('medium');
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    resetResults();
  };

  const handleLevelChange = (value: string) => {
    setCompressionLevel(value);
    resetResults();
  };

  const resetResults = () => {
    setSuccess(false);
    setError(null);
    setDownloadUrl(null);
    setFileName(null);
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
  };

  const handleCompress = async () => {
    if (!selectedFile || !compressionLevel) return;

    setLoading(true);
    resetResults();

    try {
      const result = await compressFile(selectedFile, compressionLevel);
      
      if (result.success) {
        setDownloadUrl(result.downloadUrl!);
        setFileName(result.fileName!);
        setSuccess(true);
      } else {
        setError(result.error!);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCompressionLevel('medium');
    resetResults();
  };

  const canCompress = selectedFile && compressionLevel && !loading;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            File Compressor
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          Compress your files easily and quickly
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          (PDF, DOCX, PPTX, XLSX, CSV, JPG)
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-12">
        <div className="compressor-card space-y-8">
          {/* File Upload */}
          <FileUploader
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
            supportedTypes={SUPPORTED_TYPES}
          />

          {/* Compression Level Selector */}
          <CompressionLevelSelector
            selectedLevel={compressionLevel}
            onLevelChange={handleLevelChange}
          />

          {/* Compress Button */}
          <CompressButton
            disabled={!canCompress}
            loading={loading}
            onClick={handleCompress}
          />

          {/* Download Section */}
          <DownloadSection
            downloadUrl={downloadUrl}
            fileName={fileName}
            success={success}
            error={error}
            onReset={handleReset}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>Secure file compression • No files stored on our servers</p>
      </footer>
    </div>
  );
};

export default FileCompressor;
