// Game board module
const gameBoard = (() => {

  // Creating of field filld with field-items
  const init = function() {
    const container = document.querySelector(".container")

    const field = document.createElement("div")
    field.classList.add("field")
    container.appendChild(field)

    for (let i = 0; i < 9; i++) {
      const fieldItem = document.createElement("div")
      fieldItem.classList.add("field-item")
      fieldItem.setAttribute("dataKey", i)
      field.appendChild(fieldItem)
    }
  }

  // Filling a game board with gameArray's elements
  const fillBoard = function(array) {
    const fieldItems = document.querySelectorAll(".field-item")
    for (let i = 0; i < array.length; i++) {
      fieldItems[i].textContent = array[i]
    }
  }

  const winCheck = function(player, array) {
    if (array[0] == player.marker && array[3] == player.marker && array[6] == player.marker || array[1] == player.marker && array[4] == player.marker && array[7] == player.marker || array[2] == player.marker && array[5] == player.marker && array[8] == player.marker || array[0] == player.marker && array[1] == player.marker && array[2] == player.marker || array[3] == player.marker && array[4] == player.marker && array[5] == player.marker || array[6] == player.marker && array[7] == player.marker && array[8] == player.marker || array[0] == player.marker && array[4] == player.marker && array[8] == player.marker || array[2] == player.marker && array[4] == player.marker && array[6] == player.marker) {
      return true
    } else {
      return false
    }
  }

  const tieCheck = function(array) {
    if (array[0] && array[1] && array[2] && array[3] && array[4] && array[5] && array[6] && array[7] && array[8]) {
      return true
    } else {
      return false
    }
  }

  const placeMarker = function(e, target) {
    if (target == "X") {
      e.target.style.color = "red"
    } else {
      e.target.style.color = "blue"
    }


    e.target.textContent = target


    gameBoard.gameArray[e.target.attributes.dataKey.value] = target
  }

  const showAlert = function(message, className) {
    const div = document.createElement("div")
    div.className = `${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector(".container")
    const field = document.querySelector(".field")
    container.insertBefore(div, field)
  }

  const showWhosTurn = function(player) {
    const div = document.createElement("div")
    if (player.name == "Player One") {
      div.className = "alert playerOne"
    } else {
      div.className = "alert playerTwo"
    }
    div.appendChild(document.createTextNode(`${player.name}'s turn`))
    const container = document.querySelector(".container")
    const field = document.querySelector(".field")
    container.insertBefore(div, field)
  }

  const reset = function(array) {
    const resetBtn = document.createElement("button")
    resetBtn.className = "reset"
    resetBtn.textContent = "Play Again"
    const container = document.querySelector(".container")
    container.appendChild(resetBtn)
  }

  const gameArray = []


  return {
    init,
    fillBoard,
    winCheck,
    placeMarker,
    tieCheck,
    showAlert,
    showWhosTurn,
    reset,
    gameArray,
  }
})()

// Factory for creating players
const playerFactory = (name, marker) => {
  return { name, marker };
};

// Player 1 with the marker "X"
const Player1 = playerFactory("Player One", "X");

// Player 2 with the marker "O"
const Player2 = playerFactory("Player Two", "O");

// Creating of field filld with field-items
gameBoard.init()

// Filling a game board with gameArray's elements
gameBoard.fillBoard(gameBoard.gameArray)

let currentPlayer = Player1
gameBoard.showWhosTurn(currentPlayer)

document.querySelector(".container").addEventListener("click", function(e) {
  if (e.target.className == "field-item") {
    if (!gameBoard.gameArray[e.target.attributes.dataKey.value]) {
      if (e.target.className === "field-item") {
        gameBoard.placeMarker(e, currentPlayer.marker)
      }

      if (gameBoard.winCheck(currentPlayer, gameBoard.gameArray)) {
        gameBoard.showAlert(`${currentPlayer.name} has won!`, "success")

        for (let i = 0; i < 9; i++) {
          if (!gameBoard.gameArray[i]) {
            gameBoard.gameArray[i] = " "
          }
        }

        if (document.querySelector(".playerOne")) {
          document.querySelector(".playerOne").remove()
        } else {
          document.querySelector(".playerTwo").remove()
        }

        gameBoard.reset()
      }

      if (gameBoard.tieCheck(gameBoard.gameArray) && !gameBoard.winCheck(currentPlayer, gameBoard.gameArray)) {
        gameBoard.showAlert("It's a tie!", "tie")

        if (document.querySelector(".playerOne")) {
          document.querySelector(".playerOne").remove()
        } else {
          document.querySelector(".playerTwo").remove()
        }

        gameBoard.reset()
      }

      if (currentPlayer == Player1) {
        currentPlayer = Player2
        if (document.querySelector(".playerOne")) {
          document.querySelector(".playerOne").textContent = "Player Two's turn"
          document.querySelector(".playerOne").className = "playerTwo"
          document.querySelector(".playerTwo").classList.remove("playerOne")
        }
      } else {
        currentPlayer = Player1
        if (document.querySelector(".playerTwo")) {
          document.querySelector(".playerTwo").textContent = "Player One's turn"
          document.querySelector(".playerTwo").className = "playerOne"
          document.querySelector(".playerOne").classList.remove("playerTwo")
        }
      }
    }
  }
})

document.querySelector(".container").addEventListener("click", function(e) {
  if (e.target.className == "reset") {
    gameBoard.gameArray = []
    document.querySelector(".field").remove()
    gameBoard.init()
    if (document.querySelector(".success")) {
      document.querySelector(".success").remove()
    } else if (document.querySelector(".tie")) {
      document.querySelector(".tie").remove()
    }
    document.querySelector(".reset").remove()
    gameBoard.showWhosTurn(currentPlayer)
    currentPlayer = Player1
    document.querySelector(".playerTwo").textContent = "Player One's turn"
    document.querySelector(".playerTwo").className = "playerOne"
    document.querySelector(".playerOne").classList.remove("playerTwo")
  }
})












