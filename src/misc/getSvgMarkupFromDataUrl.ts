/**
 * Extracts and decodes the SVG markup string from a 'data:image/svg+xml,...' URL.
 *
 * @param dataUrl - The SVG Data URL, provided as a string (e.g., "data:image/svg+xml,...")
 *                  or a URL object instance.
 * @returns The raw SVG markup as a string.
 */
export function getSvgMarkupFromDataUrl(dataUrl: string | URL): string {
    dataUrl = new URL(dataUrl).href;

    const prefix = "data:image/svg+xml,";
    if (!dataUrl.startsWith(prefix)) {
        throw `Format Error: URL string must start with '${prefix}'. Received: ${
            dataUrl.substring(0, 70) + (dataUrl.length > 70 ? "..." : "")
        }`;
    }

    const encodedSvgData = dataUrl.substring(prefix.length);

    try {
        const decodedSvgMarkup: string = decodeURIComponent(encodedSvgData);
        return decodedSvgMarkup;
    } catch (e) {
        if (e instanceof URIError) {
            throw `Decoding Error: Malformed URI sequence in SVG data. ${e}`;
        } else {
            throw `Decoding Error: An unexpected error occurred. ${e}`;
        }
    }
}
