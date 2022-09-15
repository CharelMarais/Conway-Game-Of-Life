// Create grid size
let gridSize = 20;

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
    ? 'yellow'
    : 'rgb(171, 171, 171)';
}

// Function to swap just the color depending on what was inserted
function conwayBoxSwitch(row, column) {
  const boxToChange = document.getElementById(`boxR${row + 1}C${column + 1}`);
  boxToChange.style.backgroundColor = grid[row][column]
    ? 'yellow'
    : 'rgb(171, 171, 171)';
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
    console.log(box.id, boxRow, boxColumn);
  });
});

const startButton = document.getElementById('start');
startButton.addEventListener('click', oneStep);

function oneStep() {
  ruleOneConway(grid);
  //setInterval(ruleOneConway, 1000, grid);
}

//setInterval(ruleOneConway, 5000, grid);

// Each cell with one or no neighbors dies, as if by solitude.
// Each cell with four or more neighbors dies, as if by overpopulation.
// Each cell with two or three neighbors survives.
// Unpopulated: Each cell with three neighbors becomes populated.

function ruleOneConway(grid) {
  const tempGrid = JSON.parse(JSON.stringify(grid));

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      console.log(row, ' ', col);
      if (
        tempGrid[row][col] === true &&
        countPartnersAroundPoint(grid, row, col) <= 1
      ) {
        conwayBoxClicked(row, col);
      } else if (
        tempGrid[row][col] === true &&
        countPartnersAroundPoint(grid, row, col) >= 4
      ) {
        conwayBoxClicked(row, col);
      } else if (
        tempGrid[row][col] === false &&
        countPartnersAroundPoint(grid, row, col) === 3
      ) {
        conwayBoxClicked(row, col);
      }
      //if (tempGrid[row][col] === true) {
      //conwayBoxClicked(row, col);
      //conwayBoxClicked(row, col + 1);
      //}
    }
  }
}

//Function to check how may areas around the center
function countPartnersAroundPoint(grid, row, col) {
  let count = 0;

  if (row === 0 && col === 0) {
    // top-left
    if (grid[row][col + 1] === true) {
      count++;
    }

    for (i = 1; i < 3; i++) {
      if (grid[row + 1][col - 1 + i] === true) {
        count++;
      }
    }
  } else if (row === 0 && col === gridSize - 1) {
    // Top-Right
    if (row === 0 && col === 0) {
      if (grid[row][col - 1] === true) {
        count++;
      }

      for (i = 0; i < 2; i++) {
        if (grid[row + 1][col - 1 + i] === true) {
          count++;
        }
      }
    }
  } else if (row === 0) {
    // Top-Row
    if (grid[row][col - 1] === true) {
      count++;
    }

    if (grid[row][col + 1] === true) {
      count++;
    }

    for (i = 0; i < 3; i++) {
      if (grid[row + 1][col - 1 + i] === true) {
        count++;
      }
    }
  } else if (col === 0) {
    // Left-Column
    for (i = 0; i < 2; i++) {
      if (grid[row - 1][col + i] === true) {
        count++;
      }
    }

    if (grid[row][col + 1] === true) {
      count++;
    }

    for (i = 0; i < 2; i++) {
      if (grid[row + 1][col + i] === true) {
        count++;
      }
    }
  } else if (col === gridSize - 1) {
    // Right-Column
    for (i = 0; i < 2; i++) {
      if (grid[row - 1][col - 1 + i] === true) {
        count++;
      }
    }

    if (grid[row][col - 1] === true) {
      count++;
    }

    for (i = 0; i < 2; i++) {
      if (grid[row + 1][col - 1 + i] === true) {
        count++;
      }
    }
  } else if (row === gridSize - 1 && col === 0) {
    //Bottom-left

    for (i = 0; i < 2; i++) {
      if (grid[row - 1][col + i] === true) {
        count++;
      }
    }

    if (grid[row][col + 1] === true) {
      count++;
    }
  } else if (row === gridSize - 1 && col === gridSize - 1) {
    //Bottom-Right
    for (i = 0; i < 2; i++) {
      if (grid[row - 1][col - 1 + i] === true) {
        count++;
      }
    }

    if (grid[row][col - 1] === true) {
      count++;
    }
  } else if (row === gridSize - 1) {
    //Bottom-Row
    for (i = 0; i < 3; i++) {
      if (grid[row - 1][col - 1 + i] === true) {
        count++;
      }
    }
    if (grid[row][col - 1] === true) {
      count++;
    }
    if (grid[row][col + 1] === true) {
      count++;
    }
  } else {
    for (i = 0; i < 3; i++) {
      if (grid[row - 1][col - 1 + i] === true) {
        count++;
      }
    }

    if (grid[row][col - 1] === true) {
      count++;
    }

    if (grid[row][col + 1] === true) {
      count++;
    }

    for (i = 0; i < 3; i++) {
      if (grid[row + 1][col - 1 + i] === true) {
        count++;
      }
    }
  }
  return count;
}
