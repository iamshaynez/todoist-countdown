import React, { useState, useEffect } from 'react';
import { X, Save, Key, ExternalLink, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageSwitcher } from './LanguageSwitcher';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { 
    apiKey, 
    isLoading, 
    error, 
    saveApiKeyAndRefresh, 
    clearApiKey 
  } = useAppStore();
  const { t } = useLanguage();
  
  const [inputValue, setInputValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Update input value when apiKey changes
  useEffect(() => {
    setInputValue(apiKey);
  }, [apiKey]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      return;
    }
    
    await saveApiKeyAndRefresh(inputValue.trim());
    
    // Show success message if no error
    if (!error) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };
  
  // Handle clear API key
  const handleClear = () => {
    clearApiKey();
    setInputValue('');
    setShowSuccess(false);
  };
  
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Key className="w-5 h-5" />
              {t('sidebarTitle')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Language Switcher */}
              <div>
                <LanguageSwitcher />
              </div>
              
              {/* API Key Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  {t('apiKeyLabel')}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('apiKeyLabel')}
                    </label>
                    <input
                      id="apiKey"
                      type="password"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={t('apiKeyPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  
                  {/* Error message */}
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm text-red-700">{error}</span>
                    </div>
                  )}
                  
                  {/* Success message */}
                  {showSuccess && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-green-700">{t('saveSuccess')}</span>
                    </div>
                  )}
                  
                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isLoading || !inputValue.trim()}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {isLoading ? t('loading') : t('save')}
                    </button>
                    
                    {apiKey && (
                      <button
                        type="button"
                        onClick={handleClear}
                        disabled={isLoading}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {t('cancel')}
                      </button>
                    )}
                  </div>
                </form>
              </div>
              
              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700 mb-3">
                  {t('apiKeyDescription')}
                </p>
                <a
                  href="https://todoist.com/prefs/integrations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Open Todoist Settings
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              

            </div>
          </div>
        </div>
      </div>
    </>
  );
}