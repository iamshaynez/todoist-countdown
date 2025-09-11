import React, { useEffect, useState } from 'react';
import { Settings, RefreshCw, Calendar, AlertCircle, HelpCircle, Github } from 'lucide-react';
import { useAppStore } from './store/useAppStore';
import { CountdownCard } from './components/CountdownCard';
import { Sidebar } from './components/Sidebar';
import { TipModal } from './components/TipModal';
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

  const [isTipModalOpen, setIsTipModalOpen] = useState(false);

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
      <header className="relative sticky top-0 z-10 overflow-hidden">
        {/* Enhanced background with gradient and glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/85 backdrop-blur-xl"></div>
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.3'%3E%3Ccircle cx='5' cy='5' r='0.5'/%3E%3Ccircle cx='15' cy='5' r='0.5'/%3E%3Ccircle cx='25' cy='5' r='0.5'/%3E%3Ccircle cx='35' cy='5' r='0.5'/%3E%3Ccircle cx='5' cy='15' r='0.5'/%3E%3Ccircle cx='15' cy='15' r='0.5'/%3E%3Ccircle cx='25' cy='15' r='0.5'/%3E%3Ccircle cx='35' cy='15' r='0.5'/%3E%3Ccircle cx='5' cy='25' r='0.5'/%3E%3Ccircle cx='15' cy='25' r='0.5'/%3E%3Ccircle cx='25' cy='25' r='0.5'/%3E%3Ccircle cx='35' cy='25' r='0.5'/%3E%3Ccircle cx='5' cy='35' r='0.5'/%3E%3Ccircle cx='15' cy='35' r='0.5'/%3E%3Ccircle cx='25' cy='35' r='0.5'/%3E%3Ccircle cx='35' cy='35' r='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Enhanced shadow and depth */}
        <div className="absolute inset-0 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]"></div>
        
        {/* Inner highlight for glass effect */}
        <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.02)]"></div>
        
        {/* Bottom border with gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
           {/* Logo and title */}
           <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
             <div className="flex-shrink-0">
               <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
             </div>
             <div className="min-w-0 flex-1">
               <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                 {t('appTitle')}
               </h1>
               <p className="text-sm text-gray-500 hidden sm:block">
                 {t('appSubtitle')}
               </p>
             </div>
           </div>

           {/* Action buttons */}
           <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <button
              onClick={() => setIsTipModalOpen(true)}
              className="relative p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 rounded-xl transition-all duration-300 transform-gpu hover:scale-105 active:scale-95 group overflow-hidden"
              title={t('tipButton')}
            >
              {/* Button background with glassmorphism */}
              <div className="absolute inset-0 bg-white/40 group-hover:bg-blue-50/60 rounded-xl transition-all duration-300"></div>
              <div className="absolute inset-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:shadow-[0_4px_12px_rgba(59,130,246,0.15)] rounded-xl transition-all duration-300"></div>
              <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl"></div>
              <HelpCircle className="relative h-4 w-4 sm:h-5 sm:w-5 drop-shadow-sm" />
            </button>
            <a
              href="https://github.com/iamshaynez/todoist-countdown"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 rounded-xl transition-all duration-300 transform-gpu hover:scale-105 active:scale-95 group overflow-hidden"
              title="GitHub Repository"
            >
              {/* Button background with glassmorphism */}
              <div className="absolute inset-0 bg-white/40 group-hover:bg-blue-50/60 rounded-xl transition-all duration-300"></div>
              <div className="absolute inset-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:shadow-[0_4px_12px_rgba(59,130,246,0.15)] rounded-xl transition-all duration-300"></div>
              <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl"></div>
              <svg className="relative h-4 w-4 sm:h-5 sm:w-5 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <button
              onClick={toggleSidebar}
              className="relative p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 rounded-xl transition-all duration-300 transform-gpu hover:scale-105 active:scale-95 group overflow-hidden"
              title={t('settings')}
            >
              {/* Button background with glassmorphism */}
              <div className="absolute inset-0 bg-white/40 group-hover:bg-blue-50/60 rounded-xl transition-all duration-300"></div>
              <div className="absolute inset-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:shadow-[0_4px_12px_rgba(59,130,246,0.15)] rounded-xl transition-all duration-300"></div>
              <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl"></div>
              <Settings className="relative h-4 w-4 sm:h-5 sm:w-5 drop-shadow-sm" />
            </button>
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
                className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 transition-all duration-300 transform-gpu hover:scale-105 active:scale-95 group overflow-hidden shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)]"
              >
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                {/* Light reflection */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                <Settings className="relative w-4 h-4 drop-shadow-sm" />
                <span className="relative drop-shadow-sm">{t('configureApiKey')}</span>
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
                className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 transition-all duration-300 transform-gpu hover:scale-105 active:scale-95 group overflow-hidden shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:hover:scale-100"
              >
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                {/* Light reflection */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                <RefreshCw className={`relative w-4 h-4 drop-shadow-sm ${isLoading ? 'animate-spin' : ''}`} />
                <span className="relative drop-shadow-sm">{t('refreshTasks')}</span>
              </button>
            </div>
          </div>
        ) : (
          // Cards grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card) => (
              <CountdownCard 
                key={card.id} 
                card={card}
                onEdit={() => console.log('Edit card:', card.id)}
                onDelete={() => console.log('Delete card:', card.id)}
              />
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

      {/* Footer */}
      <footer className="relative mt-auto overflow-hidden">
        {/* Enhanced background with gradient and glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/85 backdrop-blur-xl"></div>
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.3'%3E%3Ccircle cx='5' cy='5' r='0.5'/%3E%3Ccircle cx='15' cy='5' r='0.5'/%3E%3Ccircle cx='25' cy='5' r='0.5'/%3E%3Ccircle cx='35' cy='5' r='0.5'/%3E%3Ccircle cx='5' cy='15' r='0.5'/%3E%3Ccircle cx='15' cy='15' r='0.5'/%3E%3Ccircle cx='25' cy='15' r='0.5'/%3E%3Ccircle cx='35' cy='15' r='0.5'/%3E%3Ccircle cx='5' cy='25' r='0.5'/%3E%3Ccircle cx='15' cy='25' r='0.5'/%3E%3Ccircle cx='25' cy='25' r='0.5'/%3E%3Ccircle cx='35' cy='25' r='0.5'/%3E%3Ccircle cx='5' cy='35' r='0.5'/%3E%3Ccircle cx='15' cy='35' r='0.5'/%3E%3Ccircle cx='25' cy='35' r='0.5'/%3E%3Ccircle cx='35' cy='35' r='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Enhanced shadow and depth */}
        <div className="absolute inset-0 shadow-[0_-4px_20px_rgba(0,0,0,0.06),0_-1px_4px_rgba(0,0,0,0.04)]"></div>
        
        {/* Inner highlight for glass effect */}
        <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.02)]"></div>
        
        {/* Top border with gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent"></div>
        
        {/* Subtle light effect */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-white/20 rounded-full blur-xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-700 drop-shadow-sm">
              Thanks to the best GTD tool{' '}
              <a
                href="https://todoist.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 group"
              >
                {/* Link background effect */}
                <span className="absolute inset-0 -mx-1 -my-0.5 bg-blue-50/60 group-hover:bg-blue-100/80 rounded-md transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                <span className="relative drop-shadow-sm">Todoist</span>
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Tip Modal */}
      <TipModal 
        isOpen={isTipModalOpen}
        onClose={() => setIsTipModalOpen(false)}
      />
    </div>
  );
}

export default App;
