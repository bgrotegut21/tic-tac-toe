let select = (function (){

    let isComputer = true;
    let currentState = "selection";
    

    emit.subscribe("addBindings",addBindings);
    emit.subscribe("removeBindings", removeBindings);
    emit.subscribe("bringBackMenu",bringBackMenu)

    let selectBindings = [{button: elements.computerDonut, func: changeIcon},
                    {button: elements.humanDonut, func: changeIcon},
                    {button: elements.select, func:changeSelection},
                    {button: elements.exit, func: exitState},
                    {button: elements.exitButton, func: exitState},
                    {button: elements.startButton, func: startGame},
                    {button: elements.secondStartButton, func: startGame},
                    {button: elements.mode, func: changeMode},
    ]
    let names = {};
    let isEasyMode = true;

    function addBindings(bindings){
        console.log("grid bindings")
        bindings.forEach(buttonObject => {buttonObject.button.addEventListener("click",buttonObject.func)});
    }

    function removeBindings(bindings){
        bindings.forEach(buttonObject => {buttonObject.button.removeEventListener('click',buttonObject.func)});
    }

    function changeSelection (){
        changeState("selection");
        isComputer? currentState = changeState("computer",true): currentState = changeState("player",true);

    }

    function changeState(state,bool){
        
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

    function exitState(){
        changeState(currentState);
        if (currentState == "player") elements.playerTwoInputText.value = "";
        currentState = changeState("selection",true);
        isEasyMode = false;
        changeMode();
        renderIcons();
    }

    function changeMode(){
        isEasyMode = !isEasyMode;
        isEasyMode == true? elements.mode.textContent = "Easy Mode": elements.mode.textContent = "Hard Mode"
    }

    function changeIcon(){
        isComputer? isComputer = false: isComputer = true;
        renderIcons();
    }

    function renderIcons(){
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

    function addNames (playerName1,playerName2,bool){
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



    function bringBackMenu (){
        addBindings(selectBindings);
        changeState("main",true);
        changeState("computer");
        changeState("player");
        changeState("selection",true);
        isComputer = true; 
        renderIcons();
    }

    function resetTextBox (){
        elements.playerOneInputText.value = "";
        elements.playerTwoInputText.value = "";
    }

    function startGame(quickStart){
         if (typeof quickStart == "object") addNames();
         if (names.playerOne.length > 10 || names.playerTwo.length > 10) {
             names = {};
             displayErrorMessage();
             return;
         }
        changeState("main")
        removeBindings(selectBindings);
         let data = {names,isEasyMode}
        emit.fireEvents("retrieveData",data);
        emit.fireEvents("beginGame");
        resetTextBox();

    }
    //starting game
    addBindings(selectBindings);
    

})() 


