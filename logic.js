// "use strict";

// function initializeGame() {
//   const gameContainer = document.querySelector(".game_container");
//   const boxes = [...gameContainer.children];

//   // AUDIO VARIABLES
//   const tapAudio = new Audio("Assets/tapAudio.mp3");
//   tapAudio.preload = "auto";
//   const restartAudio = new Audio("Assets/restartAudio.mp3");
//   restartAudio.preload = "auto";
//   // FLAG TO CHECK IF THE SOUND IS ALREADY PLAYING
//   let isTapAudioPlaying = true;
//   let isRestartAudioPlaying = true;

//   let winCard;
//   let restartBtn;
//   let gameOverWindow;
//   let currentPlayer = "X";
//   let gameOver = false;
//   let isBoardFilled = false;
//   let usedPosition = 1;
//   let initialPositionBoxToRemove = 1;
//   let clickedPositions = [];

//   function playTapAudio() {
//     if (!isTapAudioPlaying) {
//       isTapAudioPlaying = true;
//     } else {
//       tapAudio.currentTime = 0;
//     }
//     tapAudio.play();
//   }

//   function playRestartAudio() {
//     if (!isRestartAudioPlaying) {
//       isRestartAudioPlaying = true;
//     } else {
//       restartAudio.currentTime = 0;
//     }
//     restartAudio.play();
//   }

//   function restartGame() {
//     restartBtn.addEventListener("click", instructionsToRestart);
//   }

//   function instructionsToRestart() {
//     if (gameOver === true) {
//       gameOver = false;
//       for (const box of boxes) box.innerText = "";
//       currentPlayer = "X";
//       gameOverWindow.remove();
//       playRestartAudio();
//       usedPosition = 1;
//       initialPositionBoxToRemove = 1;
//       clickedPositions = [];
//       isBoardFilled = false;
//     }
//   }

//   function createGamoOverWindow(playerSymbol1) {
//     winCard = document.createElement("div");
//     winCard.className = `win_card`;
//     getResult(playerSymbol1);

//     restartBtn = document.createElement("button");
//     restartBtn.className = `restart_btn`;
//     restartBtn.innerText = `RESTART`;

//     gameOverWindow = document.createElement("div");
//     gameOverWindow.id = `game_over_window`;

//     addGameOverWindow();
//   }

//   function addGameOverWindow() {
//     gameOverWindow.append(winCard, restartBtn);
//     gameContainer.append(gameOverWindow);
//   }

//   function getResult(playerSymbol2) {
//     if (playerSymbol2 !== `It's a Draw!`) {
//       winCard.innerText = `${playerSymbol2} won`;
//     } else {
//       winCard.innerText = `${playerSymbol2}`;
//     }
//   }

//   function handleIsBoardFilled() {
//     const filledBoxes = boxes.filter((box) => box.innerText !== "");
//     if (filledBoxes.length === 9) {
//       isBoardFilled = true;
//       return true;
//     }
//     return false;
//   }

//   function emptyTheFirstMove() {
//     const boxToRemoveData = clickedPositions.find(
//       (position) => position.clickedPosition === initialPositionBoxToRemove
//     );

//     if (boxToRemoveData) {
//       const boxToClear = document.getElementById(boxToRemoveData.clicked);

//       if (boxToClear) {
//         boxToClear.innerText = "";
//         clickedPositions = clickedPositions.filter(
//           (position) => position.clickedPosition !== initialPositionBoxToRemove
//         );
//         initialPositionBoxToRemove++;
//       }
//     }
//   }

//   function playMove(event) {
//     if (gameOver || (event.target.innerText !== "" && !isBoardFilled)) {
//       return;
//     }

//     if (event.target.innerText === "" || isBoardFilled) {
//       event.target.innerText = currentPlayer;
//       playTapAudio();

//       const clickedBoxData = {
//         clicked: event.target.id,
//         clickedPosition: usedPosition,
//       };
//       clickedPositions.push(clickedBoxData);
//       usedPosition++;

//       if (checkWinner()) {
//         gameOver = true;
//         createGamoOverWindow(currentPlayer);
//         restartGame();
//         return;
//       }

//       currentPlayer = currentPlayer === "X" ? "O" : "X";

//       if (handleIsBoardFilled()) {
//         if (!gameOver) {
//           emptyTheFirstMove();
//         }
//       }
//     }
//   }

//   function checkWinner() {
//     const winningCombinations = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];

//     for (const combination of winningCombinations) {
//       const [a, b, c] = combination;
//       if (
//         boxes[a].innerText &&
//         boxes[a].innerText === boxes[b].innerText &&
//         boxes[b].innerText === boxes[c].innerText
//       ) {
//         return true;
//       }
//     }

//     if (handleIsBoardFilled()) {
//       gameOver = true;
//       createGamoOverWindow(`It's a Draw!`);
//       restartGame();
//       return true;
//     }

//     return false;
//   }

//   gameContainer.addEventListener("click", playMove);
// }

// initializeGame();


"use strict";
function initializeGame() {
  const gameContainer = document.querySelector(".game_container");
  const boxes = [...gameContainer.children];

  // AUDIO VARIABLES
  const tapAudio = new Audio("Assets/tapAudio.mp3");
  tapAudio.preload = "auto";
  const restartAudio = new Audio("Assets/restartAudio.mp3");
  restartAudio.preload = "auto";
  // FLAG TO CHECK IF THE SOUND IS ALREADY PLAYING
  let isTapAudioPlaying = true;
  let isRestartAudioPlaying = true;

  let winCard;
  let restartBtn;
  let gameOverWindow;
  let currentPlayer = "X";
  let gameOver = false;

  function playTapAudio() {
    if (!isTapAudioPlaying) {
      // If the sound is not currently playing
      // Set the flag to indicate that the sound is now playing
      isTapAudioPlaying = true;
    } else {
      // If the sound is already playing
      // Rewind the audio to the beginning
      tapAudio.currentTime = 0;
    }
    // AFTER CONDITIONS CHECKED, play the sound!
    tapAudio.play();
  }

  function playRestartAudio() {
    if (!isRestartAudioPlaying) {
      isRestartAudioPlaying = true;
    } else {
      restartAudio.currentTime = 0;
    }
    restartAudio.play();
  }

  function restartGame() {
    restartBtn.addEventListener("click", instructionsToRestart);
  }

  function instructionsToRestart() {
    if (gameOver === true) {
      gameOver = false;
      for (const box of boxes) box.innerText = "";
      currentPlayer = "X";
      gameOverWindow.remove();
      playRestartAudio();
    }
  }

  // THIS FUNCTION IS RESPONSIBLE TO: CREATING GAME OVER WINDOW AND PERFORM THE ELEMETS WORKINGS.
  function createGamoOverWindow(playerSymbol1) {
    // PLAYER SYMBOL CARD
    winCard = document.createElement("div");
    winCard.className = `win_card`;
    getResult(playerSymbol1);

    // RESTART BUTTON
    restartBtn = document.createElement("button");
    restartBtn.className = `restart_btn`;
    restartBtn.innerText = `RESTART`;

    // PARENT ELEMENT OF THESE ABOVE 2
    gameOverWindow = document.createElement("div");
    gameOverWindow.id = `game_over_window`;

    addGameOverWindow();
  }

  function addGameOverWindow() {
    // APPENDING CHILDS IN THE PARENT ELEMENT
    gameOverWindow.append(winCard, restartBtn);

    // APPENDING PARENT ELEMENT IN THE GAMECONTAINER
    gameContainer.append(gameOverWindow);
  }

  function getResult(playerSymbol2) {
    if (playerSymbol2 !== `It's a Draw!`) {
      winCard.innerText = `${playerSymbol2} won`;
    } else {
      winCard.innerText = `${playerSymbol2}`;
    }
  }

  function playMove(event) {
    if (!gameOver && event.target.innerText === "") {
      event.target.innerText = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      playTapAudio();
      checkWinner();
    }
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        boxes[a].innerText &&
        boxes[a].innerText === boxes[b].innerText &&
        boxes[b].innerText === boxes[c].innerText
      ) {
        gameOver = true;
        createGamoOverWindow(boxes[a].innerText);
        restartGame();
        return;
      }
    }

    if (boxes.every((box) => box.innerText !== "")) {
      gameOver = true;
      createGamoOverWindow(`It's a Draw!`);
      restartGame();
    }
  }

  gameContainer.addEventListener("click", playMove);
}

initializeGame();