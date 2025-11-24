import { ViewManager } from '../web/view-manager.js';

// == TEMPLATE ==

const templateEl: HTMLTemplateElement = document.createElement('template');
templateEl.innerHTML = `
	<h1>Home</h1>
	<p>Welcome to the home page!</p>
`;

// == CLASS(ES) ==

class HomeView extends HTMLElement {

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

customElements.define('home-view', HomeView);
