document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn-iniciar").addEventListener("click", async function (event) {
        event.preventDefault();
        
        const user = document.getElementById("user").value.trim();
        const password = document.getElementById("password").value;
        
        if (!user || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        
        const loginData = {
            user,
            password
        };
        
        try {
            const response = await fetch("http://localhost:3005/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert("Inicio de sesión exitoso!");
                localStorage.setItem("usuario", JSON.stringify(data)); // Guardar usuario en localStorage
                window.location.href = "cajero.html"; // Redirigir a la página principal
            } else {
                alert("Error en el inicio de sesión: " + data.message);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Hubo un problema al iniciar sesión.");
        }
    });
});
