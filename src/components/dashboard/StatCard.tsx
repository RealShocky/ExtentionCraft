import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  Icon: LucideIcon;
  color: {
    bg: string;
    text: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, Icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center gap-4">
        <div className={`p-3 ${color.bg} rounded-full`}>
          <Icon className={`w-6 h-6 ${color.text}`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;