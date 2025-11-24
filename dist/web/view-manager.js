import { EventManager } from '../lib/event-manager.js';
// == CLASS(ES) ==
export class ViewManager extends EventManager {
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
        if (!this.#isObservingMutation) {
            return;
        }
        this.#mutationObserver.disconnect();
        this.#isObservingMutation = false;
    }
    mutationObserverObserve() {
        if (this.#isObservingMutation) {
            return;
        }
        this.#mutationObserver.observe(this._eventTarget, { childList: true });
        this.#isObservingMutation = true;
    }
    withMutationObserverSuspended(render) {
        const wasMutationObserverObserving = this.#isObservingMutation;
        if (wasMutationObserverObserving) {
            this.mutationObserverDisconnect();
        }
        try {
            render();
        }
        finally {
            if (wasMutationObserverObserving) {
                this.mutationObserverObserve();
            }
        }
    }
    // -- LIFE CYCLE --
    constructor(view, mutationCallback, eventListeners) {
        super(view, eventListeners);
        this.#mutationObserver = new MutationObserver(mutationCallback);
    }
}
//# sourceMappingURL=view-manager.js.map