import lib from '../lib/index.js';
import matchRoute, { MatchRouteResult } from '../lib/match-route.js';

import Router from '../web/router.js';

import './home-view.js';
import './nav-view.js';
import './not-found-view.js';
import pageController from './page-controller.js';
import './page-view.js';
import PageModel from './page-model.js';

const HOME_HASH = '#/';

document.addEventListener('DOMContentLoaded', () => {
	lib('PARCEL');

	const container = document.getElementById('app');

	let lastHash: string | null = null;
	let unbind: (() => void) | null = null;

	Router.route = function (data: any, event?: PopStateEvent): any {
		const hash = window.location.hash;
		if (lastHash === hash) {
			return;
		}

		// NO HASH CHECK
		if (hash[0] !== '#') {
			return void Router.replaceState(null, HOME_HASH);
		}

		// BOOKMARK CHECK
		if (hash[1] !== '/') {
			if (lastHash === null) {
				return void Router.pushState(null, HOME_HASH);
			}
			return void Router.replaceState(null, lastHash, false);
		}

		lastHash = hash;

		let match: MatchRouteResult = null;
		switch (true) {
			case (match = matchRoute('#/', hash)) !== null:
				unbind?.();
				container?.replaceChildren(document.createElement('home-view'));
				break;

			case (match = matchRoute('#/page/**/:subpage/', hash) ?? matchRoute('#/page/', hash)) !== null:
				const routeMatch: MatchRouteResult = match as MatchRouteResult;
				unbind?.();
				const view = document.createElement('page-view');
				unbind = pageController(view, new PageModel({ subTitle: routeMatch!.data.subpage ?? null }));
				container?.replaceChildren(view);
				break;

			case (match = matchRoute('#/redirect/', hash)) !== null:
				Router.replaceState(null, '#/page/redirect/redirectpage/');
				break;

			default:
				unbind?.();
				container?.replaceChildren(document.createElement('not-found-view'));
		}
	}

	Router.start();
});
