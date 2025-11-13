function eventHandler(event: PopStateEvent): any {
	return Router.route(null, event);
}

let hasStarted = false;

const Router = {
	route(data: any, event?: PopStateEvent): any {
		throw new Error('route requires implementation');
	},

	start(trigger = true) {
		window.addEventListener('popstate', eventHandler);
		hasStarted = true;

		if (trigger) {
			this.route(null);
		}
	},

	pushState(data: any, url?: string | URL | null, trigger = true): void {
		if (!hasStarted) {
			return;
		}

		window.history.pushState(data, '', url);

		if (trigger) {
			this.route(data);
		}
	},

	replaceState(data: any, url?: string | URL | null, trigger = true): void {
		if (!hasStarted) {
			return;
		}

		window.history.replaceState(data, '', url);

		if (trigger) {
			this.route(data);
		}
	},

	stop() {
		if (!hasStarted) {
			return;
		}

		window.removeEventListener('popstate', eventHandler);
		hasStarted = false;
	},
};

export default Router;
