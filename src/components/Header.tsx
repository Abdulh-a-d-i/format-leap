import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-foreground">Convert It</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;