const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);


    socket.on('siguiente-ticket', (payload, callback) => {
        // el payload que recivo desde enviar mensake lo re envio enseguida
        //this.io.emit('enviar-mensaje', payload);
        if (!callback) return;
        const siguiente = ticketControl.seguiente();
        callback(siguiente);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

    });

    socket.on('atender-ticket', ({ escritorio }, callback) => {

        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'el escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        //tengo que actualizar la cola cada vez que se atiende un ticket
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if (!ticket) {
            callback({
                ok: false,
                msg: ' ya no hay ticket pendientes'
            });
        } else {

            callback({
                ok: true,
                ticket
            })


        }

    })




}

module.exports = {

    socketController
}


/*
con el callback ritorno il msg solo al cliente che ha inviato il messaggio
con il broadcast lo invio a tutti.

*/