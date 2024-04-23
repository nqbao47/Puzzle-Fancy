var rows = 4;
var columns = 4;

var currTile;
var otherTile;

var turns = 0;

window.onload = function () {
  //initialize the 5x5 board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //<img>
      let tile = document.createElement("img");
      tile.src = "./images/white.jpg";

      //DRAG FUNCTIONALITY
      tile.addEventListener("dragstart", dragStart); //click on image to drag
      tile.addEventListener("dragover", dragOver); //drag an image
      tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
      tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
      tile.addEventListener("drop", dragDrop); //drop an image onto another one
      tile.addEventListener("dragend", dragEnd); //after you completed dragDrop

      document.getElementById("board").append(tile);
    }
  }
  playAgain();
  //pieces
  let pieces = [];
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
  }
  pieces.reverse();
  for (let i = 0; i < pieces.length; i++) {
    let j = Math.floor(Math.random() * pieces.length);

    //swap
    let tmp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = tmp;
  }

  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = "./images/" + pieces[i] + ".jpg";

    //DRAG FUNCTIONALITY
    tile.addEventListener("dragstart", dragStart); //click on image to drag
    tile.addEventListener("dragover", dragOver); //drag an image
    tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
    tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
    tile.addEventListener("drop", dragDrop); //drop an image onto another one
    tile.addEventListener("dragend", dragEnd); //after you completed dragDrop

    document.getElementById("pieces").append(tile);
  }
};

//DRAG TILES
function dragStart() {
  currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this; //this refers to image that is being dropped on
}

function dragEnd() {
  if (currTile.src.includes("white")) {
    return;
  }
  let currImg = currTile.src;
  let otherImg = otherTile.src;
  currTile.src = otherImg;
  otherTile.src = currImg;

  turns += 1;
  document.getElementById("turns").innerText = turns;

  // Handle Win and Lose
  if (turns > 2) {
    // Hiển thị thông báo thua vì quá số lượt xếp
    alert("Bạn đã thua vì quá số lượt xếp!");
    // Ngăn người dùng tiếp tục chơi bằng cách vô hiệu hóa sự kéo thả
    document.querySelectorAll("img").forEach((img) => {
      img.removeEventListener("dragstart", dragStart);
      img.removeEventListener("dragover", dragOver);
      img.removeEventListener("dragenter", dragEnter);
      img.removeEventListener("dragleave", dragLeave);
      img.removeEventListener("drop", dragDrop);
      img.removeEventListener("dragend", dragEnd);
    });
    // Hiển thị nút chơi lại
    document.getElementById("playAgainBtn").style.display = "block";
  } else {
    // Nếu số lượt xếp chưa vượt quá 10, hiển thị phần quà cho người dùng chọn
    showGiftOptions();
  }
}

function playAgain() {
  // Tạo sự kiện chơi lại trò chơi khi người dùng click nút
  document
    .getElementById("playAgainBtn")
    .addEventListener("click", function () {
      location.reload(); // Tải lại trang để reset trò chơi
    });
}

function showGiftOptions() {
  // Code để hiển thị phần quà cho người dùng chọn sẽ được thêm ở đây
}
