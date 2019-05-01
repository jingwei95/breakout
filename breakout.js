window.addEventListener("load",function()
{
	var canvas = document.getElementById("my");
	var ctx = canvas.getContext("2d");
	
	/*ctx.beginPath();
	ctx.rect(20,40,50,50);
	ctx.fillStyle ="#FF0000";
	ctx.fill();
	ctx.closePath();
	
	ctx.beginPath();
	ctx.arc(240, 160, 20, 0, Math.PI*2, false);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();
	
	ctx.beginPath();
	ctx.rect(160, 10, 100, 40);
	ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
	ctx.stroke();
	ctx.closePath();*/
	var x = canvas.width/2;
	var y = canvas.height-30;
	var ballRadius = 10;
	var dx = 2;
	var dy = -2;
	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.width-paddleWidth)/2;
	var score = 0;
	var speed = 20;
	document.addEventListener("keydown", downHandler);
	
	var brickRowCount = 3;
	var brickColumnCount = 6;
	var brickWidth = 75;
	var brickHeight = 20;
	var brickPadding = 10;
	var brickOffsetTop = 30;
	var brickOffsetLeft = 50;
	var bricks = [];
	for(let c = 0; c < brickColumnCount; c++){
		bricks[c] = [];
		for(let r = 0; r < brickRowCount; r++){
			bricks[c][r] = {x:0 ,y:0 ,state:1};
			bricks[c][r].x = (c*(brickWidth + brickPadding))+ brickOffsetLeft;
			bricks[c][r].y = (r*(brickHeight + brickPadding)) + brickOffsetTop;
			bricks[c][r].state = Math.floor(Math.random()*5) + 1;
		}
	}
	//setInterval(draw, speed);
	 setTimeout(draw, speed);
	function draw(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//ctx.beginPath();
		if(x+dx < ballRadius || x+dx > canvas.width - ballRadius) 
			dx = -dx;
		if(y+dy > canvas.height - ballRadius)
		{
			/*alert("Game Over");
			document.location.reload();*/
			ctx.font = "24px Arial";
			ctx.fillStyle = "red";
			ctx.fillText("Game Over!", 200, 200);
		}else {
			if((y+dy < ballRadius) || (y+dy > canvas.height-ballRadius-paddleHeight && x > paddleX && x < paddleX + paddleWidth))
				dy = -dy;
			x += dx;
			y += dy;
			//collisionDetection();
			drawBall();
			//ctx.arc(x, y, ballRadius, 0, Math.PI*2);
			//ctx.fillStyle = "#0095DD";
			//ctx.fill();
			//ctx.closePath();
			drawPaddle();
			drawBricks();
			drawScore();
			speed = 20 - Math.ceil(Math.min(score,200)/20);
			//speed = 20;
			if(!collisionDetection()){
				setTimeout(draw, speed);
			}
		}
		
	}
	//setInterval(draw, 10);
	function drawScore(){
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score :"+score, 8, 20);
	}
	
	function drawBall(){
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI*2,false);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}
	function drawBricks(){
		for(let c = 0; c < brickColumnCount; c++){
			for(let r = 0; r < brickRowCount; r++){
				if(bricks[c][r].state > 0){
					ctx.beginPath();
					ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
					ctx.fillStyle = (new Array("gray","#0DD","#0CD","#0BD","#0095DD"))[bricks[c][r].state-1];
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}
	
	function drawPaddle(){
		ctx.beginPath();
		ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();
	}
	
	//document.addEventListener("keydown", keyDownHandler, false);
	//document.addEventListener("keyup", keyUpHandler, false);
	function downHandler(e) {
		if(e.keyCode == 39) {
			if(	paddleX <　canvas.width - paddleWidth )
				paddleX += 7;
			else 
				paddleX = canvas.width - paddleWidth;
		}
		else if(e.keyCode == 37) {
			if(	paddleX >= 7 )
				paddleX -= 7;
			else 
				paddleX = 0;
		}
	}

	/*function keyUpHandler(e) {
		if(e.keyCode == 39) {
			rightPressed = false;
		}
		else if(e.keyCode == 37) {
			leftPressed = false;
		}
	}*/
	
	function collisionDetection(){
		var collision = false, gameOver = true;
		for(let c = 0; c < brickColumnCount && !collision; c++){
			for(let r = 0; r < brickRowCount && !collision; r++){
				let b = bricks[c][r];
				if(b.state > 0){
					gameOver = false;
					if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
						dy = -dy;
						bricks[c][r].state--;
						console.log(bricks[c][r].state);
						score = score + 5 - bricks[c][r].state;
						collision=true;
					}
				}
			}
		}
		if(gameOver){
			ctx.font = "24px Arial";
			ctx.fillStyle = "red";
			ctx.fillText("YOU WIN, CONGRATULATIONS!", 200, 300);
		}
		return (gameOver)
	}
});