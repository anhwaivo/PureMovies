export interface Offset {
    top?: number;
    bottom?: number;
}

export function scrollIntoView(element: Element, offset: Offset = {}) {
    if (!element) {
        console.warn("scrollIntoView called with no element.");
        return;
    }

    const rect = element.getBoundingClientRect();

    offset = { ...offset };
    offset.top ??= 0;
    offset.bottom ??= window.innerHeight - rect.height;

    const boundary = {
        top: offset.top,
        bottom: window.innerHeight - offset.bottom,
    };

    let scrollDelta = 0;

    if (rect.top < boundary.top) {
        scrollDelta = rect.top - boundary.top;
    } else if (rect.bottom > boundary.bottom) {
        scrollDelta = rect.bottom - boundary.bottom;
    }

    window.scrollTo({
        top: window.pageYOffset + scrollDelta,
        behavior: "smooth",
    });
}
