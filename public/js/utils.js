// Utility functions for the application

// DOM utilities
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Local storage utilities
const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error writing to localStorage:', e);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing from localStorage:', e);
      return false;
    }
  }
};

// Toast notifications
const toast = {
  show: (message, type = 'success') => {
    const container = $('#toast-container');
    if (!container) return;
    
    const toastEl = document.createElement('div');
    toastEl.className = `toast ${type}`;
    toastEl.innerHTML = `<div class="toast-message">${message}</div>`;
    
    container.appendChild(toastEl);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      if (toastEl.parentNode) {
        toastEl.parentNode.removeChild(toastEl);
      }
    }, 4000);
  },
  
  success: (message) => toast.show(message, 'success'),
  error: (message) => toast.show(message, 'error')
};

// URL utilities
const url = {
  getParams: () => {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  },
  
  setParam: (key, value) => {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.replaceState({}, '', url);
  },
  
  removeParam: (key) => {
    const url = new URL(window.location);
    url.searchParams.delete(key);
    window.history.replaceState({}, '', url);
  }
};

// API mock utilities
const api = {
  get: async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API GET error:', error);
      throw error;
    }
  },
  
  // Mock POST for form submissions
  post: async (endpoint, data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Store in localStorage for mock persistence
    const timestamp = Date.now();
    const key = `${endpoint.replace('/', '')}:${timestamp}`;
    storage.set(key, { ...data, timestamp });
    
    return { success: true, id: timestamp };
  }
};

// Format utilities
const format = {
  currency: (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  },
  
  date: (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  }
};

// Export utilities to global scope
window.utils = { $, $$, storage, toast, url, api, format };