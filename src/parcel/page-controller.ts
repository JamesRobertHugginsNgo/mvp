import PageModel from './page-model.js';
import PageView from './page-view.js';

export default function pageController(view: HTMLElement, model: PageModel): () => void {
	if (!(view instanceof PageView)) {
		throw new Error('Invalid view type')
	}

	const viewPropertyChangeListener = (event: Event) => {
		if (
			!(event instanceof CustomEvent)
			|| event.detail.property !== 'subTitle'
			|| (typeof event.detail.newValue !== 'string' && event.detail.newValue !== null)
		) {
			return;
		}

		model.subTitle = event.detail.newValue;
	};
	view.addEventListener('propertychange', viewPropertyChangeListener);

	const modelPropertyChangeListener = (event: Event) => {
		if (
			!(event instanceof CustomEvent)
			|| event.detail.property !== 'subTitle'
			|| (typeof event.detail.newValue !== 'string' && event.detail.newValue !== null)
		) {
			return;
		}

		view.subTitle = event.detail.newValue;
	};
	model.addEventListener('propertychange', modelPropertyChangeListener);

	view.subTitle = model.subTitle;

	return function unbind() {
		view.addEventListener('propertychange', viewPropertyChangeListener);
		model.addEventListener('propertychange', modelPropertyChangeListener);
	}
}
