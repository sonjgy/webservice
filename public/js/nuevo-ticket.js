//referencias html
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();
socket.on('connect', () => {
    // console.log('Conectado');
    
    btnCrear.disabled = false;//si habilita

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = false;//si disabilita
});

socket.on('ultimo-ticket', (ultimo) => {
    lblNuevoTicket.innerText = 'Ticket ' + ultimo;
})


btnCrear.addEventListener('click', () => {


    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    });

});