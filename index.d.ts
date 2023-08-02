// index.d.ts
declare module 'dragDropMove' {
    export function createMoveElement(el: HTMLElement, options: OptionsType = {}): void;

    export interface OptionsType {
        moveStart?: (event: MouseEvent) => void
        move?: (event: MouseEvent) => void
        moveEnd?: (event: MouseEvent) => void
    }
}
