const ciudades = [
    {
        nombre: 'Bogotá',
        codigo: 'America/Bogota',
    },
    {
        nombre: 'Buenos Aires',
        codigo: 'America/Buenos_Aires',
    },
    {
        nombre: 'Montevideo',
        codigo: 'America/Montevidseo',
    },
];
const ciudadesAIncluir = [];

window.addEventListener('load', programa);
function programa() {
    const selectorDeOrigen = document.getElementById('idSelectOriginCity');
    const selectorDeDestino = document.getElementById('idSelectDestCity');
    const listaDePaisesIncluidos = document.getElementById('idSelectedCities');

    // Agregamos las ciudades disponibles a los selectores
    ciudades.forEach((ciudad) => {
        const opcionOrigen = document.createElement('option');
        const opcionDestino = document.createElement('option');

        opcionOrigen.value = ciudad.codigo;
        opcionOrigen.textContent = ciudad.nombre;
        opcionDestino.value = ciudad.codigo;
        opcionDestino.textContent = ciudad.nombre;

        selectorDeOrigen.appendChild(opcionOrigen);
        selectorDeDestino.appendChild(opcionDestino);
    });

    // Cada vez que se elija una opcion de ciudad destino,
    // se agrega a la lista de ciudades a incluir y se actualiza la interfaz
    selectorDeDestino.addEventListener('change', () => {
        if (selectorDeDestino.value) {
            const ciudadNueva = ciudades.find(
                (ciudad) => ciudad.codigo === selectorDeDestino.value
            );
            ciudadesAIncluir.push(ciudadNueva);
            actualizarInterfazDeCiudadesIncluidas();
        }
    });

    //Funciones
    function actualizarInterfazDeCiudadesIncluidas() {
        //Se borra la lista y se renderiza de nuevo.
        listaDePaisesIncluidos.innerHTML = '';
        ciudadesAIncluir.forEach((ciudad) => {
            const ciudadAgregada = document.createElement('li');
            const cruzRoja = document.createElement('img');

            ciudadAgregada.textContent = ciudad.nombre;
            cruzRoja.src = '../assets/img/cross.png';
            cruzRoja.alt = 'Icono con forma de una cruz roja.';
            cruzRoja.addEventListener('click', () => eliminarOpcion(ciudad));

            ciudadAgregada.appendChild(cruzRoja);
            listaDePaisesIncluidos.appendChild(ciudadAgregada);
        });
    }

    function eliminarOpcion(ciudad) {
        let continuarCiclo = true;
        for (let i = 0; i < ciudadesAIncluir.length && continuarCiclo; i++) {
            if (ciudadesAIncluir[i].codigo === ciudad.codigo) {
                ciudadesAIncluir.splice(i, 1);
                continuarCiclo = false;
            }
        }
        actualizarInterfazDeCiudadesIncluidas();
    }
}
