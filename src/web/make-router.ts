export interface Route {
	(data: any, event?: PopStateEvent): any;
}

export interface Router {
	popStateEventListener: (event: PopStateEvent) => any,
	hasStarted: boolean,
	start(trigger?: boolean): Router,
	stop(): Router,
	pushState(data: any, url?: string | URL | null, trigger?: boolean): Router,
	replaceState(data: any, url?: string | URL | null, trigger?: boolean): Router
}

export default function makeRouter(route: Route): Router {
	return {
		popStateEventListener(event: PopStateEvent): any {
			return route(null, event);
		},

		hasStarted: false,

		start(trigger = true): Router {
			if (this.hasStarted) {
				throw new Error('Router has already started');
			}

			window.addEventListener('popstate', this.popStateEventListener);
			this.hasStarted = true;

			if (trigger) {
				route(null);
			}

			return this;
		},

		stop(): Router {
			if (!this.hasStarted) {
				throw new Error('Router has not yet started');
			}

			window.removeEventListener('popstate', this.popStateEventListener);
			this.hasStarted = false;

			return this;
		},

		pushState(data: any, url?: string | URL | null, trigger = true): Router {
			if (!this.hasStarted) {
				throw new Error('Router has not yet started');
			}

			window.history.pushState(data, '', url);

			if (trigger) {
				route(data);
			}

			return this;
		},

		replaceState(data: any, url?: string | URL | null, trigger = true): Router {
			if (!this.hasStarted) {
				throw new Error('Router has not yet started');
			}

			window.history.replaceState(data, '', url);

			if (trigger) {
				route(data);
			}

			return this;
		}
	}
}
