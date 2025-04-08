import { config } from "../misc/state";

export function isContainAds(playlist: string) {
    return config.adsRegexList.some((regex) => regex.test(playlist));
}
