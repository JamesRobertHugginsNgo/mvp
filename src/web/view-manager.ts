import { EventManager } from '../lib/event-manager.js';

// == CLASS(ES) ==

export class ViewManager extends EventManager<HTMLElement> {

	// -- STATIC --

	// METHOD(S)

	static makeInnerContent(): HTMLElement {
		const innerContent = document.createElement('div');
		innerContent.setAttribute('data-inner-content', '');
		return innerContent;
	}

	// -- PRIVATE --

	// PROPERTY(IES)

	#isObservingMutation = false;
	#mutationObserver: MutationObserver;

	// -- PROTECTED --

	// -- PUBLIC --

	// METHOD(S)

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

		this.#mutationObserver.observe(this._eventTarget, { childList: true });
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

	constructor(view: HTMLElement, mutationCallback: MutationCallback, eventListeners?: Record<string, EventListenerOrEventListenerObject>) {
		super(view, eventListeners);

		this.#mutationObserver = new MutationObserver(mutationCallback);
	}
}
