export default {
  name: 'darkMode',
  store: {
    mode: 'light',

    init() {
      const stored = localStorage.getItem('theme');
      this.mode = stored || 'light';
      this.apply();
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          if (this.mode === 'auto') this.apply();
        });
    },

    toggle() {
      const modes = ['light', 'dark', 'auto'];
      const idx = modes.indexOf(this.mode);
      this.mode = modes[(idx + 1) % modes.length];
      localStorage.setItem('theme', this.mode);
      this.apply();
    },

    setMode(mode) {
      this.mode = mode;
      localStorage.setItem('theme', mode);
      this.apply();
    },

    apply() {
      const isDark =
        this.mode === 'dark' ||
        (this.mode === 'auto' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', isDark);
    },
  },
};
