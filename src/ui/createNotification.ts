// @ts-ignore: Dynamic import or asset
import infoIconURL from "../assets/icons/info.svg";
// @ts-ignore: Dynamic import or asset
import warningIconURL from "../assets/icons/warning.svg";
// @ts-ignore: Dynamic import
import { Notyf } from "notyf";
import { elements } from "../misc/state";
import { waitForElement } from ".";
import { getSvgMarkupFromDataUrl } from "../misc/getSvgMarkupFromDataUrl";
import { remoteImport } from "../misc/remoteImport";

export async function createNotification() {
    elements.body ??= await waitForElement<HTMLBodyElement>("body");

    try {
        if (!Notyf) throw "";
    } catch (e) {
        console.warn("Notyf not found. Run workaround...");

        const imported = await remoteImport(
            "https://cdn.jsdelivr.net/npm/notyf"
        );
        // @ts-expect-error
        Notyf = imported.Notyf || window.Notyf;
    }

    return new Notyf({
        duration: 7000,
        dismissible: true,
        position: {
            x: "right",
            y: "top",
        },
        types: [
            {
                type: "info",
                background: "#3b82f6",
                icon: getSvgMarkupFromDataUrl(infoIconURL),
            },
            {
                type: "warning",
                background: "#ffcc00",
                icon: getSvgMarkupFromDataUrl(warningIconURL),
            },
        ],
    });
}
