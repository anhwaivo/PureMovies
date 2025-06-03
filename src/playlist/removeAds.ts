import { caches, config } from "../misc/state";
import { unrestrictedFetch } from "../network";
import { injectReportButton } from "../ui";
import { getExceptionDuration, getTotalDuration, isContainAds } from ".";

export async function removeAds(playlistUrl: string | URL) {
    // Parse the input URL
    playlistUrl = new URL(playlistUrl);

    // Check if its blob representation is already cached
    if (caches.blob[playlistUrl.href]) {
        return caches.blob[playlistUrl.href];
    }

    const isNoNeedToBypass = config.domainBypassWhitelist.some((keyword) =>
        playlistUrl.hostname.includes(keyword)
    );

    // Fetch the content of the URL
    let req = isNoNeedToBypass
        ? await fetch(playlistUrl)
        : await unrestrictedFetch(playlistUrl, {
            headers: {
                Referer: playlistUrl.origin,
            },
        });

    let playlist = await req.text();

    // Adjust relative paths in the playlist by converting them to absolute URLs
    playlist = playlist.replace(
        /^[^#].*$/gm,
        (line) => URL.parse(line, playlistUrl)?.toString?.() ?? line,
    );

    // If the content is a master playlist, recursively process its last URI
    if (playlist.includes("#EXT-X-STREAM-INF")) {
        caches.blob[playlistUrl.href] = await removeAds(
            playlist.trim().split("\n").slice(-1)[0],
        );
        return caches.blob[playlistUrl.href];
    }

    if (config.debug) {
        // Remove all except ads
        playlist = [
            ...playlist.split("\n").slice(0, 5),
            ...config.adsRegexList.reduce<string[]>((arr, regex) => {
                return [
                    ...arr,
                    ...(playlist.match(regex) ?? []),
                ];
            }, []),
            ...playlist.split("\n").slice(-2),
        ].join("\n") || "";
    } else if (isContainAds(playlist)) {
        // Remove ads
        playlist = config.adsRegexList.reduce((playlist, regex) => {
            return playlist.replaceAll(regex, "");
        }, playlist);
    } else if (getTotalDuration(playlist) > getExceptionDuration()) {
        // Show report button in player
        injectReportButton(playlistUrl);
        console.error("Không tìm thấy quảng cáo");
    }

    // Convert the playlist to blob URL and cache it
    caches.blob[playlistUrl.href] = URL.createObjectURL(
        new Blob([playlist], {
            type: req.headers.get("Content-Type") ?? "text/plain",
        }),
    );

    return caches.blob[playlistUrl.href];
}
