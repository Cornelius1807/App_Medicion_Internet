document.getElementById("start-test").addEventListener("click", async () => {
    const downloadSpeedElem = document.getElementById("download-speed");
    const uploadSpeedElem = document.getElementById("upload-speed");
    const pingElem = document.getElementById("ping");
    const loadingElem = document.getElementById("loading");
    const resultsElem = document.getElementById("results");

    // Mostrar la animación de carga
    loadingElem.style.display = "block";
    resultsElem.style.display = "none";

    // Actualiza los resultados mientras se realiza la prueba
    downloadSpeedElem.textContent = "Calculando...";
    uploadSpeedElem.textContent = "Calculando...";
    pingElem.textContent = "Calculando...";

    try {
        const response = await fetch("https://iperf3-flask-284235036257.us-central1.run.app/start-test");
        const data = await response.json();

        if (response.ok) {
            // Simulación de incremento en la velocidad
            let downloadSpeed = 0;
            let uploadSpeed = 0;

            const downloadInterval = setInterval(() => {
                if (downloadSpeed < data.download_speed_mbps) {
                    downloadSpeed += 10;
                    downloadSpeedElem.textContent = `${downloadSpeed.toFixed(2)} Mbps`;
                } else {
                    clearInterval(downloadInterval);
                }
            }, 100);

            const uploadInterval = setInterval(() => {
                if (uploadSpeed < data.upload_speed_mbps) {
                    uploadSpeed += 10;
                    uploadSpeedElem.textContent = `${uploadSpeed.toFixed(2)} Mbps`;
                } else {
                    clearInterval(uploadInterval);
                }
            }, 100);

            // Mostrar ping
            pingElem.textContent = data.ping_ms ? `${data.ping_ms} ms` : "No disponible";

            // Ocultar la animación y mostrar los resultados
            setTimeout(() => {
                loadingElem.style.display = "none";
                resultsElem.style.display = "block";
            }, 2000);
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
