import io from 'socket.io-client';
import { addPlayerThunk } from './store'
import store from './store'
const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');
});

//testing
//socket.emit('createGame', '1bh23asd3')
//socket.emit('addPlayerToGame', '1bh23asd3')

export default socket
