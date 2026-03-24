import Alpine from 'alpinejs';
import { createIcons, icons } from 'lucide';

// Stores
import sidebarStore from './stores/sidebar.js';
import darkModeStore from './stores/darkMode.js';
import layoutStore from './stores/layout.js';
import accessibilityStore from './stores/accessibility.js';

// Components
import treeview from './components/treeview.js';
import cardWidget from './components/cardWidget.js';
import directChat from './components/directChat.js';
import fullscreen from './components/fullscreen.js';
import todoList from './components/todoList.js';

// Register Alpine stores and components
document.addEventListener('alpine:init', () => {
  Alpine.store(sidebarStore.name, sidebarStore.store);
  Alpine.store(darkModeStore.name, darkModeStore.store);
  Alpine.store(layoutStore.name, layoutStore.store);
  Alpine.store(accessibilityStore.name, accessibilityStore.store);

  Alpine.data('treeview', treeview);
  Alpine.data('cardWidget', cardWidget);
  Alpine.data('directChat', directChat);
  Alpine.data('fullscreen', fullscreen);
  Alpine.data('todoList', todoList);
});

Alpine.start();
window.Alpine = Alpine;

// Initialize Lucide icons
function initIcons() {
  createIcons({ icons });
}

initIcons();

// Re-initialize icons when Alpine manipulates the DOM
// MutationObserver catches x-if/x-show additions
const observer = new MutationObserver((mutations) => {
  let needsRefresh = false;
  for (const mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1 && (node.hasAttribute?.('data-lucide') || node.querySelector?.('[data-lucide]'))) {
          needsRefresh = true;
          break;
        }
      }
    }
    if (needsRefresh) break;
  }
  if (needsRefresh) {
    requestAnimationFrame(initIcons);
  }
});

observer.observe(document.body, { childList: true, subtree: true });
