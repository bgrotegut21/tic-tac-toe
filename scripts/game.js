let game = (function(){
    let names = {}

    let isPlayerOneTurn = true;
    let donutBindings = []

    let oImage = "images/darkPinkDonut.svg";
    let xImage = "images/xDonut.svg";
    let emptyDonutImage =  "images/emptyDonut.svg";
    let isEasyMode;


    emit.subscribe("beginGame",_beginGame);
    emit.subscribe("retrieveData",_retrieveData);
    
    let gridBindings = [{button: elements.resetButton, func: _resetGame},
                        {button: elements.loseReset, func: _resetGame}
                        
    ]
    _setDonutBindings();

    let currentGrid = ["#","#","#",
                       "#","#","#",
                       "#","#","#", 
                    ]

    function _setDonutBindings (){
        for (let i = 1; i < 10; i++){
            donutBindings.push({button: elements[`donut${i}`],func: _changeDonut})
            elements[`donut${i}`].currentIndex = i;
        }
    }

 

    function _retrieveData(data){
        names = data.names;
        isEasyMode = data.isEasyMode;
    }

    function _displayGrid() {
        elements.gridHolder.style.display = "flex";
    }

    function _resetGame(){
        elements.playerState.style.display = "flex";
        elements.winOrLoseState.style.display = "none";
        elements.gridHolder.style.display = "none";
        currentGrid = ["#","#","#","#","#","#","#","#","#"];
        _renderDonuts();
        emit.fireEvents("removeBindings",gridBindings);
        emit.fireEvents("bringBackMenu")

       
    }


    function _triggerEasyAi(){
        let randomIndex;
        while(currentGrid[randomIndex] != "#" && currentGrid.includes("#")) {
            randomIndex = Math.floor(Math.random() *9);
        }
        currentGrid[randomIndex] = "X"
    }


    //o 2 on
    //x 3 off


    function minimax(grid, depth, isMax){
        let cloneGrid = grid;
        let boardValuation = evaluateWinner(cloneGrid);

        if(boardValuation == 10) return boardValuation;
        if (boardValuation == -10) return boardValuation;
        if (boardValuation != 10 && boardValuation != -10) return 0;

        if(isMax){
            let currentValue = -Infinity
            for (let i = 0; i < 9; i++){
                cloneBoard[i] = "X";
               currentValue =  Math.max(currentValue, minimax(cloneGrid, depth +1, false))
               cloneGrid[i] = "#"
            }
            return currentValue
        } else {
            let currentValue = Infinity;
            for(let i = 0; i<9; i++){
                cloneGrid[i] = "X";
                currentValue = Math.min(currentValue, minimax(cloneGrid, depth +1, true))
                cloneGrid[i] = "#"
            }
            return currentValue;
        }

    }

    function _triggerHardAi(){
        let moveIndex
        let cloneGrid = currentGrid;
        let fillIndex;
        console.log(cloneGrid, "clone grid")
        for (let i = 0; i < 9; i++){
            if (cloneGrid[i] == "#"){
                cloneGrid[i] = "X";
                 moveIndex = minimax(cloneGrid, 0,true)
                cloneGrid[i] = "#"
            }
            if (moveIndex > -Infinity){
                currentGrid[i] = "X";
                break
            }
        }

        

    }

    function markPlayer(grid, currentIndex){
        let mark;
        isPlayerOneTurn? mark = "O": mark ="X";
        if (grid[currentIndex] == "#") {
            grid[currentIndex] = mark;
            return true;
        } else return false;

        

    }

    function _triggerAi(currentIndex,currentMark){
        if(isEasyMode){
            if(currentMark) _triggerAi();
        } else {
           _triggerHardAi();
        }
        
    }


    function _changeDonut(event){
        
        _renderDonuts();
       _findWinners()
    }

    function _checkTie(grid){
        let isTie = true;
        grid.forEach(point => {
            if (point == "#") isTie = false;
        })
       return isTie;

    }

    function _settNameEqualToCurrentPlayerText(){
        elements.currentPlayer1Text.textContent = names.playerOne; 
        elements.currentPlayer2Text.textContent = names.playerTwo; 
    }

    function _changePlayerShading(){
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

    function _changeTurn(){
        isPlayerOneTurn = !isPlayerOneTurn;
        _changePlayerShading();

    }



    function _getResults (grid,num1,num2,num3,mark){
        let isTrue =false;
        if (grid[num1] == mark && grid[num2] == mark &&   grid[num3] == mark) isTrue = true;
        return isTrue;
    }

    function _findWinners(){
        let playerOrTie = evaluateWinner(currentGrid);
        if (playerOrTie == true) renderWinState("The game is a tie");
        else if (playerOrTie == -10) renderWinState(`${names.playerOne} has won the game!`);
        else if (playerOrTie == 10) renderWinState(`${names.playerTwo} has won the game!`);
    }


    function renderWinState(text){
        elements.playerState.style.display = "none";
        elements.winOrLoseState.style.display = "block";
        elements.winOrLoseDonut.setAttribute("src","images/humanDonut.svg")
        elements.winOrLoseText.textContent = text;
        emit.fireEvents("removeBindings",donutBindings)
        
    }

    function evaluateWinner(grid){
        if (_getResults(grid,0,1,2,"O")) return -10;
        if (_getResults(grid,3,4,5,"O")) return -10;
        if (_getResults(grid,6,7,8, "O")) return  -10;
        if(_getResults(grid,0,3,6,"O")) return -10;
        if(_getResults(grid,0,3,6,"O"))return -10;
        if(_getResults(grid,1,4,7,"O")) return -10;
        if(_getResults(grid,2,5,8,"O")) return -10;
        if(_getResults(grid,0,4,8,"O")) return -10;
        if(_getResults(grid,2,4,6,"O")) return -10;


        if (_getResults(grid,0,1,2,"X")) return 10;
        if (_getResults(grid,3,4,5,"X"))return  10;
        if (_getResults(grid,6,7,8, "X"))return 10;
        if(_getResults(grid,0,3,6,"X")) return 10;
        if(_getResults(grid,0,3,6,"X")) return 10;
        if(_getResults(grid,1,4,7,"X")) return 10;
        if(_getResults(grid,2,5,8,"X")) return 10;
        if(_getResults(grid,0,4,8,"X")) return 10;
        if(_getResults(grid,2,4,6,"X")) return 10;

        return _checkTie(grid)
    }

    function _renderDonuts(){
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


    
    function _beginGame(){
        console.log("begining game")
        _displayGrid();
        emit.fireEvents("addBindings",gridBindings);
        emit.fireEvents("addBindings",donutBindings);
        _changePlayerShading();
        _settNameEqualToCurrentPlayerText();

    }

})()  