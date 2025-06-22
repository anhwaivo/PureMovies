export async function remoteImport(scriptURL: string | URL): Promise<any> {
    try {
        scriptURL = new URL(scriptURL);

        const response = await fetch(scriptURL);
        if (!response.ok) {
            throw new Error(`Failed to load script: ${scriptURL.href}`);
        }

        const scriptContent = (await response.text())
            .split("\n")
            .filter((line) => !line.startsWith("//")) // Remove comments
            .join("\n")
            .replaceAll("console.log", "(()=>{})"); // Suppress console.log

        const fn = new Function("window", scriptContent + "; return window;");
        return fn(window);
    } catch (error) {
        console.error(error);
    }
}
