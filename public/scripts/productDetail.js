
import { io } from 'http://cdn.socket.io/4.3.2/socket.io.esm.min.js';
            

const socket = io();

const this_product = '<%= products.id %>';

const form = document.getElementById('form');
const input = document.getElementById('input');
const messagesUl = document.getElementById('messages');

socket.on('chat message', (data_package) => {
    if ( data_package.p_id !== this_product) return false;
/*                 if ( dtime > 100) return false;
    if (! user.loggd) return false; */ 

    const item = `<li>${data_package.msg}</li>`;
    messagesUl.insertAdjacentHTML('beforeend', item)
});

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (input.value) {
        socket.emit('chat message', {
            p_id: this_product,
            time_stamp: Date.now(),
            msg: input.value,
        })
        input.value = ''
    }
});