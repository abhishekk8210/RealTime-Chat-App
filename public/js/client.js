const chatForm = document.getElementById("chat-form");
const section = document.querySelector(".section");

// import module

const socket = io.connect();

socket.on("message", (message) => {
  outputMessageOnLeft(message);

  //   Fixing Scroll Issue
  section.scrollTop = section.scrollHeight;
});

// Get name of User
const { name } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit("getUsername", name);

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  //   Emit Message to server
  socket.emit("chatMessage", msg);

  //   clear Input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputMessageOnLeft(message) {
  const div = document.createElement("div");
  div.classList.add("right");
  div.innerHTML = ` <p class="p">
  ${message.username}:<br />
  <span> ${message.time}</span>
</p>

<h4 class="h4">${message.text}</h4>`;
  document.querySelector(".section").appendChild(div);
}
