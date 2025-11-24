export declare class PropertyChangeDispatcher {
    protected _eventTarget: EventTarget;
    dispatchPropertChangeEvent(property: string, oldValue: any, newValue: any): void;
    constructor(target: EventTarget, eventListeners?: Record<string, EventListenerOrEventListenerObject>);
}
export declare class EventManager extends PropertyChangeDispatcher {
    #private;
    eventListenersAdd(): void;
    eventListenersRemove(): void;
    constructor(target: EventTarget, eventListeners?: Record<string, EventListenerOrEventListenerObject>);
}
