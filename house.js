// const canvas = document.querySelector("canvas");
// const ctx = canvas.getContext("2d");
// canvas.width = 800;
// canvas.height = 800;

// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.rect(250, 250, 100, 100);
// ctx.fill();

// ctx.beginPath();
// ctx.rect(350, 350, 100, 100);
// ctx.fillStyle = "red";
// ctx.fill();

//캔버스에뭔가 그려줄거임
//캔버스 먼저 찾아오고 붓 만들기
//캔버스 크기 자바스크립트한테 알려주기
//붓 만들어서 그리기

//- ctx.fillRect(200, 200, 50, 200); → 왼쪽 벽 만들기
// - ctx.fillRect(400, 200, 50, 200); → 오른쪽 벽 만들기
// - ctx.lineWidth = 2; → 선 굵기 조절
// - ctx.strokeRect(300, 300, 50, 100); → 문 만들기
// : strokeRect()는 선만 그려주고 채워주지 않는.
// - ctx.fillRect(200, 200, 200, 20); → 천장 만들기
// - ctx.moveTo(200, 200); → 지붕 만들기 위해 연필(좌표) 이동
// - ctx.lineTo(325, 100);
// - ctx.lineTo(450, 200);
// - ctx.fill();

// 다 채워진 게 보기 좋으니까, strokeRect를 fillRect로 변경해줌.
// - ctx.fillRect(300, 300, 50, 100);

const canvas = document.querySelector("canvas"); //=>캔버스 찾아오기
const ctx = canvas.getContext("2d"); //=>  붓 역할을 할 콘텍스트(3d도 있고 2d도 있음.)

canvas.width = 800;
canvas.height = 800; //=> 캔버스 사이즈를 자바스크립트에도 꼭 알려줘야 함.

//집만들기:
//1. 양옆 기둥
ctx.fillStyle = "hotpink";
ctx.fillRect(200, 400, 20, 300);
ctx.fillRect(600, 400, 20, 300);
//2. 문
ctx.strokeStyle = "navy";
ctx.lineWidth = 10; //=>선굵기 조절: 스트로크 뢬 전에 써줘야 먹음.// 나중에 쓰면 소용없어버려
ctx.strokeRect(365, 550, 100, 150);

//3. 천장
ctx.fillRect(200, 400, 400, 20);

//4. 지붕
ctx.fillStyle = "yellow";
ctx.moveTo(200, 400); //지붕 왼쪽 아래(시작지점)
ctx.lineTo(400, 250); // 지붕 꼭데기
ctx.lineTo(620, 400); //=>x축은 스트로크 두께 까지 고려해서 ㅇㅇ// 지붕 오른쪽 아래
ctx.fill();
