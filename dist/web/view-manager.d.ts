import { EventManager } from '../lib/event-manager.js';
export declare class ViewManager extends EventManager<HTMLElement> {
    #private;
    static makeInnerContent(): HTMLElement;
    mutationObserverDisconnect(): void;
    mutationObserverObserve(): void;
    withMutationObserverSuspended(render: () => void): void;
    constructor(view: HTMLElement, mutationCallback: MutationCallback, eventListeners?: Record<string, EventListenerOrEventListenerObject>);
}
