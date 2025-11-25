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


// == CLASS(ES) ==
class $6ae8b961d39fff66$export$fe041921479917d2 {
    // -- STATIC --
    // -- PRIVATE --
    // -- PROTECTED --
    // PROPERTY(IES)
    _eventTarget;
    // -- PUBLIC --
    // METHOD(S)
    dispatchPropertChangeEvent(property, oldValue, newValue) {
        this._eventTarget.dispatchEvent(new CustomEvent('propertychange', {
            detail: {
                property: property,
                oldValue: oldValue,
                newValue: newValue
            },
            bubbles: true,
            composed: true
        }));
    }
    // -- LIFE CYCLE --
    constructor(target, eventListeners = {}){
        this._eventTarget = target;
    }
}
class $6ae8b961d39fff66$export$cc74486daaaef499 extends $6ae8b961d39fff66$export$fe041921479917d2 {
    // -- STATIC --
    // -- PRIVATE --
    // PROPERTY(IES)
    #eventListeners;
    // -- PROTECTED --
    // -- PUBLIC --
    // METHOD(S)
    eventListenersAdd() {
        for(const event in this.#eventListeners)this._eventTarget.addEventListener(event, this.#eventListeners[event]);
    }
    eventListenersRemove() {
        for(const event in this.#eventListeners)this._eventTarget.removeEventListener(event, this.#eventListeners[event]);
    }
    // -- LIFE CYCLE --
    constructor(target, eventListeners = {}){
        super(target);
        this.#eventListeners = eventListeners;
    }
}


class $335e71fd185743ca$export$e2fb22396d3bf4b8 extends (0, $6ae8b961d39fff66$export$cc74486daaaef499) {
    // -- STATIC --
    // METHOD(S)
    static makeInnerContent() {
        const innerContent = document.createElement('div');
        innerContent.setAttribute('data-inner-content', '');
        return innerContent;
    }
    // -- PRIVATE --
    // PROPERTY(IES)
    #isObservingMutation = false;
    #mutationObserver;
    // -- PROTECTED --
    // -- PUBLIC --
    // METHOD(S)
    mutationObserverDisconnect() {
        if (!this.#isObservingMutation) return;
        this.#mutationObserver.disconnect();
        this.#isObservingMutation = false;
    }
    mutationObserverObserve() {
        if (this.#isObservingMutation) return;
        this.#mutationObserver.observe(this._eventTarget, {
            childList: true
        });
        this.#isObservingMutation = true;
    }
    withMutationObserverSuspended(render) {
        const wasMutationObserverObserving = this.#isObservingMutation;
        if (wasMutationObserverObserving) this.mutationObserverDisconnect();
        try {
            render();
        } finally{
            if (wasMutationObserverObserving) this.mutationObserverObserve();
        }
    }
    // -- LIFE CYCLE --
    constructor(view, mutationCallback, eventListeners){
        super(view, eventListeners);
        this.#mutationObserver = new MutationObserver(mutationCallback);
    }
}


// == TEMPLATE ==
const $11b622fb4689b277$var$templateEl = document.createElement('template');
$11b622fb4689b277$var$templateEl.innerHTML = `
	<h1>Home</h1>
	<p>Welcome to the home page!</p>
`;
// == CLASS(ES) ==
class $11b622fb4689b277$var$HomeView extends HTMLElement {
    // -- STATIC --
    // -- PRIVATE --
    // PROPERTY(IES)
    #innerContent;
    #viewManager;
    // METHOD(S)
    #render() {
        this.#viewManager.withMutationObserverSuspended(()=>{
            this.#innerContent.replaceChildren($11b622fb4689b277$var$templateEl.content.cloneNode(true));
            this.replaceChildren(this.#innerContent);
        });
    }
    // -- PROTECTED --
    // -- PUBLIC --
    // -- LIFE CYCLE --
    constructor(){
        super();
        this.#innerContent = (0, $335e71fd185743ca$export$e2fb22396d3bf4b8).makeInnerContent();
        const mutationCallback = ()=>{
            this.#render();
        };
        this.#viewManager = new (0, $335e71fd185743ca$export$e2fb22396d3bf4b8)(this, mutationCallback);
    }
    connectedCallback() {
        this.#render();
        this.#viewManager.mutationObserverObserve();
    }
    disconnectedCallback() {
        this.#viewManager.mutationObserverDisconnect();
    }
}
// == DEFINE ==
customElements.define('home-view', $11b622fb4689b277$var$HomeView);



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
// == CLASS(ES) ==
class $b437b2d56458af84$var$NavView extends HTMLElement {
    // -- STATIC --
    // PROPERTY(IES)
    static observedAttributes = [
        'querystring'
    ];
    // -- PRIVATE --
    // PROPERTY(IES)
    #hasRendered = false;
    #innerContent;
    #queryString = null;
    #viewManager;
    // METHOD(S)
    #render() {
        this.#viewManager.withMutationObserverSuspended(()=>{
            this.#innerContent.replaceChildren($b437b2d56458af84$var$templateEl.content.cloneNode(true));
            this.#hasRendered = true;
            this.#renderQueryString();
            this.replaceChildren(this.#innerContent);
        });
    }
    #renderQueryString() {
        if (!this.#hasRendered) return;
        this.#viewManager.withMutationObserverSuspended(()=>{
            for (const link of Array.from(this.#innerContent.querySelectorAll('a'))){
                const [base] = link.href.split('?');
                link.href = this.#queryString === null ? base : `${base}?${this.#queryString}`;
            }
        });
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
        this.#viewManager.dispatchPropertChangeEvent('quryString', oldValue, newValue);
    }
    // METHOD(S)
    // -- LIFE CYCLE --
    constructor(){
        super();
        this.#innerContent = (0, $335e71fd185743ca$export$e2fb22396d3bf4b8).makeInnerContent();
        const mutationCallback = ()=>{
            this.#render();
        };
        const eventListeners = {
            'click': (event)=>{
                console.log('CLICK', event);
            }
        };
        this.#viewManager = new (0, $335e71fd185743ca$export$e2fb22396d3bf4b8)(this, mutationCallback, eventListeners);
    }
    connectedCallback() {
        this.#render();
        this.#viewManager.eventListenersAdd();
        this.#viewManager.mutationObserverObserve();
    }
    disconnectedCallback() {
        this.#viewManager.eventListenersRemove();
        this.#viewManager.mutationObserverDisconnect();
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



// == TEMPLATE ==
const $5ef17b0bd6e306c9$var$templateEl = document.createElement('template');
$5ef17b0bd6e306c9$var$templateEl.innerHTML = `
	<h1>Page Not Found (404 Error)</h1>
	<p>Oops! It looks like you've taken a wrong turn, or the page you're looking for doesn't exist anymore.</p>
	<p>We're sorry for the inconvenience.</p>
`;
// == CLASS(ES) ==
class $5ef17b0bd6e306c9$var$NotFoundView extends HTMLElement {
    // -- STATIC --
    // -- PRIVATE --
    // PROPERTY(IES)
    #innerContent;
    #viewManager;
    // METHOD(S)
    #render() {
        this.#viewManager.withMutationObserverSuspended(()=>{
            this.#innerContent.replaceChildren($5ef17b0bd6e306c9$var$templateEl.content.cloneNode(true));
            this.replaceChildren(this.#innerContent);
        });
    }
    // -- PROTECTED --
    // -- PUBLIC --
    // -- LIFE CYCLE --
    constructor(){
        super();
        this.#innerContent = (0, $335e71fd185743ca$export$e2fb22396d3bf4b8).makeInnerContent();
        const mutationCallback = ()=>{
            this.#render();
        };
        this.#viewManager = new (0, $335e71fd185743ca$export$e2fb22396d3bf4b8)(this, mutationCallback);
    }
    connectedCallback() {
        this.#render();
        this.#viewManager.mutationObserverObserve();
    }
    disconnectedCallback() {
        this.#viewManager.mutationObserverDisconnect();
    }
}
// == DEFINE ==
customElements.define('not-found-view', $5ef17b0bd6e306c9$var$NotFoundView);



// == TEMPLATE ==
const $89eaa1d27997a485$var$templateEl = document.createElement('template');
$89eaa1d27997a485$var$templateEl.innerHTML = `
	<h1>Page</h1>
	<div data-sub-title></div>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque fugiat blanditiis commodi ab delectus sit eius quod iste eum nostrum, officia deserunt nesciunt praesentium voluptatem porro cum nam libero quo!</p>
`;
class $89eaa1d27997a485$export$2e2bcd8739ae039 extends HTMLElement {
    // -- STATIC --
    // PROPERTY(IES)
    static observedAttributes = [
        'subtitle'
    ];
    // -- PRIVATE --
    // PROPERTY(IES)
    #hasRendered = false;
    #innerContent;
    #subTitle = null;
    #viewManager;
    // METHOD(S)
    #render() {
        this.#viewManager.withMutationObserverSuspended(()=>{
            this.#innerContent.replaceChildren($89eaa1d27997a485$var$templateEl.content.cloneNode(true));
            this.#hasRendered = true;
            this.#renderSubString();
            this.replaceChildren(this.#innerContent);
        });
    }
    #renderSubString() {
        if (!this.#hasRendered) return;
        this.#viewManager.withMutationObserverSuspended(()=>{
            this.#innerContent.querySelector('[data-sub-title]').innerHTML = this.#subTitle === null ? '' : `<h2 class="h5">${this.#subTitle}</h2>`;
        });
    }
    // -- PROTECTED --
    // -- PUBLIC --
    // GETTER(S) & SETTER(S)
    get subTitle() {
        return this.#subTitle;
    }
    set subTitle(newValue) {
        const oldValue = this.#subTitle;
        if (oldValue === newValue) return;
        this.#subTitle = newValue;
        this.#renderSubString();
        this.#viewManager.dispatchPropertChangeEvent('subTitle', oldValue, newValue);
    }
    // -- LIFE CYCLE --
    constructor(){
        super();
        this.#innerContent = (0, $335e71fd185743ca$export$e2fb22396d3bf4b8).makeInnerContent();
        const mutationCallback = ()=>{
            this.#render();
        };
        this.#viewManager = new (0, $335e71fd185743ca$export$e2fb22396d3bf4b8)(this, mutationCallback);
    }
    connectedCallback() {
        this.#render();
        this.#viewManager.mutationObserverObserve();
    }
    disconnectedCallback() {
        this.#viewManager.mutationObserverDisconnect();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'subtitle':
                this.subTitle = newValue;
                break;
        }
    }
}
// == DEFINE ==
customElements.define('page-view', $89eaa1d27997a485$export$2e2bcd8739ae039);


function $6e938b508eb919ab$export$2e2bcd8739ae039(view, model) {
    if (!(view instanceof (0, $89eaa1d27997a485$export$2e2bcd8739ae039))) throw new Error('Invalid view type');
    const viewPropertyChangeListener = (event)=>{
        if (!(event instanceof CustomEvent) || event.detail.property !== 'subTitle' || typeof event.detail.newValue !== 'string' && event.detail.newValue !== null) return;
        model.subTitle = event.detail.newValue;
    };
    view.addEventListener('propertychange', viewPropertyChangeListener);
    const modelPropertyChangeListener = (event)=>{
        if (!(event instanceof CustomEvent) || event.detail.property !== 'subTitle' || typeof event.detail.newValue !== 'string' && event.detail.newValue !== null) return;
        view.subTitle = event.detail.newValue;
    };
    model.addEventListener('propertychange', modelPropertyChangeListener);
    view.subTitle = model.subTitle;
    return function unbind() {
        view.addEventListener('propertychange', viewPropertyChangeListener);
        model.addEventListener('propertychange', modelPropertyChangeListener);
    };
}




class $3d9e91a1fc6bd0f4$export$2e2bcd8739ae039 extends EventTarget {
    // -- STATIC --
    // -- PRIVATE --
    // PROPERTY(IES)
    #propertyChangeDispatcher;
    #subTitle = null;
    // -- PROTECTED --
    // -- PUBLIC --
    // GETTER(S) & SETTER(S)
    get subTitle() {
        return this.#subTitle;
    }
    set subTitle(newValue) {
        const oldValue = this.#subTitle;
        if (oldValue === newValue) return;
        this.#subTitle = newValue;
        this.#propertyChangeDispatcher.dispatchPropertChangeEvent('subTitle', oldValue, newValue);
    }
    // -- LIFE CYCLE --
    constructor(data = {
        subTitle: null
    }){
        super();
        this.#propertyChangeDispatcher = new (0, $6ae8b961d39fff66$export$fe041921479917d2)(this);
        const { subTitle: subTitle } = data;
        this.subTitle = subTitle;
    }
}


const $4668f03064cd1df8$var$HOME_HASH = '#/';
document.addEventListener('DOMContentLoaded', ()=>{
    (0, $5002f5814ed49d1e$export$2e2bcd8739ae039)('PARCEL');
    const container = document.getElementById('app');
    let lastHash = null;
    let unbind = null;
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
            case (match = (0, $5ebb74ebe14320a0$export$2e2bcd8739ae039)('#/', hash)) !== null:
                unbind?.();
                container?.replaceChildren(document.createElement('home-view'));
                break;
            case (match = (0, $5ebb74ebe14320a0$export$2e2bcd8739ae039)('#/page/**/:subpage/', hash) ?? (0, $5ebb74ebe14320a0$export$2e2bcd8739ae039)('#/page/', hash)) !== null:
                const routeMatch = match;
                unbind?.();
                const view = document.createElement('page-view');
                unbind = (0, $6e938b508eb919ab$export$2e2bcd8739ae039)(view, new (0, $3d9e91a1fc6bd0f4$export$2e2bcd8739ae039)({
                    subTitle: routeMatch.data.subpage ?? null
                }));
                container?.replaceChildren(view);
                break;
            case (match = (0, $5ebb74ebe14320a0$export$2e2bcd8739ae039)('#/redirect/', hash)) !== null:
                (0, $4ab8f59ef703d096$export$2e2bcd8739ae039).replaceState(null, '#/page/redirect/redirectpage/');
                break;
            default:
                unbind?.();
                container?.replaceChildren(document.createElement('not-found-view'));
        }
    };
    (0, $4ab8f59ef703d096$export$2e2bcd8739ae039).start();
});


//# sourceMappingURL=parcel.0a50e38f.js.map
