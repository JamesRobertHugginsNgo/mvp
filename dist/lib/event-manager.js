// == CLASS(ES) ==
export class PropertyChangeDispatcher {
    // -- STATIC --
    // -- PRIVATE --
    // -- PROTECTED --
    // PROPERTY(IES)
    _eventTarget;
    // -- PUBLIC --
    // METHOD(S)
    dispatchPropertChangeEvent(property, oldValue, newValue) {
        this._eventTarget.dispatchEvent(new CustomEvent('propertychange', {
            detail: { property, oldValue, newValue },
            bubbles: true,
            composed: true
        }));
    }
    // -- LIFE CYCLE --
    constructor(target, eventListeners = {}) {
        this._eventTarget = target;
    }
}
export class EventManager extends PropertyChangeDispatcher {
    // -- STATIC --
    // -- PRIVATE --
    // PROPERTY(IES)
    #eventListeners;
    // -- PROTECTED --
    // -- PUBLIC --
    // METHOD(S)
    eventListenersAdd() {
        for (const event in this.#eventListeners) {
            this._eventTarget.addEventListener(event, this.#eventListeners[event]);
        }
    }
    eventListenersRemove() {
        for (const event in this.#eventListeners) {
            this._eventTarget.removeEventListener(event, this.#eventListeners[event]);
        }
    }
    // -- LIFE CYCLE --
    constructor(target, eventListeners = {}) {
        super(target);
        this.#eventListeners = eventListeners;
    }
}
//# sourceMappingURL=event-manager.js.map