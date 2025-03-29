document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar el tbody de la tabla
    let tbody = document.querySelector("table tbody");
  
    // Función para registrar un pedido
    async function registrarPedido(pedido) {
      try {
        let respuesta = await fetch("http://localhost:3005/pedido", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pedido)
        });
  
        if (respuesta.ok) {
          let data = await respuesta.json();
          alert("Pedido registrado con éxito!");
  
          // Agregar pedido a la tabla
          let newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${pedido.platillo}</td>
            <td>${pedido.mesa}</td>
            <td><span class="badge bg-warning">Pendiente</span></td>
            <td><button class="btn btn-danger btn-cancelar">Cancelar</button></td>
          `;
          tbody.appendChild(newRow);
  
          // Agregar funcionalidad para cancelar el pedido
          newRow.querySelector(".btn-cancelar").addEventListener("click", function () {
            newRow.remove();
            alert("Pedido cancelado!");
          });
        } else {
          let errorMsg = await respuesta.text();
          alert("Error al registrar el pedido: " + errorMsg);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("No se pudo conectar con el servidor.");
      }
    }
  
    // Simulación de pedido al hacer clic en un botón de prueba
    
    });

  