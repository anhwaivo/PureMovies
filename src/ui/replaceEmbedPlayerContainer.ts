import { changePlayerURL } from "../playlist";
import { waitForElement } from ".";

export async function replaceEmbedPlayerContainer() {
    // Create video container
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("cuki-player-container");

    Object.assign(playerContainer.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        maxHeight: "initial",
    } as CSSStyleDeclaration);

    const html = document.querySelector("html") as HTMLHtmlElement;
    Object.assign(html.style, {
        background: "black",
        width: "100%",
        height: "100%",
    } as CSSStyleDeclaration);

    // Add to HTML
    waitForElement("body").then((body) => {
        body.replaceChildren(playerContainer);
        changePlayerURL(location.href);
    });
}
