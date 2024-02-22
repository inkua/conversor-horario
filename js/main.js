function mostrarHoraConvertida() {
    const hora = (document.getElementById('horaLocal').value);
    const ciudadOrigen = document.getElementById('ciudadOrigen').value;
    const ciudadDestino = document.getElementById('ciudadDestino').value;
    const horaEnDestino = convertirHora(hora, ciudadOrigen, ciudadDestino);
  
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('resultado').innerHTML = `La hora en ${ciudadDestino} es: ${horaEnDestino}`;

  }

function convertirHora(hora, ciudadOrigen, ciudadDestino) {
    const horaMoment = moment(hora, 'HH:mm', true); 
    //true valida que la hora sea correcta, lo recomienda la documentacion
    /*                 moment(String, String, boolean);
    genera un objeto moment llamado horaMoment para posteriormente trabajar con los metodos hours y minutes sobre el*/
  
    const fechaOrigen = moment.tz(moment(), obtenerZonaHoraria(ciudadOrigen));
  
    fechaOrigen.hours(horaMoment.hours());
    fechaOrigen.minutes(horaMoment.minutes());
  
    const horaDestino = fechaOrigen.clone().tz(obtenerZonaHoraria(ciudadDestino)).format('hh:mm A');
  
    return horaDestino;
    }

  function obtenerZonaHoraria(ciudad) {
    const zonasHorarias = {
      'Buenos Aires': 'America/Argentina/Buenos_Aires',
      'La paz': 'America/La_Paz',
      'Sao Paulo': 'America/Sao_Paulo',
      'Chile': 'America/Santiago',
      'Bogota': 'America/Bogota',
      'Ecuador': 'America/Guayaquil',
      'Paraguay': 'America/Asuncion',
      'Peru': 'America/Lima',
      'Uruguay': 'America/Montevideo',
      'Venezuela': 'America/Caracas',
      // Se agregan ciudades segun se necesiten 
    };

    return zonasHorarias[ciudad] || 'UTC';
  }

  // Documentacion de moment-timezone: https://momentjs.com/timezone/docs/ 