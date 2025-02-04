window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  
  if (window.scrollY > 50) {
      header.classList.add('scrolled'); // Agrega la clase 'scrolled' cuando se hace scroll
  } else {
      header.classList.remove('scrolled'); // Quita la clase 'scrolled' cuando vuelve al inicio
  }
});

if (!localStorage.getItem('usuarioLogueado')) {
    document.location.href = "/index.html";
}

document.getElementsByTagName("button")[0].addEventListener("click", () => {
    localStorage.removeItem('usuarioLogueado');
    document.location.href = "/index.html";
});


// Aseguramos que descripcionRegistros sea un array de objetos con `nombreCompleto`
let descripcionRegistros = JSON.parse(localStorage.getItem('clientes')) || [
    { nombreCompleto: "Maria Terrazas Llanos" },
    { nombreCompleto: "Diego Arze Ramirez" },
    { nombreCompleto: "Andres Erick Vargas Rojas" },
    { nombreCompleto: "Fernanda Ortega Cruz" }
];

let fechaRegistros = JSON.parse(localStorage.getItem('fechas')) || [
    "4/10/2024 - 10:02:22",
    "10/10/2024 - 10:34:17",
    "18/10/2024 - 15:01:01",
    "22/10/2024 - 16:30:47"
];

// Actualiza el contador según la cantidad de clientes en localStorage
let contadorRegistros = descripcionRegistros.length;

// Función para mostrar la tabla de registros
function mostrarTablaRegistros() {
  const tabla = document.getElementById('tablaRegistros');
  if (tabla) {
      tabla.innerHTML = '<tr><th colspan="3">Clientes</th></tr>';
      for (let i = 0; i < descripcionRegistros.length; i++) {
          tabla.innerHTML += `
              <tr>
                  <td><a href="/cliente.html" onclick="guardarCliente('${descripcionRegistros[i].nombreCompleto}')">${descripcionRegistros[i].nombreCompleto}</a></td>
                  <td class="tiempo">${fechaRegistros[i]}</td>
                  <td class="eliminar" onclick="eliminarRegistros(${i})"><ion-icon name="close-circle-outline"></ion-icon></td>
              </tr>
          `;
      }
  }
}

// Función para agregar un nuevo cliente
function agregar() {
  const nuevoCliente = document.getElementById('ingresaDescripcion').value.trim();
  if (nuevoCliente !== "") {
    descripcionRegistros.push({ nombreCompleto: nuevoCliente });
    guardarFecha(contadorRegistros); // Agrega la fecha para el nuevo cliente
    contadorRegistros++;
    actualizarLocalStorage(); // Actualiza el localStorage
    mostrarTablaRegistros();
  } else {
    alert("El nombre del cliente no puede estar vacío.");
  }
}

// Función para eliminar un cliente
function eliminarRegistros(indice) {
  // Eliminar el cliente del arreglo
  descripcionRegistros.splice(indice, 1);
  fechaRegistros.splice(indice, 1);
  contadorRegistros--;

  actualizarLocalStorage(); // Actualiza el localStorage
  mostrarTablaRegistros();
}

// Función para guardar la fecha actual para un nuevo cliente
function guardarFecha(i) {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses son indexados desde 0
  const año = fecha.getFullYear();

  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();
  const segundos = fecha.getSeconds();
  const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año} - ${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;

  fechaRegistros[i] = fechaFormateada;
}

// Función para guardar el nombre del cliente seleccionado en localStorage
function guardarCliente(nombreCliente) {
  localStorage.setItem('nombreCliente', nombreCliente); // Guardamos el nombre del cliente seleccionado en localStorage
}

// Función para actualizar el localStorage cuando se agregan o eliminan clientes
function actualizarLocalStorage() {
  localStorage.setItem('clientes', JSON.stringify(descripcionRegistros));
  localStorage.setItem('fechas', JSON.stringify(fechaRegistros));
}

// Inicializar la tabla al cargar la página
mostrarTablaRegistros();
