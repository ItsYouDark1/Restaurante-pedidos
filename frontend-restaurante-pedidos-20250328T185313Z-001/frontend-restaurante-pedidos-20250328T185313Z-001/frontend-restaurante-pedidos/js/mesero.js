document.addEventListener("DOMContentLoaded", function () {
    // Referencias a los <tbody> de las tablas
    const porEntregarTable = document.querySelector("#Pizza tbody");
    const entregadoTable = document.querySelector("#Pasta tbody");

    if (!porEntregarTable || !entregadoTable) {
        console.error("No se encontraron las tablas en el DOM.");
        alert("Error al cargar la página: No se encontraron las tablas.");
        return;
    }

    // Petición GET al backend para obtener los pedidos
    fetch("http://localhost:3005/mesero")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((respuesta) => {
            console.log("Respuesta recibida:", respuesta);

            const porEntregar = respuesta.data.porEntregar || [];
            const entregado = respuesta.data.entregado || [];

            // Llenar la tabla "Por Entregar"
            porEntregar.forEach((pedido) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${pedido.platillo}</td>
                    <td>${pedido.mesa}</td>
                    <td>
                        <button class="btn btn-success" onclick="cambiarEstado(${pedido.id})">Entregado</button>
                    </td>
                `;
                porEntregarTable.appendChild(row);
            });

            // Llenar la tabla "Entregado"
            entregado.forEach((pedido) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${pedido.platillo}</td>
                    <td>${pedido.mesa}</td>
                    <td>Entregado</td>
                `;
                entregadoTable.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error al cargar los pedidos:", error);
            alert("Hubo un error al cargar los pedidos. Por favor, intenta nuevamente.");
        });
});

// Función para cambiar el estado de un pedido
function cambiarEstado(id) {
    fetch("http://localhost:3005/entregado", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            alert("Pedido marcado como entregado.");
            location.reload(); // Recargar la página para reflejar cambios
        })
        .catch((error) => {
            console.error("Error al actualizar el estado:", error);
            alert("Hubo un error al actualizar el estado del pedido. Inténtalo nuevamente.");
        });
}
