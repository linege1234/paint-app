const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

const colors = [
  "#ff3838",
  "#ffb8b8",
  "#c56cf0",
  "#ff9f1a",
  "#fff200",
  "#32ff7e",
  "#7efff5",
];

ctx.lineWidth = 2;
//Mouseover painting and Mouseclick painting
canvas.addEventListener("mousemove", (event) => {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  canvas.addEventListener("click", (event) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
  });
  const xcord = event.offsetX;
  const ycord = event.offsetY;
  ctx.lineTo(xcord, ycord);
  ctx.stroke();
});
