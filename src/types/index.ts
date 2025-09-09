// Todoist API response types
export interface TodoistTask {
  id: string;
  content: string;
  due?: {
    date: string;
    string: string;
    lang: string;
    is_recurring: boolean;
  };
  created_at: string;
}

// Countdown card data type
export interface CountdownCard {
  id: string;
  title: string;
  daysLeft: number;
  dueDate: string;
  isOverdue: boolean;
}

// Application configuration type
export interface AppConfig {
  apiKey: string | null;
}

// API response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}