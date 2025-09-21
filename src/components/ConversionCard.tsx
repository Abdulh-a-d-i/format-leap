import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ConversionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  to: string;
}

const ConversionCard: React.FC<ConversionCardProps> = ({
  title,
  description,
  icon: Icon,
  iconBg,
  iconColor,
  to,
}) => {
  return (
    <Link
      to={to}
      className="group block p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${iconBg} flex-shrink-0`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ConversionCard;