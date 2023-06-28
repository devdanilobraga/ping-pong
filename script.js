// Variáveis do jogo
var pong = document.getElementById("pong");
var paddle1 = document.getElementById("paddle1");
var paddle2 = document.getElementById("paddle2");
var ball = document.getElementById("ball");
var score1 = document.getElementById("score1");
var score2 = document.getElementById("score2");
var levelDisplay = document.getElementById("level");
var pongWidth = pong.clientWidth;
var pongHeight = pong.clientHeight;
var paddleHeight = paddle1.clientHeight;
var paddleSpeed = 5;
var ballXSpeed = 2;
var ballYSpeed = 2;
var paddle1Y = 160;
var paddle2Y = 160;
var ballX = 290;
var ballY = 190;
var playerScore = 0;
var botScore = 0;
var level = 1;

// Função principal de atualização do jogo
function update() {
    // Movimento das paletas
    if (keys.ArrowUp && paddle1Y > 0) {
        paddle1Y -= paddleSpeed;
    }
    if (keys.ArrowDown && paddle1Y < pongHeight - paddleHeight) {
        paddle1Y += paddleSpeed;
    }

    // Movimento do bot
    var botSpeed = paddleSpeed * (level * 0.2); // Aumenta a velocidade do bot com base no nível
    var botCenter = paddle2Y + paddleHeight / 2;
    if (botCenter < ballY - 10) {
        paddle2Y += botSpeed;
    } else if (botCenter > ballY + 10) {
        paddle2Y -= botSpeed;
    }

    // Movimento da bola
    ballX += ballXSpeed;
    ballY += ballYSpeed;

    // Colisão com as paletas
    if (
        ballY + 20 >= paddle1Y &&
        ballY <= paddle1Y + paddleHeight &&
        ballX <= 30
    ) {
        ballXSpeed = -ballXSpeed;
    }

    if (
        ballY + 20 >= paddle2Y &&
        ballY <= paddle2Y + paddleHeight &&
        ballX + 20 >= pongWidth - 30
    ) {
        ballXSpeed = -ballXSpeed;
    }

    // Colisão com as paredes
    if (ballY <= 0 || ballY + 20 >= pongHeight) {
        ballYSpeed = -ballYSpeed;
    }

    // Verificar se a bola saiu da tela
    if (ballX < 0) {
        // Aumentar pontuação do bot e verificar vitória
        botScore++;
        if (botScore >= 10) {
            endGame("Bot Wins!");
        } else {
            resetBall();
        }
    } else if (ballX + 20 > pongWidth) {
        // Aumentar pontuação do jogador e verificar vitória
        playerScore++;
        if (playerScore >= 10) {
            endGame("Player Wins!");
        } else {
            resetBall();
        }
    }

    // Atualizar a posição das paletas e da bola
    paddle1.style.top = paddle1Y + "px";
    paddle2.style.top = paddle2Y + "px";
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    // Atualizar pontuação e nível exibidos
    score1.textContent = playerScore;
    score2.textContent = botScore;
    levelDisplay.textContent = level;
}

// Função para reiniciar a posição da bola
function resetBall() {
    ballX = 290;
    ballY = 190;
    ballXSpeed = -ballXSpeed;
}

// Função para finalizar o jogo
function endGame(message) {
    alert(message);
    playerScore = 0;
    botScore = 0;
    level = 1;
    resetBall();
}

// Mapeamento das teclas pressionadas
var keys = {};
document.addEventListener("keydown", function (event) {
    keys[event.key] = true;
});

document.addEventListener("keyup", function (event) {
    delete keys[event.key];
});

// Loop principal do jogo
function loop() {
    update();
    requestAnimationFrame(loop);
}

// Iniciar o loop do jogo
loop();

  