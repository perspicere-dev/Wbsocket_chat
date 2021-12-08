
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io(); //rozkaz dla JS-a: zainicjuj nowego klienta socketowego i zachowaj referencje do niego pod stałą socket

let userName;

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('newJoiner', ({ author, content }) => addMessage(author, content));
socket.on('userRemove', ({ author, content }) => addMessage(author, content));
// lub: socket.on('message', (event) => addMessage(event.author, event.content)) // obserwuj serwer, czekając na zdarzenie message, jeśli je wykryjesz, odpal funkcję, która ma przyjąć przesyłane przez serwer dane jako event, a następnie wykorzystaj je do odpowiedniego wywołania funkcji addMessage


function login(event) {
  event.preventDefault();
  if(userNameInput.value) {
      userName = userNameInput.value;
      loginForm.classList.remove('show');
      messagesSection.classList.add('show');
      socket.emit('join', { name: userName, id: socket.id });
      
  } else {
      alert('enter your name')
  }
}

function addMessage (author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) {
        message.classList.add('message--self');   
    } 
    message.innerHTML = `
        <h3 class="message__author">${userName === author ? 'You' : author }</h3>
        <div class="message__content">
            ${content}
        </div>
    `;
    messagesList.appendChild(message);
}

function sendMessage(event) {
    event.preventDefault();
    
    if(messageContentInput.value){
        addMessage(userName, messageContentInput.value);
        socket.emit('message', { author: userName, content: messageContentInput.value })
        messageContentInput.value = '';
    } else {
      alert('type smth')
    }
  }

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
