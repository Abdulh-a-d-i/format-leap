import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ConversionOption {
  value: string;
  label: string;
  target: string;
}

interface ConversionSelectorProps {
  selectedFile: File | null;
  selectedConversion: string;
  onConversionChange: (value: string) => void;
}

const getConversionOptions = (fileExtension: string): ConversionOption[] => {
  const ext = fileExtension.toLowerCase();
  
  switch (ext) {
    case '.pdf':
      return [
        { value: 'pdf-to-docx', label: 'PDF to DOCX', target: 'docx' },
        { value: 'pdf-to-pptx', label: 'PDF to PPTX', target: 'pptx' },
        { value: 'pdf-to-xlsx', label: 'PDF to XLSX', target: 'xlsx' },
        { value: 'pdf-to-csv', label: 'PDF to CSV', target: 'csv' },
        { value: 'pdf-to-jpg', label: 'PDF to JPG', target: 'jpg' },
        { value: 'pdf-to-pdfa', label: 'PDF to PDF/A', target: 'pdfa' },
      ];
    case '.docx':
      return [
        { value: 'docx-to-pdf', label: 'DOCX to PDF', target: 'pdf' },
      ];
    case '.pptx':
      return [
        { value: 'pptx-to-pdf', label: 'PPTX to PDF', target: 'pdf' },
      ];
    case '.xlsx':
      return [
        { value: 'xlsx-to-pdf', label: 'XLSX to PDF', target: 'pdf' },
      ];
    case '.csv':
      return [
        { value: 'csv-to-pdf', label: 'CSV to PDF', target: 'pdf' },
      ];
    case '.jpg':
    case '.jpeg':
    case '.png':
    case '.webp':
    case '.bmp':
    case '.gif':
    case '.tiff':
    case '.tif':
      return [
        { value: 'image-to-pdf', label: 'Image to PDF', target: 'pdf' },
      ];
    default:
      return [];
  }
};

const ConversionSelector: React.FC<ConversionSelectorProps> = ({
  selectedFile,
  selectedConversion,
  onConversionChange,
}) => {
  if (!selectedFile) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Select Conversion Type
        </label>
        <Select disabled>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Upload a file first" />
          </SelectTrigger>
        </Select>
      </div>
    );
  }

  const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
  const options = getConversionOptions(fileExtension);

  if (options.length === 0) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Select Conversion Type
        </label>
        <div className="message-error">
          <p className="text-sm">No conversion options available for this file type.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Select Conversion Type
      </label>
      <Select value={selectedConversion} onValueChange={onConversionChange}>
        <SelectTrigger className="h-12 bg-background border-2">
          <SelectValue placeholder="Choose conversion type" />
        </SelectTrigger>
        <SelectContent className="bg-background border-2 shadow-lg">
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="hover:bg-muted focus:bg-muted"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { getConversionOptions };
export default ConversionSelector;