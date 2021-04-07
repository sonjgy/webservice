const path = require('path');
const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = '';



    }
}


class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }
    //getter
    get toJson() {

        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,

        }

    }



    init() {
        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');
        if (hoy === this.hoy) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            //es otro dia
            this.guardarDB();


        }
    }





    guardarDB() {

        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }


    seguiente() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.guardarDB();
        return 'ticket' + ticket.numero;
    }

    atenderTicket(escritorio) {

        //no tenemos tickets

        if (this.tickets.length === 0) {
            return null;
        }
        const ticket = this.tickets.shift();//retonra el primer valor y lo quita del array
        ticket.escritorio = escritorio; // asigno al ticket un escritorio

        this.ultimos4.unshift(ticket)//añadimo un elemento al inicio
        if (this.ultimos4.length > 4) {

            this.ultimos4.splice(-1, 1);// eliminiamo tutti i valori dell'array superiori alla 4 posizione

        }
        this.guardarDB();
        return ticket;


    }




}

module.exports = TicketControl