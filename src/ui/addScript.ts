export function addScript(...urls: (string | URL)[]) {
    const parent: ParentNode = document.head ?? document.querySelector("html");

    urls.forEach((url) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = new URL(url).href;
        parent.appendChild(script);
    });
}
