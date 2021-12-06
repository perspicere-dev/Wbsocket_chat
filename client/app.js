//HTML references
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

//GLOBAL BINDING 
let userName;

login = (event) => {
  event.preventDefault();
  console.log('asfwf')
}

loginForm.addEventListener('submit', login());
