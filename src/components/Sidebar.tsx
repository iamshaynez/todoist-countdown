import React, { useState, useEffect } from 'react';
import { X, Save, Key, ExternalLink, AlertCircle, CheckCircle, Loader2, Globe, Info, Settings } from 'lucide-react';
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
  const { t, language, setLanguage } = useLanguage();
  

  
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
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-md z-40 transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-full sm:w-96 max-w-md z-50 transform transition-all duration-500 ease-out overflow-hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Enhanced background with glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/85 backdrop-blur-xl"></div>
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.3'%3E%3Ccircle cx='5' cy='5' r='0.5'/%3E%3Ccircle cx='15' cy='5' r='0.5'/%3E%3Ccircle cx='25' cy='5' r='0.5'/%3E%3Ccircle cx='35' cy='5' r='0.5'/%3E%3Ccircle cx='5' cy='15' r='0.5'/%3E%3Ccircle cx='15' cy='15' r='0.5'/%3E%3Ccircle cx='25' cy='15' r='0.5'/%3E%3Ccircle cx='35' cy='15' r='0.5'/%3E%3Ccircle cx='5' cy='25' r='0.5'/%3E%3Ccircle cx='15' cy='25' r='0.5'/%3E%3Ccircle cx='25' cy='25' r='0.5'/%3E%3Ccircle cx='35' cy='25' r='0.5'/%3E%3Ccircle cx='5' cy='35' r='0.5'/%3E%3Ccircle cx='15' cy='35' r='0.5'/%3E%3Ccircle cx='25' cy='35' r='0.5'/%3E%3Ccircle cx='35' cy='35' r='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Enhanced shadow and depth */}
        <div className="absolute inset-0 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]"></div>
        
        {/* Inner highlight for glass effect */}
        <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.02)]"></div>
        
        {/* Left border with gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200/60 to-transparent"></div>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="relative flex items-center justify-between p-6 overflow-hidden">
            {/* Header background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-500/8 to-cyan-500/10"></div>
            
            {/* Subtle light effect */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
            
            {/* Bottom border with gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent"></div>
            
            <h2 className="relative text-xl font-semibold text-gray-800 flex items-center gap-3 drop-shadow-sm">
              <div className="relative p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl">
                <Settings className="w-5 h-5 text-blue-600 drop-shadow-sm" />
              </div>
              {t('sidebarTitle')}
            </h2>
            <button
              onClick={onClose}
              className="relative p-2 hover:bg-white/60 rounded-xl transition-all duration-300 transform-gpu hover:scale-105 active:scale-95 group overflow-hidden"
            >
              {/* Button background with glassmorphism */}
              <div className="absolute inset-0 bg-white/40 group-hover:bg-red-50/60 rounded-xl transition-all duration-300"></div>
              <div className="absolute inset-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:shadow-[0_4px_12px_rgba(239,68,68,0.15)] rounded-xl transition-all duration-300"></div>
              <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl"></div>
              <X className="relative w-5 h-5 text-gray-600 group-hover:text-red-500 drop-shadow-sm transition-colors duration-300" />
            </button>
          </div>
          
          {/* Content */}
          <div className="relative flex-1 overflow-y-auto p-6 space-y-8">
            {/* Language Switcher */}
            <div className="relative space-y-4">
              <LanguageSwitcher />
            </div>
            
            <div className="space-y-6">
              
              {/* API Key Section */}
              <div className="relative space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-3 drop-shadow-sm">
                  <div className="relative p-1.5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-lg">
                    <Key className="w-4 h-4 text-amber-600 drop-shadow-sm" />
                  </div>
                  {t('apiKeyTitle')}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative group">
                    <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('apiKeyLabel')}
                    </label>
                    <input
                      id="apiKey"
                      type="password"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={t('apiKeyPlaceholder')}
                      className="w-full px-4 py-3 bg-white/80 border-0 rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:bg-white/95 shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus:shadow-[0_4px_16px_rgba(59,130,246,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] focus:shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.5)]"
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
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isLoading || !inputValue.trim()}
                      className="relative flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 transform-gpu hover:scale-[1.02] active:scale-[0.98] group overflow-hidden disabled:transform-none disabled:cursor-not-allowed w-full sm:w-auto">
                      {/* Button background */}
                      <div className={`
                        absolute inset-0 rounded-xl transition-all duration-300
                        ${isLoading || !inputValue.trim()
                          ? 'bg-gray-100'
                          : 'bg-gradient-to-br from-blue-600 to-purple-600 group-hover:from-blue-700 group-hover:to-purple-700'
                        }
                      `}></div>
                      
                      {/* Button shadow */}
                      <div className={`
                        absolute inset-0 rounded-xl transition-all duration-300
                        ${isLoading || !inputValue.trim()
                          ? 'shadow-[0_2px_4px_rgba(0,0,0,0.04)]'
                          : 'shadow-[0_4px_16px_rgba(59,130,246,0.25)] group-hover:shadow-[0_6px_20px_rgba(59,130,246,0.35)]'
                        }
                      `}></div>
                      
                      {/* Inner highlight */}
                      <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl"></div>
                      
                      <div className={`
                        relative flex items-center justify-center gap-2 transition-colors duration-300
                        ${isLoading || !inputValue.trim() ? 'text-gray-400' : 'text-white drop-shadow-sm'}
                      `}>
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        {isLoading ? t('loading') : t('save')}
                      </div>
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
              
              {/* API Instructions Section */}
              <div className="relative space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-3 drop-shadow-sm">
                  <div className="relative p-1.5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
                    <Info className="w-4 h-4 text-green-600 drop-shadow-sm" />
                  </div>
                  {t('apiInstructionsTitle')}
                </h3>
                
                <div className="relative p-4 bg-white/60 rounded-xl border border-gray-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
                  {/* Background with glassmorphism */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-emerald-50/20 to-blue-50/30 rounded-xl"></div>
                  
                  {/* Inner highlight */}
                  <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] rounded-xl"></div>
                  
                  <div className="relative space-y-3">
                    <p className="text-sm text-gray-700 font-medium">{t('apiInstructionsDesc')}</p>
                    <ol className="text-sm text-gray-600 space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold flex items-center justify-center mt-0.5">1</span>
                        <span>{t('apiStep1')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold flex items-center justify-center mt-0.5">2</span>
                        <span>{t('apiStep2')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold flex items-center justify-center mt-0.5">3</span>
                        <span>{t('apiStep3')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold flex items-center justify-center mt-0.5">4</span>
                        <span>{t('apiStep4')}</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}