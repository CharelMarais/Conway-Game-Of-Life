// Create grid size
let gridSize = 50;
let tickSpeed = 300;
let state = 0;

// Outerloop to create rows
for (let rows = 0; rows < gridSize; rows++) {
  const conRow = document.createElement('div');
  conRow.id = `con-row${rows + 1}`;
  conRow.style.marginBottom = '-7px';
  const conwayMain = document.getElementById('gameContainer');
  conwayMain.appendChild(conRow);
  // Inner loop to set columns
  for (colm = 0; colm < gridSize; colm++) {
    const conBox = document.createElement('div');
    conBox.className = 'conway-box';
    conBox.id = `boxR${rows + 1}C${colm + 1}`;
    conBox.style.display = 'inline-block';
    const conwayRow = document.getElementById(`con-row${rows + 1}`);
    conwayRow.appendChild(conBox);
  }
}

// Represent the grid with a 2d array
const grid = [];
for (let row = 0; row < gridSize; row++) {
  const rowOfBooleans = [];
  for (let col = 0; col < gridSize; col++) {
    rowOfBooleans.push(false);
  }
  grid.push(rowOfBooleans);
}

// Function to set false value to true depending on what row and column has been clicked.
function conwayBoxClicked(row, column) {
  grid[row][column] = !grid[row][column];
  const boxToChange = document.getElementById(`boxR${row + 1}C${column + 1}`);
  boxToChange.style.backgroundColor = grid[row][column]
    ? 'white'
    : 'rgb(6, 6, 6)';
}

// Checking all div with the class .conway-box
const gridBoxes = document.querySelectorAll('.conway-box');

// Function to check click event on the
gridBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    // get the info on what block was clicked
    const clickedID = box.id;
    let boxRow = clickedID.substring(
      clickedID.indexOf('R') + 1,
      clickedID.lastIndexOf('C')
    );

    let boxColumn = clickedID.substring(
      clickedID.indexOf('C') + 1,
      clickedID.lastIndexOf('')
    );

    conwayBoxClicked(Number(boxRow) - 1, Number(boxColumn) - 1);
    console.log(box.id);
  });
});

// Button initializations
const startButton = document.getElementById('start');
//const resetButton = document.getElementById('reset');
const stopButton = document.getElementById('stop');
let tickSpeedSet;

// Start button
startButton.addEventListener('click', function () {
  let i = 0;
  if (state === 0) {
    tickSpeedSet = setInterval(ruleOneConway, tickSpeed, grid);
    state = 1;
  }
});

// Stop button
stopButton.addEventListener('click', function () {
  if (state === 1) {
    clearInterval(tickSpeedSet);
    state = 0;
  }
});

// resetButton.addEventListener('click', function () {
//   for (let row = 0; row < gridSize; row++) {
//     const rowOfBooleans = [];
//     for (let col = 0; col < gridSize; col++) {
//       rowOfBooleans.push(false);
//     }
//     grid.push(rowOfBooleans);
//   }
// });

// Each cell with one or no neighbors dies, as if by solitude.
// Each cell with four or more neighbors dies, as if by overpopulation.
// Each cell with two or three neighbors survives.
// Unpopulated: Each cell with three neighbors becomes populated.

function ruleOneConway(grid) {
  const tempGrid = JSON.parse(JSON.stringify(grid));

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (
        tempGrid[row][col] === true &&
        countPartnersAroundPoint(tempGrid, row, col) <= 1
      ) {
        //Rule 1
        conwayBoxClicked(row, col);
      } else if (
        tempGrid[row][col] === true &&
        countPartnersAroundPoint(tempGrid, row, col) >= 4
      ) {
        //Rule 2
        conwayBoxClicked(row, col);
      } else if (
        tempGrid[row][col] === false &&
        countPartnersAroundPoint(tempGrid, row, col) === 3
      ) {
        //Rule 4
        conwayBoxClicked(row, col);
      }
    }
  }
}

//Function to check how may areas around the center
function countPartnersAroundPoint(tempGrid, row, col) {
  let count = 0;

  if (row === 0 && col === 0) {
    // top-left
    if (tempGrid[row][col + 1] === true) {
      count++;
    }

    for (i = 0; i < 2; i++) {
      if (tempGrid[row + 1][col + i] === true) {
        count++;
      }
    }
  } else if (row === 0 && col === gridSize - 1) {
    // Top-Right
    if (row === 0 && col === 0) {
      if (tempGrid[row][col - 1] === true) {
        count++;
      }

      for (i = 0; i < 2; i++) {
        if (tempGrid[row + 1][col - 1 + i] === true) {
          count++;
        }
      }
    }
  } else if (row === 0) {
    // Top-Row
    if (tempGrid[row][col - 1] === true) {
      count++;
    }

    if (tempGrid[row][col + 1] === true) {
      count++;
    }

    for (i = 0; i < 3; i++) {
      if (tempGrid[row + 1][col - 1 + i] === true) {
        count++;
      }
    }
  } else if (row === gridSize - 1 && col === 0) {
    //Bottom-left

    for (i = 0; i < 2; i++) {
      if (tempGrid[row - 1][col + i] === true) {
        count++;
      }
    }

    if (tempGrid[row][col + 1] === true) {
      count++;
    }
  } else if (row === gridSize - 1 && col === gridSize - 1) {
    //Bottom-Right
    for (i = 0; i < 2; i++) {
      if (tempGrid[row - 1][col - 1 + i] === true) {
        count++;
      }
    }

    if (tempGrid[row][col - 1] === true) {
      count++;
    }
  } else if (col === 0) {
    // Left-Column
    for (i = 0; i < 2; i++) {
      if (tempGrid[row - 1][col + i] === true) {
        count++;
      }
    }

    if (tempGrid[row][col + 1] === true) {
      count++;
    }

    for (i = 0; i < 2; i++) {
      if (tempGrid[row + 1][col + i] === true) {
        count++;
      }
    }
  } else if (col === gridSize - 1) {
    // Right-Column
    for (i = 0; i < 2; i++) {
      if (tempGrid[row - 1][col - 1 + i] === true) {
        count++;
      }
    }

    if (tempGrid[row][col - 1] === true) {
      count++;
    }

    for (i = 0; i < 2; i++) {
      if (tempGrid[row + 1][col - 1 + i] === true) {
        count++;
      }
    }
  } else if (row === gridSize - 1) {
    //Bottom-Row
    for (i = 0; i < 3; i++) {
      if (tempGrid[row - 1][col - 1 + i] === true) {
        count++;
      }
    }
    if (tempGrid[row][col - 1] === true) {
      count++;
    }
    if (tempGrid[row][col + 1] === true) {
      count++;
    }
  } else {
    for (i = 0; i < 3; i++) {
      if (tempGrid[row - 1][col - 1 + i] === true) {
        count++;
      }
    }

    if (tempGrid[row][col - 1] === true) {
      count++;
    }

    if (tempGrid[row][col + 1] === true) {
      count++;
    }

    for (i = 0; i < 3; i++) {
      if (tempGrid[row + 1][col - 1 + i] === true) {
        count++;
      }
    }
  }
  return count;
}
