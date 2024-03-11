// ciudades disponibles
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

document.getElementById("botonConvertir").addEventListener("click", (e) => {
    e.preventDefault();
    const hora = document.getElementById("horaLocal").value;
    const ciudadOrigen = document.getElementById("ciudadOrigen").value;
    const ciudadDestino = document.getElementById("ciudadDestino").value;
    const horaEnDestino = convertirHora(hora, ciudadOrigen, ciudadDestino);

    document.getElementById("resultado").style.display = "block";
    document.getElementById("resultado").innerHTML = `La hora en ${
        ciudades.find((c) => c.codigo === ciudadDestino).nombre
    } es: ${horaEnDestino}`;
});

function convertirHora(hora, ciudadOrigen, ciudadDestino) {
    const horaMoment = moment(hora, "HH:mm", true);
    //true valida que la hora sea correcta, lo recomienda la documentacion
    /*                 moment(String, String, boolean);
    genera un objeto moment llamado horaMoment para posteriormente trabajar con los metodos hours y minutes sobre el*/

    const fechaOrigen = moment.tz(moment(), obtenerZonaHoraria(ciudadOrigen).codigo);

    fechaOrigen.hours(horaMoment.hours());
    fechaOrigen.minutes(horaMoment.minutes());

    const horaDestino = fechaOrigen
        .clone()
        .tz(obtenerZonaHoraria(ciudadDestino).codigo)
        .format("hh:mm A");

    return horaDestino;
}

// function obtenerZonaHoraria(ciudad) {
//     const zonasHorarias = {
//         "🇨🇴 Bogota": "America/Bogota",
//         "🇦🇷 Buenos Aires": "America/Buenos_Aires",
//         "🇦🇷 Cordoba": "America/Cordoba",
//         "🇺🇾 Montevideo": "America/Montevideo",
//         "🇨🇱 Santiago de Chile": "America/Santiago",
//         "🇵🇾 Asuncion": "America/Asuncion",
//         "🇧🇴 La Paz": "America/La_Paz",
//         "🇵🇪 Lima": "America/Lima",
//         "🇪🇨 Guayaquil": "America/Guayaquil",
//         "🇵🇦 Panama": "America/Panama",
//         "🇸🇻 El Salvador": "America/El_Salvador",
//         "🇵🇷 Puerto Rico": "America/Puerto_Rico",
//         "🇲🇽 Ciudad de Mexico": "America/Mexico_City",
//         // Se agregan ciudades segun se necesiten
//     };

function obtenerZonaHoraria(ciudad) {
    return ciudades.find((c) => c.codigo === ciudad);
}

ciudades.forEach((ciudad) => {
    const opcionOrigen = document.createElement("option");
    const opcionDestino = document.createElement("option");

    opcionOrigen.value = ciudad.codigo;
    opcionOrigen.textContent = ciudad.nombre;
    opcionDestino.value = ciudad.codigo;
    opcionDestino.textContent = ciudad.nombre;

    document.getElementById("ciudadOrigen").appendChild(opcionOrigen);
    document.getElementById("ciudadDestino").appendChild(opcionDestino);
});

// Documentacion de moment-timezone: https://momentjs.com/timezone/docs/
