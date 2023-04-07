const INITIAL_VELOCITY = .025;
const VELOCITY_INCREASE = .00001
let levelInput = document.getElementById('level');

export default class Ball{

    //We pass the div element
    constructor(ballEllem,game){
        this.ballEllem = ballEllem
        this.game = game.getBoundingClientRect()
        this.reset()
    }

    get x(){
        // Get the X position through the css value
        return parseFloat(getComputedStyle(this.ballEllem).getPropertyValue("--x"));
    }
    set x(value){
        this.ballEllem.style.setProperty("--x", value)
    }
    get y(){
        // Get the Y position through the css value
        return parseFloat(getComputedStyle(this.ballEllem).getPropertyValue("--y"));
    }
    set y(value){
        this.ballEllem.style.setProperty("--y", value)
    }

    get size(){
        return parseInt(getComputedStyle(this.ballEllem).getPropertyValue("--size"))
    }
    set size(value){
        this.ballEllem.style.setProperty("--size", value)
    }
    rect(){
        //get info about the ball
        return this.ballEllem.getBoundingClientRect();
    }

    //Reset the defaults values
    reset(){
        this.x = 50;
        this.y = 50;
        this.direction = { x : 0}

        while(
            Math.abs(this.direction.x) <= 0.2 || 
            Math.abs(this.direction.x) >= 0.9)
            {
            //Heading is our new direction
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
            }

            this.velocity  = INITIAL_VELOCITY;
    }

    update(delta, players){
        moveBall(delta, this)
        changeDirection(this,players)
    
    }
}
function moveBall(delta,ball){
    //al multiplicarlo por delta hacemos que si hay una gran pausa entre los fotogramas, la bola tambien recorra una gran distancia
    ball.x += ball.direction.x * ball.velocity * delta
    ball.y += ball.direction.y * ball.velocity * delta
    ball.velocity += VELOCITY_INCREASE * delta;
}

function changeDirection(ball,players){

    let paddleRects = [players[0].rect(), players[1].rect()]
    const rect = ball.rect();

    //Change Y Direction
    if((rect.bottom - ball.size) <= ball.game.top || rect.bottom >= ball.game.bottom){
        ball.direction.y *= -1
    }

    //Change X direction if isCollision()
    if (paddleRects.some(r => isCollision(r,rect))){
        const heading = randomNumberBetween(0, 2 * Math.PI);
        ball.direction.x *= -1
        //Make the ball unpredictable
        ball.direction.y = Math.sin(heading) 

        let [, computerPlayer] = players
        computerPlayer.speed = errorComputer(computerPlayer.speed,levelInput.value/100)
    }
}
function randomNumberBetween(min, max){
    return Math.random() * (max - min) + min
}


function isCollision(rect1,ballRect){
    return(
        rect1.left <= ballRect.right &&
        rect1.right >= ballRect.left && 
        rect1.top <= ballRect.bottom &&
        rect1.bottom >= ballRect.top
    )
}

function errorComputer(speed,initial){
    return randomNumberBetween(initial,1) * speed
}