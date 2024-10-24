// premo un pulsante start
// appare a schermo i numeri casuali e parte il count di 30 secondi
// alla fine del count i numeri spariscono e appare il form
// appare anche un pulsante che dice ok
// dopo aver messo i dati vengono messi in un array
// l'array si confronta con quello dei numeri precedenti
// restituisce sotto una risposta in cui dice il risultato di un confronto tra la soluzione e il risultato fornito

const countdown = document.getElementById("countdown");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const numberList = document.querySelectorAll(".rndNumber");
const answerForm = document.getElementById("answers-form");
const list = document.getElementById("numbers-list");
const conferma = document.getElementById("conferma");
const message = document.getElementById("message");

let numeriCasuali = [];

function generaArrayNumeriCasuali(lunghezza, min, max) {
  let array = [];
  for (let i = 0; i < lunghezza; i++) {
    let numeroCasuale = Math.floor(Math.random() * (max - min + 1)) + min;
    array.push(numeroCasuale);
  }
  return array;
}

startButton.addEventListener("click", () => {
  startButton.classList.add("d-none");
  restartButton.classList.remove("d-none");
  numeriCasuali = generaArrayNumeriCasuali(5, 0, 50);
  numberList.forEach((item, i) => {
    item.innerText = numeriCasuali[i];
  });
  console.log(numeriCasuali);
  let count = 5;
  countdown.innerText = count;
  const countdownTimer = setInterval(() => {
    count--;
    countdown.innerText = count;
    if (count <= 0) {
      clearInterval(countdownTimer);
      list.classList.add("d-none");
      answerForm.classList.remove("d-none");
    }
  }, 1000);
});

function confrontaArray(array1, array2) {
  let countGiusti = 0;
  array1.forEach((value) => {
    if (array2.includes(value)) {
      countGiusti++;
    }
  });
  return countGiusti;
}

conferma.addEventListener("click", (event) => {
  event.preventDefault();
  const inputs = document.querySelectorAll("#input-group .form-control");
  let userNumbers = [];
  let valid = true;
  inputs.forEach((input) => {
    userNumbers.push(Number(input.value));
  });

  inputs.forEach((input) => {
    let num = Number(input.value);
    if (isNaN(num) || num < 0 || num > 50) {
      valid = false;
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
      userNumbers.push(num);
    }
  });

  if (!valid) {
    message.innerText = "Per favore inserisci numeri validi tra 0 e 50.";
    return;
  }
  const numeriGiusti = confrontaArray(numeriCasuali, userNumbers);
  message.innerText = `Hai indovinato ${numeriGiusti} numeri!.`;
    console.log(userNumbers);
    conferma.classList.add("d-none")
    answerForm.classList.add("d-none")
});

restartButton.addEventListener("click", () => {
  location.reload();
});
