document.getElementById("startTest").addEventListener("click", function () {
    const resultElement = document.getElementById("result");
    resultElement.innerText = "Iniciando prueba...";

    fetch("https://appmedicioninternet.rj.r.appspot.com/start-test") // Cambia <TU-PROYECTO> por el ID real
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultElement.innerText = `Error: ${data.error}`;
            } else {
                resultElement.innerText = `
                    Velocidad de descarga: ${data.download_speed_mbps} Mbps
                    Velocidad de subida: ${data.upload_speed_mbps} Mbps
                    Latencia: ${data.ping_ms} ms
                `;
            }
        })
        .catch(error => {
            resultElement.innerText = `Error de conexión: ${error}`;
        });
});
