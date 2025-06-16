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

    if (embedUrl.hostname.includes("streamc")) {
        const req = await unrestrictedFetch(embedUrl, {
            headers: {
                Referer: embedUrl.origin,
            },
        });

        const raw = await req.text();

        // Extract the encrypted URL from the raw response
        const encryptedURL = raw.match(/(?<=encryptedURL = ").*(?=";)/)?.[0];
        if (encryptedURL) {
            const playlistUrl = `conf.php?url=${encodeURIComponent(encryptedURL)}`;
            return URL.parse(playlistUrl, embedUrl)?.href || "";
        }

        // If no encrypted URL is found, try to find the stream URL
        const streamURL = raw.match(/(?<=(?:streamURL =|url =|file:) ").*(?="(?:;|,))/)?.[0];
        if (streamURL) {
            const playlistUrl = JSON.parse(`"${streamURL}"`);
            return URL.parse(playlistUrl, embedUrl)?.href || "";
        }

        // If all above fails, return the embed URL with "get.php" instead of "embed.php"
        return embedUrl.href.replace("embed.php", "get.php");
    }

    // For other cases, return the original embed URL
    return embedUrl.href;
}
