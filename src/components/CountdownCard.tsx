import React, { useState } from 'react';
import type { CountdownCard as CountdownCardData } from '../types';
import { useLanguage } from '../hooks/useLanguage';

// Display modes for the countdown number
type DisplayMode = 'days' | 'yearsMonthsAndDays' | 'weeks';

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

// Convert days to years, months and days format
const daysToYearsMonthsAndDays = (totalDays: number): { years: number; months: number; days: number } => {
  const years = Math.floor(totalDays / 365);
  const remainingAfterYears = totalDays % 365;
  const months = Math.floor(remainingAfterYears / 30);
  const days = remainingAfterYears % 30;
  return { years, months, days };
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
          return 'yearsMonthsAndDays';
        case 'yearsMonthsAndDays':
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
      case 'yearsMonthsAndDays': {
        const { years, months, days: remainingDays } = daysToYearsMonthsAndDays(days);
        return `${years} ${t('y')} ${months} ${t('months')} ${remainingDays} ${t('d')}`;
      }
      case 'weeks': {
        const weeks = daysToWeeks(days);
        return `${weeks} ${t('weeks')}`;
      }
      default:
        return `${days} ${t('days')}`;
    }
  };

  // Get dynamic font size based on display mode and content length
  const getFontSize = () => {
    if (hasDateError) {
      return 'text-2xl';
    }
    
    if (displayMode === 'yearsMonthsAndDays') {
      const days = type === 'countup' ? Math.abs(daysLeft) : (isOverdue ? 0 : Math.abs(daysLeft));
      const { years } = daysToYearsMonthsAndDays(days);
      
      // If years >= 10, use smaller font size to fit in one line
      if (years >= 10) {
        return 'text-3xl';
      }
    }
    
    return 'text-4xl';
  };

  return (
    <div className="relative group rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100/50 backdrop-blur-sm"
         onClick={onEdit}>
      
      {/* Header with title - color depends on card type */}
      <div className={`${headerColor} text-white px-4 py-3 h-16 flex items-center justify-center relative overflow-hidden`}>
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="text-sm font-medium text-center leading-tight relative z-10 drop-shadow-sm">
          {title}
        </div>
      </div>

      {/* White main body */}
      <div className="px-6 py-8 relative bg-gradient-to-b from-white to-gray-50/30">
        {/* Large number display - black text, clickable */}
        <div className="text-center mb-6">
          <div 
            className={`font-bold mb-2 cursor-pointer hover:opacity-80 transition-all duration-200 hover:scale-105 ${
              hasDateError ? 'text-red-500 text-2xl drop-shadow-sm' : `text-black ${getFontSize()} drop-shadow-sm`
            }`}
            onClick={handleNumberClick}
          >
            {getDisplayNumber()}
          </div>
        </div>
      </div>

      {/* Bottom date - gray text, centered, fixed margin from bottom */}
      <div className="px-4 pb-4 text-center relative">
        <div className={`text-sm font-medium ${
          hasDateError ? 'text-red-500' : 'text-gray-600'
        }`}>
          {getBottomText()}
        </div>
      </div>

      {/* Status indicator - positioned on header */}
      {isOverdue && type === 'countdown' && (
        <div className="absolute top-2 left-4 z-20">
          <div className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium shadow-lg border border-red-400/20">
            {t('overdue')}
          </div>
        </div>
      )}
      
      {/* Subtle inner glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20"></div>
      </div>
    </div>
  );
};