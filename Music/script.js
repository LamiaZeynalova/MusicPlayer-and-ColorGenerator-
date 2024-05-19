"use strict";

const prev10Btn = document.getElementById("prev10sec");
const prevBtn = document.getElementById("prev__btn");
const playBtn = document.getElementById("play__btn");
const nextBtn = document.getElementById("next__btn");
const forward10Btn = document.getElementById("forward10Sec");


const songEl = document.getElementById("song");
const imageEl = document.getElementById("song__image");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const progressContainerEl = document.getElementById("progress-container");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current__time");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");

const songs = [
  { name: "summertime-sadness", artist: "Lana del Rey", title: "Summertime Sadness", duration: "3:25" },
  { name: "shape-of-you", artist: "Ed Sheeran", title: "Shape of You", duration: "4:23" },
  { name: "depresan", artist: "Mert Demir", title: "Depresan", duration: "4:00" },
  { name: "remembrance", artist: "Balmorhea", title: "Remembrance", duration: "5:59" }
];

let isPlaying = false;
let songIndex = 0;

function updatePlaylistDisplay() {
  Array.from(playlist.children).forEach((item, index) => {
    item.classList.toggle("active-song", index === songIndex);
  });
}

function displaySongList() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const songItem = document.createElement("li");
    songItem.className = "hover:font-bold cursor-pointer flex justify-between text-xs mb-2 text-gray-600";
    songItem.textContent = `${song.title} - ${song.artist}`;
    songItem.addEventListener("click", () => {
      songIndex = index;
      displaySong(song);
      playSong();
    });
    playlist.appendChild(songItem);
  });
  updatePlaylistDisplay();
}

function displaySong(song) {
  imageEl.src = `assets/images/${song.name}.jpeg`;
  songEl.src = `assets/audio/${song.name}.mp3`;
  titleEl.innerText = song.title;
  artistEl.innerText = song.artist;
  updatePlaylistDisplay();
}

function playSong() {
  songEl.play();
  isPlaying = true;
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function pauseSong() {
  songEl.pause();
  isPlaying = false;
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = songIndex === 0 ? songs.length - 1 : songIndex - 1;
  displaySong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = songIndex === songs.length - 1 ? 0 : songIndex + 1;
  displaySong(songs[songIndex]);
  playSong();
});

songEl.addEventListener("timeupdate", () => {
  const duration = songEl.duration;
  const currentTime = songEl.currentTime;
  const progressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${progressPercent}%`;
  currentTimeEl.innerText = `${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')}`;
  durationEl.innerText = `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`;
});

progressContainerEl.addEventListener("click", (event) => {
  const width = progressContainerEl.clientWidth;
  const clickedX = event.offsetX;
  const duration = songEl.duration;
  songEl.currentTime = (clickedX / width) * duration;
});

prev10Btn.addEventListener("click", () => {
  songEl.currentTime -= 10;
});

forward10Btn.addEventListener("click", () => {
  songEl.currentTime += 10;
});



document.addEventListener("DOMContentLoaded", displaySongList);
