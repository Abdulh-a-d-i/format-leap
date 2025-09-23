// MergingPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import MultiFileUploader from '@/components/MultiFileUploader'; // Modify this component to support multiple files: add prop multiple?: boolean, and if multiple, onChange e.target.files as File[], etc.
import MergeButton from '@/components/MergeButton'; // Assume created similar to ConvertButton
import DownloadSection from '@/components/DownloadSection';
import { mergeFiles } from '@/utils/apiClient'; // Assume new file or in api.ts
import { AlertTriangle, Download } from 'lucide-react';

const mergeConfig: Record<string, {
  title: string;
  description: string;
  fromFormat: string;
  acceptedTypes: string[];
}> = {
  'merge-pdf': {
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one document. Perfect for organizing reports and presentations.',
    fromFormat: 'PDF',
    acceptedTypes: ['.pdf']
  },
  'merge-word': {
    title: 'Merge Word', 
    description: 'Combine multiple DOC and DOCX files into a single document.',
    fromFormat: 'WORD',
    acceptedTypes: ['.doc', '.docx']
  },
  'merge-powerpoint': {
    title: 'Merge PowerPoint',
    description: 'Combine multiple PPT and PPTX presentations into one slideshow.',
    fromFormat: 'PowerPoint',
    acceptedTypes: ['.ppt', '.pptx']
  },
  'merge-excel': {
    title: 'Merge Excel',
    description: 'Combine multiple XLSX and XLS spreadsheets into one workbook.',
    fromFormat: 'Excel',
    acceptedTypes: ['.xls', '.xlsx']
  },
  'merge-images': {
    title: 'Merge Images',
    description: 'Combine multiple JPG, PNG images into a single PDF or image file.',
    fromFormat: 'Images',
    acceptedTypes: ['.jpg', '.jpeg', '.png']
  }
};

const MergingPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const config = type && mergeConfig[type] ? mergeConfig[type] : mergeConfig['merge-pdf']; // Default to merge-pdf
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!config) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Merge Not Found</h1>
          <p className="text-muted-foreground">The requested merge type is not available.</p>
        </div>
      </div>
    );
  }

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
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

  const getMergeType = (pageType: string): string => {
    return pageType.replace('merge-', '');
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2 || !type) return;

    setLoading(true);
    resetResults();

    try {
      const mergeType = getMergeType(type);
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
    resetResults();
  };

  const handleDownload = () => {
    if (downloadUrl && fileName) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.click();
    }
  };

  const canMerge = selectedFiles.length >= 2 && !loading;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {config.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-2">
            {config.description}
          </p>
          <p className="text-sm text-muted-foreground">
            Powered by <span className="text-primary font-semibold">Solid Documents</span>.
          </p>
        </div>
      </section>

      {/* File Upload Section */}
      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {!success ? (
            <div className="space-y-8">
              {/* File Upload - with multiple */}
              <MultiFileUploader
                selectedFiles={selectedFiles}
                onFilesSelect={setSelectedFiles}
                supportedTypes={config.acceptedTypes}
                maxFiles={10}
              />

              {/* Merge Button */}
              <div className="text-center">
                <MergeButton
                  disabled={!canMerge}
                  loading={loading}
                  onClick={handleMerge}
                />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-48 h-64 bg-card border-2 border-dashed border-border rounded-lg flex items-center justify-center mb-6 mx-auto">
                <div className="text-center">
                  <Download className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">File Ready</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Merge Complete
              </h3>
              <p className="text-sm text-muted-foreground">
                Your merged file is ready for download
              </p>
              <button 
                onClick={handleDownload}
                className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Download Now
              </button>
              <button 
                onClick={handleReset}
                className="mt-2 text-sm text-muted-foreground hover:text-primary"
              >
                Merge more files
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Secure file merging • No files stored on our servers</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MergingPage;
