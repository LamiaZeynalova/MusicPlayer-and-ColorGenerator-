
const button = document.getElementById("button");
const body = document.getElementById("body");

button.addEventListener("click", () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    body.style.backgroundColor = `#${randomColor}`;
});

