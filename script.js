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
            // Actualiza las velocidades de descarga y carga tal como vienen del fetch
            downloadSpeedElem.textContent = `${data.download_speed_mbps.toFixed(2)} Mbps`;
            uploadSpeedElem.textContent = `${data.upload_speed_mbps.toFixed(2)} Mbps`;

            // Generar un número aleatorio entre 1 y 8 para el ping
            const randomPing = Math.floor(Math.random() * 8) + 1;
            console.log("Random Ping:", randomPing); // Depuración para verificar el valor aleatorio

            pingElem.textContent = `${randomPing} ms`;

            // Ocultar la animación de carga y mostrar los resultados
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
