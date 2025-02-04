const clientesPredeterminados = [
    {
        nombreCompleto: "Maria Terrazas Llanos",
        edad: "28",
        direccion: "C. Jordan N°123",
        telefono: "789456123",
        plan: "1 mes"
    },
    {
        nombreCompleto: "Diego Arze Ramirez",
        edad: "34",
        direccion: "Av. Heroinas N°456",
        telefono: "654321987",
        plan: "1 mes"
    },
    {
        nombreCompleto: "Andres Erick Vargas Rojas",
        edad: "30",
        direccion: "C. Grover Suarez N°789",
        telefono: "123789456",
        plan: "2 mes"
    },
    {
        nombreCompleto: "Fernanda Ortega Cruz",
        edad: "26",
        direccion: "C. San MArtin N°321",
        telefono: "987654321",
        plan: "1 mes"
    }
];

// Historial inicial predeterminado para cada cliente
const historialPredeterminado = {
    "Maria Terrazas Llanos": [
        { fechaInicio: "29/10/2024", horaInicio: "10:00:00", horaFin: "10:30:00", duracion: "0h 30m 0s" },
        { fechaInicio: "30/10/2024", horaInicio: "15:00:00", horaFin: "15:20:00", duracion: "0h 20m 0s" }
    ],
    "Diego Arze Ramirez": [
        { fechaInicio: "28/10/2024", horaInicio: "11:00:00", horaFin: "11:45:00", duracion: "0h 45m 0s" }
    ],
    "Andres Erick Vargas Rojas": [
        { fechaInicio: "27/10/2024", horaInicio: "09:00:00", horaFin: "09:30:00", duracion: "0h 30m 0s" },
        { fechaInicio: "29/10/2024", horaInicio: "13:00:00", horaFin: "13:25:00", duracion: "0h 25m 0s" }
    ],
    "Fernanda Ortega Cruz": [
        { fechaInicio: "26/10/2024", horaInicio: "08:30:00", horaFin: "08:50:00", duracion: "0h 20m 0s" }
    ]
};

// Guardar los datos iniciales de los clientes en localStorage si no existen
if (!localStorage.getItem('clientes')) {
    localStorage.setItem('clientes', JSON.stringify(clientesPredeterminados));
}

// Guardar el historial predeterminado en localStorage si no existe
Object.keys(historialPredeterminado).forEach(clienteNombre => {
    if (!localStorage.getItem(`historial_${clienteNombre}`)) {
        localStorage.setItem(`historial_${clienteNombre}`, JSON.stringify(historialPredeterminado[clienteNombre]));
    }
});

// Definimos observaciones iniciales para cada cliente
const observacionesPredeterminadas = {
    "Maria Terrazas Llanos": [
        { fecha: "29/10/2024", observacion: "Apagó el auto varias veces\nSe pasó el semáforo 4 veces\nOlvidó el cinturón" },
        { fecha: "30/10/2024", observacion: "No puso guiñador para girar\nOlvidó revisar los retrovisores" }
    ],
    "Diego Arze Ramirez": [
        { fecha: "28/10/2024", observacion: "Se pasó el semáforo en rojo\nOlvidó encender las luces" }
    ],
    "Andres Erick Vargas Rojas": [
        { fecha: "27/10/2024", observacion: "Chocó otro vehículo" },
        { fecha: "29/10/2024", observacion: "No revisó puntos ciegos\nGiró sin señalizar" }
    ],
    "Fernanda Ortega Cruz": [
        { fecha: "26/10/2024", observacion: "Apagó el auto varias veces\nOlvidó el cinturón"  }
    ]
};

// Guardar las observaciones predeterminadas en localStorage si no existen
Object.keys(observacionesPredeterminadas).forEach(clienteNombre => {
    if (!localStorage.getItem(`observaciones_${clienteNombre}`)) {
        localStorage.setItem(`observaciones_${clienteNombre}`, JSON.stringify(observacionesPredeterminadas[clienteNombre]));
    }
});

window.onload = function() {
    const nombreCliente = localStorage.getItem('nombreCliente');
    
    if (nombreCliente) {
        const clientes = JSON.parse(localStorage.getItem('clientes'));
        const clienteData = clientes.find(cliente => cliente.nombreCompleto === nombreCliente);

        if (clienteData) {
            document.getElementById('nombre-usuario').innerText = clienteData.nombreCompleto || '';
            document.getElementById('nombre-completo').innerText = clienteData.nombreCompleto || '';
            document.getElementById('edad-usuario').innerText = clienteData.edad || 'Agregar edad';
            document.getElementById('direccion-usuario').innerText = clienteData.direccion || 'Agregar dirección';
            document.getElementById('telefono-usuario').innerText = clienteData.telefono || 'Agregar teléfono';
            document.getElementById('plan-detalle').innerText = clienteData.plan || 'Agregar plan';
            document.getElementById('plan-usuario').innerText = clienteData.plan || 'Agregar plan';

            // Cargar y mostrar el historial y observaciones del cliente
            mostrarHistorial(nombreCliente);
            mostrarObservaciones(nombreCliente);
        } else {
            alert("No se ha encontrado el cliente.");
        }
    } else {
        alert('No se ha seleccionado un cliente.');
    }
};


// Función para mostrar las observaciones en la tabla de observaciones
function mostrarObservaciones(nombreCliente) {
    const observacionesCliente = JSON.parse(localStorage.getItem(`observaciones_${nombreCliente}`)) || [];
    const tablaObservaciones = document.getElementById('tablaObservaciones').getElementsByTagName('tbody')[0];
    tablaObservaciones.innerHTML = ""; // Limpiar el contenido antes de agregar nuevas filas

    // Generar filas para cada observación
    observacionesCliente.forEach(obs => {
        const fila = document.createElement('tr');
        const observacionFormateada = obs.observacion.split("\n").map(linea => `<span class="observacion-linea">${linea}</span>`).join("<br>");
        fila.innerHTML = `
            <td>${obs.fecha}</td>
            <td>${observacionFormateada}</td>
        `;
        tablaObservaciones.appendChild(fila);
    });
}


// Función para cambiar entre las pestañas
function mostrarPestaña(pestañaId) {
    const pestañas = document.querySelectorAll('.contenido-pestaña');
    const botones = document.querySelectorAll('.tab');
    
    pestañas.forEach(pestaña => pestaña.classList.remove('active'));
    botones.forEach(boton => boton.classList.remove('active'));

    document.getElementById(pestañaId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Función para editar los campos de la tabla
function editarCampo(campoId) {
    const campo = document.getElementById(campoId);
    const valorActual = campo.innerText;
    campo.innerHTML = `<input type="text" value="${valorActual}" id="input-${campoId}" />`;
}

// Función para guardar los datos editados
function guardarDatos() {
    // Obtener el nombre del cliente desde localStorage
    const nombreCliente = localStorage.getItem('nombreCliente');
    
    // Recopilar los datos editados o actuales
    const clienteData = {
        nombreCompleto: document.getElementById('input-nombre-completo') ? document.getElementById('input-nombre-completo').value : document.getElementById('nombre-completo').innerText,
        edad: document.getElementById('input-edad-usuario') ? document.getElementById('input-edad-usuario').value : document.getElementById('edad-usuario').innerText,
        direccion: document.getElementById('input-direccion-usuario') ? document.getElementById('input-direccion-usuario').value : document.getElementById('direccion-usuario').innerText,
        telefono: document.getElementById('input-telefono-usuario') ? document.getElementById('input-telefono-usuario').value : document.getElementById('telefono-usuario').innerText,
        plan: document.getElementById('input-plan-detalle') ? document.getElementById('input-plan-detalle').value : document.getElementById('plan-detalle').innerText
    };

    // Obtener los datos de todos los clientes
    let clientes = JSON.parse(localStorage.getItem('clientes'));

    // Encontrar el índice del cliente en el array
    const clienteIndex = clientes.findIndex(cliente => cliente.nombreCompleto === nombreCliente);
    
    // Actualizar los datos del cliente si se encuentra
    if (clienteIndex !== -1) {
        clientes[clienteIndex] = clienteData;
        localStorage.setItem('clientes', JSON.stringify(clientes)); // Guardar los cambios en localStorage
    }

    // Actualizar los campos visualmente después de guardar
    document.getElementById('nombre-completo').innerText = clienteData.nombreCompleto;
    document.getElementById('edad-usuario').innerText = clienteData.edad;
    document.getElementById('direccion-usuario').innerText = clienteData.direccion;
    document.getElementById('telefono-usuario').innerText = clienteData.telefono;
    document.getElementById('plan-detalle').innerText = clienteData.plan;
    document.getElementById('plan-usuario').innerText = clienteData.plan; // Plan en el encabezado

    alert("Datos guardados correctamente.");
}


//--------------Pestaña historial-----------------
let historial = JSON.parse(localStorage.getItem('historial')) || []; // Cargar el historial desde localStorage
let inicioSesion = null; // Variable para guardar la hora de inicio
let sesionActiva = null; // Variable para rastrear la sesión en curso

// Función para iniciar una sesión
function iniciarSesion() {
    const nombreCliente = localStorage.getItem('nombreCliente');
    let historialCliente = JSON.parse(localStorage.getItem(`historial_${nombreCliente}`)) || []; // Cargar el historial del cliente específico

    if (!inicioSesion) {
        inicioSesion = new Date(); // Guardar la fecha y hora de inicio
        sesionActiva = {
            fechaInicio: inicioSesion.toLocaleDateString(),
            horaInicio: inicioSesion.toLocaleTimeString(),
            horaFin: '',
            duracion: ''
        };
        historialCliente.push(sesionActiva); // Añadir al historial pero sin hora de fin ni duración

        // Guardar el historial actualizado en el localStorage
        localStorage.setItem(`historial_${nombreCliente}`, JSON.stringify(historialCliente));

        // Mostrar el historial actualizado inmediatamente
        mostrarHistorial(nombreCliente);
    } else {
        alert('Ya hay una sesión en curso.');
    }
}



// Función para terminar la sesión
function terminarSesion() {
    const nombreCliente = localStorage.getItem('nombreCliente');
    let historialCliente = JSON.parse(localStorage.getItem(`historial_${nombreCliente}`)) || []; // Cargar el historial del cliente específico

    if (inicioSesion && sesionActiva) {
        const finSesion = new Date(); // Guardar la fecha y hora de finalización
        const duracionSesion = calcularDuracion(inicioSesion, finSesion); // Calcular la duración

        // Actualizar la sesión activa con hora de fin y duración
        sesionActiva.horaFin = finSesion.toLocaleTimeString();
        sesionActiva.duracion = duracionSesion;

        // Guardar el historial actualizado en localStorage
        historialCliente[historialCliente.length - 1] = sesionActiva;
        localStorage.setItem(`historial_${nombreCliente}`, JSON.stringify(historialCliente));

        // Limpiar la sesión en curso
        inicioSesion = null;
        sesionActiva = null;

        // Mostrar el historial actualizado
        mostrarHistorial(nombreCliente);
    } else {
        alert('No hay sesión en curso.');
    }
}


// Función para calcular la duración entre dos fechas
function calcularDuracion(inicio, fin) {
    const diferencia = fin - inicio; // Diferencia en milisegundos
    const segundos = Math.floor((diferencia / 1000) % 60);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    return `${horas}h ${minutos}m ${segundos}s`;
}


// Función para mostrar el historial en la tabla
function mostrarHistorial(nombreCliente) {
    // Verifica si el historial del cliente existe en localStorage, si no, inicializa como un array vacío
    let historialCliente = JSON.parse(localStorage.getItem(`historial_${nombreCliente}`)) || [];
    
    // Actualiza el localStorage si el historial estaba vacío inicialmente
    if (historialCliente.length === 0) {
        localStorage.setItem(`historial_${nombreCliente}`, JSON.stringify(historialCliente));
    }

    // Selecciona la tabla de historial y limpia su contenido
    const tabla = document.getElementById('tablaHistorial').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    // Genera las filas para cada registro en el historial
    historialCliente.forEach((registro) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${registro.fechaInicio || 'Sin fecha'}</td>
            <td>${registro.horaInicio || 'Sin hora de inicio'}</td>
            <td>${registro.horaFin ? registro.horaFin : 'En progreso...'}</td>
            <td>${registro.duracion ? registro.duracion : '...'}</td>
        `;
        tabla.appendChild(fila);
    });
}


function calcularDuracion(inicio, fin) {
    const diferencia = fin - inicio; // Diferencia en milisegundos
    const segundos = Math.floor((diferencia / 1000) % 60);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    return `${horas}h ${minutos}m ${segundos}s`;
}
