import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatMessage } from '@/types/portfolio';

interface PortfolioState {
  // Theme
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  
  // Chat
  chatMessages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  isChatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  
  // Navigation
  activeSection: string;
  setActiveSection: (section: string) => void;
  
  // UI State
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'dark' ? 'light' : 'dark' 
      })),
      
      // Chat
      chatMessages: [],
      addMessage: (message) => set((state) => ({ 
        chatMessages: [...state.chatMessages, message] 
      })),
      clearMessages: () => set({ chatMessages: [] }),
      isChatOpen: false,
      setChatOpen: (open) => set({ isChatOpen: open }),
      isTyping: false,
      setIsTyping: (typing) => set({ isTyping: typing }),
      
      // Navigation
      activeSection: 'hero',
      setActiveSection: (section) => set({ activeSection: section }),
      
      // UI State
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
