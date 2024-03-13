const ciudades = [
    {
        nombre: "Bogotá",
        codigo: "America/Bogota",
    },
    {
        nombre: "Buenos Aires",
        codigo: "America/Buenos_Aires",
    },
    {
        nombre: "Cordoba",
        codigo: "America/Cordoba",
    },
    {
        nombre: "Montevideo",
        codigo: "America/Montevideo",
    },

    {
        nombre: "Santiago de Chile",
        codigo: "America/Santiago",
    },
    {
        nombre: "Asunción",
        codigo: "America/Asuncion",
    },
    {
        nombre: "La Paz",
        codigo: "America/La_Paz",
    },
    {
        nombre: "Lima",
        codigo: "America/Lima",
    },
    {
        nombre: "Guayaquil",
        codigo: "America/Guayaquil",
    },
    {
        nombre: "Panama",
        codigo: "America/Panama",
    },
    {
        nombre: "El Salvador",
        codigo: "America/El_Salvador",
    },
    {
        nombre: "Puerto Rico",
        codigo: "America/Puerto_Rico",
    },
    {
        nombre: "Ciudad de Mexico",
        codigo: "America/Mexico_City",
    },
];
ciudades.sort((a, b) => a.nombre.localeCompare(b.nombre));
const ciudadesAIncluir = [];

//Este objeto almacena las conversiones para el formato de las fechas,
//por defecto toString() devuelve valores en ingles.
const traductor = {
    dias: {
        Mon: "Lunes",
        Tue: "Martes",
        Wed: "Miércoles",
        Thu: "Jueves",
        Fri: "Viernes",
        Sat: "Sábado",
        Sun: "Domingo",
    },
    meses: {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
    },
};

window.addEventListener("load", programa);
function programa() {
    const selectorDeOrigen = document.getElementById("idSelectOriginCity");
    const selectorDeDestino = document.getElementById("idSelectDestCity");
    const listaDePaisesIncluidos = document.getElementById("idSelectedCities");

    // Agregamos las ciudades disponibles a los selectores
    ciudades.forEach((ciudad) => {
        const opcionOrigen = document.createElement("option");
        const opcionDestino = document.createElement("option");

        opcionOrigen.value = ciudad.codigo;
        opcionOrigen.textContent = ciudad.nombre;
        opcionDestino.value = ciudad.codigo;
        opcionDestino.textContent = ciudad.nombre;

        selectorDeOrigen.appendChild(opcionOrigen);
        selectorDeDestino.appendChild(opcionDestino);
    });

    // Cada vez que se elija una opcion de ciudad destino,
    // se agrega a la lista de ciudades a incluir y se actualiza la interfaz
    selectorDeDestino.addEventListener("change", () => {
        if (selectorDeDestino.value) {
            const seEncuentraEnLaLista = ciudadesAIncluir.find(
                (ciudad) => ciudad.codigo === selectorDeDestino.value
            );

            if (!seEncuentraEnLaLista) {
                const ciudadNueva = ciudades.find(
                    (ciudad) => ciudad.codigo === selectorDeDestino.value
                );

                ciudadesAIncluir.push(ciudadNueva);
                actualizarInterfazDeCiudadesIncluidas();
            }
        }
    });

    //Generar resultado
    const formulario = document.getElementById("idInputs");
    const resultadoContenedor = document.getElementById("idOutputContent");
    const boton = document.getElementById("idBtnSubmit");
    boton.addEventListener("click", generarResultado);

    //Funciones
    function generarResultado() {
        if (formulario.reportValidity()) {
            // Reseteo del contenedor con la respuesta.
            resultadoContenedor.innerHTML = "";

            const titulo = document.getElementById("idTitle").value;
            const descripcion = document.getElementById("idDescription").value;
            const link = document.getElementById("idLink").value;
            const fecha = document.getElementById("idDate").value;
            const ciudadDeOrigen = document.getElementById("idSelectOriginCity").value;

            const tituloContenedor = document.createElement("h2");
            let descripcionContenedor = "Sin descripción";
            if (descripcion) {
                descripcionContenedor = document.createElement("p");
            }
            const linkContenedor = document.createElement("a");
            const fechasContenedor = document.createElement("ul");
            const contenedorBotonCopiar = document.createElement("button");
            const botonDeCopiar = document.createElement("img");

            tituloContenedor.textContent = titulo;
            descripcionContenedor.textContent = descripcion;
            linkContenedor.textContent = "Link a la reunión: " + link;
            linkContenedor.href = link;

            botonDeCopiar.src = "../assets/img/copy.png";
            botonDeCopiar.alt = "Icono de una hoja encima de otra.";
            contenedorBotonCopiar.appendChild(botonDeCopiar);
            contenedorBotonCopiar.type = "button";
            contenedorBotonCopiar.id = "idCopy";

            //Creamos la fecha ingresada en su ciudad de origen utilizando momentjs,
            //Luego, iteramos las ciudades a incluir y hacemos las conversiones
            const fechaInicial = moment.tz(fecha, ciudadDeOrigen);
            let acumuladorDeFechasParaCopiar = "";
            ciudadesAIncluir.forEach((ciudad) => {
                const fechaContenedor = document.createElement("li");
                const fechaFinal = fechaInicial.clone().tz(ciudad.codigo);
                const [dia, mes, numeroDia, anio, hora] = fechaFinal.toString().split(" ");
                const resultado = `${ciudad.nombre}: ${traductor.dias[dia]} ${numeroDia}/${
                    traductor.meses[mes]
                } - ${hora.slice(0, 5)}`;

                acumuladorDeFechasParaCopiar += resultado + "\n";

                fechaContenedor.textContent = resultado;
                fechasContenedor.appendChild(fechaContenedor);
            });

            resultadoContenedor.appendChild(tituloContenedor);
            resultadoContenedor.appendChild(descripcionContenedor);
            resultadoContenedor.appendChild(linkContenedor);
            resultadoContenedor.appendChild(fechasContenedor);

            //Agregamos el evento click de poder copiar al portapapeles
            contenedorBotonCopiar.addEventListener("click", () => {
                const textoACopiar =
                    titulo +
                    "\n" +
                    descripcion +
                    "\n\n" +
                    "Link a la reunión: " +
                    link +
                    "\n\n" +
                    acumuladorDeFechasParaCopiar;
                console.log(textoACopiar);

                // Generar un elemento para poder realizar la copia del texto y eliminarlo.
                const elementoTemporal = document.createElement("textarea");
                elementoTemporal.value = textoACopiar;
                document.body.appendChild(elementoTemporal);
                elementoTemporal.select();
                //execCommand esta deprecado por evidentes problemas de
                //seguridad, lo cual no nos preocupa porque no tenemos informacion sensible.
                document.execCommand("copy");
                document.body.removeChild(elementoTemporal);
                alert("Texto copiado exitosamente");
            });
            resultadoContenedor.appendChild(contenedorBotonCopiar);
        }
    }

    function actualizarInterfazDeCiudadesIncluidas() {
        //Se borra la lista y se renderiza de nuevo.
        listaDePaisesIncluidos.innerHTML = "";
        ciudadesAIncluir.forEach((ciudad) => {
            const ciudadAgregada = document.createElement("li");
            const cruzRoja = document.createElement("img");

            ciudadAgregada.textContent = ciudad.nombre;
            cruzRoja.src = "../assets/img/cross.png";
            cruzRoja.alt = "Icono con forma de una cruz roja.";
            cruzRoja.addEventListener("click", () => eliminarOpcion(ciudad));

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
