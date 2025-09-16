import React from 'react';
import { Download, CheckCircle, AlertCircle } from 'lucide-react';

interface DownloadSectionProps {
  downloadUrl: string | null;
  fileName: string | null;
  success: boolean;
  error: string | null;
  onReset: () => void;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({
  downloadUrl,
  fileName,
  success,
  error,
  onReset,
}) => {
  if (!success && !error) return null;

  const handleDownload = () => {
    if (downloadUrl && fileName) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-4">
      {success && downloadUrl && fileName && (
        <div className="message-success">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Conversion successful!</p>
            <p className="text-sm opacity-90">Your file is ready to download.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="message-error">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Conversion failed</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        </div>
      )}

      {success && downloadUrl && fileName && (
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-success text-success-foreground rounded-lg font-semibold hover:bg-success/90 transition-all duration-300 hover:shadow-lg"
        >
          <Download className="w-4 h-4" />
          Download {fileName}
        </button>
      )}

      <button
        onClick={onReset}
        className="w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
      >
        Convert Another File
      </button>
    </div>
  );
};

export default DownloadSection;