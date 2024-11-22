document.getElementById('start-test').addEventListener('click', async () => {
    const results = document.getElementById('results');
    results.style.display = 'block';

    // Enviar solicitud al backend para iniciar la prueba
    try {
        const response = await fetch('http://127.0.0.1:5000/start-test'); // URL del backend
        const data = await response.json();

        // Mostrar los resultados en la interfaz
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            document.getElementById('download-speed').textContent = data.downloadSpeed;
            document.getElementById('upload-speed').textContent = data.uploadSpeed;
            document.getElementById('latency').textContent = data.latency;
        }
    } catch (error) {
        console.error('Error al realizar la prueba:', error);
        alert('No se pudo completar la prueba. Verifique su conexión o el servidor.');
    }
});
