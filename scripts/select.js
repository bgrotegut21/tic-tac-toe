let select = (function (){

    let isComputer = true;
    let currentState = "selection";

    emit.subscribe("addBindings",_addBindings);
    emit.subscribe("removeBindings", _removeBindings);
    emit.subscribe("bringBackMenu",_bringBackMenu)

    let selectBindings = [{button: elements.computerDonut, func: _changeIcon},
                    {button: elements.humanDonut, func: _changeIcon},
                    {button: elements.select, func:_changeSelection},
                    {button: elements.exit, func: _exitState},
                    {button: elements.exitButton, func: _exitState},
                    {button: elements.startButton, func: _startGame},
                    {button: elements.secondStartButton, func: _startGame},
    ]
    let names = {};

    function _addBindings(bindings){
        console.log("grid bindings")
        bindings.forEach(buttonObject => {buttonObject.button.addEventListener("click",buttonObject.func)});
    }

    function _removeBindings(bindings){
        bindings.forEach(buttonObject => {buttonObject.button.removeEventListener('click',buttonObject.func)});
    }

    function _changeSelection (){
        _changeState("selection");
        isComputer? currentState = _changeState("computer",true): currentState = _changeState("player",true);

    }

    function _changeState(state,bool){
        
        if (bool){
            if (state == "computer") elements.playerComputer.style.display = "flex";
            if (state == "selection") elements.playerSelection.style.display = "flex"
            if (state == "player") elements.player2Input.style.display = "flex";
            if(state == "main") elements.main.style.display = "flex";
        } else {
            if (state == "computer") elements.playerComputer.style.display = "none";
            if (state == "selection") elements.playerSelection.style.display = "none"
            if (state == "player") elements.player2Input.style.display = "none";
            if (state == "main")elements.main.style.display = "none";

            
        }
        return state;
    }

    function _exitState(){
        _changeState(currentState);
        if (currentState == "player") elements.playerTwoInputText.value = "";
        currentState = _changeState("selection",true);
        _renderIcons();
    }

    function _changeIcon(){
        isComputer? isComputer = false: isComputer = true;
        _renderIcons();
    }

    function _renderIcons(){
        if(isComputer){
            elements.computerDonut.style.display = "flex";
            elements.humanDonut.style.display = "none";
            elements.stateText.textContent = "Player vs AI";
        } else {
            elements.computerDonut.style.display = "none";
            elements.humanDonut.style.display = "flex";
            elements.stateText.textContent = "Player vs Player";
        }
    }

    function displayErrorMessage(){
        setTimeout(function(){
            elements.errorMessage.style.display = "none";
        },2000)
        elements.errorMessage.style.display = "block";

    }

    function _addNames (playerName1,playerName2,bool){
        let playerOneText = elements.playerOneInputText.value;
        let playerTwoText = elements.playerTwoInputText.value;
        if (bool) {
            playerOneText = playerName1;
            playerTwoText = playerName2 
        }

        if(playerOneText.length == 0 || typeof playerOneText != "string") playerOneText = "Player One"
        if(playerTwoText.length == 0 || typeof playerTwoText != "string") playerTwoText = "Player Two"

        names.playerOne = playerOneText; 
        !isComputer? names.playerTwo = playerTwoText: names.playerTwo = "Computer";
    }


    function _changeIsComputer (computerBool){
        if (typeof computerBool == "boolean") isComputer = computerBool;
    }
    //this function is meant for people who want to play the game using API!
    function startQuickGame(player1,player2,computerBool){
        _changeIsComputer(computerBool);
        _addNames(player1,player2,true);
        _startGame(true);
    }

    function _bringBackMenu (){
        _addBindings(selectBindings);
        _changeState("main",true);
        _changeState("computer");
        _changeState("player");
        _changeState("selection",true);
        isComputer = true; 
        _renderIcons();
    }

    function _resetTextBoxes (){
        elements.playerOneInputText.value = "";
        elements.playerTwoInputText.value = "";
    }

    function _startGame(quickStart){
         if (typeof quickStart == "object") _addNames();
         if (names.playerOne.length > 10 || names.playerTwo.length > 10) {
             names = {};
             displayErrorMessage();
             return;
         }
        _changeState("main")
        _removeBindings(selectBindings);

        emit.fireEvents("retrieveNames",names);
        emit.fireEvents("beginGame");
        _resetTextBoxes();

    }
    //starting game
    _addBindings(selectBindings);
    return {startQuickGame}

})() 


