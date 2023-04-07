import Ball from "./objects/ball.js";
import Paddle from "./objects/paddle.js";

const game = document.getElementById('game')
const ball = new Ball(document.getElementById('ball'), game);
const leftPLayer  = new Paddle(document.getElementById('left-player'),game)
const computerPlayer  = new Paddle(document.getElementById('right-player'),game)
const playerScoreElem = document.getElementById('score-left')
const computerScoreElem = document.querySelector('.score-right')
let lastTime
let levelPercent = document.getElementById('level-percent');
let levelInput = document.getElementById('level');

function update(time){
    if (lastTime != null){
        const delta = time - lastTime

        //Update Code 
        ball.update(delta,[leftPLayer, computerPlayer])
        computerPlayer.update(delta, ball.y);

        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
        document.documentElement.style.setProperty('--hue',hue + delta * 0.01)
        if (isLose()) handleLose()
    }
    lastTime = time;
    window.requestAnimationFrame(update)

}

function isLose(){
    const rect = ball.rect()
    const game = ball.game
    return (rect.left + ball.size) >= game.right || rect.left <= game.left
        
}
function restartGame(ball, computerPlayer, scores){
    ball.reset()
    computerPlayer.reset()

}
function handleLose(){
    const rect = ball.rect();
    const game = ball.game
    if((rect.left + ball.size) >= game.right){
        playerScoreElem.innerHTML = parseInt(playerScoreElem.textContent)+1
    }else {
        
        computerScoreElem.innerHTML = parseInt(computerScoreElem.textContent) +1
    }  
    restartGame(ball,computerPlayer);
}

function handleScore(e){
    if(e.key.toLowerCase() == 'r') {
        const scores = [playerScoreElem, computerScoreElem]
        restartGame(ball, computerPlayer), 
        scores.forEach((score) => score.innerHTML = 0)
    }
}
//Move the player 1
game.addEventListener("mousemove", e =>{
    leftPLayer.position = (((e.y - leftPLayer.size) / game.getBoundingClientRect().height) * 100) 
})
// Handle the scores
document.addEventListener('keydown', e => handleScore(e))
window.requestAnimationFrame(update)
//Add the percentage
levelInput.addEventListener('input', ()=>levelPercent.innerHTML = levelInput.value + '%')