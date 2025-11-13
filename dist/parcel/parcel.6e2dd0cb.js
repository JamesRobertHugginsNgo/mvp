function $5002f5814ed49d1e$export$2e2bcd8739ae039(message) {
    console.log(message);
}
$5002f5814ed49d1e$export$2e2bcd8739ae039('LIB');


function $5ebb74ebe14320a0$export$2e2bcd8739ae039(pattern, fullPath) {
    const patternSegments = pattern.split('/');
    const [path, query] = fullPath.split('?');
    const pathSegments = path.split('/');
    const match = $5ebb74ebe14320a0$var$matchSegments(patternSegments, pathSegments, false);
    if (match === null) return null;
    const { firstMatch: firstMatch } = match;
    if (firstMatch.index !== 0 || firstMatch.length !== pathSegments.length) return null;
    const { data: data } = firstMatch;
    return {
        data: data,
        query: query
    };
}
function $5ebb74ebe14320a0$var$matchSegments(patternSegments, pathSegments, greedy = true) {
    if (patternSegments.length === 0) {
        if (pathSegments.length === 0) return {
            firstMatch: {
                index: 0,
                length: 0,
                data: {}
            },
            lastMatch: {
                index: 0,
                length: 0,
                data: {}
            }
        };
        return null;
    }
    const patternSegment = patternSegments[0];
    const remainingPatternSegments = patternSegments.slice(1);
    const firstMatch = {
        index: -1,
        length: 0,
        data: {}
    };
    const lastMatch = {
        index: -1,
        length: 0,
        data: {}
    };
    for(let index = 0, length = pathSegments.length; index < length; index++){
        const pathSegment = pathSegments[index];
        if (patternSegment !== '**' && patternSegment !== '*' && patternSegment[0] !== ':' && patternSegment !== pathSegment) continue;
        if (patternSegment === '**') {
            const remainingPathSegments = pathSegments.slice(index);
            const match = $5ebb74ebe14320a0$var$matchSegments(remainingPatternSegments, remainingPathSegments);
            if (match === null) continue;
            lastMatch.index = index;
            lastMatch.length = match.lastMatch.length + match.lastMatch.index;
            lastMatch.data = match.lastMatch.data;
            if (firstMatch.index === -1) {
                firstMatch.index = index;
                firstMatch.length = match.lastMatch.length + match.lastMatch.index;
                firstMatch.data = match.lastMatch.data;
                if (!greedy) return {
                    firstMatch: firstMatch,
                    lastMatch: lastMatch
                };
            }
            continue;
        }
        const remainingPathSegments = pathSegments.slice(index + 1);
        const match = $5ebb74ebe14320a0$var$matchSegments(remainingPatternSegments, remainingPathSegments, false);
        if (match === null) continue;
        if (match.firstMatch.index !== 0) continue;
        const data = {};
        if (patternSegment[0] === ':') {
            const key = patternSegment.slice(1);
            data[key] = pathSegment;
        }
        lastMatch.index = index;
        lastMatch.length = match.firstMatch.length + 1;
        lastMatch.data = {
            ...data,
            ...match.firstMatch.data
        };
        if (firstMatch.index === -1) {
            firstMatch.index = index;
            firstMatch.length = match.firstMatch.length + 1;
            firstMatch.data = {
                ...data,
                ...match.firstMatch.data
            };
            if (!greedy) return {
                firstMatch: firstMatch,
                lastMatch: lastMatch
            };
        }
    }
    if (firstMatch.index === -1) return null;
    return {
        firstMatch: firstMatch,
        lastMatch: lastMatch
    };
}


function $4ab8f59ef703d096$var$eventHandler(event) {
    return $4ab8f59ef703d096$var$Router.route(null, event);
}
let $4ab8f59ef703d096$var$hasStarted = false;
const $4ab8f59ef703d096$var$Router = {
    route (data, event) {
        throw new Error('route requires implementation');
    },
    start (trigger = true) {
        window.addEventListener('popstate', $4ab8f59ef703d096$var$eventHandler);
        $4ab8f59ef703d096$var$hasStarted = true;
        if (trigger) this.route(null);
    },
    pushState (data, url, trigger = true) {
        if (!$4ab8f59ef703d096$var$hasStarted) return;
        window.history.pushState(data, '', url);
        if (trigger) this.route(data);
    },
    replaceState (data, url, trigger = true) {
        if (!$4ab8f59ef703d096$var$hasStarted) return;
        window.history.replaceState(data, '', url);
        if (trigger) this.route(data);
    },
    stop () {
        if (!$4ab8f59ef703d096$var$hasStarted) return;
        window.removeEventListener('popstate', $4ab8f59ef703d096$var$eventHandler);
        $4ab8f59ef703d096$var$hasStarted = false;
    }
};
var $4ab8f59ef703d096$export$2e2bcd8739ae039 = $4ab8f59ef703d096$var$Router;


// == TEMPLATE ==
const $b437b2d56458af84$var$templateEl = document.createElement('template');
$b437b2d56458af84$var$templateEl.innerHTML = `
	<p>
		<a class="btn btn-light" href="#/">Home</a>
		<a class="btn btn-light" href="#/page/">Page</a>
		<a class="btn btn-light" href="#/page/subpage/">Sub Page</a>
		<a class="btn btn-light" href="#/redirect/">Redirect</a>
		<a class="btn btn-light" href="#/404/">404</a>
	</p>
`;
// == CLASS ==
class $b437b2d56458af84$var$NavView extends HTMLElement {
    // -- STATIC --
    // PROPERTY(IES)
    static observedAttributes = [
        'querystring'
    ];
    // -- PRIVATE --
    // PROPERTY(IES)
    #eventListeners = {
        'click': (event)=>{
            console.log('CLICK', event);
        }
    };
    #innerContent = (()=>{
        const innerContent = document.createElement('div');
        innerContent.setAttribute('data-view-content', '');
        return innerContent;
    })();
    #isObservingMutation = false;
    #mutationObserver = (()=>{
        return new MutationObserver((mutationsList)=>{
            this.#render();
        });
    })();
    #queryString = null;
    // METHOD(S)
    #mutationObserverDisconnect() {
        this.#mutationObserver.disconnect();
        this.#isObservingMutation = false;
    }
    #mutationObserverObserve() {
        this.#mutationObserver.observe(this, {
            childList: true
        });
        this.#isObservingMutation = true;
    }
    #render() {
        this.#withMutationObservationSuspended(()=>{
            this.#innerContent.replaceChildren($b437b2d56458af84$var$templateEl.content.cloneNode(true));
            this.#renderQueryString();
            this.replaceChildren(this.#innerContent);
        });
    }
    #renderQueryString() {
        this.#withMutationObservationSuspended(()=>{
            for (const link of Array.from(this.#innerContent.querySelectorAll('a'))){
                const [base] = link.href.split('?');
                link.href = this.#queryString === null ? base : `${base}?${this.#queryString}`;
            }
        });
    }
    #withMutationObservationSuspended(render) {
        const wasMutationObserverObserving = this.#isObservingMutation;
        if (wasMutationObserverObserving) this.#mutationObserverDisconnect();
        try {
            render();
        } finally{
            if (wasMutationObserverObserving) this.#mutationObserverObserve();
        }
    }
    // -- PROTECTED --
    // -- PUBLIC --
    // GETTER(S) & SETTER(S)
    get queryString() {
        return this.#queryString;
    }
    set queryString(newValue) {
        const oldValue = this.#queryString;
        if (oldValue === newValue) return;
        this.#queryString = newValue;
        this.#renderQueryString();
        this.dispatchEvent(new CustomEvent('propertychange', {
            detail: {
                property: 'quryString',
                oldValue: oldValue,
                newValue: newValue
            },
            bubbles: true,
            composed: true
        }));
    }
    // METHOD(S)
    // -- LIFE CYCLE --
    connectedCallback() {
        this.#render();
        if (this.#eventListeners !== undefined) for(const event in this.#eventListeners)this.addEventListener(event, this.#eventListeners[event]);
        this.#mutationObserverObserve();
    }
    disconnectedCallback() {
        if (this.#eventListeners !== undefined) for(const event in this.#eventListeners)this.removeEventListener(event, this.#eventListeners[event]);
        this.#mutationObserverDisconnect();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'querystring':
                this.queryString = newValue;
                break;
        }
    }
}
// == DEFINE ==
customElements.define('nav-view', $b437b2d56458af84$var$NavView);


const $4668f03064cd1df8$var$HOME_HASH = '#/';
document.addEventListener('DOMContentLoaded', ()=>{
    (0, $5002f5814ed49d1e$export$2e2bcd8739ae039)('PARCEL');
    let lastHash = null;
    (0, $4ab8f59ef703d096$export$2e2bcd8739ae039).route = function(data, event) {
        const hash = window.location.hash;
        if (lastHash === hash) return;
        // NO HASH CHECK
        if (hash[0] !== '#') return void (0, $4ab8f59ef703d096$export$2e2bcd8739ae039).replaceState(null, $4668f03064cd1df8$var$HOME_HASH);
        // BOOKMARK CHECK
        if (hash[1] !== '/') {
            if (lastHash === null) return void (0, $4ab8f59ef703d096$export$2e2bcd8739ae039).pushState(null, $4668f03064cd1df8$var$HOME_HASH);
            return void (0, $4ab8f59ef703d096$export$2e2bcd8739ae039).replaceState(null, lastHash, false);
        }
        lastHash = hash;
        let match = null;
        switch(true){
            case !!(match = (0, $5ebb74ebe14320a0$export$2e2bcd8739ae039)('#/', hash)):
                console.group('HOME');
                console.log('MATCH', match);
                console.groupEnd();
                break;
            case !!(match = (0, $5ebb74ebe14320a0$export$2e2bcd8739ae039)('#/page/**/:subpage/', hash) ?? (0, $5ebb74ebe14320a0$export$2e2bcd8739ae039)('#/page/', hash)):
                console.group('PAGE');
                console.log('MATCH', match);
                console.groupEnd();
                break;
            case !!(match = (0, $5ebb74ebe14320a0$export$2e2bcd8739ae039)('#/redirect/', hash)):
                console.group('REDIRECT');
                console.log('MATCH', match);
                console.groupEnd();
                (0, $4ab8f59ef703d096$export$2e2bcd8739ae039).replaceState(null, '#/page/redirect/redirectpage/');
                break;
            default:
                console.log('404');
        }
    };
    (0, $4ab8f59ef703d096$export$2e2bcd8739ae039).start();
});


//# sourceMappingURL=parcel.6e2dd0cb.js.map
