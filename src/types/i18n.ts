// Language types and interfaces for internationalization
export type Language = 'en' | 'zh';

export interface Translations {
  // Common
  appTitle: string;
  appSubtitle: string;
  loading: string;
  error: string;
  refresh: string;
  refreshTasks: string;
  save: string;
  cancel: string;
  settings: string;
  edit: string;
  delete: string;
  
  // Welcome state
  welcomeTitle: string;
  welcomeDescription: string;
  configureApiKey: string;
  
  // Empty state
  emptyTitle: string;
  emptyDescription: string;
  noTasksTitle: string;
  noTasksDescription: string;
  
  // Sidebar
  sidebarTitle: string;
  apiKeyLabel: string;
  apiKeyPlaceholder: string;
  apiKeyDescription: string;
  languageLabel: string;
  
  // Countdown card
  daysLeft: string;
  dayLeft: string;
  daysRemaining: string;
  overdue: string;
  on: string;
  targetDate: string;
  expired: string;
  
  // Error messages
  apiKeyRequired: string;
  fetchError: string;
  saveSuccess: string;
}

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
}