var rows = 4;
var columns = 4;

var currTile;
var otherTile;

var turns = 0;

window.onload = async function () {
  //initialize the 4x4 board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //<img>
      let tile = document.createElement("img");
      tile.src =
        "https://raw.githubusercontent.com/nqbao47/Puzzle-Fancy/main/images/white.jpg";

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
  // Fetch image URLs from GitHub repo
  const response = await fetch(
    "https://api.github.com/repos/nqbao47/Puzzle-Fancy/contents/images"
  );
  const data = await response.json();

  // Filter out files (not directories) from the response
  const imageFiles = data.filter((item) => item.type === "file");

  // Filter out files (not directories) from the response
  const filteredImages = imageFiles.filter((item) => {
    const fileName = item.name.toLowerCase();
    return !(
      fileName.includes("bg.jpg") ||
      fileName.includes("black.jpg") ||
      fileName.includes("white.jpg")
    );
  });

  // Shuffle the image files
  const shuffledImages = shuffleArray(filteredImages);

  // Load the images onto the pieces
  for (let i = 0; i < shuffledImages.length; i++) {
    let tile = document.createElement("img");
    tile.src = shuffledImages[i].download_url;

    // Add drag functionality
    tile.addEventListener("dragstart", dragStart);
    tile.addEventListener("dragover", dragOver);
    tile.addEventListener("dragenter", dragEnter);
    tile.addEventListener("dragleave", dragLeave);
    tile.addEventListener("drop", dragDrop);
    tile.addEventListener("dragend", dragEnd);

    document.getElementById("pieces").append(tile);
  }
};

// Shuffle function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
  if (turns > 32) {
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
