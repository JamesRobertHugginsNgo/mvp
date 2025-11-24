// == CLASS(ES) ==

export class PropertyChangeDispatcher {

	// -- STATIC --

	// -- PRIVATE --

	// -- PROTECTED --

	// PROPERTY(IES)

	protected _eventTarget: EventTarget;

	// -- PUBLIC --

	// METHOD(S)

	dispatchPropertChangeEvent(property: string, oldValue: any, newValue: any): void {
		this._eventTarget.dispatchEvent(new CustomEvent('propertychange', {
			detail: { property, oldValue, newValue },
			bubbles: true,
			composed: true
		}));
	}

	// -- LIFE CYCLE --

	constructor(target: EventTarget, eventListeners: Record<string, EventListenerOrEventListenerObject> = {}) {
		this._eventTarget = target;
	}

}

export class EventManager extends PropertyChangeDispatcher {

	// -- STATIC --

	// -- PRIVATE --

	// PROPERTY(IES)

	#eventListeners: Record<string, EventListenerOrEventListenerObject>;

	// -- PROTECTED --

	// -- PUBLIC --

	// METHOD(S)

	eventListenersAdd(): void {
		for (const event in this.#eventListeners) {
			this._eventTarget.addEventListener(event, this.#eventListeners[event]);
		}
	}

	eventListenersRemove(): void {
		for (const event in this.#eventListeners) {
			this._eventTarget.removeEventListener(event, this.#eventListeners[event]);
		}
	}

	// -- LIFE CYCLE --

	constructor(target: EventTarget, eventListeners: Record<string, EventListenerOrEventListenerObject> = {}) {
		super(target);

		this.#eventListeners = eventListeners;
	}
}
