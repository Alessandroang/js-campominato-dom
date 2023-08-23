// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba.
// BONUS:
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

// Seleziona gli elementi HTML
const buttonGrid = document.getElementById("Button-grid");
const difficultySelect = document.getElementById("difficulty-select");
const gridTable = document.getElementById("grid");
const scoreMessage = document.getElementById("score-message"); // Elemento HTML per visualizzare il punteggio

// Variabili globali per tenere traccia dello stato del gioco
let score = 0; // Punteggio
let gameEnded = false; // Stato della partita (terminata o in corso)
let bombs = []; // Array di numeri delle bombe
let maxNumber; // Numero massimo possibile
let bombsCount; // Numero di bombe

// Funzione per generare numeri casuali unici all'interno di un intervallo
function generateRandomNumbers(min, max, count) {
  const uniqueNumbers = [];

  while (uniqueNumbers.length < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!uniqueNumbers.includes(randomNumber)) {
      uniqueNumbers.push(randomNumber);
    }
  }

  return uniqueNumbers;
}

// Funzione per gestire il clic su una cella
function handleClick(cellaCliccata) {
  if (gameEnded) return;

  const numeroCella = parseInt(cellaCliccata.textContent);

  if (bombs.includes(numeroCella)) {
    scoreMessage.textContent = "Hai calpestato una bomba! Partita terminata.";
    cellaCliccata.style.backgroundColor = "red";
    gameEnded = true;
  } else {
    scoreMessage.textContent = "Cella sicura. Continua a giocare.";
    cellaCliccata.style.backgroundColor = "blue";
    score++;

    if (score === maxNumber - bombsCount) {
      scoreMessage.textContent = "Complimenti, hai vinto!";
      gameEnded = true;
    }
  }

  if (gameEnded) {
    scoreMessage.textContent += ` Punteggio: ${score}`;
  }
}

// Aggiungi un evento click al bottone per generare la griglia
buttonGrid.addEventListener("click", function () {
  const selectedDifficulty = difficultySelect.value;

  // Imposta il numero massimo possibile e il numero di bombe in base alla difficoltà selezionata
  if (selectedDifficulty === "facile") {
    maxNumber = 100;
    bombsCount = 16;
  } else if (selectedDifficulty === "medio") {
    maxNumber = 81;
    bombsCount = 16;
  } else if (selectedDifficulty === "difficile") {
    maxNumber = 49;
    bombsCount = 16;
  }

  // Genera numeri casuali per le bombe
  bombs = generateRandomNumbers(1, maxNumber, bombsCount);
  console.log("Numeri delle bombe:", bombs);

  // Resetta la griglia e il punteggio
  gridTable.innerHTML = "";
  gridTable.className = selectedDifficulty;
  score = 0;
  gameEnded = false;
  scoreMessage.textContent = "Punteggio: "; // Resettare il punteggio nel documento HTML

  // Crea la griglia di gioco
  for (let i = 1; i <= maxNumber; i++) {
    const cellaGrid = document.createElement("div");
    cellaGrid.className = "cella";
    cellaGrid.textContent = i;

    cellaGrid.addEventListener("click", function () {
      handleClick(cellaGrid);
    });

    gridTable.appendChild(cellaGrid);
  }
});
