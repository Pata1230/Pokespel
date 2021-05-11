let paused = false;
let check = true;
window.addEventListener('DOMContentLoaded', (event) =>{
   
    


  let keysPressed = {}

  document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
 });
 
 document.addEventListener('keyup', (event) => {
     delete keysPressed[event.key];
  });

  let game_canvas = document.getElementById("game");
  let game_canvas_context = game_canvas.getContext('2d');

  game_canvas.style.background = "#000000"


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
      draw(){
          game_canvas_context.lineWidth = 1
          game_canvas_context.fillStyle = this.color
          game_canvas_context.strokeStyle = "black"
          game_canvas_context.fillRect(this.x, this.y, this.width, this.height)
          game_canvas_context.strokeRect(this.x, this.y, this.width, this.height)
      }

  }
  class Circle{
      constructor(x, y, radius, color, xmom = 0, ymom = 0){
          this.x = x
          this.y = y
          this.radius = radius
          this.color = color
          this.xmom = xmom
          this.ymom = ymom
          this.lens = 0
      }       
       draw(){
          game_canvas_context.lineWidth = 0
          game_canvas_context.strokeStyle = this.color
          game_canvas_context.beginPath();
          game_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
          game_canvas_context.fillStyle = this.color
          game_canvas_context.fill()
          game_canvas_context.stroke(); 
      }

  }

  class Grid{
      constructor(width, height, color){
          this.width = width
          this.height = height
          this.x = 0
          this.y = 0
          this.blocks = []
          for(let q = 0; this.y<game_canvas.height; q++){
              for(let q = 0; this.x<game_canvas.width; q++){
                  let block
                  if(Math.random() < .91){
                     block = new Rectangle(this.x, this.y, this.height, this.width, color)
                  }else{
                   block = new Rectangle(this.x, this.y, this.height, this.width, "green")
                  }
                  this.blocks.push(block)
                  this.x+=this.width
              }
              this.y+=this.height
              this.x = 0
          }

      }
      draw(){
          for(let b = 0; b<this.blocks.length; b++){
              this.blocks[b].draw()
          }
      }
  }

  class Agent{
      constructor(grid, color){
          this.grid = grid
          this.body = new Circle(10,10,Math.min(this.grid.width/4, this.grid.height/4), color)
          this.location = this.grid.blocks[Math.floor(this.grid.blocks.length)]
      }
      draw(){
        this.control()
        this.body.x = this.location.x + this.location.width/2
        this.body.y = this.location.y + this.location.height/2
        this.body.draw()
    }
      control(){ //movement
 
          if(keysPressed['w']){
              this.body.y -= this.grid.height
          }
          if(keysPressed['a']){
              this.body.x -= this.grid.width
          }
          if(keysPressed['s']){
              this.body.y += this.grid.height
          }
          if(keysPressed['d']){
              this.body.x += this.grid.width
             
          }

          for(let g = 0;g<this.grid.blocks.length; g++){ //kollar om man försöker gå ut ur griden
       
         
              if(this.body.x > this.grid.blocks[g].x){
                  if(this.body.y > this.grid.blocks[g].y){
                      if(this.body.x < this.grid.blocks[g].x+this.grid.blocks[g].width){
                          if(this.body.y < this.grid.blocks[g].y+this.grid.blocks[g].height){
                              this.location = this.grid.blocks[g];
                              if(this.grid.blocks[g].color != "green"){
                                check = true 
                               
                            }
                                  if(this.grid.blocks[g].color == "green" && check == true){
                                    console.log("pog2")
                                    
                                    GeneratePokemon();
                                    check = false;
                                    
                              }
                          }  
                      }  
                  }
              
                
                }
          }


      }

  }

  let board = new Grid(50,50, "blue")
  let lad = new Agent(board, "white")

 
  window.setInterval(function(){  //ritar själva griden

      board.draw()
      lad.draw()
  }, 120)  //framerate

  
})
function GeneratePokemon(){

    let inputData = 2;
    fetch("https://pokeapi.co/api/v2/pokemon/" + inputData)
      .then((response) => response.json())
      .then((data) => {
        // Skapa ett nytt image element
        let sprite = document.createElement("img");
        // Fyll image elementets URL med data som vi hämtade från PokeAPI
        sprite.setAttribute("src", data.sprites.front_default);
        // Lägg till bilden i vårt "gym" (en helt vanlig div)
        document.querySelector("#pokegym").prepend(sprite);
        document.querySelector(
          ".message"
        ).innerText = `✨ En vild ${data.species.name} dök upp ur det höga gräset!`;
      })
      
}
