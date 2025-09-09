import React from 'react';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';
import type { CountdownCard as CountdownCardType } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface CountdownCardProps {
  card: CountdownCardType;
}

/**
 * Get the appropriate styling based on days left
 */
function getCardStyling(daysLeft: number, isOverdue: boolean) {
  if (isOverdue) {
    return {
      borderColor: 'border-red-200',
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
      badgeColor: 'bg-red-100 text-red-800',
      iconColor: 'text-red-600',
    };
  }
  
  if (daysLeft <= 3) {
    return {
      borderColor: 'border-orange-200',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-800',
      badgeColor: 'bg-orange-100 text-orange-800',
      iconColor: 'text-orange-600',
    };
  }
  
  if (daysLeft <= 7) {
    return {
      borderColor: 'border-yellow-200',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      badgeColor: 'bg-yellow-100 text-yellow-800',
      iconColor: 'text-yellow-600',
    };
  }
  
  return {
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    badgeColor: 'bg-green-100 text-green-800',
    iconColor: 'text-green-600',
  };
}

/**
 * Format days left text with i18n support
 */
function formatDaysLeft(daysLeft: number, isOverdue: boolean, t: (key: string) => string): string {
  if (isOverdue) {
    return t('overdue');
  }
  
  if (daysLeft === 0) {
    return t('dueToday') || 'Due today';
  }
  
  if (daysLeft === 1) {
    return `1 ${t('dayLeft')}`;
  }
  
  return `${daysLeft} ${t('daysLeft')}`;
}

export function CountdownCard({ card }: CountdownCardProps) {
  const { title, daysLeft, dueDate, isOverdue } = card;
  const { t } = useLanguage();
  const styling = getCardStyling(daysLeft, isOverdue);
  const daysLeftText = formatDaysLeft(daysLeft, isOverdue, t);
  
  return (
    <div className={`
      relative p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:scale-105
      ${styling.borderColor} ${styling.bgColor}
    `}>
      {/* Overdue indicator */}
      {isOverdue && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-red-500 text-white p-1 rounded-full">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
      )}
      
      {/* Card content */}
      <div className="space-y-4">
        {/* Title */}
        <h3 className={`font-semibold text-lg leading-tight ${styling.textColor}`}>
          {title}
        </h3>
        
        {/* Days left badge */}
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 ${styling.iconColor}`} />
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${styling.badgeColor}
          `}>
            {daysLeftText}
          </span>
        </div>
        
        {/* Due date */}
        <div className="flex items-center gap-2">
          <Calendar className={`w-4 h-4 ${styling.iconColor}`} />
          <span className={`text-sm ${styling.textColor} opacity-75`}>
            {t('on')} {dueDate}
          </span>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="mt-4">
        <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              isOverdue 
                ? 'bg-red-400' 
                : daysLeft <= 3 
                  ? 'bg-orange-400' 
                  : daysLeft <= 7 
                    ? 'bg-yellow-400' 
                    : 'bg-green-400'
            }`}
            style={{
              width: isOverdue 
                ? '100%' 
                : `${Math.max(10, Math.min(100, (30 - daysLeft) / 30 * 100))}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}