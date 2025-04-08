export function addStyle(css: string) {
    const parent: ParentNode = document.head ?? document.querySelector("html");

    const style = document.createElement("style");
    style.textContent = css;
    parent.appendChild(style);

    return style;
}
