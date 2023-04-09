const highScoresList = document.getElementById("highScoresList");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];


highScoresList.innerHTML = highscores.map( score => {
   return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
.join(" ");

clearHighscore = e => {
   //console.log("vv");
   highScoresList.innerHTML = highscores.map( score => {
      return localStorage.clear("highscores");
   })
};