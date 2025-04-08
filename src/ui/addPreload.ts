export interface PreloadOption {
    href: string;
    as: string;
    type?: string;
    crossorigin?: string;
    media?: string;
}

export function addPreload(option: PreloadOption) {
    const link = document.createElement("link");

    Object.assign(link, {
        rel: "preload",
        ...option,
    } as HTMLLinkElement);

    const parent: ParentNode = document.head ?? document.querySelector("html");
    parent.appendChild(link);

    return link;
}
