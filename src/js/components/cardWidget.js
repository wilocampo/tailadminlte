import { slideUp, slideDown } from '../utils/slideToggle.js';

export default function cardWidget(config = {}) {
  return {
    collapsed: config.collapsed || false,
    maximized: false,
    animationSpeed: config.animationSpeed || 500,

    init() {
      // Check if card starts collapsed
      const card = this.$el.closest('.card');
      if (card && card.classList.contains('collapsed-card')) {
        this.collapsed = true;
      }
    },

    toggleCollapse() {
      const card = this.$el.closest('.card');
      if (!card) return;

      if (card.classList.contains('collapsed-card')) {
        this._expand(card);
      } else {
        this._collapse(card);
      }
    },

    _collapse(card) {
      card.classList.add('collapsing-card');
      const targets = card.querySelectorAll(
        ':scope > .card-body, :scope > .card-footer'
      );
      targets.forEach((el) => slideUp(el, this.animationSpeed));

      setTimeout(() => {
        card.classList.add('collapsed-card');
        card.classList.remove('collapsing-card');
        this.collapsed = true;
      }, this.animationSpeed);
    },

    _expand(card) {
      card.classList.add('expanding-card');
      const targets = card.querySelectorAll(
        ':scope > .card-body, :scope > .card-footer'
      );
      targets.forEach((el) => slideDown(el, this.animationSpeed));

      setTimeout(() => {
        card.classList.remove('collapsed-card', 'expanding-card');
        this.collapsed = false;
      }, this.animationSpeed);
    },

    remove() {
      const card = this.$el.closest('.card');
      if (card) slideUp(card, this.animationSpeed);
    },

    toggleMaximize() {
      const card = this.$el.closest('.card');
      if (!card) return;

      if (card.classList.contains('maximized-card')) {
        this._minimize(card);
      } else {
        this._maximize(card);
      }
    },

    _maximize(card) {
      // Capture current dimensions for smooth transition
      card.style.height = `${card.offsetHeight}px`;
      card.style.width = `${card.offsetWidth}px`;
      card.style.transition = 'all .15s';

      setTimeout(() => {
        document.documentElement.classList.add('maximized-card');
        card.classList.add('maximized-card');

        if (card.classList.contains('collapsed-card')) {
          card.classList.add('was-collapsed');
        }

        this.maximized = true;
      }, 150);
    },

    _minimize(card) {
      card.style.cssText = '';

      setTimeout(() => {
        document.documentElement.classList.remove('maximized-card');
        card.classList.remove('maximized-card');

        if (card.classList.contains('was-collapsed')) {
          card.classList.remove('was-collapsed');
        }

        this.maximized = false;
      }, 10);
    },
  };
}
