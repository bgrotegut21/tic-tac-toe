let game = (function(){
    let names = {}

    let gridBindings = [{button: elements.resetButton, func: resetGame}]
    emit.subscribe("beginGame",_beginGame);

    function _retrieveNames(nameObject){
        names = nameObject;
    }

    function _displayGrid() {
        elements.gridHolder.display = "flex";
    }

    function resetGame(){
        console.log("resetting game")
    }

    function setNameEqualToCurrentPlayerText(){
        elements.currentPlayer1Text = names.playerOne; 
        elements.currentPlayer2Text = names.playerTwo; 
    }
    
    function _beginGame(){
        _displayGrid();
        emit.fireEvents("addBindings",gridBindings);
        

    }

   






})()