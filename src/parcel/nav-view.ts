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

	#eventListeners: Record<string, (event: Event) => any> = {
		'click': (event: Event) => {
			console.log('CLICK', event);
		}
	};
	#innerContent = ((): HTMLElement => {
		const innerContent = document.createElement('div');
		innerContent.setAttribute('data-view-content', '');
		return innerContent;
	})();
	#isObservingMutation = false;
	#mutationObserver = ((): MutationObserver => {
		return new MutationObserver((mutationsList: MutationRecord[]) => {
			this.#render();
		});
	})();
	#queryString: string | null = null;

	// METHOD(S)

	#mutationObserverDisconnect(): void {
		this.#mutationObserver.disconnect();
		this.#isObservingMutation = false;
	}

	#mutationObserverObserve(): void {
		this.#mutationObserver.observe(this, { childList: true });
		this.#isObservingMutation = true;
	}

	#render(): void {
		this.#withMutationObservationSuspended(() => {
			this.#innerContent.replaceChildren(templateEl.content.cloneNode(true));
			this.#renderQueryString();
			this.replaceChildren(this.#innerContent!);
		});
	}

	#renderQueryString(): void {
		this.#withMutationObservationSuspended(() => {
			for (const link of Array.from(this.#innerContent.querySelectorAll('a'))) {
				const [base] = link.href.split('?');
				link.href = this.#queryString === null ? base : `${base}?${this.#queryString}`
			}
		});
	}

	#withMutationObservationSuspended(render: () => void): void {
		const wasMutationObserverObserving = this.#isObservingMutation;
		if (wasMutationObserverObserving) {
			this.#mutationObserverDisconnect()
		}
		try {
			render();
		} finally {
			if (wasMutationObserverObserving) {
				this.#mutationObserverObserve();
			}
		}
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

		this.dispatchEvent(new CustomEvent('propertychange', {
			detail: { property: 'quryString', oldValue, newValue },
			bubbles: true,
			composed: true
		}));
	}

	// METHOD(S)

	// -- LIFE CYCLE --

	connectedCallback(): void {
		this.#render();

		if (this.#eventListeners !== undefined) {
			for (const event in this.#eventListeners) {
				this.addEventListener(event, this.#eventListeners[event]);
			}
		}

		this.#mutationObserverObserve();
	}

	disconnectedCallback(): void {
		if (this.#eventListeners !== undefined) {
			for (const event in this.#eventListeners) {
				this.removeEventListener(event, this.#eventListeners[event]);
			}
		}

		this.#mutationObserverDisconnect();
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
