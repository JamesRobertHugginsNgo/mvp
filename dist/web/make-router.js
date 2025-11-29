export default function makeRouter(route) {
    return {
        popStateEventListener(event) {
            return route(null, event);
        },
        hasStarted: false,
        start(trigger = true) {
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
        stop() {
            if (!this.hasStarted) {
                throw new Error('Router has not yet started');
            }
            window.removeEventListener('popstate', this.popStateEventListener);
            this.hasStarted = false;
            return this;
        },
        pushState(data, url, trigger = true) {
            if (!this.hasStarted) {
                throw new Error('Router has not yet started');
            }
            window.history.pushState(data, '', url);
            if (trigger) {
                route(data);
            }
            return this;
        },
        replaceState(data, url, trigger = true) {
            if (!this.hasStarted) {
                throw new Error('Router has not yet started');
            }
            window.history.replaceState(data, '', url);
            if (trigger) {
                route(data);
            }
            return this;
        }
    };
}
//# sourceMappingURL=make-router.js.map