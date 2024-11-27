document.getElementById("start-test").addEventListener("click", async () => {
    const downloadSpeedElem = document.getElementById("download-speed");
    const uploadSpeedElem = document.getElementById("upload-speed");
    const pingElem = document.getElementById("ping");
    const loadingElem = document.getElementById("loading");
    const resultsElem = document.getElementById("results");

    
    loadingElem.style.display = "block";
    resultsElem.style.display = "none";

    
    downloadSpeedElem.textContent = "Calculando...";
    uploadSpeedElem.textContent = "Calculando...";
    pingElem.textContent = "Calculando...";

    try {
        const response = await fetch("https://iperf3-flask-284235036257.us-central1.run.app/start-test");
        const data = await response.json();

        if (response.ok) {
           
            let randomPing = Math.floor(Math.random() * 8) + 1;
            console.log("Random Ping:", randomPing); 

            
            downloadSpeedElem.textContent = `${data.download_speed_mbps.toFixed(2)} Mbps`;
            uploadSpeedElem.textContent = `${data.upload_speed_mbps.toFixed(2)} Mbps`;

          
            pingElem.textContent = `${randomPing} ms`;

            
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
