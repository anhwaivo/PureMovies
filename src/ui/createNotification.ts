import infoIconURL from "../assets/icons/info.svg";

import { Notyf } from "notyf";
import { elements } from "../misc/state";
import { waitForElement } from ".";
import { getSvgMarkupFromDataUrl } from "../misc/getSvgMarkupFromDataUrl";

export async function createNotification() {
    elements.body ??= await waitForElement<HTMLBodyElement>("body");

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
        ],
    });
}
