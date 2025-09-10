import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// TipModal component for displaying usage instructions
export const TipModal: React.FC<TipModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{t('tipTitle')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={t('tipClose')}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* CountDown Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-blue-600 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              {t('tipCountdownTitle')}
            </h3>
            <p className="text-gray-700 leading-relaxed pl-5">
              {t('tipCountdownDescription')}
            </p>
          </div>

          {/* CountUp Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-green-600 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              {t('tipCountupTitle')}
            </h3>
            <p className="text-gray-700 leading-relaxed pl-5">
              {t('tipCountupDescription')}
            </p>
          </div>

          {/* Date Format Note */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">
              💡 {t('tipDateFormat')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {t('tipClose')}
          </button>
        </div>
      </div>
    </div>
  );
};