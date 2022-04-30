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

  const gameArray = []


  return {
    init,
    fillBoard,
    gameArray,
  }
})()

// Factory for creating players
const playerFactory = (marker) => {
  return { marker };
};

// Player 1 with the marker "X"
const Player1 = playerFactory('X');

// Player 2 with the marker "O"
const Player2 = playerFactory('O');

// Creating of field filld with field-items
gameBoard.init()

// Filling a game board with gameArray's elements
gameBoard.fillBoard(gameBoard.gameArray)

let currentPlayer = Player1;

document.querySelector(".field").addEventListener("click", function(e) {
  if (!gameBoard.gameArray[e.target.attributes.dataKey.value]) {
    if (e.target.className === "field-item") {
      console.log(e.target.attributes.dataKey.value)
      e.target.textContent = currentPlayer.marker
      gameBoard.gameArray[e.target.attributes.dataKey.value] = currentPlayer.marker
    }

    if (currentPlayer == Player1) {
      currentPlayer = Player2
    } else {
      currentPlayer = Player1
    }
  }
})

