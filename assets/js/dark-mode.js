(function() {
  const STORAGE_KEY = 'theme-preference';

  function getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredPreference() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateToggleButton(theme);
  }

  function updateToggleButton(theme) {
    const button = document.querySelector('.theme-toggle');
    if (button) {
      const isDark = theme === 'dark' ||
        (theme === null && getSystemPreference() === 'dark');
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const systemPref = getSystemPreference();

    let newTheme;
    if (currentTheme === 'dark') {
      newTheme = 'light';
    } else if (currentTheme === 'light') {
      newTheme = 'dark';
    } else {
      // No explicit theme set, toggle from system preference
      newTheme = systemPref === 'dark' ? 'light' : 'dark';
    }

    localStorage.setItem(STORAGE_KEY, newTheme);
    setTheme(newTheme);
  }

  function initTheme() {
    const stored = getStoredPreference();
    if (stored) {
      setTheme(stored);
    }
    // If no stored preference, let CSS handle system preference
  }

  // Initialize theme as early as possible
  initTheme();

  // Set up toggle button when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.addEventListener('click', toggleTheme);
      // Update button state
      const stored = getStoredPreference();
      updateToggleButton(stored || getSystemPreference());
    }
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    // Only react if user hasn't set a manual preference
    if (!getStoredPreference()) {
      updateToggleButton(e.matches ? 'dark' : 'light');
    }
  });
})();
