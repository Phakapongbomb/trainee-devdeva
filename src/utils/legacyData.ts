export interface LegacyProject {
    id?: string;
    name?: string;
}

export const isLegacyProject = (p: unknown): p is LegacyProject => {
    return typeof p === 'object' && p !== null && ('id' in p || 'name' in p);
};

export const resolveProjectName = (p: unknown, fallback = 'Unknown Project'): string => {
    if (typeof p === 'string') return p;
    if (isLegacyProject(p)) return p.name || p.id || fallback;
    return fallback;
};
