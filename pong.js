//selecting canvas 
const cvs  = document.getElementById("pong")
const ctx = cvs.getContext("2d")

// user paddle
const user = {
    x : 0,
    y : cvs.height / 2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

// user paddle
const com = {
    x : cvs.width - 10,
    y : cvs.height / 2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

// creating the ball

const ball = {
    x : cvs.width/2,
    y : cvs.height/2,
    radius : 10,
    speed : 5, 
    velocityX : 5,
    velocityY : 5,
    color : "WHITE"
}

//reactangle draw functions

function drawRect(x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}
// creating the net 
const net = {
    x : cvs.width - 1,
    y : 0,
    width : 2,
    height : 10,
    color : "WHITE"
}

// drawing the net function
function drawNet(){
    for (let i = 0; 0 <= cvs.height; i+=15) {
        drawNet(net.x, net.y + i, net.width, net.height, net.color);
        
    }
}

//circle draw functions
function drawCircle(x,y,r,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}

// text function
function drawText(text, x, y,color){
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text,x,y)

}

// render function 
function render(){
    drawRect(0,0,cvs.width, cvs.height, "BLACK")
    // draw the net
    drawNet()
    drawScore(user.score, cvs.width/4,cvs.height/5,"WHITE")
    drawScore(user.score, 3*cvs.width/4,cvs.height/5,"WHITE")
    // user & computer paddle
    drawRect(user.x, user.y, user.width, user.height, color)
    drawRect(com.x, com.y, com.width, com.height, color)
    // ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color)
}

// funciton game 
function game(){
    render();
}

// looping the game
const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);