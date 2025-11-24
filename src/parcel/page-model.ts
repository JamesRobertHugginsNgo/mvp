import { PropertyChangeDispatcher } from '../lib/event-manager.js';

// == CLASS(ES) ==

export default class PageModel extends EventTarget {

	// -- STATIC --

	// -- PRIVATE --

	// PROPERTY(IES)

	#propertyChangeDispatcher: PropertyChangeDispatcher;
	#subTitle: string | null = null;

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
		this.#propertyChangeDispatcher.dispatchPropertChangeEvent('subTitle', oldValue, newValue);
	}

	// -- LIFE CYCLE --

	constructor(data: { subTitle: string | null } = { subTitle: null }) {
		super();

		this.#propertyChangeDispatcher = new PropertyChangeDispatcher(this);

		const { subTitle } = data;
		this.subTitle = subTitle;
	}
}
