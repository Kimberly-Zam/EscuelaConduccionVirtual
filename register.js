if (!localStorage.getItem('usuarioLogueado')) {
    document.location.href = "/index.html";
}

// register.js
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

    document.getElementById("register-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const user = e.target.querySelector('input[name="user"]').value;
        const email = e.target.querySelector('input[name="email"]').value;
        const password = e.target.querySelector('input[name="password"]').value;

        // Verificar si ya existe el usuario
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioExiste = usuarios.some(u => u.user === user || u.email === email);

        if (usuarioExiste) {
            mensajeError.textContent = "El usuario o el email ya están registrados.";
            mensajeError.classList.remove("escondido");
        } else {
            // Hashear la contraseña antes de registrar el usuario
            const hashedPassword = await hashPassword(password);

            // Registrar nuevo usuario con contraseña hasheada
            usuarios.push({ user, email, password: hashedPassword });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            // Redirigir al login y eliminar la sesión
            localStorage.removeItem('usuarioLogueado');
            window.location.href = "/login.html";
        }
    });
});
