// src/components/CompressionLevelSelector.tsx
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CompressionLevelSelectorProps {
  selectedLevel: string;
  onLevelChange: (value: string) => void;
}

const compressionLevels = [
  { value: 'low', label: 'Low Compression (Higher Quality)' },
  { value: 'medium', label: 'Medium Compression (Balanced)' },
  { value: 'high', label: 'High Compression (Smaller Size)' },
];

const CompressionLevelSelector: React.FC<CompressionLevelSelectorProps> = ({
  selectedLevel,
  onLevelChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Select Compression Level
      </label>
      <Select value={selectedLevel} onValueChange={onLevelChange}>
        <SelectTrigger className="h-12 bg-background border-2">
          <SelectValue placeholder="Choose compression level" />
        </SelectTrigger>
        <SelectContent className="bg-background border-2 shadow-lg">
          {compressionLevels.map((option) => (
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

export default CompressionLevelSelector;
