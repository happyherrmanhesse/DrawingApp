const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

//왼쪽 팔////
ctx.lineWidth = 20;
ctx.strokeStyle = "rgb(255, 220, 171)";
ctx.moveTo(300, 250);
ctx.lineTo(250, 400);
ctx.stroke();

//오른쪽 팔
ctx.lineWidth = 40;
ctx.strokeStyle = "rgb(255, 220, 171)";
ctx.moveTo(500, 250);
ctx.lineTo(550, 400);
ctx.stroke();

///왼다리///
ctx.beginPath();
ctx.fillStyle = "rgb(255, 220, 171)";
ctx.rect(330, 500, 40, 200);
ctx.fill();

///오른다리///
ctx.beginPath();
ctx.fillStyle = "rgb(255, 220, 171)";
ctx.lineWidth = 40;
ctx.moveTo(440, 490);
ctx.lineTo(480, 600);
ctx.lineTo(550, 600);
ctx.stroke();

//몸통////
ctx.fillStyle = "hotpink";
ctx.fillRect(300, 250, 200, 250);

///머리///
ctx.beginPath();
ctx.fillStyle = "rgb(255, 220, 171)";
ctx.arc(400, 160, 70, 0, 2 * Math.PI);
ctx.fill();

///오른쪽흰자//////
ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(430, 150, 15, 0, 2 * Math.PI);
ctx.fill();

////왼쪽눈동자////
ctx.beginPath();
ctx.fillStyle = "black";
ctx.arc(370, 160, 15, 1 * Math.PI, 2 * Math.PI);
ctx.fill();

///오른쪽 눈동자
ctx.beginPath();
ctx.arc(431, 153, 10, 0, 2 * Math.PI);
ctx.fill();

//입////
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(400, 180, 30, 2 * Math.PI, 1 * Math.PI);
ctx.fill();
