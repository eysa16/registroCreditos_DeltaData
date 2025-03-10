
// Funcion del gráfico
function generarGraficoMatplotlib() {
    fetch("http://127.0.0.1:5000/grafico")
        .then(res => res.json())
        .then(data => {
            if (data.imagen) {
                document.getElementById("graficoMatplotlib").src = data.imagen;
            }
        });
}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", generarGraficoMatplotlib);
