// @ts-ignore: Dynamic import
import Hls from "hls.js";
import { createPlayer, getPlaylistURL, removeAds } from ".";
import { instances } from "../misc/state";
import { unrestrictedFetch } from "../network";
import { remoteImport } from "../misc/remoteImport";
import { createNotification } from "../ui";

const originalFetch = window.fetch;

window.fetch = function (input, init) {
    // const url = (input as Request).url ?? (input as URL).href ?? input;
    // const hostname = new URL(url).hostname;

    // const isNeedToBypass = config.domainBypassWhitelist.every((keyword) =>
    //     hostname.includes(keyword) === false
    // );

    const isUsingByHls = ["loadSource", "loadFragment"].some((functionName) =>
        new Error().stack?.includes(functionName)
    );

    if (isUsingByHls) {
        return unrestrictedFetch(input, init);
    }

    return originalFetch(input, init);
};

export async function changePlayerURL(embedUrl: string | URL) {
    instances.player?.destroy();
    instances.player = await createPlayer();

    let playlistUrl = await getPlaylistURL(embedUrl);
    playlistUrl = await removeAds(playlistUrl);

    try {
        if (!Hls) throw "";
    } catch (e) {
        console.warn("Hls not found. Run workaround...");
        instances.notification ??= await createNotification();

        instances.notification?.open({
            type: "warning",
            message: "Hls not found. Run workaround...",
        });

        const imported = await remoteImport(
            "https://cdn.jsdelivr.net/npm/hls.js"
        );
        // @ts-expect-error
        Hls = imported.Hls || window.Hls;
    }

    // Change url
    if (Hls.isSupported()) {
        const hls = new Hls({
            progressive: true,
            // @ts-ignore: Hls fetchSetup context/initParams types
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
