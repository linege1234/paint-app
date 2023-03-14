const lineWidth = document.querySelector("#line-width");
const saveBtn = document.querySelector("#save");
const textInput = document.querySelector("#text");
const fileInput = document.querySelector("#file");
const canvas = document.querySelector("canvas");
const modeBtn = document.querySelector("#mode-btn");
const destroyBtn = document.querySelector("#destroy");
const ctx = canvas.getContext("2d");
const color = document.querySelector("#color");
const eraseBtn = document.querySelector("#erase");
const colorOptions = Array.from(document.querySelectorAll(".color-option"));
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

canvas.addEventListener("mousemove", (event) => {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
});

canvas.addEventListener("mousedown", (event) => {
  isPainting = true;
});
canvas.addEventListener("mouseup", (event) => {
  isPainting = false;
});
function cancelPainting() {
  isPainting = false;
}
//canva 넘어갈때
document.addEventListener("mouseup", cancelPainting);

lineWidth.addEventListener("change", (event) => {
  ctx.lineWidth = event.target.value;
});
color.addEventListener("change", (event) => {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
});

colorOptions.forEach((col) =>
  col.addEventListener("click", (event) => {
    //console.dir(event.target.dataset.color);
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
  })
);
//Button 바꾸기
modeBtn.addEventListener("click", (e) => {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
});

canvas.addEventListener("click", (e) => {
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 800);
  }
});

destroyBtn.addEventListener("click", (e) => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 800);
});

eraseBtn.addEventListener("click", (e) => {
  ctx.strokeStyle = "white";
});
fileInput.addEventListener("change", (e) => {
  //console.dir(event.target!!)
  const file = e.target.files[0];
  //url보내주는 자바스크립트
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function (e) {
    ctx.drawImage(image, 0, 0, 800, 800);
  };
});
canvas.addEventListener("dblclick", (e) => {
  ctx.save();
  const text = textInput.value;
  ctx.font = "48px serif";
  ctx.lineWidth = 1;
  ctx.strokeText(text, e.offsetX, e.offsetY);
  ctx.restore();
});

saveBtn.addEventListener("click", (e) => {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  //<a href="" download="ff" click() ff로 저장됨>
  a.href = url;
  a.download = "mydrawing.png";
  a.click();
});
