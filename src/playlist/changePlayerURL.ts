import Hls from "hls.js";
import { createPlayer, getPlaylistURL, removeAds } from ".";
import { instances } from "../misc/state";
import { unrestrictedFetch } from "../network";

const originalFetch = window.fetch;

window.fetch = function (...args) {
    if (
        new Error().stack?.includes("loadSource") ||
        new Error().stack?.includes("loadFragment")
    ) {
        return unrestrictedFetch(...args);
    }
    return originalFetch(...args);
};

export async function changePlayerURL(embedUrl: string | URL) {
    instances.player?.destroy();
    instances.player = createPlayer();

    let playlistUrl = await getPlaylistURL(embedUrl);
    playlistUrl = await removeAds(playlistUrl);

    // Change url
    if (Hls.isSupported()) {
        const hls = new Hls({
            progressive: true,
            fetchSetup: function (context, initParams) {
                const url = `${context.url}#|Referer=${embedUrl}`;
                return new Request(url, initParams);
            },
        });

        hls.loadSource(playlistUrl);
        hls.attachMedia(instances.player.video);

        instances.player.hls = hls;
        instances.player.on("destroy", () => hls.destroy());
    } else if (
        instances.player.video.canPlayType("application/vnd.apple.mpegurl")
    ) {
        instances.player.video.src = playlistUrl;
    }

    // Play video
    instances.player.play();
}
