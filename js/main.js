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
      '🇨🇴 Bogota': 'America/Bogota',
      '🇦🇷 Buenos Aires': 'America/Buenos_Aires',
      '🇦🇷 Cordoba': 'America/Cordoba',
      '🇺🇾 Montevideo': 'America/Montevideo',
      '🇨🇱 Santiago de Chile': 'America/Santiago',
      '🇵🇾 Asuncion': 'America/Asuncion',
      '🇧🇴 La Paz': 'America/La_Paz',
      '🇵🇪 Lima': 'America/Lima',
      '🇪🇨 Guayaquil': 'America/Guayaquil',
      '🇵🇦 Panama': 'America/Panama',
      '🇸🇻 El Salvador': 'America/El_Salvador',
      '🇵🇷 Puerto Rico': 'America/Puerto_Rico',
      '🇲🇽 Ciudad de Mexico': 'America/Mexico_City'    
      // Se agregan ciudades segun se necesiten 
    };

    return zonasHorarias[ciudad] || 'UTC';
  }

  // Documentacion de moment-timezone: https://momentjs.com/timezone/docs/ 