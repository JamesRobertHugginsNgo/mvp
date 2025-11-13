function eventHandler(event) {
    return Router.route(null, event);
}
let hasStarted = false;
const Router = {
    route(data, event) {
        throw new Error('route requires implementation');
    },
    start(trigger = true) {
        window.addEventListener('popstate', eventHandler);
        hasStarted = true;
        if (trigger) {
            this.route(null);
        }
    },
    pushState(data, url, trigger = true) {
        if (!hasStarted) {
            return;
        }
        window.history.pushState(data, '', url);
        if (trigger) {
            this.route(data);
        }
    },
    replaceState(data, url, trigger = true) {
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
//# sourceMappingURL=router.js.map