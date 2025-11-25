// == CLASS(ES) ==

export class PropertyChangeDispatcher<T extends EventTarget> {

	// -- STATIC --

	// -- PRIVATE --

	// -- PROTECTED --

	// PROPERTY(IES)

	protected _eventTarget: T;

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

	constructor(target: T, eventListeners: Record<string, EventListenerOrEventListenerObject> = {}) {
		this._eventTarget = target;
	}

}

export class EventManager<T extends EventTarget> extends PropertyChangeDispatcher<T> {

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

	constructor(target: T, eventListeners: Record<string, EventListenerOrEventListenerObject> = {}) {
		super(target);

		this.#eventListeners = eventListeners;
	}
}
