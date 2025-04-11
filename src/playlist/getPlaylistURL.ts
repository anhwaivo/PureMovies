export async function getPlaylistURL(embedUrl: string | URL) {
    // Parse the input URL
    embedUrl = new URL(embedUrl);

    if (embedUrl.hostname.includes("phimapi")) {
        return embedUrl.searchParams.get("url") ?? "";
    }

    if (embedUrl.hostname.includes("opstream")) {
        const req = await fetch(embedUrl);
        const raw = await req.text();

        const playlistUrl = raw.match(/(?<=const url = ").*(?=";)/)?.[0];
        return URL.parse(String(playlistUrl), embedUrl)?.href || "";
    }

    if (embedUrl.hostname.includes("streamc")) {
        return embedUrl.toString().replace("embed.php", "get.php");
    }

    return embedUrl.href;
}
