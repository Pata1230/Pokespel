

let keysPressed = {}

document.addEventListener("keydown", (event) => {

  keysPressed[event.key] = true;
});
document.addEventListener("keyup", (event) => {

  keysPressed[event.key] = true;
});

let GameCanvas = document.getElementById("tutorial"); 
let GameCanvasContext = GameCanvas.getContext('2d');

GameCanvasContext.background = "#000000";

class Rectangle {
  constructor(x, y, height, width, color) {
    this.x = x
    this.y = y
    this.height = height
    this.width = width
    this.color = color
    this.xmom = 0
    this.ymom = 0
  }
  draw() {
    GameCanvasContext.lineWidth = 1
    GameCanvasContext.fillStyle = this.color
    GameCanvasContext.strokeStyle = "black"
    GameCanvasContext.fillRect(this.x, this.y, this.width, this.height)
    GameCanvasContext.strokeRect(this.x, this.y, this.width, this.height)
  }
  move() {
    this.x += this.xmom
    this.y += this.ymom
  }
}
class Grid {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.x = {};
    this.y = {};
    this.blocks = [];
    for(let l = 0; this.y <GameCanvas.height; l++){
      for(let l = 0; this.x <GameCanvas.length; l++){
        let block = new Rectangle(this.x, this.y, this.width, this.height, color)
      
      }
      this.block.push(block);
      this.x += this.width;
    }
this.y += this.height;
this.x = {}

}

draw() {
  for (let b = 0; b < this.blocks.length; b++) {
    this.blocks[b].draw()
  }
}
}
let board = new Grid(70,70,"green")

window.setInterval(function(){
board.draw();
})

