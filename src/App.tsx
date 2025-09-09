import React, { useEffect } from 'react';
import { Settings, RefreshCw, Calendar, AlertCircle } from 'lucide-react';
import { useAppStore } from './store/useAppStore';
import { CountdownCard } from './components/CountdownCard';
import { Sidebar } from './components/Sidebar';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const {
    cards,
    isLoading,
    error,
    apiKey,
    isSidebarOpen,
    initializeApp,
    refreshTasks,
    toggleSidebar,
    setSidebarOpen,
  } = useAppStore();
  
  const { t } = useLanguage();

  // Initialize app on mount
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  // Handle refresh
  const handleRefresh = () => {
    if (apiKey) {
      refreshTasks();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and title */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {t('appTitle')}
                </h1>
                <p className="text-sm text-gray-500">
                  {t('appSubtitle')}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Refresh button */}
              {apiKey && (
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{t('refresh')}</span>
                </button>
              )}

              {/* Settings button */}
              <button
                onClick={toggleSidebar}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">{t('settings')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error message */}
        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Content based on state */}
        {!apiKey ? (
          // No API key configured
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {t('welcomeTitle')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('welcomeDescription')}
              </p>
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Settings className="w-4 h-4" />
                {t('configureApiKey')}
              </button>
            </div>
          </div>
        ) : cards.length === 0 && !isLoading ? (
          // No tasks found
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {t('noTasksTitle')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('noTasksDescription')}
              </p>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                {t('refreshTasks')}
              </button>
            </div>
          </div>
        ) : (
          // Cards grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card) => (
              <CountdownCard key={card.id} card={card} />
            ))}
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && cards.length === 0 && (
          <div className="text-center py-16">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">{t('loading')}</p>
          </div>
        )}
      </main>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
    </div>
  );
}

export default App;
