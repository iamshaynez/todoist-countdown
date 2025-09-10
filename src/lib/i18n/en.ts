import { Translations } from '../../types/i18n';

export const en: Translations = {
  // Common
  appTitle: 'Todoist Important Days',
  appSubtitle: 'Important Days are not just a due date',
  loading: 'Loading...',
  error: 'Error',
  refresh: 'Refresh',
  refreshTasks: 'Refresh Tasks',
  save: 'Save',
  cancel: 'Cancel',
  settings: 'Settings',
  edit: 'Edit',
  delete: 'Delete',
  
  // Welcome state
  welcomeTitle: 'Welcome to Todoist Countdown',
  welcomeDescription: 'Track your task deadlines with beautiful countdown timers',
  configureApiKey: 'Configure API Key',
  
  // Empty state
  emptyTitle: 'No tasks found',
  emptyDescription: 'No tasks to display',
  noTasksTitle: 'No tasks with due dates',
  noTasksDescription: 'Add due dates to your Todoist tasks to see them here',
  
  // Sidebar
  sidebarTitle: 'Settings',
  apiKeyLabel: 'API Key',
  apiKeyPlaceholder: 'Enter your Todoist API key',
  apiKeyDescription: 'Get your API key from Todoist Settings > Integrations',
  languageLabel: 'Language',
  
  // Countdown card
  daysLeft: 'days left',
  dayLeft: 'day left',
  daysRemaining: 'Days',
  overdue: 'overdue',
  on: 'on',
  targetDate: 'Target Date',
  targetDatePrefix: 'until ',
  targetDateSuffix: ' ',
  expired: 'Expired',
  
  // CountUp card
  countupPrefix: 'since ',
  countupSuffix: ' ',
  
  // Display units
  days: 'Days',
  d: 'd',
  months: 'm',
  weeks: 'w',
  
  // Error messages
  apiKeyRequired: 'API key is required',
  fetchError: 'Failed to fetch tasks',
  saveSuccess: 'Settings saved successfully'
};