const ball = document.getElementById('ball');
const game = document.getElementById('game');
const leftPlayer = document.getElementById('left-player');
const rightPlayer = document.getElementById('right-player');

let ballX = 0;
let ballY = 200;
let speedBallX = 4;
let speedBallY = 2;
let speedPlayers = 12;

let widthGame = game.clientWidth;
let heightGame = game.clientHeight;

let leftX = 0;
let leftY = 0;
let rightY = 0;
let rightX = widthGame - rightPlayer.clientWidth

let leftPaddleX = leftPlayer.clientWidth;
let leftPaddleY = leftPlayer.clientHeight;
let rightPaddleY = leftPlayer.clientHeight;



function update(){
    ballX += speedBallX;
    ballY += speedBallY;

    ball.style.left = ballX + 'px'
    ball.style.top = ballY + 'px'

    //When hits the walls

    if(ballX ==  (widthGame - ball.clientWidth) || ballX <= 0){
        speedBallX = -speedBallX
    }
    if(ballY ==  (heightGame - ball.clientHeight) || ballY <= 0){
        speedBallY = -speedBallY
    }

     // Rebote en las paletas
    if (ballX  ==  (leftPaddleX) && ballY > leftY && ballY < (leftY + leftPaddleY)){
        speedBallX = -speedBallX;
    }
    if ((ballX + ball.clientWidth)  ==  (rightX) && ballY > rightY && ballY < (rightY + rightPaddleY)){
        speedBallX = -speedBallX;
    }

    leftPlayer.style.top = leftY + 'px';
    rightPlayer.style.top = rightY+ 'px';

}

document.addEventListener('keydown', (e)=>{
    if (e.key == 'w'){
        if (leftY > 0){
            leftY -= speedPlayers;
        }
    }else if (e.key == 's'){
        if (leftY < (game.clientHeight - leftPaddleY)){
            leftY += speedPlayers;
        }
    }
    if (e.key == 'o'){
        if (rightY > 0){
            rightY -= speedPlayers;
        }
    }else if (e.key == 'l'){
        if (rightY < (game.clientHeight - rightY)){
            rightY += speedPlayers;
        }
    }
})

setInterval(()=>{
    update();
},20)