import logoURL from "../assets/images/logo.png";
import backwardIconURL from "../assets/icons/backward.svg";
import forwardIconURL from "../assets/icons/forward.svg";

import Artplayer from "artplayer";
import { config, instances } from "../misc/state";
import { getSvgMarkupFromDataUrl } from "../misc/getSvgMarkupFromDataUrl";

export function createPlayer(playlistUrl: string | URL = "") {
    return new Artplayer({
        container: ".cuki-player-container",
        url: (playlistUrl === "") ? "" : new URL(playlistUrl).href,
        autoplay: true,
        autoSize: false,
        loop: false,
        mutex: true,
        setting: true,
        pip: true,
        flip: false,
        lock: true,
        fastForward: true,
        playbackRate: true,
        theme: "#ff0057",
        fullscreen: true,
        fullscreenWeb: false,
        miniProgressBar: true,
        autoOrientation: true,
        airplay: false,
        lang: "vi",
        i18n: {
            en: {},
            "zh-cn": {},
            "zh-tw": {},
            pl: {},
            cs: {},
            es: {},
            fa: {},
            fr: {},
            id: {},
            ru: {},
            tr: {},
            ar: {},
            vi: {
                "Video Info": "Thông tin video",
                "Close": "Đóng",
                "Video Load Failed": "Tải video thất bại",
                "Volume": "Âm lượng",
                "Play": "Phát",
                "Pause": "Tạm dừng",
                "Rate": "Tốc độ",
                "Mute": "Tắt tiếng",
                "Video Flip": "Lật video",
                "Horizontal": "Ngang",
                "Vertical": "Dọc",
                "Reconnect": "Kết nối lại",
                "Show Setting": "Cài đặt",
                "Hide Setting": "Ẩn cài đặt",
                "Screenshot": "Chụp màn hình",
                "Play Speed": "Tốc độ phát",
                "Aspect Ratio": "Tỷ lệ khung hình",
                "Default": "Mặc định",
                "Normal": "Bình thường",
                "Open": "Mở",
                "Switch Video": "Chuyển video",
                "Switch Subtitle": "Chuyển phụ đề",
                "Fullscreen": "Toàn màn hình",
                "Exit Fullscreen": "Thoát toàn màn hình",
                "Web Fullscreen": "Toàn màn hình trình duyệt",
                "Exit Web Fullscreen": "Thoát toàn màn hình trình duyệt",
                "Mini Player": "Trình phát mini",
                "PIP Mode": "Phát trong hình",
                "Exit PIP Mode": "Thoát phát trong hình",
                "PIP Not Supported": "Không hỗ trợ phát trong hình",
                "Fullscreen Not Supported": "Không hỗ trợ toàn màn hình",
                "Subtitle Offset": "Độ trễ phụ đề",
                "Last Seen": "Lần xem cuối",
                "Jump Play": "Nhảy đến đoạn phát",
                "AirPlay": "Phát qua AirPlay",
                "AirPlay Not Available": "AirPlay không khả dụng",
            },
        },
        controls: [
            {
                position: "left",
                name: "fast-rewind",
                index: 10,
                html: getSvgMarkupFromDataUrl(backwardIconURL),
                tooltip: "10 giây trước",
                click: function () {
                    if (instances.player) {
                        instances.player.seek = this.currentTime - 10;
                    }
                },
            },
            {
                position: "left",
                name: "fast-forward",
                index: 11,
                html: getSvgMarkupFromDataUrl(forwardIconURL),
                tooltip: "10 giây sau",
                click: function () {
                    if (instances.player) {
                        instances.player.seek = this.currentTime + 10;
                    }
                },
            },
            {
                position: "right",
                html:
                    `<img src="${logoURL}" style="height: 25px; padding: 0 7px; transform: translateY(-12%);">`,
                index: 1,
                tooltip: config.name,
            },
        ],
    });
}
