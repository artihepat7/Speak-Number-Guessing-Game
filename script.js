const msgEl = document.getElementById("msg");

const randomNumber = getRandomNumber();
console.log("Number:", randomNumber);

//get random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//write message in dom
function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You Said:</div>
  <span class="box">${msg}</span>
  `;
}

//check number valid or not
function checkNumber(msg) {
  //check number or not
  const num = +msg;
  if (Number.isNaN(num)) {
    msgEl.innerHTML =
      msgEl.innerHTML +
      `
    <div>Enter a valid number..</div>`;
    return;
  }

  //number within range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Enter a number between 1 to 100</div>`;
    return;
  }

  //check number
  if (num === randomNumber) {
    document.body.innerHTML = `
      <h2>Congrats!You have guessed the number!<br></br>It Was ${num}</h2>
      <button id='play-again' class='play-again'>Play Again</button>`;
  } else if (num > randomNumber) {
    msgEl.innerHTML += `<div>GO LOWER</div>`;
  } else {
    msgEl.innerHTML += `<div>GO HIGHER</div>`;
  }
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
//SpeechRecognition
let recognition = new window.SpeechRecognition();
recognition.start();

//capture user speak
function onSpeak() {
  const msg = event.results[0][0].transcript;
  console.log(msg);
  writeMessage(msg);
  checkNumber(msg);
}

//getting result after speaking
recognition.addEventListener("result", onSpeak);

//again start listening
recognition.addEventListener("end", () => recognition.start());

//play again button event
document.body.addEventListener("click", () => {
  console.log(event.target);
  if (event.target.id === "play-again") {
    window.location.reload();
  }
});
