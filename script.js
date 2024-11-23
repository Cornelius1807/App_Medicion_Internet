document.getElementById("start-test").addEventListener("click", async () => {
    const downloadSpeedElem = document.getElementById("download-speed");
    const uploadSpeedElem = document.getElementById("upload-speed");
    const pingElem = document.getElementById("ping");

    // Actualiza los resultados mientras se realiza la prueba
    downloadSpeedElem.textContent = "Calculando...";
    uploadSpeedElem.textContent = "Calculando...";
    pingElem.textContent = "Calculando...";

    try {
        const response = await fetch("https://<URL_BACKEND>/start-test");
        const data = await response.json();

        if (response.ok) {
            downloadSpeedElem.textContent = `${data.download_speed_mbps} Mbps`;
            uploadSpeedElem.textContent = `${data.upload_speed_mbps} Mbps`;
            pingElem.textContent = `${data.ping_ms} ms`;
        } else {
            throw new Error(data.error || "Error al realizar la prueba");
        }
    } catch (error) {
        downloadSpeedElem.textContent = "-";
        uploadSpeedElem.textContent = "-";
        pingElem.textContent = "-";
        console.error("Error al realizar la prueba:", error);
    }
});
