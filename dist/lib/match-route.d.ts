export type MatchRouteResult = {
    data: Record<string, string>;
    query: string;
} | null;
export default function matchRoute(pattern: string, fullPath: string): MatchRouteResult;
