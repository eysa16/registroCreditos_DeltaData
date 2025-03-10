
const API_URL = "http://127.0.0.1:5000/creditos";


// Función para cargar los créditos en la tabla
function cargarCreditos() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const tabla = document.getElementById("tablaCreditos");
            tabla.innerHTML = "";
            data.forEach(credito => {
                tabla.innerHTML += `
                    <tr>
                        <td>${credito.id}</td>
                        <td>${credito.cliente}</td>
                        <td>${credito.monto}</td>
                        <td>${credito.tasa_interes}</td>
                        <td>${credito.plazo}</td>
                        <td>${credito.fecha_otorgamiento}</td>
                        <td>
                            <button class="editar" onclick="editarCredito(${credito.id})">Editar</button>
                            <button class="eliminar" onclick="eliminarCredito(${credito.id})">Eliminar</button>
                        </td>
                    </tr>`;
            });
        });
}


// Función para validación de campos del formulario (para mayor seguridad, se implementaron también validaciones directamente en el archivo HTML)
function validarFormulario() {
    let cliente = document.getElementById("cliente").value.trim();
    let monto = parseFloat(document.getElementById("monto").value);
    let tasa = parseFloat(document.getElementById("tasa_interes").value);
    let plazo = parseInt(document.getElementById("plazo").value);
    let fecha = document.getElementById("fecha_otorgamiento").value;

    if (cliente === "") {
        alert("El nombre del cliente es obligatorio.");
        return false;
    }
    if (isNaN(monto) || monto <= 0) {
        alert("El monto debe ser un número positivo.");
        return false;
    }
    if (isNaN(tasa) || tasa < 0 || tasa > 100) {
        alert("La tasa de interés debe estar entre 0 y 100.");
        return false;
    }
    if (isNaN(plazo) || plazo <= 0) {
        alert("El plazo debe ser mayor a 0.");
        return false;
    }
    if (!fecha) {
        alert("Debes seleccionar una fecha de otorgamiento.");
        return false;
    }

    return true;
}


// Función para registrar un nuevo crédito
document.getElementById("formCredito").addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validarFormulario()) {
        return;
    }

    const nuevoCredito = {
        cliente: document.getElementById("cliente").value,
        monto: parseFloat(document.getElementById("monto").value),
        tasa_interes: parseFloat(document.getElementById("tasa_interes").value),
        plazo: parseInt(document.getElementById("plazo").value),
        fecha_otorgamiento: document.getElementById("fecha_otorgamiento").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCredito)
    })
    .then(res => res.json())
    .then(() => {
        alert("Crédito registrado correctamente");
        document.getElementById("formCredito").reset();
        cargarCreditos();
        generarGraficoMatplotlib();
    });
});


// Función para eliminar un crédito
function eliminarCredito(id) {
    if (confirm("¿Seguro que deseas eliminar este crédito?")) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(() => {
            alert("Crédito eliminado");
            cargarCreditos();
        });
    }
}


// Función para editar un crédito
function editarCredito(id) {
    const nuevoCliente = prompt("Nuevo nombre del cliente:");
    if (!nuevoCliente) return;

    const nuevoMonto = parseFloat(prompt("Nuevo monto:"));
    const nuevaTasa = parseFloat(prompt("Nueva tasa de interés:"));
    const nuevoPlazo = parseInt(prompt("Nuevo plazo en meses:"));
    const nuevaFecha = prompt("Nueva fecha de otorgamiento (YYYY-MM-DD):");

    const creditoActualizado = {
        cliente: nuevoCliente,
        monto: nuevoMonto,
        tasa_interes: nuevaTasa,
        plazo: nuevoPlazo,
        fecha_otorgamiento: nuevaFecha
    };

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creditoActualizado)
    })
    .then(res => res.json())
    .then(() => {
        alert("Crédito actualizado");
        cargarCreditos();
    });
}


// Carga los créditos al cargar la página
document.addEventListener("DOMContentLoaded", cargarCreditos);
