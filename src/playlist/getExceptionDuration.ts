export function getExceptionDuration(url: string | URL) {
    url = new URL(url);

    if (["ophim", "opstream"].some((keyword) => url.hostname.includes(keyword))) {
        return 600;
    } else if (["nguonc", "streamc"].some((keyword) => url.hostname.includes(keyword))) {
        return +Infinity;
    } else {
        return 900;
    }
}
