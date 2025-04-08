import { config, elements } from "../misc/state";

export function injectCredit(element: Element | null) {
    // DCMA troll
    elements.dcmaTroll ??= (() => {
        const dcmaTroll = document.createElement("img");

        Object.assign(dcmaTroll, {
            className: "pt-2",
            alt: "DMCA troll",
            src: "https://images.dmca.com/Badges/dmca-badge-w150-5x1-01.png",
        } as Partial<typeof dcmaTroll>);

        return dcmaTroll;
    })();

    // Footer credit
    elements.credit ??= (() => {
        const credit = document.createElement("p");

        Object.assign(credit, {
            className: "pt-2",
            textContent:
                `${config.name} v${config.version} | Được viết bởi ${config.author}`,
        } as Partial<typeof credit>);

        return credit;
    })();

    element?.before(elements.dcmaTroll);
    element?.after(elements.credit);
}
