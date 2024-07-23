document.addEventListener('DOMContentLoaded', () => {
    const gameboard = document.getElementById('gameboard');
    const infoDisplay = document.getElementById('info');
    const caja = document.getElementById('caja');
    const historial = document.getElementById('historial');
    const saveGameButton = document.getElementById('saveGame');
    const loadGameButton = document.getElementById('loadGame');
    const animationScreen = document.getElementById('animation-screen')

    const pieces = {
        // Piezas Negras:
        'a8': 'Torre Negro',
        'b8': 'Caballo Negro',
        'c8': 'Alfil Negro',
        'd8': 'Reina Negro',
        'e8': 'Rey Negro',
        'f8': 'Alfil Negro',
        'g8': 'Caballo Negro',
        'h8': 'Torre Negro',
        'a7': 'Peon Negro a7',
        'b7': 'Peon Negro b7',
        'c7': 'Peon Negro c7',
        'd7': 'Peon Negro d7',
        'e7': 'Peon Negro e7',
        'f7': 'Peon Negro f7',
        'g7': 'Peon Negro g7',
        'h7': 'Peon Negro h7',
        // Piezas Blancas:
        'a1': 'Torre Blanco',
        'b1': 'Caballo Blanco',
        'c1': 'Alfil Blanco',
        'd1': 'Reina Blanco',
        'e1': 'Rey Blanco',
        'f1': 'Alfil Blanco',
        'g1': 'Caballo Blanco',
        'h1': 'Torre Blanco',
        'a2': 'Peon Blanco a2',
        'b2': 'Peon Blanco b2',
        'c2': 'Peon Blanco c2',
        'd2': 'Peon Blanco d2',
        'e2': 'Peon Blanco e2',
        'f2': 'Peon Blanco f2',
        'g2': 'Peon Blanco g2',
        'h2': 'Peon Blanco h2'
    };

    const pieceImages = {
        'Torre Negro': './images/torreN.png',
        'Caballo Negro': './images/caballoN.png',
        'Alfil Negro': './images/alfilN.png',
        'Reina Negro': './images/reinaN.png',
        'Rey Negro': './images/kingN.png',
        'Peon Negro a7': './images/peonN.png',
        'Peon Negro b7': './images/peonN.png',
        'Peon Negro c7': './images/peonN.png',
        'Peon Negro d7': './images/peonN.png',
        'Peon Negro e7': './images/peonN.png',
        'Peon Negro f7': './images/peonN.png',
        'Peon Negro g7': './images/peonN.png',
        'Peon Negro h7': './images/peonN.png',

        'Torre Blanco': './images/torreB.png',
        'Caballo Blanco': './images/caballoB.png',
        'Alfil Blanco': './images/alfilB.png',
        'Reina Blanco': './images/reinaB.png',
        'Rey Blanco': './images/kingB.png',
        'Peon Blanco a2': './images/peonB.png',
        'Peon Blanco b2': './images/peonB.png',
        'Peon Blanco c2': './images/peonB.png',
        'Peon Blanco d2': './images/peonB.png',
        'Peon Blanco e2': './images/peonB.png',
        'Peon Blanco f2': './images/peonB.png',
        'Peon Blanco g2': './images/peonB.png',
        'Peon Blanco h2': './images/peonB.png'
    };

    const columns = 'abcdefgh';
    const rows = '87654321';

    console.log('Paso 1: al cargard DOM const elementos HTML, pieces, piecesImages, columnas y filas');

    function createSquare(row, col) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.id = `${columns[col]}${rows[row]}`;
        if ((row + col) % 2 === 0) {
            square.classList.add('beige');
        } else {
            square.classList.add('brown');
        }

        const pieceId = `${columns[col]}${rows[row]}`;

        if (pieces[pieceId]) {
            const img = document.createElement('img');
            img.src = pieceImages[pieces[pieceId]];
            img.id = pieces[pieceId];
            img.alt = pieces[pieceId];
            img.classList.add('chess-piece');
            img.setAttribute('draggable', 'true');
            square.appendChild(img);
        }

        square.addEventListener('dragover', dragOver);
        square.addEventListener('dragenter', dragEnter);
        square.addEventListener('drop', dragDrop);
        square.addEventListener('dragleave', dragLeave);
        square.addEventListener('dragend', dragEnd);

        console.log('Funcion que crea cada "square", asigna id, crea piezas donde corresponde, agrega event listeners');
        return square;
    }

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = createSquare(row, col);
            gameboard.appendChild(square);
        }
        console.log('Append Child cada square por fila');
    }

    const chessPieces = document.querySelectorAll('.chess-piece');
    chessPieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('drag', dragging);
    });

    console.log('Const chessPieces, seleccionando por clase .chess-piece');

    let beingDragged;

    function dragging() {
        infoDisplay.textContent = 'Estas moviendo: ' + beingDragged.id;
    }

    function dragStart(e) {
        beingDragged = e.target;
    }


    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.target.classList.add('highlight');
    }

    function dragLeave(e) {
        e.target.classList.remove('highlight');
    }

    function animateAll(targetPiece) {
        let currentFrame = 1; // Frame actual
        let interval;
        targetPiece.classList.remove('highlight');

        isAnimating = false;
        isAnimating = true;
        console.log('Animate All ACTIVADA!!');
        if (targetPiece.src.endsWith('peonB.png')) {
            frames = 10
            console.log('Animar Peon Blanco!!');
            interval = setInterval(() => {
                if (currentFrame <= frames) {
                    targetPiece.src = `./images/peonBlancoMuerte${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(interval);
                    isAnimating = false;
                }
            }, 225); // Cambia la imagen cada 225ms (ajusta según sea necesario)

        } else if (targetPiece.src.endsWith('peonN.png')) {
            frames = 10
            console.log('Animar Peon Negro!!');
            interval = setInterval(() => {
                if (currentFrame <= frames) {
                    targetPiece.src = `./images/peonNegroMuerte${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(interval);
                    isAnimating = false;
                }
            }, 225); // Cambia la imagen cada 225ms (ajusta según sea necesario)

        } else if (targetPiece.src.endsWith('alfilB.png')) {
            frames = 12
            console.log('Animar Alfil Blanco!!');
            interval = setInterval(() => {
                if (currentFrame <= frames) {
                    targetPiece.src = `./images/alfilBlancoMuerte${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(interval);
                    isAnimating = false;
                }
            }, 225); // Cambia la imagen cada 225ms (ajusta según sea necesario)

        } else if (targetPiece.src.endsWith('alfilN.png')) {
            frames = 12
            console.log('Animar Alfil Negro!!');
            interval = setInterval(() => {
                if (currentFrame <= frames) {
                    targetPiece.src = `./images/alfilNegroMuerte${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(interval);
                    isAnimating = false;
                }
            }, 225); // Cambia la imagen cada 225ms (ajusta según sea necesario)

        } else if (targetPiece.src.endsWith('kingB.png')) {
            frames = 12
            console.log('Animar Rey Blanco!!');
            interval = setInterval(() => {
                if (currentFrame <= frames) {
                    targetPiece.src = `./images/mate${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(interval);
                    isAnimating = false;
                }
            }, 225); // Cambia la imagen cada 225ms (ajusta según sea necesario)

        } else if (targetPiece.src.endsWith('reinaB.png')) {
            frames = 17
            console.log('Animar Reina Blanco!!');
            interval = setInterval(() => {
                if (currentFrame <= frames) {
                    targetPiece.src = `./images/reinaBlancaMuerte${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(interval);
                    isAnimating = false;
                }
            }, 150); // Cambia la imagen cada 225ms (ajusta según sea necesario)

        } else if (targetPiece.src.endsWith('reinaN.png')) {
            frames = 17
            console.log('Animar Reina Negra!!');
            interval = setInterval(() => {
                if (currentFrame <= frames) {
                    targetPiece.src = `./images/reinaNegraMuerte${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(interval);
                    isAnimating = false;
                }
            }, 150); // Cambia la imagen cada 225ms (ajusta según sea necesario)

        } else if (targetPiece.src.endsWith('caballoB.png')) {
            frames = 8
            console.log('Animar Caballo Blanco!!');
            interval = setInterval(() => {
                if (currentFrame <= frames) {
                    targetPiece.src = `./images/caballoBlancoMuerte${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(interval);
                    isAnimating = false;
                }
            }, 150); // Cambia la imagen cada 225ms (ajusta según sea necesario)

        } else if (targetPiece.src.endsWith('torreB.png')) {
            frames = 19
            console.log('Animar Torre Blanca!!');
            interval = setInterval(() => {
                if (currentFrame <= frames) {
                    targetPiece.src = `./images/TorreBlancaMuerte${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(interval);
                    isAnimating = false;
                }
            }, 150); // Cambia la imagen cada 225ms (ajusta según sea necesario)

        } else if (targetPiece.src.endsWith('torreN.png')) {
            frames = 19
            console.log('Animar Torre Negra!!');
            interval = setInterval(() => {
                if (currentFrame <= frames) {
                    targetPiece.src = `./images/torreNegraMuerte${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(interval);
                    isAnimating = false;
                }
            }, 150); // Cambia la imagen cada 225ms (ajusta según sea necesario)

        } else if (targetPiece.src.endsWith('caballoN.png')) {
            frames = 8
            console.log('Animar Caballo Negro!!');
            interval = setInterval(() => {
                if (currentFrame <= frames) {
                    targetPiece.src = `./images/caballoNegroMuerte${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(interval);
                    isAnimating = false;
                }
            }, 150); // Cambia la imagen cada 225ms (ajusta según sea necesario)

        } else if (targetPiece.src.endsWith('kingN.png')) {
            frames = 12
            console.log('Animar Rey Negro!!');
            interval = setInterval(() => {
                if (currentFrame <= frames) {
                    targetPiece.src = `./images/mateN${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(interval);
                    isAnimating = false;
                }
            }, 150); // Cambia la imagen cada 225ms (ajusta según sea necesario)
        }

        setTimeout(() => {
            function cerrarAnimacionEnviarCaja() {
                console.log('Timeout 3000: chequear funcion cerrarAnimacion y enviar pieza a caja');
                animationScreen.style.visibility = "hidden";
                caja.appendChild(targetPiece);
            }
            cerrarAnimacionEnviarCaja()
            console.log("3 Segundos esperados")
        }, 3000);
    }

    function dragDrop(e) {
        e.preventDefault();
        let target = e.target;
        console.log('INICIADA funcion dragDrop');
        if (target.tagName === 'IMG') {
            target = target.parentElement;
        }

        if (target.classList.contains('square')) {
            const fromSquare = beingDragged.parentElement.id;
            const toSquare = target.id;
            console.log('if target contains square');
            if (target.children.length === 0) {
                infoDisplay.textContent = beingDragged.id + ' a ' + toSquare + '. ';

                if (beingDragged.id.includes('Blanco')) {
                    infoDisplay.innerHTML += '<br> - Mueve color Negro';
                    console.log('PRUEBA DE INFO TURNO COLOR CORRECTO ');
                } else if (beingDragged.id.includes('Negro')) {
                    infoDisplay.innerHTML += '<br> - Mueve color Blanco';
                    console.log('PRUEBA DE INFO TURNO COLOR CORRECTO 2');
                }

                target.appendChild(beingDragged);
                recordMove(fromSquare, toSquare, beingDragged.id);
                handlePawnPromotion(beingDragged, target);
            } else if (target.children.length > 0 && target.children[0].classList.contains('chess-piece')) {
                const targetPiece = target.children[0];
                const targetColor = getPieceColor(targetPiece.id);
                const draggedColor = getPieceColor(beingDragged.id);

                if (targetColor === draggedColor) {
                    infoDisplay.textContent = 'No puedes superponer tus piezas';
                } else {
                    infoDisplay.innerHTML = beingDragged.id + ' a ' + toSquare + '. ';
                    infoDisplay.innerHTML += 'Pieza capturada: ' + targetPiece.id + '<br>';


                    animationScreen.style.visibility = "visible";
                    animationScreen.appendChild(targetPiece);

                    // Animar solo el peón capturado que se mueve a la caja
                    if (targetPiece.id.startsWith('Peon Blanco')) {
                        animateAll(targetPiece);
                    } else if (targetPiece.id.startsWith('Peon Negro')) {
                        animateAll(targetPiece);
                    } else if (targetPiece.id.startsWith('Alfil Blanco')) {
                        animateAll(targetPiece);
                    } else if (targetPiece.id.startsWith('Alfil Negro')) {
                        animateAll(targetPiece);
                    } else if (targetPiece.id.startsWith('Rey B')) {
                        animateAll(targetPiece);
                    } else if (targetPiece.id.startsWith('Reina B')) {
                        animateAll(targetPiece);
                    } else if (targetPiece.id.startsWith('Reina N')) {
                        animateAll(targetPiece);
                    } else if (targetPiece.id.startsWith('Caballo B')) {
                        animateAll(targetPiece);
                    } else if (targetPiece.id.startsWith('Torre B')) {
                        animateAll(targetPiece);
                    } else if (targetPiece.id.startsWith('Torre N')) {
                        animateAll(targetPiece);
                    } else if (targetPiece.id.startsWith('Caballo N')) {
                        animateAll(targetPiece);
                    } else if (targetPiece.id.startsWith('Rey N')) {
                        animateAll(targetPiece);
                    }

                    target.appendChild(beingDragged);
                    recordMove(fromSquare, toSquare, beingDragged.id);
                    handlePawnPromotion(beingDragged, target);

                    if (beingDragged.id.includes('Blanco')) {
                        infoDisplay.innerHTML += '- Mueve color Negro';
                    } else {
                        infoDisplay.innerHTML += '- Mueve color Blanco';
                    }

                    const capturada = `---> Pieza capturada: ` + targetPiece.id;
                    const capturadaElement = document.createElement('div');
                    capturadaElement.textContent = capturada;
                    historial.appendChild(capturadaElement);
                }
            }
            target.classList.remove('highlight');
        }
    }

    function handlePawnPromotion(pawn, target) {
        console.log('--> Inicio - handlePawnPromotion()');
        setTimeout(() => {
            const isWhitePawn = pawn.id.includes('Peon Blanco') && target.id[1] === '8';
            console.log('isWhitePawn =', isWhitePawn);
            const isBlackPawn = pawn.id.includes('Peon Negro') && target.id[1] === '1';
            console.log('isBlackPawn =', isBlackPawn);
            console.log('Post timeout');
            if (isWhitePawn || isBlackPawn) {
                console.log('IF isWhitePawn or isBlackPawn');
                promotePawn(pawn, target);
            }
        }, 2500);
        console.log('--> Fin - handlePawnPromotion()');
    }


    function promotePawn(pawn, target) {
        console.log('--> Inicio - promotePawn()');
        const color = pawn.id.includes('Blanco') ? 'Blanco' : 'Negro';
        const promotionPieces = ['Reina', 'Torre', 'Alfil', 'Caballo'];
        const promotionChoice = prompt(`Promociona tu peón a (elige una): ${promotionPieces.join(', ')}`);

        if (promotionPieces.includes(promotionChoice)) {
            const newPieceId = `${promotionChoice} ${color}`;
            const newPiece = document.createElement('img');
            newPiece.id = newPieceId;
            newPiece.src = pieceImages[newPieceId];
            newPiece.classList.add('chess-piece');
            newPiece.setAttribute('draggable', 'true');

            newPiece.addEventListener('dragstart', dragStart);
            newPiece.addEventListener('drag', dragging);

            target.removeChild(pawn);
            target.appendChild(newPiece);
            const moveElement = document.createElement('div');
            moveElement.textContent = pawn.id + ' promovido a: ' + newPiece.id;
            historial.appendChild(moveElement);
        } else {
            alert('Elección de promoción inválida. Inténtalo de nuevo.');
            promotePawn(pawn, target);
        }
        console.log('--> Fin - promotePawn()');
    }

    function dragEnd(e) {
        e.target.classList.add('target');
        setTimeout(() => e.target.classList.remove('target'), 500);
    }

    function getPieceColor(pieceId) {
        return pieceId.includes('Negro') ? 'black' : 'white';
    }

    const jaqueButton = document.getElementById('jaque');
    const mateButton = document.getElementById('mate');

    // Variable to keep track of whether the animation is currently applied
    let isAnimating = false;

    // Function to handle the "jaque" button click
    jaqueButton.addEventListener('click', () => {
        console.log('Boton de jaque clickeado');
        const whiteKing = document.getElementById('Rey Blanco');
        const blackKing = document.getElementById('Rey Negro');

        // Add animation class to the jaque button
        jaqueButton.classList.add('flash-button');

        if (infoDisplay.textContent.includes('- Mueve color Blanco')) {
            console.log('If includes Mueve Color Blanco');
            if (whiteKing) {
                console.log('WhiteKing: ' + whiteKing.id);
                if (!isAnimating) {
                    console.log('animar');
                    whiteKing.classList.add('flash-red');
                    isAnimating = true;
                    const moveElement = document.createElement('div');
                    moveElement.textContent = 'Rey Blanco en Jaque';
                    infoDisplay.innerHTML += '. Rey Blanco en Jaque!';
                    historial.appendChild(moveElement);
                } else {
                    whiteKing.classList.remove('flash-red');
                    blackKing.classList.remove('flash-red');
                    isAnimating = false;
                    jaqueButton.classList.remove('flash-button');
                }
            }
        } else if (infoDisplay.textContent.includes('- Mueve color Negro')) {
            if (blackKing) {
                if (!isAnimating) {
                    blackKing.classList.add('flash-red');
                    isAnimating = true;
                    const moveElement = document.createElement('div');
                    moveElement.textContent = 'Rey Negro en Jaque';
                    infoDisplay.innerHTML += '. Rey Negro en Jaque!';
                    historial.appendChild(moveElement);
                } else {
                    blackKing.classList.remove('flash-red');
                    whiteKing.classList.remove('flash-red');
                    isAnimating = false;
                    jaqueButton.classList.remove('flash-button');
                }
            }
        }
    });

    mateButton.addEventListener('click', () => {
        const whiteKing = document.getElementById('Rey Blanco');
        const blackKing = document.getElementById('Rey Negro');
        isAnimating = false;
        if (infoDisplay.textContent.includes('Rey Negro en Jaque')) {
            console.log('Animacion de muerte rey negro');
            let currentFrame = 1; // Frame actual
            let interval;
            blackKing.classList.remove('highlight');
            isAnimating = false;
            isAnimating = true;
            console.log('Animate JAQUE MATE Rey Negro!!');
            frames = 12
            animationScreen.style.visibility = "visible";
            animationScreen.appendChild(blackKing);

            if (blackKing.src.endsWith('kingN.png')) {

                interval = setInterval(() => {
                    if (currentFrame <= frames) {
                        blackKing.src = `./images/mateN${currentFrame}.png`;
                        currentFrame++;
                    } else {
                        clearInterval(interval);
                        isAnimating = false;
                    }
                }, 225); // Cambia la imagen cada 225ms (ajusta según sea necesario)
            }
        } else if (infoDisplay.textContent.includes('Rey Blanco en Jaque')) {
            let currentFrame = 1; // Frame actual
            let interval;
            whiteKing.classList.remove('highlight');
            isAnimating = false;
            isAnimating = true;
            console.log('Animate JAQUE MATE Rey Blanco!!');
            frames = 12
            animationScreen.style.visibility = "visible";
            animationScreen.appendChild(whiteKing);

            if (whiteKing.src.endsWith('kingB.png')) {

                interval = setInterval(() => {
                    if (currentFrame <= frames) {
                        whiteKing.src = `./images/mate${currentFrame}.png`;
                        currentFrame++;
                    } else {
                        clearInterval(interval);
                        isAnimating = false;
                    }
                }, 225); // Cambia la imagen cada 225ms (ajusta según sea necesario)
            }

        }
        const moveElement = document.createElement('div');
        moveElement.textContent = 'Mate';
        historial.appendChild(moveElement);
    });



    saveGameButton.addEventListener('click', saveGame);
    loadGameButton.addEventListener('click', loadGame);

    function recordMove(from, to, piece) {
        const moveElement = document.createElement('div');
        moveElement.textContent = `${piece} desde ${from} hasta ${to}`;
        historial.appendChild(moveElement);
    }

    function saveGame() {
        const gameState = {
            board: {},
            infoText: infoDisplay.textContent,
            historial: historial.innerHTML
        };

        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            if (square.children.length > 0) {
                const piece = square.children[0];
                gameState.board[square.id] = piece.id;
            }
        });

        localStorage.setItem('chessGameState', JSON.stringify(gameState));
        alert('Partida guardada.');
    }

    function loadGame() {
        const gameState = JSON.parse(localStorage.getItem('chessGameState'));
        if (gameState) {
            clearBoard();

            for (const [squareId, pieceId] of Object.entries(gameState.board)) {
                const square = document.getElementById(squareId);
                const piece = document.createElement('img');
                piece.src = pieceImages[pieceId];
                piece.id = pieceId;
                piece.alt = pieceId;
                piece.classList.add('chess-piece');
                piece.setAttribute('draggable', 'true');

                piece.addEventListener('dragstart', dragStart);
                piece.addEventListener('drag', dragging);

                square.appendChild(piece);
            }

            infoDisplay.textContent = gameState.infoText;
            historial.innerHTML = gameState.historial;
            alert('Partida cargada.');
        } else {
            alert('No hay partidas guardadas.');
        }
    }

    function clearBoard() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            if (square.children.length > 0) {
                square.removeChild(square.children[0]);
            }
        });
    }
});