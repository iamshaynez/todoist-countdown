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
  apiKeyTitle: string;
  apiInstructionsTitle: string;
  apiInstructionsDesc: string;
  apiStep1: string;
  apiStep2: string;
  apiStep3: string;
  apiStep4: string;
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
  targetDatePrefix: string;
  targetDateSuffix: string;
  expired: string;
  
  // CountUp card
  countupPrefix: string;
  countupSuffix: string;
  
  // Display units
  days: string;
  day: string;
  d: string;
  months: string;
  weeks: string;
  years: string;
  y: string;
  
  // Error messages
  apiKeyRequired: string;
  fetchError: string;
  saveSuccess: string;
  
  // Tip modal
  tipButton: string;
  tipTitle: string;
  tipCountdownTitle: string;
  tipCountdownDescription: string;
  tipCountupTitle: string;
  tipCountupDescription: string;
  tipDateFormat: string;
  tipClose: string;
}

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
}