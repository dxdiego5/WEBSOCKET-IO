const socket = io();

//Pega dados URI
const urlSearcher = new URLSearchParams(window.location.search);

const username = urlSearcher.get('username');
const room = urlSearcher.get('select_room');

const usernameDiv = document.getElementById('username');
usernameDiv.innerHTML = `Online: <strong>${username}</strong> / Sala: <strong>${room}</strong> / Usuarios online: <strong>${0}</strong>`;

socket.emit('select_room', {
    username,
    room,
}, (messages) => {
  messages.forEach((message) => createMessage(message));
});

document.getElementById("message_input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const message = event.target.value;

        const data = {
            room,
            username,
            message,
        }

        socket.emit("message", data);

        event.target.value = "";
    }
});

socket.on("message", data => {
    createMessage(data);
});

function createMessage(data) {
    const messageDiv =  document.getElementById("messages");
    messageDiv.innerHTML += 
    `<div class="new_message">
        <div class="label-msg">
        <div><strong>${data.username}  </strong> </div>
             <p class="data-message">${data.text} - ${dayjs(data.created_at).format("DD/MM HH:mm:ss")}</p>
        </div>
    </div>`;
}

document.getElementById("logout").addEventListener("click", (event) => {
    window.location.href = "index.html";
});