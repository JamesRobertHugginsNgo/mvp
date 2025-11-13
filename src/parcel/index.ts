import lib from '../lib/index.js';
import matchRoute, { MatchRouteResult } from '../lib/match-route.js';

import Router from '../web/router.js';

import './nav-view.js';

const HOME_HASH = '#/';

document.addEventListener('DOMContentLoaded', () => {
	lib('PARCEL');

	let lastHash: string | null = null;

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
			case !!(match = matchRoute('#/', hash)):
				console.group('HOME');
				console.log('MATCH', match);
				console.groupEnd();
				break;

			case !!(match = matchRoute('#/page/**/:subpage/', hash) ?? matchRoute('#/page/', hash)):
				console.group('PAGE');
				console.log('MATCH', match);
				console.groupEnd();
				break;

			case !!(match = matchRoute('#/redirect/', hash)):
				console.group('REDIRECT');
				console.log('MATCH', match);
				console.groupEnd();
				Router.replaceState(null, '#/page/redirect/redirectpage/');
				break;

			default:
				console.log('404');
		}
	}

	Router.start();
});
