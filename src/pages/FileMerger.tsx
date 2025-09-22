// FileMerger.tsx
// Note: This is modeled after FileConverter.tsx. Assumptions:
// - FileUploader component needs to be modified to support multiple file uploads (add multiple={true} to input and change onFileSelect to accept File[]).
// - Create a MergeSelector component similar to ConversionSelector, which selects the merge type based on supported formats (e.g., 'pdf', 'word', 'powerpoint', 'excel', 'images').
// - MergeButton can be a copy of ConvertButton with name changes.
// - utils/api.ts needs to export mergeFiles(files: File[], mergeType: string) which posts to /merge with FormData (append 'merge_type' and multiple 'files').
// - For individual pages like /merge-pdf, you can hardcode mergeType='pdf' and remove the selector, filtering files by extension.

import React, { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import MergeSelector from '@/components/MergeSelector'; // Assume this is created similar to ConversionSelector
import MergeButton from '@/components/MergeButton'; // Assume this is created similar to ConvertButton
import DownloadSection from '@/components/DownloadSection';
import { mergeFiles } from '@/utils/api';
import { FileText } from 'lucide-react';

const SUPPORTED_TYPES = ['.pdf', '.docx', '.pptx', '.xlsx', '.jpg', '.jpeg', '.png'];

const FileMerger: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [mergeType, setMergeType] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
    setMergeType('');
    resetResults();
  };

  const handleMergeChange = (value: string) => {
    setMergeType(value);
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

  const handleMerge = async () => {
    if (selectedFiles.length < 2 || !mergeType) return;

    setLoading(true);
    resetResults();

    try {
      const result = await mergeFiles(selectedFiles, mergeType);
      
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
    setSelectedFiles([]);
    setMergeType('');
    resetResults();
  };

  const canMerge = selectedFiles.length >= 2 && mergeType && !loading;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            File Merger
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          Merge your files easily and quickly
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          (PDF, DOCX, PPTX, XLSX, JPG, PNG)
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-12">
        <div className="merger-card space-y-8">
          {/* File Upload - Modify FileUploader to handle multiple */}
          <FileUploader
            selectedFile={selectedFiles} // Adjust prop to selectedFiles
            onFileSelect={handleFileSelect}
            supportedTypes={SUPPORTED_TYPES}
            multiple={true} // Add this prop to FileUploader
          />

          {/* Merge Type Selector */}
          <MergeSelector
            selectedFiles={selectedFiles}
            selectedMerge={mergeType}
            onMergeChange={handleMergeChange}
          />

          {/* Merge Button */}
          <MergeButton
            disabled={!canMerge}
            loading={loading}
            onClick={handleMerge}
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
        <p>Secure file merging • No files stored on our servers</p>
      </footer>
    </div>
  );
};

export default FileMerger;
