export function isHostnameContains(...keywords: string[]) {
    return keywords.some((keyword) => location.hostname.includes(keyword));
}
