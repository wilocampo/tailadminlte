import { slideUp, slideDown } from '../utils/slideToggle.js';

export default function treeview(config = {}) {
  return {
    animationSpeed: config.animationSpeed || 300,
    accordion: config.accordion !== undefined ? config.accordion : true,

    toggle(event) {
      const link = event.target.closest('.nav-link');
      if (!link) return;

      const navItem = link.closest('.nav-item');
      if (!navItem) return;

      // Only handle links that have a treeview submenu
      const submenu = navItem.querySelector(':scope > .nav-treeview');
      if (!submenu) return;

      // Prevent navigation for treeview toggle links
      if (link.getAttribute('href') === '#') {
        event.preventDefault();
      }

      if (navItem.classList.contains('menu-open')) {
        this.close(navItem);
      } else {
        this.open(navItem);
      }
    },

    open(navItem) {
      if (this.accordion) {
        const parent = navItem.parentElement;
        if (parent) {
          parent
            .querySelectorAll(':scope > .nav-item.menu-open')
            .forEach((item) => {
              if (item !== navItem) this.close(item);
            });
        }
      }
      navItem.classList.add('menu-open');
      const sub = navItem.querySelector(':scope > .nav-treeview');
      if (sub) slideDown(sub, this.animationSpeed);
    },

    close(navItem) {
      navItem.classList.remove('menu-open');
      const sub = navItem.querySelector(':scope > .nav-treeview');
      if (sub) slideUp(sub, this.animationSpeed);
    },
  };
}
