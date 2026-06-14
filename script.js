const rooms = {
  grandpa: {
    title: "Звонок дедушке",
    roomName: "chat-s-dedushkoy-grandpa-mvp",
    password: "1234",
  },
  grandma: {
    title: "Звонок бабушке",
    roomName: "chat-s-dedushkoy-grandma-mvp",
    password: "5678",
  },
};

const welcome = document.querySelector("#welcome");
const call = document.querySelector("#call");
const callTitle = document.querySelector("#callTitle");
const meetContainer = document.querySelector("#meet");
const callButtons = document.querySelectorAll("[data-call-target]");
const leaveCallButton = document.querySelector("#leaveCall");
const passwordModal = document.querySelector("#passwordModal");
const passwordForm = document.querySelector("#passwordForm");
const passwordTitle = document.querySelector("#passwordTitle");
const passwordInput = document.querySelector("#passwordInput");
const passwordError = document.querySelector("#passwordError");
const cancelPasswordButton = document.querySelector("#cancelPassword");

let api = null;
let selectedRoom = null;
let jitsiApiLoad = null;

function loadJitsiApi() {
  if (window.JitsiMeetExternalAPI) {
    return Promise.resolve();
  }

  if (jitsiApiLoad) {
    return jitsiApiLoad;
  }

  jitsiApiLoad = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Не удалось загрузить видеочат"));
    document.head.append(script);
  });

  return jitsiApiLoad;
}

function requestPassword(roomKey) {
  selectedRoom = rooms[roomKey];

  if (!selectedRoom) {
    return;
  }

  passwordTitle.textContent = selectedRoom.title;
  passwordInput.value = "";
  passwordError.textContent = "";
  passwordModal.classList.remove("is-hidden");
  passwordInput.focus();
}

async function startCall(room) {
  welcome.classList.add("is-hidden");
  call.classList.remove("is-hidden");
  callTitle.textContent = room.title;

  if (api) {
    return;
  }

  await loadJitsiApi();

  api = new JitsiMeetExternalAPI("meet.jit.si", {
    roomName: room.roomName,
    parentNode: meetContainer,
    width: "100%",
    height: "100%",
    configOverwrite: {
      prejoinPageEnabled: true,
      startWithAudioMuted: false,
      startWithVideoMuted: false,
    },
    interfaceConfigOverwrite: {
      DEFAULT_REMOTE_DISPLAY_NAME: "Гость",
      SHOW_JITSI_WATERMARK: false,
      SHOW_WATERMARK_FOR_GUESTS: false,
    },
    userInfo: {
      displayName: "Семья",
    },
  });
}

function leaveCall() {
  if (api) {
    api.dispose();
    api = null;
  }

  meetContainer.replaceChildren();
  call.classList.add("is-hidden");
  welcome.classList.remove("is-hidden");
}

callButtons.forEach((button) => {
  button.addEventListener("click", () => {
    requestPassword(button.dataset.callTarget);
  });
});

passwordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!selectedRoom) {
    return;
  }

  if (passwordInput.value.trim() !== selectedRoom.password) {
    passwordError.textContent = "Неверный пароль";
    passwordInput.select();
    return;
  }

  passwordModal.classList.add("is-hidden");

  try {
    await startCall(selectedRoom);
  } catch (error) {
    call.classList.add("is-hidden");
    welcome.classList.remove("is-hidden");
    passwordModal.classList.remove("is-hidden");
    passwordError.textContent = error.message;
  }
});

cancelPasswordButton.addEventListener("click", () => {
  passwordModal.classList.add("is-hidden");
});

leaveCallButton.addEventListener("click", leaveCall);
