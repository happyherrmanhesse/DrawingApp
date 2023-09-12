const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
//선굵기 조절인풋을 조절하면 그대로 선의 굵기가 조절되게 하고싶음.
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
//lineWidth초기값으로 5를 준다는 의미. 왜냐면 html파일에서 초기값을 5로 설정했기 때문.

let isPainting = false;
let isFilling = false;

function onMouseMove(e) {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    return;
  }
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY); //일단 마우스를 움직일때는 시작점이 따라가게끔만 해놓음.

  //if문을 위에쓰는 이유:
  //d일단 마우스를 움직이기만 하면 movtTo는 언제나 실행됨.
  //마우스를 누르는 순간 if문이 실행되는데, if문이 실행되면 그순간 moveTo는 실행이 안됨. 따라서 시작점은 멈춰있는 상태로 lineto는 계속 해서 움직인다.
  // 하지만 if문을 아래다가 쓰면 moveTo가 계속 해서 lineTo랑 겹치게 됨. 누르든 안눌르든 언제나 moveTo가 실행이 되므로 그려지지가 않는것임!! 시작점이 고정되어있어야 하는데 계속 시작점(moveTo)과 끝점(lineTo)이 겹치니까 안그려지는 것!
}

function onMouseDown() {
  isPainting = true;
}

function onMouseUp() {
  isPainting = false;
}

function onLineWidthChange(e) {
  console.log(e.target.value);
  ctx.lineWidth = e.target.value;
}

function onColorChange(e) {
  console.log(e.target.value);
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
}

function onColorClick(e) {
  const colorValue = e.target.dataset.color;
  console.log(colorValue);
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  //fill모드와 draw모드를 바꿔주는 버튼으로 만드는 함수.
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill"; //만약에 isFilling이 true일때 버튼을 클릭하면 모드를 바꾸고 싶다는 의미야.
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw"; //만약 isFilling이 아닐때 버튼을 누르게 되면 채우기 모드로 바꾸고 싶다는의미고.
  }
} //모드를 바꾸는 함수.// 한 모드는 캔버스 전체를 채우는거고,다른 한 모드는 선을 그리는것

function onCanvasClick() {
  //isFilling일때 캔버스를 클릭하면 캔버스크기의 새로운 사각형을 만들고, 해당 색상으로 채워줘야해
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  //모든것을 초기화하는 함수// 이미 그린것을 지울 수는 없음. 대신에 하얀색네모(캔버스크기와 같은 크기의 네모)로 다 덮어버리는 방법으로 할 수 있음.
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  //그린것을 지워주는 함수. // 즉 하얀색으로 그려주는거랑 똑같음
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(e) {
  const file = e.target.files[0]; //보다싶이 이건 파일배열이야 그 배열에서 첫번쩨 파일을 불러오는 거야. 이게 파일배열인 이유는 input에 multiple속성을 추가 할 수 있기 때문이야. multiple속성을 추가하면 유저가 파일을 여러개 업로드 할 수 있어. 하지만 여기선 유저가 하나의 파일만 업로드 하고 있기 때문에 파일배열에서 첫번째 파일만 필요한거야.
  const url = URL.createObjectURL(file); //유저가 업로드한 파일은 이미 브라우저의 메모리 안에 있거든 하지만 우리는 url을 통해서 해당 파일에 접근하려고 하는거야. 그래서 createObjectUrl메소드를 호출하는거야.
  //이 메소드를 이용하면 해당 파일ㄹ의 브라우저 메모리 url을 알아낼 수 있어.
  //유저가 파일을 업로드 한 브라우저 안에서만 사용할 수 있는 url인거지. 인터넷에느 없는 파일인거야

  const image = new Image(); //이건 document.createElement("img");랑똑같은거야.
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 100, 0, 600, 800);
    fileInput.value = null; //파일인풋을 비워주는 이유: 다른파일도 불러올 수 있게 하기 위해서
  }; //그다음에 이벤트리스너를 추가해주는데 이건 이벤트를 추가할 수 있는 또 다른 방법이야
}

function onDoubleClick(e) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save(); // ctx.save()는 ctx의 현재상태, 색상 , 스타일 등 모든 것을 저장해
    ctx.lineWidth = 1;
    ctx.font = "48px serif";
    ctx.fillText(text, e.offsetX, e.offsetY);
    ctx.restore(); // linewidth가 1로 변경되었기 때문에 그냥 draw모드에서도 linewidth가 1로 적용됨. 이것을 막기 위해서 해당정보는 ctx.save(); 와 ctx.restore사이에 입력해서 저장되지 않게 해버림.
    // save 와 restore 사이에서는 정말 어떤 수정을 하던 저장되지 않을거야
  }
}

function onSaveClick(e) {
  const url = canvas.toDataURL(); // 캔버스에 있는 그림데이터를 url로 변환해주는 메소드.
  const a = document.createElement("a"); //a테그를 이용해서 가짜링크를 만든다음에 웹사이트로 링크하는 대신 이 이미지 url로 링크할거야
  a.href = url;
  a.download = "myDrawing.png"; //그다음에 a태그 안에 있는 download속성을 이용할거야. download라는 속성을 a태그에 더해주면 브라우저에게 a href에 있는 컨텐츠를 다운로드 하라고 알리는 역할을 해.
  a.click(); //saveBtn을 누르면 a태그를 클릭시키는거지!
}

canvas.addEventListener("dblclick", onDoubleClick); //textInput에 이벤트리스너를 추가하지 않은 대신 canvas에 더블클릭 이벤트를 달아줌. 이 이벤트는 유저가 마우스 버튼을 빠르게 두번 눌렀다 뗐다를 반복할때만 함수를 실행시켜주는 이벤트야
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick); //모드를 바꾸는 함수.
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
