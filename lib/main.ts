interface OptionsType {
  moveStart?:(event: MouseEvent) => void
  move?:(event: MouseEvent) => void
  moveEnd?:(event: MouseEvent) => void
}
export const createMoveElement = (el: HTMLElement, options: OptionsType = {}) => {
  let isMove = false;
  el.style.cursor = 'grab';

  function getTranslateValuesFromTransform(el: HTMLElement) {
    const transformString = el.style.transform || '';
    const startIdx = transformString.indexOf('(') + 1;
    const endIdx = transformString.indexOf(')');
    const valuesString = transformString.substring(startIdx, endIdx);
    const [x, y] = valuesString.split(',').map(parseFloat);
    return { x, y };
  }

  let isDragging = false;
  let original: { x?: number; y?: number } = {};

  function handleDrag(event: MouseEvent) {
    if (!isDragging && isMove) {
      isDragging = true;
      if (options.hasOwnProperty('move') && typeof options.move === 'function') options.move(event);
      let nowX = event.clientX;
      let nowY = event.clientY;
      let offsetX = nowX - (original.x || 0);
      let offsetY = nowY - (original.y || 0);
      const { x, y } = getTranslateValuesFromTransform(el);
      el.style.transform = `translate(${x + offsetX}px, ${y + offsetY}px)`;
      original = { x: nowX, y: nowY };
      requestAnimationFrame(() => {
        // Your dragging logic here...
        // This block of code will be executed at the next animation frame.
        // Perform expensive operations here without the risk of excessive
        // executions during a short period of time.
        isDragging = false;
      });
    }
  }

  // dragstart mousedown
  el.addEventListener('mousedown', (event) => {
    if (options.hasOwnProperty('moveStart') && typeof options.moveStart === 'function') options.moveStart(event);
    isMove = true;
    el.style.cursor = 'grabbing';
    original = { x: event.clientX, y: event.clientY };
  });

  // drag mousemove
  window.addEventListener('mousemove', handleDrag);

  // dragend mouseup
  el.addEventListener('mouseup', (event) => {
    if (options.hasOwnProperty('moveEnd') && typeof options.moveEnd === 'function') options.moveEnd(event);
    isMove = false;
    el.style.cursor = 'grab';
    original = {};
  });
};
