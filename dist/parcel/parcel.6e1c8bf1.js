function $5002f5814ed49d1e$export$2e2bcd8739ae039(message) {
    console.log(message);
}
$5002f5814ed49d1e$export$2e2bcd8739ae039('LIB');


function $4ab8f59ef703d096$var$eventHandler(event) {
    return $4ab8f59ef703d096$var$Router.route(null, event);
}
let $4ab8f59ef703d096$var$hasStarted = false;
const $4ab8f59ef703d096$var$Router = {
    route (data, event) {
        throw new Error('route requires implementation');
    },
    start () {
        window.addEventListener('popstate', $4ab8f59ef703d096$var$eventHandler);
        $4ab8f59ef703d096$var$hasStarted = true;
        this.route(null);
    },
    pushState (data, url) {
        if (!$4ab8f59ef703d096$var$hasStarted) return;
        window.history.pushState(data, '', url);
        this.route(data);
    },
    replaceState (data, url) {
        if (!$4ab8f59ef703d096$var$hasStarted) return;
        window.history.replaceState(data, '', url);
        this.route(data);
    },
    stop () {
        if (!$4ab8f59ef703d096$var$hasStarted) return;
        window.removeEventListener('popstate', $4ab8f59ef703d096$var$eventHandler);
        $4ab8f59ef703d096$var$hasStarted = false;
    }
};
var $4ab8f59ef703d096$export$2e2bcd8739ae039 = $4ab8f59ef703d096$var$Router;


(0, $5002f5814ed49d1e$export$2e2bcd8739ae039)('PARCEL');
(0, $4ab8f59ef703d096$export$2e2bcd8739ae039).route = function(data, event) {
    console.group('ROUTE');
    console.log('DATA', data);
    console.log('EVENT', event);
    console.log('HASH', window.location.hash);
    console.groupEnd();
};
(0, $4ab8f59ef703d096$export$2e2bcd8739ae039).start();


//# sourceMappingURL=parcel.6e1c8bf1.js.map
