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
    <div className="relative group perspective-1000 cursor-pointer"
         onClick={onEdit}>
      
      {/* Main card container with Dribbble-style design */}
      <div className="relative rounded-3xl overflow-hidden transition-all duration-500 ease-out transform-gpu group-hover:scale-[1.02] group-hover:-rotate-1 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.15),0_8px_25px_rgba(0,0,0,0.1)] shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.06)]">
        
        {/* Glassmorphism background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/80 to-gray-100/60 backdrop-blur-xl"></div>
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='17' cy='27' r='1'/%3E%3Ccircle cx='37' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Inner shadow for depth */}
        <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.05)]"></div>
        
        {/* Header with vibrant gradient and glass effect */}
        <div className={`relative px-6 py-4 h-20 flex items-center justify-center overflow-hidden ${
          type === 'countup' 
            ? 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500' 
            : 'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500'
        }`}>
          
          {/* Enhanced animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
          
          {/* Bright floating light effect */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/25 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
          
          {/* Additional light reflection */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          
          {/* Title with enhanced typography */}
          <div className="text-base font-semibold text-center leading-tight relative z-10 text-white drop-shadow-lg tracking-wide">
            {title}
          </div>
        </div>

        {/* Main content area with enhanced styling */}
        <div className="relative px-8 py-10 bg-gradient-to-b from-white/90 via-white/70 to-gray-50/50">
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-6 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60"></div>
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full opacity-40"></div>
          
          {/* Enhanced number display */}
          <div className="text-center mb-8">
            <div 
              className={`font-bold mb-3 cursor-pointer transition-all duration-300 transform-gpu hover:scale-105 active:scale-95 min-h-[3rem] flex items-center justify-center ${
                hasDateError 
                  ? 'text-red-500 text-2xl drop-shadow-lg' 
                  : `text-gray-900 ${getFontSize()} hover:text-black`
              }`}
              onClick={handleNumberClick}
              style={{
                textShadow: hasDateError ? 'none' : '0 2px 4px rgba(0,0,0,0.1)',
                filter: hasDateError ? 'none' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {getDisplayNumber()}
            </div>
          </div>
        </div>

        {/* Enhanced bottom section */}
        <div className="relative px-6 pb-6 text-center bg-gradient-to-t from-gray-50/80 to-transparent">
          <div className={`text-sm font-medium tracking-wide ${
            hasDateError ? 'text-red-500' : 'text-gray-600'
          }`}>
            {getBottomText()}
          </div>
        </div>

        {/* Enhanced status indicator */}
        {isOverdue && type === 'countdown' && (
          <div className="absolute top-3 left-6 z-20">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border border-red-400/30 backdrop-blur-sm">
              {t('overdue')}
            </div>
          </div>
        )}
        
        {/* Enhanced hover glow effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-100/40 via-purple-50/30 to-pink-100/20"></div>
          <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"></div>
        </div>
        
        {/* Animated border highlight */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-3xl border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)]"></div>
        </div>
      </div>
    </div>
  );
};