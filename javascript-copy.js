// Create grid size
let gridSize = 50;

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

// Checking the rules to the current grid
const currentGrid = grid;

const startButton = document.getElementById('start');
startButton.addEventListener('click', clickStart);
function clickStart() {
  ruleOneConway(grid, currentGrid);
}

function ruleOneConway(grid, currentGrid) {
  console.log('Running');
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col - 1] === true) {
        currentGrid[row][col] = true;
        currentGrid[row][col - 1] = false;
      }
    }
  }
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      conwayBoxSwitch(row, col);
    }
  }
}
