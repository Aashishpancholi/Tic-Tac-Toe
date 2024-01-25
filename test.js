document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".box");
  let currentPlayer = "X";
  let playerImages = {
    X: "x.jpg",
    O: "o.jpg",
  };
  let gameOver = false;
  let timer;
  let seconds = 100;
  let scorePlayer1 = 0;
  let scorePlayer2 = 0;

  // Arrays to store positions selected by each player
  let playerXPositions = [];
  let playerOPositions = [];

  // Display initial time and score
  updateScore();

  // Add event listener to each box
  boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
      if (!gameOver && !box.classList.contains("taken") && seconds >= 0) {
        box.classList.add("taken");

        // Update the content with an image
        const image = document.createElement("img");
        image.src = playerImages[currentPlayer];
        image.classList.add("img-fluid"); // Ensure proper styling
        box.innerHTML = ""; // Clear existing content
        box.appendChild(image);

        console.log(`Box clicked: ${index}`);
        console.log(`Current Player: ${currentPlayer}`);

        // Store the position in the array of the current player
        if (currentPlayer === "X") {
          playerXPositions.push(index);
        } else {
          playerOPositions.push(index);
        }

        // Check for a win or draw
        if (checkWin()) {
          gameOver = true;
          setTimeout(() => {
            updateScore();
            showGameOverPopup();
            seconds = 0;
          }, 500); // Adjust the delay time as needed
        } else if (checkDraw()) {
          gameOver = true;
          setTimeout(() => {
            updateScore();
            showDrawPopup();
            seconds = 0;
          }, 500); // Adjust the delay time as needed
        } else {
          // Switch player
          currentPlayer = currentPlayer === "X" ? "O" : "X";

          // Start the timer only when a box is clicked
          updateTime();
        }
      }
    });
  });

  // Function to check for a win
  function checkWin() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Function to check if a player has a winning combination
    const hasWinningCombination = (playerPositions) => {
      return winPatterns.some((pattern) =>
        pattern.every((position) => playerPositions.includes(position))
      );
    };

    // Check if either player has won
    if (
      (currentPlayer === "X" && hasWinningCombination(playerXPositions)) ||
      (currentPlayer === "O" && hasWinningCombination(playerOPositions))
    ) {
      console.log(
        `Player ${currentPlayer} wins with positions:`,
        playerXPositions
      );
      return true;
    }

    return false;
  }

  // Function to check for a draw
  function checkDraw() {
    return Array.from(boxes).every((box) => box.classList.contains("taken"));
  }

  // Function to update the timer using setInterval
  function updateTime() {
    clearInterval(timer); // Clear the previous timer

    timer = setInterval(function () {
      document.getElementById("timer").textContent = seconds;

      // Show the alert and clear the interval
      if (seconds <= 0) {
        clearInterval(timer);
        setTimeout(() => {
          showTimeoutAlert();
        }, 0);
      }

      // Decrement the seconds after checking the condition
      seconds--;
    }, 1000);
  }

  // Function to update the score
  function updateScore() {
    if (checkDraw()) {
      // It's a draw
      document.getElementById("score").textContent = "Draw";
    } else if (checkWin()) {
      // Player 1 or Player 2 wins
      document.getElementById("score").textContent =
        "Player " + (currentPlayer === "X" ? "1" : "2") + " wins";
    }
  }

  // Function to show a pop-up when the game is over
  function showGameOverPopup() {
    // Add your code to display a pop-up or modal after the final click and a win
    alert("Game Over! Player " + currentPlayer + " wins!");
  }

  // Function to show a pop-up for a draw
  function showDrawPopup() {
    // Add your code to display a pop-up or modal for a draw
    alert("Game Over! It's a draw.");
  }

  // Function to show an alert after the timeout
  function showTimeoutAlert() {
    // Add your code to display a timeout alert
    if (!checkWin() && !checkDraw()) {
      alert("Game Timeout!.");
    }
  }
});
