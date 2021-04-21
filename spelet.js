const container = document.getElementById("container");

function makeRows(rows, cols) { //gör en grid 
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (r = 1; r <= (rows); r++) {
      for(c=1;c <= cols; c++){
    let cell = document.createElement("div");
    cell.setAttribute("data-X", c )
    cell.setAttribute("data-Y", r )
    container.appendChild(cell).className = "grid-item";
  }
  };
};
makeRows(10, 10); //hur stor griden är

let player = document.createElement("div");

