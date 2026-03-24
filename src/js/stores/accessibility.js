export default {
  name: 'accessibility',
  store: {
    reducedMotion: false,
    highContrast: false,
    fontSize: 'normal', // 'normal', 'large', 'x-large'

    init() {
      // Detect prefers-reduced-motion
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.matchMedia('(prefers-reduced-motion: reduce)')
        .addEventListener('change', (e) => { this.reducedMotion = e.matches; });

      // Load saved preferences from localStorage
      const saved = localStorage.getItem('accessibility');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.highContrast !== undefined) this.highContrast = parsed.highContrast;
          if (parsed.fontSize !== undefined) this.fontSize = parsed.fontSize;
        } catch (e) {
          // Ignore invalid JSON
        }
      }

      this.apply();
    },

    toggleHighContrast() {
      this.highContrast = !this.highContrast;
      this.apply();
      this.save();
      this.announce(this.highContrast ? 'High contrast mode enabled' : 'High contrast mode disabled');
    },

    setFontSize(size) {
      if (['normal', 'large', 'x-large'].includes(size)) {
        this.fontSize = size;
        this.apply();
        this.save();
        this.announce('Font size set to ' + size);
      }
    },

    announce(message) {
      const region = document.getElementById('a11y-announcements');
      if (region) {
        region.textContent = '';
        // Brief delay so screen readers register the change
        requestAnimationFrame(() => {
          region.textContent = message;
        });
      }
    },

    apply() {
      const html = document.documentElement;

      // High contrast
      html.classList.toggle('high-contrast', this.highContrast);

      // Font size
      html.classList.remove('font-size-normal', 'font-size-large', 'font-size-x-large');
      html.classList.add('font-size-' + this.fontSize);

      // Reduced motion
      html.classList.toggle('reduced-motion', this.reducedMotion);
    },

    save() {
      localStorage.setItem('accessibility', JSON.stringify({
        highContrast: this.highContrast,
        fontSize: this.fontSize,
      }));
    },
  },
};
