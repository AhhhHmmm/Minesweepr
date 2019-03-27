// prints "hi" in the browser's dev tools console
console.log('hi');

let info = document.querySelector('.info');
let cells = document.querySelectorAll('.cell');

let gamestate = [
  ['x','-','x','-','-','x','-','-','-','-',],
  ['-','x','-','x','x','-','-','-','-','-',],
  ['-','-','-','x','-','-','-','-','-','-',],
  ['-','x','-','-','-','x','-','-','-','-',],
  ['-','-','-','-','-','-','x','-','-','-',],
  ['x','-','-','-','x','-','-','-','x','-',],
  ['-','-','-','-','x','-','-','-','-','-',],
  ['-','-','x','x','-','-','-','x','x','-',],
  ['-','-','-','-','-','-','-','-','-','-',],
  ['-','-','-','-','-','-','x','-','x','-',]
];

function countmines(gamestate) {
  let mines = 0;
  
  for (let i = 0; i < gamestate.length; i++) {
    for (let j = 0; j < gamestate[i].length; j++) {
      if (gamestate[i][j] == 'x') {
        mines++;
      }
    }
  }
  
  info.innerHTML = `<h2>Mines Remaining: ${mines}</h2>`
  return mines;
}

function checkneighbors(gamestate, row, column){
  //r-1, c-1.   r-1, c.   r-1, c+1
  //r, c-1.     r, c      r, c+1
  //r+1, c-1.   r+1, c.   r+1, c+1
  let adjacentmines = 0;
  for (let i = -1; i < 2; i++){
    for (let j = -1; j < 2; j++){
      if (-1 < row + i && row + 1 < 10 && -1 < column + j && column + j < 10) {
        if (gamestate[row+i][column+j] === 'x'){
          adjacentmines++;
        }
      }
    }
  }
  return adjacentmines;
}

let mines = countmines(gamestate);

cells.forEach((cell) => {
  cell.addEventListener('click', (e) => {
    let column_clicked = e.target.dataset.column;
    let row_clicked = e.target.dataset.row;
    console.log(`Column: ${column_clicked}, Row ${row_clicked}`);
    if (e.shiftKey) {
      e.preventDefault();
      e.target.innerHTML = "🚩";
      mines--;
      info.innerHTML = `<h2>Mines Remaining: ${mines}</h2>`;
    }
    else {
      if (gamestate[row_clicked - 1][column_clicked - 1] === 'x'){
        console.log("You die.");
        e.target.innerHTML = "💣";
        alert('You lose!');
      }
      else {
        let adjacentmines = checkneighbors(gamestate, row_clicked - 1, column_clicked -1);
        e.target.innerHTML = adjacentmines;
        console.log('Alive!');
      }
    }
  });
});

//console.log(mines);