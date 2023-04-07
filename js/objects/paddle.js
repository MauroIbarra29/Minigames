let speed = .02;

export default class Paddle{
    constructor(paddleEllem){
        this.paddleEllem = paddleEllem;
        this.reset()

    }

    get position(){
        return parseFloat(getComputedStyle(this.paddleEllem).getPropertyValue("--position"));
    }

    set position(value){
        this.paddleEllem.style.setProperty("--position", value)
    }

    get size(){
        return this.paddleEllem.getBoundingClientRect().height
    }
    set size(value){
        this.paddleEllem.style.setProperty('--size',value)
    }
    rect(){
        return this.paddleEllem.getBoundingClientRect( )
    }
    reset(){
        this.position = 50;
        this.speed = .02
    }
    get speed(){
        return speed
    }
    set speed(value){
        speed = value
    }
    update(delta, ballHeight){
        this.position += speed * delta * (ballHeight - this.position);
    }
}

