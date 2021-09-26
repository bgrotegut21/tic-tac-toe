let game = (function(){
    let names = {}

    let playerOneTurn = true;
    let donutBindings = []

    let oImage = "images/darkPinkDonut.svg";
    let xImage = "images/xDonut.svg";
    let emptyDonutImage =  "images/emptyDonut.svg";


    emit.subscribe("beginGame",_beginGame);
    emit.subscribe("retrieveNames",_retrieveNames);
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

 

    function _retrieveNames(nameObject){
        names = nameObject;
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

    function randomAI(){
        
    }


    function triggerAI(){
        randomAI();
        _changeTurn();
    }

    function changePlayerAI(gridIndex,mark){
        if (playerOneTurn){
            currentGrid[gridIndex] = mark;
            _changeTurn()
        }

        console.log(playerOneTurn, "player One Turn")
        if (playerOneTurn == false){
            triggerAI();
           
        }
    }


    function _changeDonut(event){
        let gridIndex = event.target.currentIndex -1;
        let mark
        playerOneTurn? mark = "O": mark ="X";
        if(currentGrid[gridIndex] == "#") {
            if(names.playerTwo == "Computer") {
                changePlayerAI(gridIndex,mark);
            } else {
                currentGrid[gridIndex] = mark;
                _changeTurn();
            }
        } 

        _renderDonuts();
        _findWinner();
        _checkTie();
        
    }

    function _checkTie(){
        let isTie = true;
        currentGrid.forEach(point => {
            if (point == "#") isTie = false;
        })
        if (isTie) _declareWinners(isTie);

    }

    function _settNameEqualToCurrentPlayerText(){
        elements.currentPlayer1Text.textContent = names.playerOne; 
        elements.currentPlayer2Text.textContent = names.playerTwo; 
    }

    function _changePlayerShading(){
        let grey = "rgb(200,200,200)"
        let defaultColor = "rgb(228,228,228)"
        if (playerOneTurn){
            elements.currentPlayer1.style.background = grey;
            elements.currentPlayer2.style.background = defaultColor;
        } else {
           elements.currentPlayer1.style.background = defaultColor;
           elements.currentPlayer2.style.background = grey;
        }

    }

    function _changeTurn(){
        playerOneTurn = !playerOneTurn;
        _changePlayerShading();

    }



    function _getResults (num1,num2,num3,mark){
        let isTrue =false;
        if (currentGrid[num1] == mark && currentGrid[num2] == mark &&   currentGrid[num3] == mark) isTrue = true;
        return isTrue;
    }

    function _declareWinners(playerOrTie){
        
        if (playerOrTie == true) displayTieScreen();
        else displayWinnerScreen(playerOrTie);
    }

    function displayWinnerScreen(playerName){
        elements.playerState.style.display = "none";
        elements.winOrLoseState.style.display = "block";
        if (playerName == "Computer") elements.winOrLoseDonut.setAttribute("src","images/computerDonut.svg");
        else elements.winOrLoseDonut.setAttribute("src","images/humanDonut.svg")
        elements.winOrLoseText.textContent = `${playerName} has won!`
        emit.fireEvents("removeBindings",donutBindings);
        
    }



    function displayTieScreen(){
        elements.playerState.style.display = "none";
        elements.winOrLoseState.style.display = "block"
        elements.winOrLoseDonut.setAttribute("src","images/sadDonut.svg")
        elements.winOrLoseText.textContent = "No one has won!"
        emit.fireEvents("removeBindings",donutBindings);
        
    }

    function _findWinner(){
        if (_getResults(0,1,2,"O")) _declareWinners(names.playerOne);
        if (_getResults(3,4,5,"O")) _declareWinners(names.playerOne);
        if (_getResults(6,7,8, "O")) _declareWinners(names.playerOne);
        if(_getResults(0,3,6,"O")) _declareWinners(names.playerOne);
        if(_getResults(0,3,6,"O")) _declareWinners(names.playerOne);
        if(_getResults(1,4,7,"O")) _declareWinners(names.playerOne);
        if(_getResults(2,5,8,"O")) _declareWinners(names.playerOne);
        if(_getResults(0,4,8,"O")) _declareWinners(names.playerOne);
        if(_getResults(2,4,6,"O")) _declareWinners(names.playerOne);

        if (_getResults(0,1,2,"X")) _declareWinners(names.playerTwo);
        if (_getResults(3,4,5,"X")) _declareWinners(names.playerTwo);
        if (_getResults(6,7,8, "X")) _declareWinners(names.playerTwo);
        if(_getResults(0,3,6,"X")) _declareWinners(names.playerTwo);
        if(_getResults(0,3,6,"X")) _declareWinners(names.playerTwo);
        if(_getResults(1,4,7,"X")) _declareWinners(names.playerTwo);
        if(_getResults(2,5,8,"X")) _declareWinners(names.playerTwo);
        if(_getResults(0,4,8,"X")) _declareWinners(names.playerTwo);
        if(_getResults(2,4,6,"X")) _declareWinners(names.playerTwo);
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