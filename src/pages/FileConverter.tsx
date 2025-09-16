import React, { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import ConversionSelector from '@/components/ConversionSelector';
import ConvertButton from '@/components/ConvertButton';
import DownloadSection from '@/components/DownloadSection';
import { convertFile } from '@/utils/api';
import { FileText } from 'lucide-react';

const SUPPORTED_TYPES = ['.pdf', '.docx', '.pptx', '.xlsx', '.csv', '.jpg', '.jpeg'];

const FileConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setConversionType('');
    resetResults();
  };

  const handleConversionChange = (value: string) => {
    setConversionType(value);
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

  const handleConvert = async () => {
    if (!selectedFile || !conversionType) return;

    setLoading(true);
    resetResults();

    try {
      const result = await convertFile(selectedFile, conversionType);
      
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
    setConversionType('');
    resetResults();
  };

  const canConvert = selectedFile && conversionType && !loading;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            File Converter
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          Convert your files easily and quickly
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          (PDF, DOCX, PPTX, XLSX, CSV, JPG, PDF/A)
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-12">
        <div className="converter-card space-y-8">
          {/* File Upload */}
          <FileUploader
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
            supportedTypes={SUPPORTED_TYPES}
          />

          {/* Conversion Type Selector */}
          <ConversionSelector
            selectedFile={selectedFile}
            selectedConversion={conversionType}
            onConversionChange={handleConversionChange}
          />

          {/* Convert Button */}
          <ConvertButton
            disabled={!canConvert}
            loading={loading}
            onClick={handleConvert}
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
        <p>Secure file conversion • No files stored on our servers</p>
      </footer>
    </div>
  );
};

export default FileConverter;