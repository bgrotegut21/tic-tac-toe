let select = (function (){

    let isComputer = true;
    let currentState = "selection";

    let bindings = [{button: elements.computerDonut, func: _changeIcon},
                    {button: elements.humanDonut, func: _changeIcon},
                    {button: elements.select, func:_changeSelection},
                    {button: elements.exit, func: _exitState},
                    {button: elements.exitButton, func: _exitState},
                    {button: elements.startButton, func: _startGame},
                    {button: elements.secondStartButton, func: _startGame},
    ]
    let names = {};

    function _addBindings(){
        bindings.forEach(buttonObject => {buttonObject.button.addEventListener("click",buttonObject.func)});
    }

    function _removeBindings(){
        bindings.forEach(buttonObject => {buttonObject.button.removeEventListener('click',buttonObject.func)});
    }

    function _changeSelection (){
        console.log("selction")
        _changeState("selection");
        isComputer? currentState = _changeState("computer",true): currentState = _changeState("player",true);

    }

    function _changeState(state,bool){
        
        if (bool){
            if (state == "computer") elements.playerComputer.style.display = "flex";
            if (state == "selection") elements.playerSelection.style.display = "flex"
            if (state == "player") elements.player2Input.style.display = "flex";
            if(state == "main") elements.main.style.display = "block";
        } else {
            if (state == "computer") elements.playerComputer.style.display = "none";
            if (state == "selection") elements.playerSelection.style.display = "none"
            if (state == "player") elements.player2Input.style.display = "none";
            if (state == "main")elements.main.style.display = "none";

            
        }
        return state;
    }

    function _exitState(){
        console.log("exit")
        _changeState(currentState);
        currentState = _changeState("selection",true);
        _renderIcons();


    }

    function _changeIcon(){
        console.log("changing icons")
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

    function retrieveNames(){
        return {names};
    }

    //this function is meant for people who want to play the game using API!
    function startQuickGame(player1,player2,isComputer){
        changeIsComputer(isComputer);
        _addNames(player1,player2);
        _startGame();
    }

  

    function _startGame(){
        console.log("starting game")
        _addNames();
        _changeState("main")
        _removeBindings();

    }

    function _startEvents(){
        _addBindings();
    }

    _startEvents();

    return (retrieveNames,startQuickGame)

})() 