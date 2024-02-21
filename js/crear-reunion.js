window.addEventListener("load", programa);

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
        nombre: "Montevideo",
        codigo: "America/Montevideo",
    },
];

function programa() {
    /* Agregamos las ciudades disponibles a los selectores */
    const selectorDeOrigen = document.getElementById("idSelectOriginCity");
    const selectorDeDestino = document.getElementById("idSelectDestCity");

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
}
