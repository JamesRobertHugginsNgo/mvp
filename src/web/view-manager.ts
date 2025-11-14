export function makeInnerContent(): HTMLElement {
	const innerContent = document.createElement('div');
	innerContent.setAttribute('data-inner-content', '');
	return innerContent;
}

export default class ViewManager {

	// -- PRIVATE --

	// PROPERTY(IES)

	#eventListeners: Record<string, EventListenerOrEventListenerObject>;
	#isObservingMutation = false;
	#mutationObserver: MutationObserver;
	#view: HTMLElement;

	// -- PUBLIC --

	// METHOD(S)

	eventListenersAdd(): void {
		for (const event in this.#eventListeners) {
			this.#view.addEventListener(event, this.#eventListeners[event]);
		}
	}

	eventListenersRemove(): void {
		for (const event in this.#eventListeners) {
			this.#view.removeEventListener(event, this.#eventListeners[event]);
		}
	}

	dispatchPropertChangeEvent(property: string, oldValue: any, newValue: any): void {
		this.#view.dispatchEvent(new CustomEvent('propertychange', {
			detail: { property, oldValue, newValue },
			bubbles: true,
			composed: true
		}));
	}

	mutationObserverDisconnect(): void {
		if (!this.#isObservingMutation) {
			return;
		}

		this.#mutationObserver.disconnect();
		this.#isObservingMutation = false;
	}

	mutationObserverObserve(): void {
		if (this.#isObservingMutation) {
			return;
		}

		this.#mutationObserver.observe(this.#view, { childList: true });
		this.#isObservingMutation = true;
	}

	withMutationObserverSuspended(render: () => void): void {
		const wasMutationObserverObserving = this.#isObservingMutation;
		if (wasMutationObserverObserving) {
			this.mutationObserverDisconnect();
		}
		try {
			render();
		} finally {
			if (wasMutationObserverObserving) {
				this.mutationObserverObserve();
			}
		}
	}

	// -- LIFE CYCLE --

	constructor(view: HTMLElement, mutationCallback: MutationCallback, eventListeners: Record<string, (event: Event) => any>) {
		this.#view = view;
		this.#mutationObserver = new MutationObserver(mutationCallback);
		this.#eventListeners = eventListeners;
	}
}
