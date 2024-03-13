document.querySelectorAll('.fila').forEach((fila) => {
    const elementosFila = fila.innerHTML;
    fila.innerHTML = elementosFila + elementosFila + elementosFila + elementosFila; // Duplicamos los elementos para el desplazamiento infinito

    const totalElementos = fila.querySelectorAll('li').length;
    fila.style.animationDuration = `${totalElementos * 3}s`; // Ajustamos la duración de la animación basada en la cantidad de elementos

    // Opcional: Pausar la animación al pasar el mouse
    fila.addEventListener('mouseenter', () => {
        fila.style.animationPlayState = 'paused';
    });

    fila.addEventListener('mouseleave', () => {
        fila.style.animationPlayState = 'running';
    });
});
