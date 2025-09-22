import React, { useState } from 'react';
import { Link, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import UrlInput from './UrlInput';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface HtmlInputSelectorProps {
  onUrlSubmit: (url: string) => void;
  onHtmlSubmit: (html: string) => void;
  isProcessing?: boolean;
  url?: string;
  onUrlChange?: (url: string) => void;
}

const HtmlInputSelector: React.FC<HtmlInputSelectorProps> = ({
  onUrlSubmit,
  onHtmlSubmit,
  isProcessing = false,
  url = '',
  onUrlChange = () => {}
}) => {
  const [inputType, setInputType] = useState<'url' | 'html'>('url');
  const [htmlContent, setHtmlContent] = useState('');

  const handleHtmlSubmit = () => {
    if (htmlContent.trim()) {
      onHtmlSubmit(htmlContent);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Type Selector */}
      <div className="flex gap-4 justify-center">
        <Button
          variant={inputType === 'url' ? 'default' : 'outline'}
          onClick={() => setInputType('url')}
          className="flex items-center gap-2"
        >
          <Link className="w-4 h-4" />
          From URL
        </Button>
        <Button
          variant={inputType === 'html' ? 'default' : 'outline'}
          onClick={() => setInputType('html')}
          className="flex items-center gap-2"
        >
          <Code className="w-4 h-4" />
          From HTML Code
        </Button>
      </div>

      {/* Input Area */}
      <Card className="p-6">
        {inputType === 'url' ? (
            <UrlInput 
              url={url}
              onUrlChange={onUrlChange}
              onSubmit={() => onUrlSubmit(url)}
              disabled={isProcessing}
            />
        ) : (
          <div className="space-y-4">
            <Label htmlFor="html-content" className="text-sm font-medium">
              Paste your HTML code below:
            </Label>
            <Textarea
              id="html-content"
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="<!DOCTYPE html>
<html>
<head>
  <title>Your Title</title>
</head>
<body>
  <h1>Your Content</h1>
  <p>Add your HTML content here...</p>
</body>
</html>"
              className="min-h-[300px] font-mono text-sm"
              disabled={isProcessing}
            />
            <Button 
              onClick={handleHtmlSubmit}
              disabled={!htmlContent.trim() || isProcessing}
              className="w-full"
            >
              {isProcessing ? 'Converting...' : 'Convert HTML to PDF'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HtmlInputSelector;