import { config } from "../misc/state";
import { unrestrictedFetch } from "../network";

export async function getPlaylistURL(embedUrl: string | URL) {
    // Parse the input URL
    embedUrl = new URL(embedUrl);

    if (embedUrl.hostname.includes("phimapi") && embedUrl.searchParams.has("url")) {
        return embedUrl.searchParams.get("url") ?? "";
    }

    const isNoNeedToBypass = config.domainBypassWhitelist.some((keyword) =>
        embedUrl.hostname.includes(keyword)
    );

    // Fetch the content of the URL
    const req = isNoNeedToBypass
        ? await fetch(embedUrl)
        : await unrestrictedFetch(embedUrl, {
            headers: {
                Referer: embedUrl.origin,
            },
        });

    const raw = await req.text();

    const playlistUrl = raw.match(/(?<=(?:url =|file:) ").*(?="(?:;|,))/)?.[0];
    return URL.parse(String(playlistUrl), embedUrl)?.href || "";
}
