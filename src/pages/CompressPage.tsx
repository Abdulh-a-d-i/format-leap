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

const compressionTools = [
  {
    title: "Compress PDF",
    description: "Reduce PDF file size while maintaining quality. Perfect for sharing and storage.",
    icon: FileText,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    to: "/compress-pdf"
  },
  {
    title: "Compress Word", 
    description: "Make DOC and DOCX files smaller for easier sharing and faster uploads.",
    icon: FileText,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    to: "/compress-word"
  },
  {
    title: "Compress PowerPoint",
    description: "Reduce PPT and PPTX file sizes while keeping all your slides intact.",
    icon: Presentation,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    to: "/compress-powerpoint"
  },
  {
    title: "Compress Excel",
    description: "Make XLSX and XLS spreadsheets smaller without losing any data.",
    icon: FileSpreadsheet,
    iconBg: "bg-green-100", 
    iconColor: "text-green-600",
    to: "/compress-excel"
  },
  {
    title: "Compress CSV",
    description: "Optimize CSV files for faster processing and reduced storage space.",
    icon: File,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
    to: "/compress-csv"
  },
  {
    title: "Compress JPG",
    description: "Reduce image file sizes while maintaining visual quality for web and storage.",
    icon: Image,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600", 
    to: "/compress-jpg"
  }
];

const CompressPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Compress Files Online
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Reduce file sizes without losing quality. Make your documents smaller for faster uploads, 
            easier sharing, and reduced storage space.
          </p>
        </div>
      </section>

      {/* Compression Tools Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compressionTools.map((tool) => (
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

export default CompressPage;