let boxes = document.querySelectorAll(".box");
let gameInfo = document.querySelector(".game-info");
let newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialization of game
function gameInit() {
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    // box.classList.remove("win"); 
    box.classList = ` box box${index +1 }`; //reinitailise
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
gameInit();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
  
  winningPosition.forEach((position)=>{
    if((gameGrid[position[0]] != "" || gameGrid[position[1]] !="" || gameGrid[position[2]] != "") 
      && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
         // check winner 
         if(gameGrid[position[0]] == "X"){
          answer ="X";
         }else{
          answer = "O";
         }

         boxes[position[0]].classList.add("win");
         boxes[position[1]].classList.add("win");
         boxes[position[2]].classList.add("win");
   // disable pointer button
         boxes.forEach((box)=>{
          box.style.pointerEvents = "none";
         })
    }
  });

  if(answer !== ""){
    gameInfo.innerText = `Winner Player ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }
// checking tie
  let fillCount = 0;
  gameGrid.forEach((box)=>{
    if(box !== ""){
      fillCount++;
    }
  });

  if(fillCount === 9){
    gameInfo.innerText = " Game Draw !! Try Again ";
    newGameBtn.classList.add("active");
  }

}

function handleClick(index) {
  if (gameGrid[index] == "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swapping
    swapTurn();
    // winning condition
    checkGameOver();
     
    newGameBtn.classList.add("active");  
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click",gameInit);
