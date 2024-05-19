let button = document.getElementById("button");
let body = document.getElementById("body");
button.addEventListener("click", function () {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    body.style.backgroundColor = "#" + randomColor;
});
