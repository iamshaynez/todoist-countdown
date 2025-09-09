import React from 'react';

import { useLanguage } from '../hooks/useLanguage';

interface CountdownCardProps {
  title: string;
  targetDate: Date;
  onEdit: () => void;
  onDelete: () => void;
}

// Format date for display
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long'
  });
};

export const CountdownCard: React.FC<CountdownCardProps> = ({ title, targetDate, onEdit, onDelete }) => {
  const { t } = useLanguage();
  const now = new Date();
  const timeDiff = targetDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const isExpired = daysRemaining < 0;

  return (
    <div className="relative group rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer overflow-hidden"
         onClick={onEdit}>
      
      {/* Blue header with title - full width, fixed height */}
      <div className="bg-blue-500 text-white px-4 py-3 h-16 flex items-center justify-center">
        <div className="text-sm font-medium text-center leading-tight">
          {title}
        </div>
      </div>

      {/* White main body */}
      <div className="px-6 py-8">
        {/* Large countdown number - black text */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-black mb-2">
            {isExpired ? '0' : Math.abs(daysRemaining)}
          </div>
          <div className="text-lg font-medium text-black">
            {t('daysRemaining')}
          </div>
        </div>
      </div>

      {/* Bottom date - gray text, centered, fixed margin from bottom */}
      <div className="px-4 pb-4 text-center">
        <div className="text-gray-500 text-sm">
          {t('targetDate')}: {formatDate(targetDate)}
        </div>
      </div>



      {/* Status indicator - positioned on blue header */}
      {isExpired && (
        <div className="absolute top-2 left-4 z-20">
          <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            {t('expired')}
          </div>
        </div>
      )}
    </div>
  );
};