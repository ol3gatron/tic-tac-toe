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
    e.target.textContent = target
    gameBoard.gameArray[e.target.attributes.dataKey.value] = target
    console.log(e.target.attributes.dataKey.value)
  }

  const showAlert = function(message, className) {
    const div = document.createElement("div")
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector(".container")
    const field = document.querySelector(".field")
    container.insertBefore(div, field)
  }

  const gameArray = []


  return {
    init,
    fillBoard,
    winCheck,
    placeMarker,
    tieCheck,
    showAlert,
    gameArray,
  }
})()

// Factory for creating players
const playerFactory = (name, marker) => {
  return { name, marker };
};

// Player 1 with the marker "X"
const Player1 = playerFactory("Vasiliy", "X");

// Player 2 with the marker "O"
const Player2 = playerFactory("Alexey", "O");

// Creating of field filld with field-items
gameBoard.init()

// Filling a game board with gameArray's elements
gameBoard.fillBoard(gameBoard.gameArray)

let currentPlayer = Player1;

document.querySelector(".field").addEventListener("click", function(e) {
  if (!gameBoard.gameArray[e.target.attributes.dataKey.value]) {
    if (e.target.className === "field-item") {
      gameBoard.placeMarker(e, currentPlayer.marker)
    }

    if (gameBoard.winCheck(currentPlayer, gameBoard.gameArray)) {
      gameBoard.showAlert(`${currentPlayer.name} has won!`, "success")
    }

    if (gameBoard.tieCheck(gameBoard.gameArray)) {
      gameBoard.showAlert("It's aaaaaaaaaaaaaaaaa tie!", "tie")
    }



    if (currentPlayer == Player1) {
      currentPlayer = Player2
    } else {
      currentPlayer = Player1
    }
  }
})

