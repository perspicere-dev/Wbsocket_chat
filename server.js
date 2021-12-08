const express = require('express');
const path = require('path');
const socket = require('socket.io');


const app = express();

app.use(express.static(path.join(__dirname, '/client'))); //

const messages = [];
const users = [];

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => { 
    console.log('Oh, I\'ve got something from ' + socket.id) 
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('join', (user) => { 
    users.push(user);
    console.log(users);
    socket.broadcast.emit('newJoiner', {author: 'ChatBot', content: `${user.name} <br> <i>has joined the conversation<i>`});
  });

  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + 'has left');
    console.log('tablica users: ', users)
    if(users.length) {
      const foundUser = users.find(element => element.id === socket.id);
      socket.broadcast.emit('userRemove', {author: 'ChatBot', content: `${foundUser.name} <br> <i>has left the conversation<i>`});
      console.log(users)
    }
    users.splice(users.indexOf(socket.id, 1));
  });
  console.log('I\'ve added a listener on message event \n');
  });

