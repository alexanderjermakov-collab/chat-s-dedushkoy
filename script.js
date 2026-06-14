const roomName = "chat-s-dedushkoy-family-mvp";

const welcome = document.querySelector("#welcome");
const call = document.querySelector("#call");
const meetContainer = document.querySelector("#meet");
const startCallButton = document.querySelector("#startCall");
const leaveCallButton = document.querySelector("#leaveCall");

let api = null;

function startCall() {
  welcome.classList.add("is-hidden");
  call.classList.remove("is-hidden");

  if (api) {
    return;
  }

  api = new JitsiMeetExternalAPI("meet.jit.si", {
    roomName,
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

startCallButton.addEventListener("click", startCall);
leaveCallButton.addEventListener("click", leaveCall);
