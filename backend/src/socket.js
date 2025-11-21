let io;

function initSocket(server) {
  io = require('socket.io')(server, {
    cors: {
      origin: '*', // adjust in production to your frontend URL
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Join user to a room (e.g., their userId)
    socket.on('joinRoom', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    // Notify a tutor/student about a new session
    socket.on('newSession', (sessionData) => {
      const { tutorId, studentId } = sessionData;
      io.to(tutorId).emit('sessionNotification', sessionData);
      io.to(studentId).emit('sessionNotification', sessionData);
    });

    // End session notification
    socket.on('endSession', (sessionData) => {
      const { tutorId, studentId } = sessionData;
      io.to(tutorId).emit('sessionEnded', sessionData);
      io.to(studentId).emit('sessionEnded', sessionData);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

// Emit to all (optional)
function emitEvent(event, data) {
  if (io) io.emit(event, data);
}

module.exports = { initSocket, emitEvent };