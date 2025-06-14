import { unrestrictedFetch } from "../network";

export async function getPlaylistURL(embedUrl: string | URL) {
    // Parse the input URL
    embedUrl = new URL(embedUrl);

    // kkphim
    if (embedUrl.hostname.includes("phimapi") && embedUrl.searchParams.has("url")) {
        return embedUrl.searchParams.get("url") ?? "";
    }

    // ophim
    if (embedUrl.hostname.includes("opstream")) {
        const req = await fetch(embedUrl);
        const raw = await req.text();

        const playlistUrl = raw.match(/(?<=const url = ").*(?=";)/)?.[0];
        return URL.parse(String(playlistUrl), embedUrl)?.href || "";
    }

    // nguonc
    if (embedUrl.hostname.includes("streamc")) {
        const req = await unrestrictedFetch(embedUrl, {
            headers: {
                Referer: embedUrl.origin,
            },
        });

        const raw = await req.text();

        const encryptedURL = raw.match(/(?<=encryptedURL = ").*(?=";)/)?.[0];
        const playlistUrl = `conf.php?url=${encodeURIComponent(String(encryptedURL))}`
        return URL.parse(playlistUrl, embedUrl)?.href || "";
    }

    // For other cases, return the original embed URL
    return embedUrl.href;
}
