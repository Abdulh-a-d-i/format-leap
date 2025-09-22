// CompressionPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import FileUploader from '@/components/FileUploader';
import CompressionLevelSelector from '@/components/CompressionLevelSelector'; // Assume this component is created: a selector for 'low', 'medium', 'high'
import CompressButton from '@/components/CompressButton'; // Assume created similar to ConvertButton
import DownloadSection from '@/components/DownloadSection';
import { compressFile } from '@/utils/compressApi'; // Adjust import if needed
import { AlertTriangle, Download } from 'lucide-react';

const compressionConfig: Record<string, {
  title: string;
  description: string;
  fromFormat: string;
  acceptedTypes: string[];
}> = {
  'compress-pdf': {
    title: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality. Perfect for sharing and storage.',
    fromFormat: 'PDF',
    acceptedTypes: ['.pdf']
  },
  'compress-word': {
    title: 'Compress Word', 
    description: 'Make DOC and DOCX files smaller for easier sharing and faster uploads.',
    fromFormat: 'WORD',
    acceptedTypes: ['.doc', '.docx']
  },
  'compress-powerpoint': {
    title: 'Compress PowerPoint',
    description: 'Reduce PPT and PPTX file sizes while keeping all your slides intact.',
    fromFormat: 'PowerPoint',
    acceptedTypes: ['.ppt', '.pptx']
  },
  'compress-excel': {
    title: 'Compress Excel',
    description: 'Make XLSX and XLS spreadsheets smaller without losing any data.',
    fromFormat: 'Excel',
    acceptedTypes: ['.xls', '.xlsx']
  },
  'compress-csv': {
    title: 'Compress CSV',
    description: 'Optimize CSV files for faster processing and reduced storage space.',
    fromFormat: 'CSV',
    acceptedTypes: ['.csv']
  },
  'compress-jpg': {
    title: 'Compress JPG',
    description: 'Reduce image file sizes while maintaining visual quality for web and storage.',
    fromFormat: 'JPG',
    acceptedTypes: ['.jpg', '.jpeg']
  }
};

const CompressionPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const config = type && compressionConfig[type] ? compressionConfig[type] : compressionConfig['compress-pdf']; // Default to compress-pdf
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<string>('medium');
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
          <h1 className="text-2xl font-bold text-foreground mb-4">Compression Not Found</h1>
          <p className="text-muted-foreground">The requested compression type is not available.</p>
        </div>
      </div>
    );
  }

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

  const getCompressType = (pageType: string): string => {
    return pageType.replace('compress-', '');
  };

  const handleCompress = async () => {
    if (!selectedFile || !type) return;

    setLoading(true);
    resetResults();

    try {
      const compressType = getCompressType(type);
      const result = await compressFile(selectedFile, compressionLevel, compressType);
      
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

  const handleDownload = () => {
    if (downloadUrl && fileName) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.click();
    }
  };

  const canCompress = selectedFile && !loading;

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
              {/* File Upload */}
              <FileUploader
                selectedFile={selectedFile}
                onFileSelect={handleFileSelect}
                supportedTypes={config.acceptedTypes}
              />

              {/* Compression Level Selector */}
              <CompressionLevelSelector
                selectedLevel={compressionLevel}
                onLevelChange={handleLevelChange}
              />

              {/* Compress Button */}
              <div className="text-center">
                <CompressButton
                  disabled={!canCompress}
                  loading={loading}
                  onClick={handleCompress}
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
                Compression Complete
              </h3>
              <p className="text-sm text-muted-foreground">
                Your file is ready for download
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
                Compress another file
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
            <span className="text-sm">Secure file compression • No files stored on our servers</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompressionPage;
