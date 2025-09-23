import React from 'react';
import { Card } from '@/components/ui/card';
import { FileText, Image, Table, Presentation } from 'lucide-react';

interface MergeSelectorProps {
  onTypeSelect: (type: string) => void;
  selectedType: string;
}

const mergeTypes = [
  {
    id: 'pdf',
    name: 'PDF Files',
    description: 'Merge multiple PDF documents into one',
    icon: FileText,
    acceptedTypes: ['.pdf']
  },
  {
    id: 'word',
    name: 'Word Documents',
    description: 'Combine Word documents',
    icon: FileText,
    acceptedTypes: ['.doc', '.docx']
  },
  {
    id: 'powerpoint',
    name: 'PowerPoint Presentations',
    description: 'Merge PowerPoint slides',
    icon: Presentation,
    acceptedTypes: ['.ppt', '.pptx']
  },
  {
    id: 'excel',
    name: 'Excel Spreadsheets',
    description: 'Combine Excel workbooks',
    icon: Table,
    acceptedTypes: ['.xls', '.xlsx']
  },
  {
    id: 'images',
    name: 'Images to PDF',
    description: 'Combine images into a single PDF',
    icon: Image,
    acceptedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff']
  }
];

const MergeSelector: React.FC<MergeSelectorProps> = ({ onTypeSelect, selectedType }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground neon-text mb-4">
          Choose Merge Type
        </h2>
        <p className="text-muted-foreground">
          Select the type of files you want to merge together
        </p>
      </div>
      
      <div className="cyber-grid">
        {mergeTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Card
              key={type.id}
              className={`
                cyber-card cursor-pointer transition-all duration-300
                ${selectedType === type.id 
                  ? 'border-primary bg-primary/5 shadow-glow' 
                  : 'hover:border-primary/50'
                }
              `}
              onClick={() => onTypeSelect(type.id)}
            >
              <div className="text-center">
                <div className={`
                  inline-flex p-4 rounded-2xl mb-4
                  ${selectedType === type.id 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {type.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {type.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports: {type.acceptedTypes.join(', ')}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MergeSelector;