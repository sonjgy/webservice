

const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessaje = document.querySelector('#txtMessaje');
const btnEnviar = document.querySelector('#btnEnviar');
//socket del cliente
const socket = io();

// on escucha eventos 
socket.on('connect', () => {

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

})

socket.on('disconnect', () => {
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';


})

btnEnviar.addEventListener('click', () => {
// non si manda texto plano ma un obj con muchas informaciones
    const mensaje = txtMessaje.value;
    const payload = {
        mensaje,
        id: '123abc',
        fecha: new Date().getTime()

    }

    socket.emit('enviar-mensaje', payload);


})