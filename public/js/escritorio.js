//referencias html

const lblEscritorio = document.querySelector('h1'); //selecicona el primer h1 que encuentra
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('el escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerHTML = escritorio;
divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;//si habilita

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = false;//si disabilita
});



socket.on('tickets-pendientes', (pendientes) => {
    if (pendientes === 0) {
        lblPendientes.style.display = 'none';
    } else {

        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes
    }
})






btnAtender.addEventListener('click', () => {

    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {

        if (!ok) {
            lblTicket.innerText = 'Nadie  ';
            return divAlerta.style.display = '';
        }
        //se no ho error allora ho un ticket
        lblTicket.innerText = 'Ticket  ' + ticket.numero



    })
    // socket.emit('siguiente-ticket', null, (ticket) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});