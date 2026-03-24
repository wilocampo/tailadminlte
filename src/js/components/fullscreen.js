export default function fullscreen() {
  return {
    active: false,

    init() {
      document.addEventListener('fullscreenchange', () => {
        this.active = !!document.fullscreenElement;
      });
    },

    toggle() {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        this.active = false;
      } else {
        document.documentElement.requestFullscreen();
        this.active = true;
      }
    },
  };
}
