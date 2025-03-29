document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn-guardar").addEventListener("click", async function (event) {
        event.preventDefault();
        
        const user = document.getElementById("user").value.trim();
        const name = document.getElementById("name").value.trim();
        const rol = document.getElementById("rol").value;
        const password = document.getElementById("password").value;
        
        if (!user || !name || !rol || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        
        const userData = {
            user,
            name,
            rol,
            password
        };
        
        try {
            const response = await fetch("http://localhost:3005/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert("Usuario registrado con éxito!");
                window.location.href = "index.html";
            } else {
                alert("Error en el registro: " + data.message);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Hubo un problema al registrar el usuario.");
        }
    });
});
