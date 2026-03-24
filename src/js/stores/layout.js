export default {
  name: 'layout',
  store: {
    loaded: false,
    _resizeTimer: null,

    init() {
      window.addEventListener('resize', () => {
        document.body.classList.add('hold-transition');
        clearTimeout(this._resizeTimer);
        this._resizeTimer = setTimeout(() => {
          document.body.classList.remove('hold-transition');
        }, 400);
      });
      setTimeout(() => {
        this.loaded = true;
        document.body.classList.add('app-loaded');
      }, 400);
    },
  },
};
