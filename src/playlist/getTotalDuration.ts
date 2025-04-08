export function getTotalDuration(playlist: string) {
    const matches = playlist.match(/#EXTINF:([\d.]+)/g) ?? [];

    return matches.reduce((sum, match) => {
        return sum + parseFloat(match.split(":")[1]);
    }, 0);
}
