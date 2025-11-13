declare const Router: {
    route(data: any, event?: PopStateEvent): any;
    start(trigger?: boolean): void;
    pushState(data: any, url?: string | URL | null, trigger?: boolean): void;
    replaceState(data: any, url?: string | URL | null, trigger?: boolean): void;
    stop(): void;
};
export default Router;
