export default {
  name: 'sidebar',
  store: {
    open: true,
    mini: false,
    breakpoint: 992,
    _wasMobile: false,
    _userToggled: false,

    init() {
      this.mini = document.body.classList.contains('sidebar-mini');
      this._detectBreakpoint();
      this._wasMobile = window.innerWidth <= this.breakpoint;
      this._applyInitialState();
      window.addEventListener('resize', () => this._handleResize());
    },

    toggle() {
      this._userToggled = true;
      if (document.body.classList.contains('sidebar-collapse')) {
        this.expand();
      } else {
        this.collapse();
      }
    },

    expand() {
      document.body.classList.remove('sidebar-collapse');
      document.body.classList.add('sidebar-open');
      this.open = true;
    },

    collapse() {
      document.body.classList.remove('sidebar-open');
      document.body.classList.add('sidebar-collapse');
      this.open = false;
    },

    close() {
      document.body.classList.remove('sidebar-open');
      this.open = false;
    },

    menusClose() {
      document.querySelectorAll('.nav-treeview').forEach((el) => {
        el.style.removeProperty('display');
        el.style.removeProperty('height');
      });
      document.querySelectorAll('.sidebar-menu .nav-item').forEach((el) => {
        el.classList.remove('menu-open');
      });
    },

    _detectBreakpoint() {
      const expandEl = document.querySelector('[class*="sidebar-expand"]');
      if (expandEl) {
        const content = getComputedStyle(expandEl, '::before').getPropertyValue('content');
        const bp = Number(content.replace(/[^\d.-]/g, ''));
        if (bp > 0) this.breakpoint = bp;
      }
    },

    _applyInitialState() {
      if (window.innerWidth <= this.breakpoint) {
        this.collapse();
      } else {
        if (this.mini && document.body.classList.contains('sidebar-collapse')) {
          // Keep collapsed if mini + already collapsed
        } else if (!this.mini) {
          this.expand();
        }
      }
    },

    _handleResize() {
      const isMobile = window.innerWidth <= this.breakpoint;

      // Only auto-adjust when crossing the breakpoint boundary
      if (isMobile && !this._wasMobile) {
        // Crossed to mobile: collapse sidebar
        this._userToggled = false;
        this.collapse();
      } else if (!isMobile && this._wasMobile) {
        // Crossed to desktop: expand unless mini mode
        this._userToggled = false;
        if (!this.mini) {
          this.expand();
        }
      }
      // If user manually toggled, don't override their choice on same-side resizes

      this._wasMobile = isMobile;
    },
  },
};
