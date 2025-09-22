import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface UrlInputProps {
  url: string;
  onUrlChange: (url: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({
  url,
  onUrlChange,
  onSubmit,
  disabled = false
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-xl border border-border shadow-sm">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
          <Globe className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Add HTML to convert from
        </h3>
        <p className="text-sm text-muted-foreground">
          Write the website URL
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Url
          </label>
          <Input
            type="url"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Example: https://ilovepdf.com"
            className="w-full"
            disabled={disabled}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={disabled || !url.trim()}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default UrlInput;