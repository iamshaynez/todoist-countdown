import React, { useState } from 'react';
import type { CountdownCard as CountdownCardData } from '../types';
import { useLanguage } from '../hooks/useLanguage';

// Display modes for the countdown number
type DisplayMode = 'days' | 'monthsAndDays' | 'weeks';

interface CountdownCardProps {
  card: CountdownCardData;
  onEdit: () => void;
  onDelete: () => void;
}

// Format date for display based on current language
const formatDate = (date: Date, language: string): string => {
  const locale = language === 'zh' ? 'zh-CN' : 'en-US';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long'
  });
};

// Convert days to months and days format
const daysToMonthsAndDays = (totalDays: number): { months: number; days: number } => {
  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;
  return { months, days };
};

// Convert days to weeks (rounded down)
const daysToWeeks = (totalDays: number): number => {
  return Math.floor(totalDays / 7);
};

export const CountdownCard: React.FC<CountdownCardProps> = ({ card, onEdit, onDelete }) => {
  const { t, language } = useLanguage();
  const { title, daysLeft, dueDate, isOverdue, type, hasDateError } = card;
  
  // State for display mode cycling
  const [displayMode, setDisplayMode] = useState<DisplayMode>('days');
  
  // Handle click on the number area to cycle through display modes
  const handleNumberClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering card edit
    setDisplayMode(prev => {
      switch (prev) {
        case 'days':
          return 'monthsAndDays';
        case 'monthsAndDays':
          return 'weeks';
        case 'weeks':
          return 'days';
        default:
          return 'days';
      }
    });
  };
  
  // Determine header color based on card type
  const headerColor = type === 'countup' ? 'bg-green-400' : 'bg-blue-500'; // Morandi green for CountUp
  
  // Determine display text based on card type
  const getBottomText = () => {
    if (hasDateError) {
      return 'Error';
    }
    
    if (type === 'countup') {
      return `${t('countupPrefix')}${formatDate(new Date(dueDate), language)}${t('countupSuffix')}`;
    } else {
      return `${t('targetDatePrefix')}${formatDate(new Date(dueDate), language)}${t('targetDateSuffix')}`;
    }
  };
  
  const getDisplayNumber = () => {
    if (hasDateError) {
      return 'Error';
    }
    
    const days = type === 'countup' ? Math.abs(daysLeft) : (isOverdue ? 0 : Math.abs(daysLeft));
    
    switch (displayMode) {
      case 'days':
        return `${days} ${days === 1 ? t('day') : t('days')}`;
      case 'monthsAndDays': {
        const { months, days: remainingDays } = daysToMonthsAndDays(days);
        return `${months} ${t('months')} ${remainingDays} ${t('d')}`;
      }
      case 'weeks': {
        const weeks = daysToWeeks(days);
        return `${weeks} ${t('weeks')}`;
      }
      default:
        return `${days} ${t('days')}`;
    }
  };

  return (
    <div className="relative group rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer overflow-hidden"
         onClick={onEdit}>
      
      {/* Header with title - color depends on card type */}
      <div className={`${headerColor} text-white px-4 py-3 h-16 flex items-center justify-center`}>
        <div className="text-sm font-medium text-center leading-tight">
          {title}
        </div>
      </div>

      {/* White main body */}
      <div className="px-6 py-8">
        {/* Large number display - black text, clickable */}
        <div className="text-center mb-6">
          <div 
            className={`font-bold mb-2 cursor-pointer hover:opacity-80 transition-opacity ${
              hasDateError ? 'text-red-500 text-2xl' : 'text-black text-4xl'
            }`}
            onClick={handleNumberClick}
          >
            {getDisplayNumber()}
          </div>
        </div>
      </div>

      {/* Bottom date - gray text, centered, fixed margin from bottom */}
      <div className="px-4 pb-4 text-center">
        <div className={`text-sm ${
          hasDateError ? 'text-red-500' : 'text-gray-500'
        }`}>
          {getBottomText()}
        </div>
      </div>

      {/* Status indicator - positioned on header */}
      {isOverdue && type === 'countdown' && (
        <div className="absolute top-2 left-4 z-20">
          <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            {t('overdue')}
          </div>
        </div>
      )}
    </div>
  );
};