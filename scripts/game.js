let game = (function(){
    let names = {}
    let playerOneTurn = true;
    let donutBindings = []
    let oImage = "images/darkPinkDonut.svg";
    let xImage = "images/xDonut.svg";
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

    emit.subscribe("beginGame",_beginGame);
    emit.subscribe("retrieveNames",_retrieveNames);

    function _retrieveNames(nameObject){
        names = nameObject;
    }

    function _displayGrid() {
        elements.gridHolder.display = "flex";
    }

    function _resetGame(){
        console.log("resetting game")
       
    }

 
    function _changeDonut(event){
      
        let gridIndex = event.target.currentIndex -1;
        let mark
        playerOneTurn? mark = "O": mark ="X";
        if(currentGrid[gridIndex] == "#") currentGrid[gridIndex] = mark;
        _renderDonuts();
        _changeTurn();

        console.log(currentGrid)
        
    }

    function _settNameEqualToCurrentPlayerText(){
        console.log(names, "currentNames")
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







    function findHorizantalResults (){
        let results = [];
        let index =0;
        let currentObjectIndex = 0
        currentGrid.forEach( points => {
            results.push([]);
        })
    }

    function _delcareWinner(player){
        console.log(player + "has won the game")

    }



    function _renderDonuts(){

        let index = 0
        donutBindings.forEach(donut => {
            let gridIndex = currentGrid[index]
            if (gridIndex == "O") {
                donut.button.setAttribute("src",oImage);
            } else if (gridIndex == "X"){
                donut.button.setAttribute("src",xImage);
            }
            index ++;
        })
    }


    
    function _beginGame(){
        _displayGrid();
        emit.fireEvents("addBindings",gridBindings);
        emit.fireEvents("addBindings",donutBindings);
        _settNameEqualToCurrentPlayerText();

    }

})()  