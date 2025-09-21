import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import FileUploader from '@/components/FileUploader';
import ConvertButton from '@/components/ConvertButton';
import DownloadSection from '@/components/DownloadSection';
import { convertFile } from '@/utils/api';
import { AlertTriangle, Download } from 'lucide-react';

const conversionConfig: Record<string, {
  title: string;
  description: string;
  fromFormat: string;
  toFormat: string;
  acceptedTypes: string[];
}> = {
  'pdf-to-word': {
    title: 'PDF to WORD Converter',
    description: 'Convert your PDF to WORD documents with incredible accuracy.',
    fromFormat: 'PDF',
    toFormat: 'WORD',
    acceptedTypes: ['.pdf']
  },
  'pdf-to-powerpoint': {
    title: 'PDF to PowerPoint Converter',
    description: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.',
    fromFormat: 'PDF', 
    toFormat: 'PowerPoint',
    acceptedTypes: ['.pdf']
  },
  'pdf-to-excel': {
    title: 'PDF to Excel Converter',
    description: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.',
    fromFormat: 'PDF',
    toFormat: 'Excel', 
    acceptedTypes: ['.pdf']
  },
  'word-to-pdf': {
    title: 'Word to PDF Converter',
    description: 'Make DOC and DOCX files easy to read by converting them to PDF.',
    fromFormat: 'WORD',
    toFormat: 'PDF',
    acceptedTypes: ['.doc', '.docx']
  },
  'powerpoint-to-pdf': {
    title: 'PowerPoint to PDF Converter', 
    description: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.',
    fromFormat: 'PowerPoint',
    toFormat: 'PDF',
    acceptedTypes: ['.ppt', '.pptx']
  },
  'excel-to-pdf': {
    title: 'Excel to PDF Converter',
    description: 'Make EXCEL spreadsheets easy to read by converting them to PDF.',
    fromFormat: 'Excel',
    toFormat: 'PDF', 
    acceptedTypes: ['.xls', '.xlsx']
  },
  'pdf-to-jpg': {
    title: 'PDF to JPG Converter',
    description: 'Convert each PDF page into a JPG or extract all images contained in a PDF.',
    fromFormat: 'PDF',
    toFormat: 'JPG',
    acceptedTypes: ['.pdf']
  },
  'jpg-to-pdf': {
    title: 'JPG to PDF Converter',
    description: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.',
    fromFormat: 'JPG',
    toFormat: 'PDF',
    acceptedTypes: ['.jpg', '.jpeg']
  },
  'html-to-pdf': {
    title: 'HTML to PDF Converter',
    description: 'Convert webpages in HTML to PDF. Copy and paste the URL of the page you want and convert it to PDF with a click.',
    fromFormat: 'HTML',
    toFormat: 'PDF',
    acceptedTypes: ['.html']
  },
  'pdf-to-pdfa': {
    title: 'PDF to PDF/A Converter',
    description: 'Transform your PDF to PDF/A, the ISO-standardized version of PDF for long-term archiving.',
    fromFormat: 'PDF',
    toFormat: 'PDF/A',
    acceptedTypes: ['.pdf']
  }
};

const ConversionPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const config = type ? conversionConfig[type] : null;
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
          <h1 className="text-2xl font-bold text-foreground mb-4">Conversion Not Found</h1>
          <p className="text-muted-foreground">The requested conversion type is not available.</p>
        </div>
      </div>
    );
  }

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
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

  const getTargetFormat = (conversionType: string): string => {
    const formatMap: Record<string, string> = {
      'pdf-to-word': 'docx',
      'pdf-to-powerpoint': 'pptx', 
      'pdf-to-excel': 'xlsx',
      'word-to-pdf': 'pdf',
      'powerpoint-to-pdf': 'pdf',
      'excel-to-pdf': 'pdf',
      'pdf-to-jpg': 'jpg',
      'jpg-to-pdf': 'pdf',
      'html-to-pdf': 'pdf',
      'pdf-to-pdfa': 'pdfa'
    };
    return formatMap[conversionType] || 'pdf';
  };

  const handleConvert = async () => {
    if (!selectedFile || !type) return;

    setLoading(true);
    resetResults();

    try {
      const targetFormat = getTargetFormat(type);
      const result = await convertFile(selectedFile, targetFormat);
      
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
    resetResults();
  };

  const canConvert = selectedFile && !loading;

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
          {!selectedFile ? (
            <div className="text-center">
              <FileUploader
                selectedFile={selectedFile}
                onFileSelect={handleFileSelect}
                supportedTypes={config.acceptedTypes}
              />
            </div>
          ) : (
            <div className="space-y-8">
              {/* File Display */}
              <div className="file-display">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Convert Button */}
              <div className="text-center">
                <ConvertButton
                  disabled={!canConvert}
                  loading={loading}
                  onClick={handleConvert}
                />
              </div>

              {/* Download Section */}
              <DownloadSection
                downloadUrl={downloadUrl}
                fileName={fileName}
                success={success}
                error={error}
                onReset={handleReset}
              />
            </div>
          )}
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Secure file conversion • No files stored on our servers</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConversionPage;