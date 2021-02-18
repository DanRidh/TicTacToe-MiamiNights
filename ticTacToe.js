const board = document.getElementById("board");
const cells = document.getElementsByClassName("cell");
const restartBtn = document.getElementById("restart");
const x = "X", o = "O";

let currentMove;
let gameOver = false;
let gameMode = 0;       //0 = vs Player, 1 = vs AI


let runGame = () => {
    board.addEventListener("click", doMove, false);
}

//does user move (starts with x, for now)
let doMove = (e) => {
    e.preventDefault();
    if(e.target.className === "cell"){
        e.target.append(currentMove);
        e.target.classList.add(currentMove);
        if(currentMove === x){
            currentMove = o;
        } else{
            currentMove = x;
        }
        checkForWin();
        if(gameMode === 1 && !gameOver){
            randomMove();
        }
    }
    checkForWin();
}


//check for all possible win condition and ends game if met
let checkForWin = () => {
    let topLeft = cells[0];
    let topMiddle = cells[1];
    let topRight = cells[2];
    let centerLeft = cells[3];
    let centerMiddle = cells[4];
    let centerRight = cells[5];
    let bottomLeft = cells[6];
    let bottomMiddle = cells[7];
    let bottomRight = cells[8];

    if(topLeft.innerText !== "" && topLeft.innerText === topMiddle.innerText && topMiddle.innerText === topRight.innerText){
        gameOver = true;
        topLeft.classList.add("won");
        topMiddle.classList.add("won");
        topRight.classList.add("won");
    } else if(centerLeft.innerText !== "" && centerLeft.innerText === centerMiddle.innerText && centerMiddle.innerText === centerRight.innerText){
        gameOver = true;
        centerLeft.classList.add("won");
        centerMiddle.classList.add("won");
        centerRight.classList.add("won");
    } else if(bottomLeft.innerText !== "" && bottomLeft.innerText === bottomMiddle.innerText && bottomMiddle.innerText === bottomRight.innerText){
        gameOver = true;
        bottomLeft.classList.add("won");
        bottomMiddle.classList.add("won");
        bottomRight.classList.add("won");
    } else if(topLeft.innerText !== "" && topLeft.innerText === centerLeft.innerText && centerLeft.innerText === bottomLeft.innerText){
        gameOver = true;
        topLeft.classList.add("won");
        centerLeft.classList.add("won");
        bottomLeft.classList.add("won");
    } else if(topMiddle.innerText !== "" && topMiddle.innerText === centerMiddle.innerText && centerMiddle.innerText === bottomMiddle.innerText){
        gameOver = true;
        topMiddle.classList.add("won");
        centerMiddle.classList.add("won");
        bottomMiddle.classList.add("won");
    } else if(topRight.innerText !== "" && topRight.innerText === centerRight.innerText && centerRight.innerText === bottomRight.innerText){
        gameOver = true;
        topRight.classList.add("won");
        centerRight.classList.add("won");
        bottomRight.classList.add("won");
    } else if(topLeft.innerText !== "" && topLeft.innerText === centerMiddle.innerText && centerMiddle.innerText === bottomRight.innerText){
        gameOver = true;
        topLeft.classList.add("won");
        centerMiddle.classList.add("won");
        bottomRight.classList.add("won");
    } else if(topRight.innerText !== "" && topRight.innerText === centerMiddle.innerText && centerMiddle.innerText === bottomLeft.innerText){
        gameOver = true;
        topRight.classList.add("won");
        centerMiddle.classList.add("won");
        bottomLeft.classList.add("won");
    } else {
        return null;
    }

    if(gameOver){
        for(let i = 0; i < cells.length; i++){
            if(!cells[i].classList.contains("won")){
                cells[i].classList.add("finished");
            } 
        }
    }

    /*
    let winCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let combo of winCombos){
        let result="";
        for(let index of combo){
            result += cells[index].innerText;
        }
        if(result === "XXX" || result === "OOO"){
            gameOver = true;
            for(let index of combo){
                cells[index].classList.add("won");
            }
        }
    }
    */
}


//clears the board
let restartGame = () => {
    gameOver = false;
    for(let i = 0; i < cells.length; i++){
        cells[i].innerText = "";
        cells[i].className = "cell";
    }
}


//change to vs Player
let vsPlayer = () => {
    restartGame();
    runGame();
    return gameMode = 0, currentMove = x;
}

//change to vs AI
let vsAI = () => {
    restartGame();
    runGame();
    return gameMode = 1, currentMove = x;
}


//random AI move
let randomMove = () => {
    let randomIndex = Math.floor((Math.random() * 9));
    if(cells[randomIndex].className === "cell"){
        cells[randomIndex].append(currentMove);
        cells[randomIndex].classList.add(currentMove);
    } else{
        return randomMove();
    }

    if(currentMove === x){
        currentMove = o;
    } else{
        currentMove = x;
    }
}