document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Petición GET al endpoint definido en tu backend: /chef
        const response = await fetch("http://localhost:3005/chef");
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Respuesta en formato JSON: { success, message, data: { porPreparar, preparando } }
        const resData = await response.json();
        if (!resData.success) {
            throw new Error(resData.message || "Error al obtener pedidos");
        }

        // Extraemos las dos listas de pedidos
        const { porPreparar, preparando } = resData.data;

        // Seleccionar los <tbody> de las tablas
        const porPrepararTbody = document.querySelector("#Pizza tbody");
        const preparandoTbody = document.querySelector("#Pasta tbody");

        // Validar que los elementos existen en el DOM
        if (!porPrepararTbody || !preparandoTbody) {
            console.error("Uno o ambos elementos no existen en el DOM.");
            alert("Error al cargar la tabla. Verifica el HTML.");
            return;
        }

        // Limpiar cualquier contenido anterior
        porPrepararTbody.innerHTML = "";
        preparandoTbody.innerHTML = "";

        // Llenar la tabla de pedidos "por preparar"
        porPreparar.forEach((pedido) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${pedido.platillo}</td>
                <td>${pedido.mesa}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="cambiarAPreparando(${pedido.id})">
                        Pasar a preparando
                    </button>
                </td>
            `;
            porPrepararTbody.appendChild(row);
        });

        // Llenar la tabla de pedidos "preparando"
        preparando.forEach((pedido) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${pedido.platillo}</td>
                <td>${pedido.mesa}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="marcarComoListo(${pedido.id})">
                        Marcar como listo
                    </button>
                </td>
            `;
            preparandoTbody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar pedidos:", error);
        alert("Hubo un error al cargar los pedidos. Por favor, inténtalo nuevamente.");
    }
});

// Función para pasar un pedido a estado "preparando"
async function cambiarAPreparando(id) {
    try {
        const response = await fetch("http://localhost:3005/preparando", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        alert("Pedido pasado a 'preparando'");
        // Recargar para ver el cambio en la tabla
        location.reload();
    } catch (error) {
        console.error("Error al cambiar a preparando:", error);
    }
}

// Función para marcar un pedido como listo (cambiar estado a "entregar")
async function marcarComoListo(id) {
    try {
        const response = await fetch("http://localhost:3005/listo", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        alert("Pedido marcado como 'entregar'");
        // Recargar para ver el cambio en la tabla
        location.reload();
    } catch (error) {
        console.error("Error al marcar como listo:", error);
    }
}
