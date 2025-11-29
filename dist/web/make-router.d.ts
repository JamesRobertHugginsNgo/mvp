export interface Route {
    (data: any, event?: PopStateEvent): any;
}
export interface Router {
    popStateEventListener: (event: PopStateEvent) => any;
    hasStarted: boolean;
    start(trigger?: boolean): Router;
    stop(): Router;
    pushState(data: any, url?: string | URL | null, trigger?: boolean): Router;
    replaceState(data: any, url?: string | URL | null, trigger?: boolean): Router;
}
export default function makeRouter(route: Route): Router;
