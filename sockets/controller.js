const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {

     
   
   socket.on('enviar-mensaje', (payload,callback) => {
        // el payload que recivo desde enviar mensake lo re envio enseguida
        //this.io.emit('enviar-mensaje', payload);
        const id = '123456';// simulamos un respuesta de una db con id 

        if (!callback) return;

        callback({ id, usuario: 'super babuu' });
        socket.broadcast.emit('enviar-mensaje', payload);
        //con el callback solo el cliente que ha enviado el evento riceve la respuesta del server. con emit la ricevano tutti
        // con este callback es como se hubieramo hecho una peticion http al server pero asi la hacemos por web socket

    })
}

module.exports = {

    socketController
}


/*
con el callback ritorno il msg solo al cliente che ha inviato il messaggio
con il broadcast lo invio a tutti.

*/