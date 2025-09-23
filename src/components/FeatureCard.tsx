import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient?: 'primary' | 'secondary' | 'success' | 'warning';
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  href,
  gradient = 'primary'
}) => {
  const gradientClasses = {
    primary: 'from-primary/20 to-primary-variant/20 border-primary/30',
    secondary: 'from-secondary/20 to-secondary-glow/20 border-secondary/30',
    success: 'from-success/20 to-success/10 border-success/30',
    warning: 'from-warning/20 to-warning/10 border-warning/30',
  };

  return (
    <Link to={href} className="block group">
      <div className={`
        cyber-card relative overflow-hidden
        bg-gradient-to-br ${gradientClasses[gradient]}
        hover:scale-105 transform transition-all duration-300
        animate-scale-up
      `}>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className={`
              p-3 rounded-xl
              bg-gradient-to-br from-primary/10 to-primary-variant/10
              border border-primary/20
              group-hover:animate-cyber-glow
            `}>
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:neon-text transition-all duration-300">
                {title}
              </h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
      </div>
    </Link>
  );
};

export default FeatureCard;