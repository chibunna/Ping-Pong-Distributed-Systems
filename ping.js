// select canvas element
const canvas = document.getElementById("pong");

const ctx = canvas.getContext('2d');

// sounds
let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

hit.src = "/Users/chibunna/Dev/Ping Pong - MIS660 Project/sounds/hit.mp3";
wall.src = "/Users/chibunna/Dev/Ping Pong - MIS660 Project/sounds/wall.mp3";
comScore.src = "/Users/chibunna/Dev/Ping Pong - MIS660 Project/sounds/comScore.mp3";
userScore.src = "/Users/chibunna/Dev/Ping Pong - MIS660 Project/sounds/userScore.mp3";

// Object specifications 

// Ball object
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 16, //when increased, the AI controlling the com does not return each ball serve..Keep btwn 5 & 8
    color : "WHITE"
}

// user paddle
const user = {                                                  
    x : 0, 
    y : (canvas.height - 100)/2, 
    width : 10,
    height : 100,
    score : 0,
    color : "ORANGE"
}

// computer paddle
const com = {
    x : canvas.width - 10, 
    y : (canvas.height - 100)/2, 
    width : 10,
    height : 100,
    score : 0,
    color : "GREEN"
}

// net
const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}


function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}


function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}


canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    
    user.y = evt.clientY - rect.top - user.height/2;
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 6;
}

// draw the net
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}


function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "40px monospace";
    ctx.fillText(text, x, y);
}

// collision detection
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}


function update(){
    
    
    if( ball.x - ball.radius < 0 ){
        com.score++;
        comScore.play();
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        userScore.play();
        resetBall();
    }
    

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // controlling com AI (difficulty level)
    com.y += ((ball.y - (com.y + com.height/2)))*0.2;
    

    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
        wall.play();
    }
    

    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;
    
    // if the ball hits a paddle
    if(collision(ball,player)){

        hit.play();

        let collidePoint = (ball.y - (player.y + player.height/2));

        collidePoint = collidePoint / (player.height/2);
        

        let angleRad = (Math.PI/4) * collidePoint;
        

        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        

        ball.speed += 0.1;
    }
}

// render function, the function that does all the drawing
function render(){
    

    drawRect(0, 0, canvas.width, canvas.height, "#000");
    

    drawText(user.score,canvas.width/4,canvas.height/5);
    

    drawText(com.score,3*canvas.width/4,canvas.height/5);
    

    drawNet();
    

    drawRect(user.x, user.y, user.width, user.height, user.color);

    drawRect(com.x, com.y, com.width, com.height, com.color);
    

    drawArc(ball.x, ball.y, ball.radius, ball.color);
}
function game(){
    update();
    render();
}

let framePerSecond = 50;

let loop = setInterval(game,1000/framePerSecond);

