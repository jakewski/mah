import io from 'socket.io-client';
import { addPlayerThunk } from './store'
import store from './store'
const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');
  //commenting out line 9 for quicker refresh while testing, but you can put it back in
  //socket.emit('addPlayertoRoom', prompt("What is your name? "));
});

socket.on('updateRooms', function(rooms, currentRoom) {
  //add a room to the rooms array
})

socket.on('updateChat', function(playerName, data) {
  //do some stuff
})

// socket.on('addPlayer', socketId => {
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

//testing
//socket.emit('createGame', '1bh23asd3')
//socket.emit('addPlayerToGame', '1bh23asd3')

export default socket
