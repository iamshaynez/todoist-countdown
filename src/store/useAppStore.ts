import { create } from 'zustand';
import type { CountdownCard } from '../types';
import { getApiKey, saveApiKey, clearApiKey } from '../lib/cookie';
import { getCountdownCards } from '../lib/todoist-api';

interface AppState {
  // API Key management
  apiKey: string;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
  
  // Tasks and cards
  cards: CountdownCard[];
  setCards: (cards: CountdownCard[]) => void;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  isSidebarOpen: boolean;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Async actions
  initializeApp: () => void;
  saveApiKeyAndRefresh: (key: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  apiKey: '',
  cards: [],
  isLoading: false,
  error: null,
  isSidebarOpen: false,
  
  // Basic setters
  setApiKey: (key: string) => set({ apiKey: key }),
  
  clearApiKey: () => {
    clearApiKey();
    set({ apiKey: '', cards: [], error: null });
  },
  
  setCards: (cards: CountdownCard[]) => set({ cards }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  setError: (error: string | null) => set({ error }),
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  setSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),
  
  // Initialize app - load API key from cookie
  initializeApp: () => {
    const savedApiKey = getApiKey();
    if (savedApiKey) {
      set({ apiKey: savedApiKey });
      // Auto-refresh tasks if API key exists
      get().refreshTasks();
    }
  },
  
  // Save API key and refresh tasks
  saveApiKeyAndRefresh: async (key: string) => {
    const trimmedKey = key.trim();
    
    if (!trimmedKey) {
      set({ error: 'API Key cannot be empty' });
      return;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      // Test the API key by fetching tasks
      const result = await getCountdownCards(trimmedKey);
      
      if (result.error) {
        set({ error: result.error, isLoading: false });
        return;
      }
      
      // Save API key and update state
      saveApiKey(trimmedKey);
      set({ 
        apiKey: trimmedKey, 
        cards: result.data || [], 
        isLoading: false, 
        error: null,
        isSidebarOpen: false // Close sidebar on successful save
      });
    } catch (error) {
      console.error('Error saving API key:', error);
      set({ 
        error: 'Failed to validate API key. Please try again.', 
        isLoading: false 
      });
    }
  },
  
  // Refresh tasks using current API key
  refreshTasks: async () => {
    const { apiKey } = get();
    
    if (!apiKey) {
      set({ error: 'No API key configured. Please add your Todoist API key.' });
      return;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      const result = await getCountdownCards(apiKey);
      
      if (result.error) {
        set({ error: result.error, isLoading: false });
        return;
      }
      
      set({ cards: result.data || [], isLoading: false, error: null });
    } catch (error) {
      console.error('Error refreshing tasks:', error);
      set({ 
        error: 'Failed to refresh tasks. Please try again.', 
        isLoading: false 
      });
    }
  },
}));