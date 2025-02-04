document.addEventListener("DOMContentLoaded", () => {
    const mensajeError = document.querySelector(".error");

    // Función para generar el hash SHA-256 de una contraseña
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    // Cargar usuarios del localStorage (con contraseñas hasheadas)
    if (!localStorage.getItem("usuarios")) {
        Promise.all([
            hashPassword("a"),
            hashPassword("Kimy1234"),
            hashPassword("Santi1234")
        ]).then(hashedPasswords => {
            localStorage.setItem("usuarios", JSON.stringify([
                { user: "a", email: "a@gmail.com", password: hashedPasswords[0] },
                { user: "KimberlyZam", email: "kim@gmail.com", password: hashedPasswords[1] },
                { user: "JavierFlo", email: "javier@gmail.com", password: hashedPasswords[2] }
            ]));
        });
    }

    // Iniciar sesión
    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const user = e.target.querySelector('input[name="user"]').value;
        const password = e.target.querySelector('input[name="password"]').value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios"));
        
        // Generar hash de la contraseña ingresada
        const hashedPassword = await hashPassword(password);
        
        const usuarioValido = usuarios.find(u => u.user === user && u.password === hashedPassword);

        if (usuarioValido) {
            // Guardar la sesión del usuario
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioValido));
            window.location.href = "/admin.html";  // Redirigir a la página de administración
        } else {
            mensajeError.classList.remove("escondido");
            mensajeError.textContent = "Credenciales incorrectas, por favor intente nuevamente.";
        }
    });
});
