const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressbarfull = document.getElementById("progressbarfull");
const Loader = document.getElementById("Loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questioncounter = 0;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=20&category=17&difficulty=easy&type=multiple").then(res => {
    return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map( loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };

        const answerChoices =[...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random()*3) +1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index+1)] = choice;
        })
        return formattedQuestion;

    });
   
    //questions = loadedQuestions;
    startGame();
})
.catch(err => {
    console.log(err);
});

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS  = 5;


startGame = () => {
    questioncounter = 0;
    score = 0;
    availableQuestions =[...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    Loader.classList.add("hidden");
} ;

getNewQuestion = () => {
    if(availableQuestions == 0 || questioncounter == MAX_QUESTIONS){
        localStorage.setItem("mostRecentscore", score);
        return window.location.assign("/end.html");
    }
    questioncounter++;
    progressText.innerText = "Question:- " + questioncounter + "/" + MAX_QUESTIONS;
    //update the progress bar
    console.log();
    progressbarfull.style.width = `${(questioncounter / MAX_QUESTIONS) * 100}%`;
  
    const questionindex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionindex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionindex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classtoapply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if(classtoapply == "correct"){
            increamentScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classtoapply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classtoapply);
            getNewQuestion();
        },1000)
    });
});
increamentScore = num => {
    score +=num;
    scoreText.innerText = score;
}; 

