export async function convertToDataUrl(url: string | URL) {
    url = new URL(url);
    if (url.protocol === "data:") {
        return Promise.resolve(url.href);
    }

    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
    });
}
