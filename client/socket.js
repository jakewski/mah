import io from 'socket.io-client';
import { addPlayerThunk } from './store'
import store from './store'
const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');
});

// socket.on('addPlayer', socketId => {
//   console.log('hitit')
//   store.dispatch(addPlayerThunk(socketId));
// })

// let players = [];
// socket.on('grabId', function (socketId) {
//   players.push(socketId);
// })


// socket.on('dosomethin', function () {
//   console.log('was submitted')
// })

// export const emitSubmitAnswer = answer => socket.emit('submitAnswer', { answer } );

export default socket
