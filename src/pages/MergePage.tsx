import React from 'react';
import Header from '@/components/Header';
import ConversionCard from '@/components/ConversionCard';
import { 
  FileText, 
  Presentation, 
  FileSpreadsheet, 
  Image, 
  File
} from 'lucide-react';

const mergeTools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document. Perfect for organizing reports and presentations.",
    icon: FileText,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    to: "/merge-pdf"
  },
  {
    title: "Merge Word", 
    description: "Combine multiple DOC and DOCX files into a single document.",
    icon: FileText,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    to: "/merge-word"
  },
  {
    title: "Merge PowerPoint",
    description: "Combine multiple PPT and PPTX presentations into one slideshow.",
    icon: Presentation,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    to: "/merge-powerpoint"
  },
  {
    title: "Merge Excel",
    description: "Combine multiple XLSX and XLS spreadsheets into one workbook.",
    icon: FileSpreadsheet,
    iconBg: "bg-green-100", 
    iconColor: "text-green-600",
    to: "/merge-excel"
  },
  {
    title: "Merge Images",
    description: "Combine multiple JPG, PNG images into a single PDF or image file.",
    icon: Image,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600", 
    to: "/merge-images"
  }
];

const MergePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Merge Files Online
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Combine multiple files into one document. Merge PDFs, Word documents, presentations, 
            spreadsheets, and images with ease.
          </p>
        </div>
      </section>

      {/* Merge Tools Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mergeTools.map((tool) => (
              <ConversionCard
                key={tool.title}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                iconBg={tool.iconBg}
                iconColor={tool.iconColor}
                to={tool.to}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MergePage;