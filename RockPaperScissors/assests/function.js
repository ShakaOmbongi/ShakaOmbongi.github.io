/*  Name: shaka ombongi
Date: 2025-03-07
CSC 372-01
these are the functions for the RoclPaperScissors */

document.addEventListener("DOMContentLoaded", function () {
    const choices = document.querySelectorAll(".choice");
    const computerChoiceDisplay = document.getElementById("computer-choice");
    const outcomeText = document.getElementById("outcome-text");
    const resetButton = document.getElementById("reset-button");
  
    // Score display elements
    const winsDisplay = document.getElementById("wins");
    const lossesDisplay = document.getElementById("losses");
    const tiesDisplay = document.getElementById("ties");
  
    // Score counters
    let wins = 0, losses = 0, ties = 0;
  
    // Update score display
    function updateScoreDisplay() {
      winsDisplay.textContent = wins;
      lossesDisplay.textContent = losses;
      tiesDisplay.textContent = ties;
    }
  
    // Get computer's random choice
    function getComputerChoice() {
      const randomNumber = Math.floor(Math.random() * 3);
      const choices = ["rock", "paper", "scissors"];
      return choices[randomNumber];
    }
  
    // Highlight player's choice by adding a class and removing it from others
    function highlightPlayerChoice(selectedImage) {
      choices.forEach(choice => choice.classList.remove("selected"));
      selectedImage.classList.add("selected");
    }
  
    // Determine the winner (accounts for all nine outcomes)
    function getWinner(playerSelection, computerSelection) {
      if (playerSelection === computerSelection) {
        return "tie";
      } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
      ) {
        return "player";
      } else {
        return "computer";
      }
    }
  
    // Update outcome text and score counters based on the winner
    function updateOutcome(winner) {
      if (winner === "tie") {
        outcomeText.textContent = "It's a tie!";
        ties++;
      } else if (winner === "player") {
        outcomeText.textContent = "You win!";
        wins++;
      } else {
        outcomeText.textContent = "Computer wins!";
        losses++;
      }
      updateScoreDisplay();
    }
  
    // Display the computer's choice with a shuffling animation for 3 seconds
    function displayComputerChoice(finalComputerSelection) {
      // Shuffle images every 0.5 seconds
      const interval = setInterval(() => {
        const randomChoice = getComputerChoice();
        computerChoiceDisplay.src = `/RockPaperScissors/assests/img/${randomChoice}.png`;
        computerChoiceDisplay.alt = randomChoice;
      }, 500);
  
      // After 3 seconds, clear the shuffling and show the final choice
      setTimeout(() => {
        clearInterval(interval);
        computerChoiceDisplay.src = `/RockPaperScissors/assests/img/${finalComputerSelection}.png`;
        computerChoiceDisplay.alt = finalComputerSelection;
      }, 3000);
    }
  
    // Handle player's selection
    function playerChoice(playerSelection, selectedImage) {
      // Highlight the chosen image
      highlightPlayerChoice(selectedImage);
  
      // Determine the computer's final choice
      const computerSelection = getComputerChoice();
  
      // Start the computer's "thinking" animation
      displayComputerChoice(computerSelection);
  
      // After the animation ends (3 seconds), decide the winner and update the outcome
      setTimeout(() => {
        const winner = getWinner(playerSelection, computerSelection);
        updateOutcome(winner);
      }, 3000);
    }
  
    // Attach click event listeners to each player choice image
    choices.forEach(choice => {
      choice.addEventListener("click", function () {
        // Prevent clicks while the computer is thinking
        if (computerChoiceDisplay.classList.contains("thinking")) {
          return;
        }
        computerChoiceDisplay.classList.add("thinking");
        playerChoice(this.id, this);
        // Remove thinking state slightly after outcome is updated
        setTimeout(() => {
          computerChoiceDisplay.classList.remove("thinking");
        }, 3100);
      });
    });
  
    // Reset button functionality: resets outcome, player highlights, and score counters
    resetButton.addEventListener("click", function () {
      outcomeText.textContent = "Waiting for your throw...";
      computerChoiceDisplay.src = "/RockPaperScissors/assests/img/question-mark.png";
      computerChoiceDisplay.alt = "Question Mark";
      choices.forEach(choice => choice.classList.remove("selected"));
      wins = 0;
      losses = 0;
      ties = 0;
      updateScoreDisplay();
    });
  });
  