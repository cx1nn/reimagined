const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
const bareUrl = (location.protocol === "https:" ? "https" : "http") + "://" + location.host + "/bare/";

// Set the default transport to "epoxy"
(async () => {
    await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
})();

// Allow pressing Enter to submit the form
document
    .getElementById("urlInput")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("searchButton").click();
        }
    });

document.getElementById("searchButton").onclick = async function (event) {
    event.preventDefault();

    let url = document.getElementById("urlInput").value;
    const searchUrl = "https://www.google.com/search?q=";

    // If no periods are detected in the input, search Google
    if (!url.includes(".")) {
        url = searchUrl + encodeURIComponent(url);
    } else {
        // Add "https://" automatically if not present
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
    }

    // Ensure the transport is set before navigating
    if (!await connection.getTransport()) {
        await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
    }

    // Load the URL in the iframe
    const iframeWindow = document.getElementById("iframeWindow");
    iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
    document.getElementById()
    iframeWindow.style.display = "block"; 
};
