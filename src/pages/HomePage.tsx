import React, { useState } from 'react';
import Header from '@/components/Header';
import ConversionCard from '@/components/ConversionCard';
import { 
  FileText, 
  Presentation, 
  FileSpreadsheet, 
  Image, 
  FileCode,
  Archive
} from 'lucide-react';

const conversionTools = [
  {
    title: "PDF to Word",
    description: "Easily convert your PDF files into easy to edit DOC and DOCX documents. The converted WORD document is almost 100% accurate.",
    icon: FileText,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    to: "/pdf-to-word"
  },
  {
    title: "PDF to PowerPoint", 
    description: "Turn your PDF files into easy to edit PPT and PPTX slideshows.",
    icon: Presentation,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    to: "/pdf-to-powerpoint"
  },
  {
    title: "PDF to Excel",
    description: "Pull data straight from PDFs into Excel spreadsheets in a few short seconds.",
    icon: FileSpreadsheet,
    iconBg: "bg-green-100", 
    iconColor: "text-green-600",
    to: "/pdf-to-excel"
  },
  {
    title: "Word to PDF",
    description: "Make DOC and DOCX files easy to read by converting them to PDF.",
    icon: FileText,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600", 
    to: "/word-to-pdf"
  },
  {
    title: "PowerPoint to PDF",
    description: "Make PPT and PPTX slideshows easy to view by converting them to PDF.",
    icon: Presentation,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    to: "/powerpoint-to-pdf"
  },
  {
    title: "Excel to PDF",
    description: "Make EXCEL spreadsheets easy to read by converting them to PDF.",
    icon: FileSpreadsheet,
    iconBg: "bg-green-100",
    iconColor: "text-green-600", 
    to: "/excel-to-pdf"
  },
  {
    title: "PDF to JPG",
    description: "Convert each PDF page into a JPG or extract all images contained in a PDF.",
    icon: Image,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    to: "/pdf-to-jpg"
  },
  {
    title: "JPG to PDF", 
    description: "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.",
    icon: Image,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    to: "/jpg-to-pdf"
  },
  {
    title: "HTML to PDF",
    description: "Convert webpages in HTML to PDF. Copy and paste the URL of the page you want and convert it to PDF with a click.",
    icon: FileCode,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    to: "/html-to-pdf"
  },
  {
    title: "PDF to PDF/A",
    description: "Transform your PDF to PDF/A, the ISO-standardized version of PDF for long-term archiving. Your PDF will preserve formatting when accessed in the future.",
    icon: Archive,
    iconBg: "bg-indigo-100", 
    iconColor: "text-indigo-600",
    to: "/pdf-to-pdfa"
  }
];

const categories = [
  { name: "All", active: true },
  { name: "Workflows", active: false },
  { name: "Organize PDF", active: false },
  { name: "Optimize PDF", active: false },
  { name: "Convert PDF", active: false },
  { name: "Edit PDF", active: false },
  { name: "PDF Security", active: false }
];

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Every tool you need to work with PDFs in one place
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, 
            split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
          </p>
          
        </div>
      </section>

      {/* Conversion Tools Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {conversionTools.map((tool) => (
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

export default HomePage;