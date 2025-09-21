import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-foreground">I</span>
            <Heart className="w-6 h-6 text-primary fill-current" />
            <span className="text-foreground">PDF</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              MERGE PDF
            </Link>
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              SPLIT PDF
            </Link>
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              COMPRESS PDF
            </Link>
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                CONVERT PDF
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                ALL PDF TOOLS
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;