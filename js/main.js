function mostrarHoraConvertida() {
    const hora = document.getElementById('hora{local').value;
    const paisOrigen = document.getElementById('paisOrigen').value;
    const paisDestino = document.getElementById('paisDestino').value;
    const titulo = document.getElementById('title').value;
    const descripcion = document.getElementById('description').value;
    const link = document.getElementById('linkMeet').value;
    const horaEnDestino = convertirHora(hora, paisOrigen, paisDestino);

    document.getElementById('resultado').style.display = 'block';
    console.log(hora);
    document.getElementById(
        'tituloResultado'
    ).innerHTML = `Titulo de la reunion: ${titulo}`;
    document.getElementById('descripcionResultado').innerHTML = descripcion;
    document.getElementById('linkResultado').innerHTML = link;
    document.getElementById(
        'horaResultado'
    ).innerHTML = `La hora en ${paisDestino} es: ${horaEnDestino}`;
}

function convertirHora(hora, paisOrigen, paisDestino) {
    const horaMoment = moment(hora, 'HH:mm', true);
    //true valida que la hora sea correcta, lo recomienda la documentacion
    /*                 moment(String, String, boolean);
    genera un objeto moment llamado horaMoment para posteriormente trabajar con los metodos hours y minutes sobre el*/

    const fechaOrigen = moment.tz(moment(), obtenerZonaHoraria(paisOrigen));

    fechaOrigen.hours(horaMoment.hours());
    fechaOrigen.minutes(horaMoment.minutes());

    const horaDestino = fechaOrigen
        .clone()
        .tz(obtenerZonaHoraria(paisDestino))
        .format('hh:mm A');

    return horaDestino;
}

function obtenerZonaHoraria(pais) {
    const zonasHorarias = {
        Argentina: 'America/Argentina/Buenos_Aires',
        Bolivia: 'America/La_Paz',
        Brazil: 'America/Sao_Paulo',
        Chile: 'America/Santiago',
        Colombia: 'America/Bogota',
        Ecuador: 'America/Guayaquil',
        Paraguay: 'America/Asuncion',
        Peru: 'America/Lima',
        Uruguay: 'America/Montevideo',
        Venezuela: 'America/Caracas',
        // Se agregan paises segun se necesiten
    };

    return zonasHorarias[pais] || 'UTC';
}

// Documentacion de moment-timezone: https://momentjs.com/timezone/docs/
