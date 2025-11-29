import lib from '../lib/index.js';
import matchRoute, { MatchRouteResult } from '../lib/match-route.js';

import makeRouter from '../web/make-router.js';

import './home-view.js';
import './nav-view.js';
import './not-found-view.js';
import pageController from './page-controller.js';
import './page-view.js';
import PageModel from './page-model.js';

const HOME_HASH = '#/';

document.addEventListener('DOMContentLoaded', () => {
	lib('PARCEL');

	const container = document.getElementById('app')!;

	let lastHash: string | null = null;
	let unbind: (() => void) | null = null;

	const router = makeRouter(function (data: any, event?: PopStateEvent): any {
		const hash = window.location.hash;
		if (lastHash === hash) {
			return;
		}

		// NO HASH CHECK
		if (hash[0] !== '#') {
			return void router.replaceState(null, HOME_HASH);
		}

		// BOOKMARK CHECK
		if (hash[1] !== '/') {
			if (lastHash === null) {
				return void router.pushState(null, HOME_HASH);
			}
			return void router.replaceState(null, lastHash, false);
		}

		lastHash = hash;

		unbind?.();
		unbind = null;

		let match: MatchRouteResult = null;

		match = matchRoute('#/', hash);
		if (match !== null) {
			container.replaceChildren(document.createElement('home-view'));
			return;
		}

		match = matchRoute('#/page/**/:subpage/', hash) ?? matchRoute('#/page/', hash);
		if (match !== null) {
			const view = document.createElement('page-view');
			const model = new PageModel({ subTitle: match.data.subpage ?? null });
			unbind = pageController(view, model);
			container.replaceChildren(view);
			return;
		}

		match = matchRoute('#/redirect/', hash)
		if (match !== null) {
			router.replaceState(null, '#/page/redirect/redirectpage/');
			return;
		}

		container.replaceChildren(document.createElement('not-found-view'));
	});
	router.start();
});
