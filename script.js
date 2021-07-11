//DOM MODULE

const DOM = ( () => {

    const boardDOM = document.getElementById('board');
    const statusDOM = document.getElementById('status');
    const resetDOM = document.getElementById('reset');

    const getBoxes = () => {
        return boardDOM.querySelectorAll('.box');
    }

    const updateStatus = (message) => {
        statusDOM.innerText = message;
    }

    const createBox = () => {
        const box = document.createElement('div');
        box.classList.add('box');
        return box;
    }
    
    const render = (gameState) => {
        console.log(gameState.length);
        gameState.forEach( element => {
            boardDOM.appendChild(
                createBox()
            )
        })
    }

    const getResetDOM = () => {
        return resetDOM;
    }

    return {
        render,
        getBoxes,
        updateStatus,
        getResetDOM
    }
})();

const board = ( () => {
    const gameState = ['','','','','','','','',''];

    const getGameState = () => {
        return gameState;
    }

    const getFieldAt = (index) => {
        return gameState[index]
    }

    const addToGameState = (index,sign) => {
        gameState[index] = sign;
        console.log(gameState);
    }

    const reset = () => {
        for (let i = 0;i<9;i++) {
            gameState[i] = '';

        }
    }

    const init = () => {
        for (let i = 0;i<9;i++) {
            gameState.push('');
        }
        DOM.render(getGameState());
    }

    return {
        getGameState,
        init,
        addToGameState,
        getFieldAt,
        reset
    };
})();

const displayController = ( () => {

    return {
        
    }
})();

const Player = (sign) => {
    const getSign = () => sign;
    return {
        getSign
    }
};

const gameLogic = ( () => {
    
    const player1 = Player('X');
    const player2 = Player('O');
    let gameOver = false;
    let draw = false;

    let currentPlayer = player1;

    const getCurrentPlayer = () => {
        return currentPlayer
    }

    const getGameOver = () => {
        return gameOver;
    }
    
    const reset = () => {
        gameOver = false;
        draw = false;
        currentPlayer = player1;
    }

    const switchPlayer = () => {
        if (currentPlayer.getSign() === 'X') {

            currentPlayer = player2;
            DOM.updateStatus(`${currentPlayer.getSign()}'s turn`)
        }
        else {
            currentPlayer = player1;
            DOM.updateStatus(`${currentPlayer.getSign()}'s turn`)
        
        }
    }

    const checkWin = (sign) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (let i = 0;i < winConditions.length;i++) {
            let row = winConditions[i];
            let box1 = row[0];
            let box2 = row[1];
            let box3 = row[2];

            if ( board.getFieldAt(box1) === sign
                && board.getFieldAt(box2) === sign
                && board.getFieldAt(box3) === sign) {
                    gameOver = true;
                }
        }
        return gameOver
    }

        
        const checkDraw = () => {
            if (!board.getGameState().includes('')) {
                draw = true;
                return true;
            }
            return false;
        }
        
        return {
            getCurrentPlayer,
            switchPlayer,
            checkWin,
            getGameOver,
            checkDraw,
            reset
        }
    })();
    
    
    
const Controllers = ( () => {
    
    const init = () => {
        DOM.getBoxes().forEach( childNode => {
            childNode.addEventListener( 'click', (e) => {
                boxListener(childNode,e);
                
            })
        })

        DOM.getResetDOM().addEventListener( 'click', () => {
            board.reset();
            gameLogic.reset();
            DOM.getBoxes().forEach( childNode => {
                childNode.innerHTML = '';
            })
            DOM.updateStatus(`${gameLogic.getCurrentPlayer().getSign()}'s turn'`)
        })
    }
    
    const boxListener = (childNode,e) => {
        if (childNode.innerHTML === '' && !gameLogic.getGameOver()) {
            childNode.innerHTML = gameLogic.getCurrentPlayer().getSign();
            board.addToGameState(parseInt(e.target.dataset.index),gameLogic.getCurrentPlayer().getSign());
            
            if (gameLogic.checkWin(gameLogic.getCurrentPlayer().getSign())) {
                DOM.updateStatus(`${gameLogic.getCurrentPlayer().getSign()} wins!!`)
            }
            else if (gameLogic.checkDraw()) {
                DOM.updateStatus(`draw!!`) 
            }
            else {
                gameLogic.switchPlayer();
        }
            
        }
    }

    return {
        init
    }
})();

Controllers.init();


