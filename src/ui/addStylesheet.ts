export function addStylesheet(...urls: (string | URL)[]) {
    const parent: ParentNode = document.head ?? document.querySelector("html");

    urls.forEach((url) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = new URL(url).href;
        parent.appendChild(link);
    });
}
