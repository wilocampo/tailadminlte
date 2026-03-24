/**
 * Slide animation utilities (replaces jQuery slideUp/slideDown)
 * Uses transitionend events for reliable cleanup even with rapid toggling.
 */

function cleanup(element, props) {
  props.forEach((p) => element.style.removeProperty(p));
}

const transitionProps = [
  'height',
  'padding-top',
  'padding-bottom',
  'margin-top',
  'margin-bottom',
  'overflow',
  'transition-duration',
  'transition-property',
];

export function slideUp(element, duration = 300) {
  // Abort any in-progress slide
  if (element._slideAbort) element._slideAbort();

  element.style.transitionProperty = 'height, margin, padding';
  element.style.transitionDuration = `${duration}ms`;
  element.style.height = `${element.offsetHeight}px`;
  element.offsetHeight; // force reflow
  element.style.overflow = 'hidden';
  element.style.height = '0';
  element.style.paddingTop = '0';
  element.style.paddingBottom = '0';
  element.style.marginTop = '0';
  element.style.marginBottom = '0';

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    element.removeEventListener('transitionend', onEnd);
    element._slideAbort = null;
    element.style.display = 'none';
    cleanup(element, transitionProps);
  };

  const onEnd = (e) => {
    if (e.target === element) finish();
  };

  element.addEventListener('transitionend', onEnd);
  // Safety fallback in case transitionend doesn't fire
  const timer = setTimeout(finish, duration + 50);
  element._slideAbort = () => {
    done = true;
    clearTimeout(timer);
    element.removeEventListener('transitionend', onEnd);
    cleanup(element, transitionProps);
    element._slideAbort = null;
  };
}

export function slideDown(element, duration = 300) {
  // Abort any in-progress slide
  if (element._slideAbort) element._slideAbort();

  element.style.removeProperty('display');
  let display = window.getComputedStyle(element).display;
  if (display === 'none') display = 'block';
  element.style.display = display;

  const height = element.offsetHeight;
  element.style.overflow = 'hidden';
  element.style.height = '0';
  element.style.paddingTop = '0';
  element.style.paddingBottom = '0';
  element.style.marginTop = '0';
  element.style.marginBottom = '0';

  element.offsetHeight; // force reflow

  element.style.transitionProperty = 'height, margin, padding';
  element.style.transitionDuration = `${duration}ms`;
  element.style.height = `${height}px`;
  element.style.removeProperty('padding-top');
  element.style.removeProperty('padding-bottom');
  element.style.removeProperty('margin-top');
  element.style.removeProperty('margin-bottom');

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    element.removeEventListener('transitionend', onEnd);
    element._slideAbort = null;
    cleanup(element, ['height', 'overflow', 'transition-duration', 'transition-property']);
  };

  const onEnd = (e) => {
    if (e.target === element) finish();
  };

  element.addEventListener('transitionend', onEnd);
  const timer = setTimeout(finish, duration + 50);
  element._slideAbort = () => {
    done = true;
    clearTimeout(timer);
    element.removeEventListener('transitionend', onEnd);
    cleanup(element, ['height', 'overflow', 'transition-duration', 'transition-property']);
    element._slideAbort = null;
  };
}

export function slideToggle(element, duration = 300) {
  if (window.getComputedStyle(element).display === 'none') {
    slideDown(element, duration);
  } else {
    slideUp(element, duration);
  }
}
