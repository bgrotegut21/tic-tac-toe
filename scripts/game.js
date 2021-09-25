let game = (function(){
    let names = {}
    let playerOneTurn = true;
    let donutBindings = []

    let gridBindings = [{button: elements.resetButton, func: _resetGame},
                        
    ]
    _setDonutBindings();

    let currentGrid = ["#","#","#",
                       "#","#","#",
                       "#","#","#", 
                    ]

    function _setDonutBindings (){
        for (let i = 1; i < 10; i++){
            donutBindings.push({button: elements[`donut${i}`],func: _changeDonut})
            element[`donut${i}`].currentIndex = i;
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
        let gridIndex = event.currentIndex -1;
        let mark;
        playerOneTurn? mark = "O": mark ="#";
        if()
        
    }

    function _settNameEqualToCurrentPlayerText(){
        console.log(names, "currentNames")
        elements.currentPlayer1Text.textContent = names.playerOne; 
        elements.currentPlayer2Text.textContent = names.playerTwo; 
    }



    
    function _beginGame(){
        _displayGrid();
        emit.fireEvents("addBindings",gridBindings);
        _settNameEqualToCurrentPlayerText();
    }

})()