import React from 'react';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import { FileText, Image, Table, Presentation, Merge } from 'lucide-react';

const MergePage: React.FC = () => {
  const mergeFeatures = [
    {
      title: 'Merge PDFs',
      description: 'Combine multiple PDF documents into a single file.',
      icon: FileText,
      href: '/merge/pdf',
      gradient: 'primary' as const
    },
    {
      title: 'Merge Word',
      description: 'Combine Word documents into one document.',
      icon: FileText,
      href: '/merge/word',
      gradient: 'secondary' as const
    },
    {
      title: 'Merge PowerPoint',
      description: 'Combine presentations into one slideshow.',
      icon: Presentation,
      href: '/merge/powerpoint',
      gradient: 'warning' as const
    },
    {
      title: 'Merge Excel',
      description: 'Combine Excel spreadsheets into one workbook.',
      icon: Table,
      href: '/merge/excel',
      gradient: 'success' as const
    },
    {
      title: 'Images to PDF',
      description: 'Combine multiple images into a single PDF.',
      icon: Image,
      href: '/merge/images',
      gradient: 'primary' as const
    }
  ];

  return (
    <div className="min-h-screen cyber-bg">
      <Header />
      
      <section className="py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Merge className="w-12 h-12 text-primary animate-cyber-glow" />
            <h1 className="text-5xl font-bold text-foreground neon-text">
              File Merging
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-12">
            Combine multiple files into one with perfect organization
          </p>
          
          <div className="cyber-grid">
            {mergeFeatures.map((feature, index) => (
              <div key={feature.title} style={{ animationDelay: `${index * 0.1}s` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MergePage;