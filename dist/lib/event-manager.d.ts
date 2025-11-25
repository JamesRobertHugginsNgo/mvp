export declare class PropertyChangeDispatcher<T extends EventTarget> {
    protected _eventTarget: T;
    dispatchPropertChangeEvent(property: string, oldValue: any, newValue: any): void;
    constructor(target: T, eventListeners?: Record<string, EventListenerOrEventListenerObject>);
}
export declare class EventManager<T extends EventTarget> extends PropertyChangeDispatcher<T> {
    #private;
    eventListenersAdd(): void;
    eventListenersRemove(): void;
    constructor(target: T, eventListeners?: Record<string, EventListenerOrEventListenerObject>);
}
