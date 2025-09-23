import React from 'react';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import { FileText, Image, Table, Presentation, Zap } from 'lucide-react';

const CompressPage: React.FC = () => {
  const compressFeatures = [
    {
      title: 'Compress PDF',
      description: 'Reduce PDF file size while maintaining quality for faster sharing.',
      icon: FileText,
      href: '/compress/pdf',
      gradient: 'primary' as const
    },
    {
      title: 'Compress Word',
      description: 'Optimize Word documents to reduce file size.',
      icon: FileText,
      href: '/compress/word',
      gradient: 'secondary' as const
    },
    {
      title: 'Compress PowerPoint',
      description: 'Compress presentations for easier distribution.',
      icon: Presentation,
      href: '/compress/powerpoint',
      gradient: 'warning' as const
    },
    {
      title: 'Compress Excel',
      description: 'Reduce Excel file sizes without losing data.',
      icon: Table,
      href: '/compress/excel',
      gradient: 'success' as const
    },
    {
      title: 'Compress Images',
      description: 'Optimize JPG, PNG images with smart compression.',
      icon: Image,
      href: '/compress/image',
      gradient: 'primary' as const
    }
  ];

  return (
    <div className="min-h-screen cyber-bg">
      <Header />
      
      <section className="py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Zap className="w-12 h-12 text-primary animate-cyber-glow" />
            <h1 className="text-5xl font-bold text-foreground neon-text">
              File Compression
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-12">
            Reduce file sizes while maintaining perfect quality
          </p>
          
          <div className="cyber-grid">
            {compressFeatures.map((feature, index) => (
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

export default CompressPage;