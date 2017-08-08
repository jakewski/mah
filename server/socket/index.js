module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.emit('addPlayer', socket.id);

    // socket.on('submitAnswer', payload => {
    //   console.log(payload.answer);
    // })


    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
