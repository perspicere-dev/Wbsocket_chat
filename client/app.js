//HTML references
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

//GLOBAL BINDING 
let userName;

function login(event) {
  event.preventDefault();
  console.log('asfwf')
  if(userNameInput.value) {
      userName = userNameInput.value;
      loginForm.classList.remove('show');
      messagesSection.classList.add('show')
  } else {
      alert('enter your name')
  }
}

const sendMessage = (event) => {
  event.preventDefault();
  
  if(messageContentInput.value){
      addMessage(userName, messageContentInput.value);
      messageContentInput.value = '';
  } else {
    alert('type smth')
  }
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
