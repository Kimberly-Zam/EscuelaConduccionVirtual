// Cambiar el fondo del header y el tamaño del logo al hacer scroll
window.addEventListener('scroll', function () {
    const header = document.getElementById('main-header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled'); // Agrega la clase 'scrolled' cuando se hace scroll
    } else {
        header.classList.remove('scrolled'); // Quita la clase 'scrolled' cuando vuelve al inicio
    }
});



