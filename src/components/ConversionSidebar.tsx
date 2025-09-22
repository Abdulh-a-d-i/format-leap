import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Globe, FileText } from 'lucide-react';

interface ConversionSidebarProps {
  url?: string;
  downloadUrl?: string;
  fileName?: string;
  onReset: () => void;
  onDownload?: () => void;
}

const ConversionSidebar: React.FC<ConversionSidebarProps> = ({
  url,
  downloadUrl,
  fileName,
  onReset,
  onDownload
}) => {
  return (
    <div className="w-80 bg-card border-l border-border p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Conversion Details</h3>
        
        {url && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span>Source URL</span>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-foreground break-all">{url}</p>
            </div>
          </div>
        )}

        {fileName && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>Converted File</span>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-foreground">{fileName}</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {downloadUrl && (
          <Button
            onClick={onDownload}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        )}
        
        <Button
          onClick={onReset}
          variant="outline"
          className="w-full"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          New Conversion
        </Button>
      </div>
    </div>
  );
};

export default ConversionSidebar;