import { ViewManager } from '../web/view-manager.js';

// == TEMPLATE ==

const templateEl: HTMLTemplateElement = document.createElement('template');
templateEl.innerHTML = `
	<h1>Page Not Found (404 Error)</h1>
	<p>Oops! It looks like you've taken a wrong turn, or the page you're looking for doesn't exist anymore.</p>
	<p>We're sorry for the inconvenience.</p>
`;

// == CLASS(ES) ==

class NotFoundView extends HTMLElement {

	// -- STATIC --

	// -- PRIVATE --

	// PROPERTY(IES)

	#innerContent: HTMLElement;
	#viewManager: ViewManager;

	// METHOD(S)

	#render(): void {
		this.#viewManager.withMutationObserverSuspended(() => {
			this.#innerContent.replaceChildren(templateEl.content.cloneNode(true));
			this.replaceChildren(this.#innerContent!);
		});
	}

	// -- PROTECTED --

	// -- PUBLIC --

	// -- LIFE CYCLE --

	constructor() {
		super();

		this.#innerContent = ViewManager.makeInnerContent();

		const mutationCallback = () => {
			this.#render();
		};
		this.#viewManager = new ViewManager(this, mutationCallback);
	}

	connectedCallback(): void {
		this.#render();
		this.#viewManager.mutationObserverObserve();
	}

	disconnectedCallback(): void {
		this.#viewManager.mutationObserverDisconnect();
	}
}

// == DEFINE ==

customElements.define('not-found-view', NotFoundView);
