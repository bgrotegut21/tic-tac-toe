let game = (function(){
    let names = {}

    let isPlayerOneTurn = true;
    let donutBindings = []

    let oImage = "images/darkPinkDonut.svg";
    let xImage = "images/xDonut.svg";

    let playerOneImage = "images/humanDonut.svg";
    let playerTwoImage = "images/humanDonut2.svg";
    let computerDonutImage = "images/computerDonut.svg";
    let sadDonut = "images/sadDonut.svg";

    let emptyDonutImage =  "images/emptyDonut.svg";
    let isEasyMode;

    emit.subscribe("beginGame",beginGame);
    emit.subscribe("retrieveData",retrieveData);
    
    let gridBindings = [{button: elements.resetButton, func: resetGame},
                        {button: elements.loseReset, func: resetGame},          
    ]
    setDonutBindings();

    let currentGrid = ["#","#","#",
                       "#","#","#",
                       "#","#","#", 
                    ]

    function setDonutBindings (){
        for (let i = 1; i < 10; i++){
            donutBindings.push({button: elements[`donut${i}`],func: changeDonuts})
            elements[`donut${i}`].currentIndex = i;
        }
    }

    function retrieveData(data){
        names = data.names;
        isEasyMode = data.isEasyMode;
    }

    function displayGrid() {
        elements.gridHolder.style.display = "flex";
    }

    function resetGame(){
        elements.playerState.style.display = "flex";
        elements.winOrLoseState.style.display = "none";
        elements.gridHolder.style.display = "none";
        currentGrid = ["#","#","#","#","#","#","#","#","#"];
        renderDonuts();
        isPlayerOneTurn = true;
        emit.fireEvents("removeBindings",gridBindings);
        emit.fireEvents("bringBackMenu")
    }

    function triggerEasyAi(){
        let randomIndex;
        while(currentGrid[randomIndex] != "#" && currentGrid.includes("#")) {
            randomIndex = Math.floor(Math.random() *9);
        }
        currentGrid[randomIndex] = "X"
    }

    function minimax(grid, depth, isMax){
        let cloneGrid = grid;
        let evaluate = evaluateWinner(cloneGrid);
        if(evaluate == 10) return evaluate;
        if(evaluate == -10) return   evaluate;
        if(checkTie(cloneGrid) == true) return 0;

        if(isMax){
            let currentValue = -Infinity;
            for (let i = 0; i < 9; i++){
                if (cloneGrid[i] == "#"){
                    cloneGrid[i] = "X";
                    currentValue = Math.max(currentValue, minimax(cloneGrid,depth +1, false));
                    cloneGrid[i] = "#";
                } 
            }
            return currentValue;
        } else {
            let currentValue = Infinity;
            for (let i = 0; i <9; i++){
                if (cloneGrid[i] == "#"){
                    cloneGrid[i] = "O";       
                    currentValue = Math.min(currentValue, minimax(cloneGrid,  depth +1, true));
                    cloneGrid[i] = "#";
                }
            }
            return currentValue;
        }
    }

    function _triggerHardAi(){
        let bestValue = 0;
        let currentValue = -Infinity;

        let cloneGrid = currentGrid;
        for (let i =0; i<9; i++){
            if (cloneGrid[i] == "#"){
                cloneGrid[i] = "X";
                let maxindex = minimax(cloneGrid, 0, false);
                cloneGrid[i] = "#";
                if (maxindex > currentValue){
                    currentValue = maxindex;
                    bestValue = i;
                }
            }
        }
        currentGrid[bestValue] = "X";
    }
       

    function markPlayer(currentIndex){
        let mark;
        isPlayerOneTurn? mark = "O": mark ="X";
        if (currentGrid[currentIndex] == "#") {
            currentGrid[currentIndex] = mark;
            return true;
        } else return false;
    }

    function triggerAi(currentIndex){
        let currentMark = markPlayer(currentIndex)
        if(isEasyMode){
            if(currentMark) triggerEasyAi();
        } else {
           markPlayer(currentIndex)
           if(currentMark) _triggerHardAi();
        }
    }

    function changeDonuts(event){
        let currentIndex = event.target.currentIndex -1
        if (names.playerTwo == "Computer"){
            triggerAi(currentIndex);
        } else {
            let currentMark = markPlayer(currentIndex);
            if (currentMark) changeTurn();
        }
        renderDonuts();
       findWinners()
    }

    function checkTie(grid){
        for (let point of grid){
            if (point == "#") return false;
        }
        return true;
    }

    function settNameEqualToCurrentPlayerText(){
        elements.currentPlayer1Text.textContent = names.playerOne; 
        elements.currentPlayer2Text.textContent = names.playerTwo; 
    }

    function changePlayerShading(){
        let grey = "rgb(200,200,200)"
        let defaultColor = "rgb(228,228,228)"
        if (isPlayerOneTurn){
            elements.currentPlayer1.style.background = grey;
            elements.currentPlayer2.style.background = defaultColor;
        } else {
           elements.currentPlayer1.style.background = defaultColor;
           elements.currentPlayer2.style.background = grey;
        }
    }

    function changeTurn(){
        isPlayerOneTurn = !isPlayerOneTurn;
        changePlayerShading();
    }

    function getResults (grid,num1,num2,num3,mark){
        let isTrue =false;
        if (grid[num1] == mark && grid[num2] == mark &&   grid[num3] == mark) isTrue = true;
        return isTrue;
    }



    function findWinners(){
        let evaluatePlayer = evaluateWinner(currentGrid);
         if (evaluatePlayer == -10) return renderWinState(`${names.playerOne} has won the game!`,playerOneImage);
         if (names.playerTwo == "Computer" && evaluatePlayer == 10) return renderWinState(`${names.playerTwo} has won the game`,computerDonutImage)
         if (evaluatePlayer == 10) return renderWinState(`${names.playerTwo} has won the game!`,playerTwoImage);
         if (checkTie(currentGrid) == true) return renderWinState("The game is a tie", sadDonut);
    }

    function renderWinState(text,image){
        elements.playerState.style.display = "none";
        elements.winOrLoseState.style.display = "block";
        elements.winOrLoseDonut.setAttribute("src",image)
        elements.winOrLoseText.textContent = text;
        emit.fireEvents("removeBindings",donutBindings)
    }

    function evaluateWinner(grid){
        if (getResults(grid,2,5,8,"O")) return -10;
        if (getResults(grid,0,1,2,"O")) return -10;
        if (getResults(grid,3,4,5,"O")) return -10;
        if (getResults(grid,6,7,8, "O")) return  -10;
        if (getResults(grid,0,3,6,"O")) return -10;
        if (getResults(grid,1,4,7,"O")) return -10;
        
        if (getResults(grid,0,4,8,"O")) return -10;
        if (getResults(grid,2,4,6,"O")) return -10;

        if (getResults(grid,2,5,8,"X")) return 10;
        if (getResults(grid,0,1,2,"X")) return 10;
        if (getResults(grid,3,4,5,"X"))return  10;
        if (getResults(grid,6,7,8, "X"))return 10;
        if (getResults(grid,0,3,6,"X")) return 10;
        if (getResults(grid,1,4,7,"X")) return 10;
       
        if (getResults(grid,0,4,8,"X")) return 10;
        if (getResults(grid,2,4,6,"X")) return 10;
    }

    function renderDonuts(){
        let index = 0
        donutBindings.forEach(donut => {
            let gridIndex = currentGrid[index]
            if (gridIndex == "O") {
                donut.button.setAttribute("src",oImage);
            } else if (gridIndex == "X"){
                donut.button.setAttribute("src",xImage);
            } else if (gridIndex == "#"){
                donut.button.setAttribute("src",emptyDonutImage);
            }
            index ++;
        })
    }

    function beginGame(){
        displayGrid();
        emit.fireEvents("addBindings",gridBindings);
        emit.fireEvents("addBindings",donutBindings);
        changePlayerShading();
        settNameEqualToCurrentPlayerText();
    }
})()  