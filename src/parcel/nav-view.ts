import ViewManager, { makeInnerContent } from '../web/view-manager.js';

// == TEMPLATE ==

const templateEl: HTMLTemplateElement = document.createElement('template');
templateEl.innerHTML = `
	<p>
		<a class="btn btn-light" href="#/">Home</a>
		<a class="btn btn-light" href="#/page/">Page</a>
		<a class="btn btn-light" href="#/page/subpage/">Sub Page</a>
		<a class="btn btn-light" href="#/redirect/">Redirect</a>
		<a class="btn btn-light" href="#/404/">404</a>
	</p>
`;

// == CLASS ==

class NavView extends HTMLElement {

	// -- STATIC --

	// PROPERTY(IES)

	static observedAttributes: string[] = ['querystring'];

	// -- PRIVATE --

	// PROPERTY(IES)

	#hasRendered = false;
	#innerContent: HTMLElement;
	#queryString: string | null = null;
	#viewManager: ViewManager;

	// METHOD(S)

	#render(): void {
		this.#viewManager.withMutationObserverSuspended(() => {
			this.#innerContent.replaceChildren(templateEl.content.cloneNode(true));
			this.#hasRendered = true;
			this.#renderQueryString();
			this.replaceChildren(this.#innerContent!);
		});
	}

	#renderQueryString(): void {
		if (!this.#hasRendered) {
			return;
		}

		this.#viewManager.withMutationObserverSuspended(() => {
			for (const link of Array.from(this.#innerContent.querySelectorAll('a'))) {
				const [base] = link.href.split('?');
				link.href = this.#queryString === null ? base : `${base}?${this.#queryString}`
			}
		});
	}

	// -- PROTECTED --

	// -- PUBLIC --

	// GETTER(S) & SETTER(S)

	get queryString(): string | null {
		return this.#queryString;
	}

	set queryString(newValue: string | null) {
		const oldValue = this.#queryString;
		if (oldValue === newValue) {
			return;
		}

		this.#queryString = newValue;
		this.#renderQueryString();
		this.#viewManager.dispatchPropertChangeEvent('quryString', oldValue, newValue);
	}

	// METHOD(S)

	// -- LIFE CYCLE --

	constructor() {
		super();

		this.#innerContent = makeInnerContent();

		const mutationCallback = () => {
			this.#render();
		};

		const eventListeners = {
			'click': (event: Event) => {
				console.log('CLICK', event);
			}
		};

		this.#viewManager = new ViewManager(this, mutationCallback, eventListeners);
	}

	connectedCallback(): void {
		this.#render();
		this.#viewManager.eventListenersAdd();
		this.#viewManager.mutationObserverObserve();
	}

	disconnectedCallback(): void {
		this.#viewManager.eventListenersRemove();
		this.#viewManager.mutationObserverDisconnect();
	}

	attributeChangedCallback(name: string, oldValue: null | string, newValue: null | string): void {
		switch (name) {
			case 'querystring':
				this.queryString = newValue;
				break;
		}
	}
}

// == DEFINE ==

customElements.define('nav-view', NavView);
