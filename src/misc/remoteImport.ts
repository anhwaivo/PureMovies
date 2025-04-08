export async function remoteImport(scriptURL: string | URL) {
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

        // Run script
        eval(scriptContent);
    } catch (error) {
        console.error(error);
    }
}
