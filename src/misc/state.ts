import { GM_info } from "$";
import type { GmInfoScriptType } from "$";
import type { Notyf } from "notyf";
import type Artplayer from "artplayer";

interface ExtraConfig {
    betWarning: string;
    debug: boolean;
    flash: boolean;
    adsRegexList: RegExp[];
}

export const config: GmInfoScriptType & ExtraConfig = {
    ...GM_info.script,

    betWarning:
        "Hành vi cá cược, cờ bạc online <b>LÀ VI PHẠM PHÁP LUẬT</b><br>theo Điều 321 Bộ luật Hình sự 2015 (sửa đổi, bổ sung 2017)",
    debug: false,
    flash: false,
    adsRegexList: [
        /(?<!#EXT-X-DISCONTINUITY[\s\S]*)#EXT-X-DISCONTINUITY\n(?:.*?\n){20}#EXT-X-DISCONTINUITY\n(?![\s\S]*#EXT-X-DISCONTINUITY)/g,
        /#EXT-X-DISCONTINUITY\n(?:#EXTINF:(?:2.00|2.00|2.34|2.66|2.00|2.38|2.00|0.78|1.96)0000,\n.*\n){9}#EXT-X-DISCONTINUITY\n(?:#EXTINF:(?:2.00|2.74|2.22|2.00|1.36|2.00|2.00|0.72)0000,\n.*\n){8}(?=#EXT-X-DISCONTINUITY)/g,
    ],
};

export const caches = {
    url: {} as Record<string, string>,
    blob: {} as Record<string, string>,
};

export const elements = {
    body: null as HTMLBodyElement | null,
    playerContainer: null as HTMLDivElement | null,
    currentEpisode: null as HTMLAnchorElement | null,
    dcmaTroll: null as HTMLImageElement | null,
    credit: null as HTMLParagraphElement | null,
};

export const instances = {
    notification: null as Notyf | null,
    player: null as Artplayer | null,
};
