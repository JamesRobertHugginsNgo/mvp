export default function matchRoute(pattern, fullPath) {
    const patternSegments = pattern.split('/');
    const [path, query] = fullPath.split('?');
    const pathSegments = path.split('/');
    const match = matchSegments(patternSegments, pathSegments, false);
    if (match === null) {
        return null;
    }
    const { firstMatch } = match;
    if (firstMatch.index !== 0 || firstMatch.length !== pathSegments.length) {
        return null;
    }
    const { data } = firstMatch;
    return { data, query };
}
function matchSegments(patternSegments, pathSegments, greedy = true) {
    if (patternSegments.length === 0) {
        if (pathSegments.length === 0) {
            return {
                firstMatch: { index: 0, length: 0, data: {} },
                lastMatch: { index: 0, length: 0, data: {} },
            };
        }
        return null;
    }
    const patternSegment = patternSegments[0];
    const remainingPatternSegments = patternSegments.slice(1);
    const firstMatch = { index: -1, length: 0, data: {} };
    const lastMatch = { index: -1, length: 0, data: {} };
    for (let index = 0, length = pathSegments.length; index < length; index++) {
        const pathSegment = pathSegments[index];
        if (patternSegment !== '**' && patternSegment !== '*' && patternSegment[0] !== ':' && patternSegment !== pathSegment) {
            continue;
        }
        if (patternSegment === '**') {
            const remainingPathSegments = pathSegments.slice(index);
            const match = matchSegments(remainingPatternSegments, remainingPathSegments);
            if (match === null) {
                continue;
            }
            lastMatch.index = index;
            lastMatch.length = match.lastMatch.length + match.lastMatch.index;
            lastMatch.data = match.lastMatch.data;
            if (firstMatch.index === -1) {
                firstMatch.index = index;
                firstMatch.length = match.lastMatch.length + match.lastMatch.index;
                firstMatch.data = match.lastMatch.data;
                if (!greedy) {
                    return { firstMatch, lastMatch };
                }
            }
            continue;
        }
        const remainingPathSegments = pathSegments.slice(index + 1);
        const match = matchSegments(remainingPatternSegments, remainingPathSegments, false);
        if (match === null) {
            continue;
        }
        if (match.firstMatch.index !== 0) {
            continue;
        }
        const data = {};
        if (patternSegment[0] === ':') {
            const key = patternSegment.slice(1);
            data[key] = pathSegment;
        }
        lastMatch.index = index;
        lastMatch.length = match.firstMatch.length + 1;
        lastMatch.data = { ...data, ...match.firstMatch.data };
        if (firstMatch.index === -1) {
            firstMatch.index = index;
            firstMatch.length = match.firstMatch.length + 1;
            firstMatch.data = { ...data, ...match.firstMatch.data };
            if (!greedy) {
                return { firstMatch, lastMatch };
            }
        }
    }
    if (firstMatch.index === -1) {
        return null;
    }
    return { firstMatch, lastMatch };
}
//# sourceMappingURL=match-route.js.map