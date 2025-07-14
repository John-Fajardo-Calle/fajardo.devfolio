export default function getAssetUrl(path) {
    if (!path) return path;
    if (/^(https?:)?\/\//.test(path)) {
        return path;
    }
    const base = import.meta.env.BASE_URL || '/';
    if (path.startsWith('/')) {
        return base + path.slice(1);
    }
    return base + path;
}