let elements = (
    function(){

        let main = document.getElementsByTagName("main")[0];
        let holder = document.querySelector(".holder");
        let player1 = document.querySelector(".player1");
        let pinkDonut = document.querySelector(".pinkDonut")
        let playerText =  document.querySelector(".playerText");
        let textHolders = document.querySelector(".textHolders");
        let playerInputText = document.querySelector(".playerInputText");

        let player2 = document.querySelector(".player2");
        let playerSelection = document.querySelector(".playerSelection");
        let humanDonut = document.querySelector(".humanDonut");
        let computerDonut = document.querySelector(".computerDonut");


        let select = document.querySelector(".select");

        let player2Input = document.querySelector(".player2Input")
        let xDonut = document.querySelector(".xDonut")
        let playerComputer = document.querySelector(".playerComputer");

        let startHolder = document.querySelector(".startHolder")
        let startButton = document.querySelector(".startButton")

        let gridHolder = document.querySelector(".gridHolder");
        let grid = document.querySelector(".grid");
        let information = document.querySelector(".information");
        let playerState = document.querySelector(".playerState");
        let currentPlayer1 = document.querySelector(".currentPlayer1");
        let donut  = document.querySelector(".donut");
        let currentPlayerText = document.querySelector(".currentPlayerText");
        let currentPlayer2 = document.querySelector(".currentPlayer2");
        let resetButton = document.querySelector(".resetButton");
        let board = document.querySelector(".board");
        let peice = document.querySelector(".peice");

        let exit = document.querySelector(".exit")
        let exitButton = document.querySelector(".exitButton")
        let stateText = document.querySelector(".stateText");

        let playerTwoInputText = document.querySelector(".playerTwoInputText");
        let playerOneInputText = document.querySelector(".playerOneInputText");
        let secondStartButton = document.querySelector(".secondStartButton")

        let currentPlayer1Text = document.querySelector(".currentPlayer1Text");
        let currentPlayer2Text = document.querySelector(".currentPlayer2Text");
        let donut1 = document.querySelector(".donut1");
        let donut2 = document.querySelector(".donut2");
        let donut3 = document.querySelector(".donut3");
        let donut4 = document.querySelector(".donut4");
        let donut5 = document.querySelector(".donut5");
        let donut6 = document.querySelector(".donut6");
        let donut7 = document.querySelector(".donut7");
        let donut8 = document.querySelector(".donut8");
        let donut9 = document.querySelector(".donut9");
        let loseReset = document.querySelector(".loseReset")
        let errorMessage = document.querySelector(".errorMessage");
        let xDonutEl = document.querySelector(".xDonutEl");
        let pinkDonutEl = document.querySelector(".pinkDonutEl");
        let winOrLoseState = document.querySelector(".winOrLoseState")
        let winOrLoseDonut = document.querySelector(".winOrLoseDonut");
        let winOrLoseText = document.querySelector(".winOrLoseText");

    

        return {holder,player1,pinkDonut,playerText,textHolders, playerInputText,
        player2, playerSelection,humanDonut, computerDonut, playerText, select,
        player2Input, xDonut,  playerComputer, startHolder, startButton, gridHolder,grid, information
        ,playerState,currentPlayer1,donut,currentPlayerText,currentPlayer2,resetButton,
        board,peice,exit, exitButton, stateText, playerTwoInputText, playerOneInputText, secondStartButton,main, currentPlayer1Text,currentPlayer2Text,
        donut1, donut2, donut3, donut4, donut5, donut6, donut7, donut8, donut9, errorMessage, loseReset,
        xDonutEl, pinkDonutEl, winOrLoseState, winOrLoseDonut, winOrLoseText
    };
    }
)()