let elements = (
    function(){


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

        return {holder,player1,pinkDonut,playerText,textHolders, playerInputText,
        player2, playerSelection,humanDonut, computerDonut, playerText, select,
        player2Input, xDonut,  playerComputer, startHolder, startButton, gridHolder,grid, information
        ,playerState,currentPlayer1,donut,currentPlayerText,currentPlayer2,resetButton,
        board,peice}
    }
)()