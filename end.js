const username = document.getElementById("username");
const saveScorebtn = document.getElementById("saveScorebtn");
const finalScore = document.getElementById("finalScore");
const mostRecentscore = localStorage.getItem("mostRecentscore");

const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

const Max_High_Score = 5;


finalScore.innerText = mostRecentscore;

username.addEventListener ("keyup", () => {
    saveScorebtn.disabled = !username.value;
});

saveHighscore = e => {
    console.log("clicked the the save btn");
    e.preventDefault();

    const score = {
        score: mostRecentscore,
        name: username.value
    };
    highscores.push(score);
    highscores.sort((a,b) => b.score - a.score )

    highscores.splice(7);

    localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.assign("/");

};