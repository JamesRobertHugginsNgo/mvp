import { ViewManager } from '../web/view-manager.js';

// == TEMPLATE ==

const templateEl: HTMLTemplateElement = document.createElement('template');
templateEl.innerHTML = `
	<h1>Page</h1>
	<div data-sub-title></div>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque fugiat blanditiis commodi ab delectus sit eius quod iste eum nostrum, officia deserunt nesciunt praesentium voluptatem porro cum nam libero quo!</p>
`;

// == CLASS(ES) ==

export default class PageView extends HTMLElement {

	// -- STATIC --

	// PROPERTY(IES)

	static observedAttributes: string[] = ['subtitle'];

	// -- PRIVATE --

	// PROPERTY(IES)

	#hasRendered = false;
	#innerContent: HTMLElement;
	#subTitle: string | null = null;
	#viewManager: ViewManager;

	// METHOD(S)

	#render(): void {
		this.#viewManager.withMutationObserverSuspended(() => {
			this.#innerContent.replaceChildren(templateEl.content.cloneNode(true));
			this.#hasRendered = true;
			this.#renderSubString();
			this.replaceChildren(this.#innerContent!);
		});
	}

	#renderSubString(): void {
		if (!this.#hasRendered) {
			return;
		}

		this.#viewManager.withMutationObserverSuspended(() => {
			this.#innerContent.querySelector('[data-sub-title]')!.innerHTML = this.#subTitle === null
				? ''
				: `<h2 class="h5">${this.#subTitle}</h2>`;
		});
	}

	// -- PROTECTED --

	// -- PUBLIC --

	// GETTER(S) & SETTER(S)

	get subTitle(): string | null {
		return this.#subTitle;
	}

	set subTitle(newValue: string | null) {
		const oldValue = this.#subTitle;
		if (oldValue === newValue) {
			return;
		}

		this.#subTitle = newValue;
		this.#renderSubString();
		this.#viewManager.dispatchPropertChangeEvent('subTitle', oldValue, newValue);
	}

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

	attributeChangedCallback(name: string, oldValue: null | string, newValue: null | string): void {
		switch (name) {
			case 'subtitle':
				this.subTitle = newValue;
				break;
		}
	}
}

// == DEFINE ==

customElements.define('page-view', PageView);
