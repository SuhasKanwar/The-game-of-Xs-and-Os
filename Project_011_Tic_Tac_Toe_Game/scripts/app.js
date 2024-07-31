let boxes = document.querySelectorAll(".game-button");
let gameBox = document.querySelector(".game-buttons");
let resetButton = document.querySelector(".reset-button");
let newGameButton = document.querySelector(".new-game-button");
let msgContainer = document.querySelector(".msg-container");
let msgHead = document.querySelector("#msg-head");
let msg = document.querySelector("#msg");

let turnX = true; //playerX turn
let turnCount = 0;

let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function disableBoxes(){
    for(let box of boxes){
        box.disabled = true;
    }
}

function enableBoxes(){
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

boxes.forEach(box => {
    function boxClicked(){
        // console.log("Box was clicked");
        if(turnX){
            turnCount++;
            box.classList.remove("O");
            box.classList.add("X");
            box.innerText = "X";
            turnX = false;
        }
        else{
            turnCount++;
            box.classList.remove("X");
            box.classList.add("O");
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        checkWinner();
    }
    box.addEventListener("click",boxClicked);
})

const showWinner = (winner) => {
    if(winner == "O" || winner == "X"){
        msgHead.innerHTML = "&#127942; WINNER &#127942;";
        msg.innerText = "Congratulations, Player " + winner + " is the winner";
    }
    else{
        msgHead.innerHTML = "&#129309; DRAW &#129309;";
        msg.innerText = "The match is drawn between both the players"
    }
    msgContainer.classList.add("show");
    disableBoxes();
}

function checkWinner(){
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val && pos1val === pos3val){
                showWinner(pos1val);
                return;
            }
        }
    }
    if(turnCount == 9){
        showWinner("draw");
    }
}

const resetGame = () => {
    turnX = true;
    turnCount = 0;
    enableBoxes();
    msgContainer.classList.remove("show");
}

newGameButton.addEventListener("click",resetGame);
resetButton.addEventListener("click",resetGame);