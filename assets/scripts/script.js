// set up a variable with an array of question objects(each index with a question, array of answers, and the correct answer that matches one of the answers in the array)
var questionList = [
    {
        question: "Which of the following is NOT an example of a falsy value?",
        choices: ["NaN", "null", "'False'", "undefined"],
        answer: "'False'"
    },
    {
        question: "Which of these is the logical operator that means 'or'?",
        choices: ["##", "==", "&&", "||"],
        answer: "||" 
    },
    {
        question: "Which of these is a string?",
        choices: ["'5'", "5", "true", "None of these"],
        answer: "'5'" 
    },
    {
        question: "What is the correct way to write an array in JavaScript?",
        choices: ["var array = ('one', 'two', 'three')", "var array = {'one', 'two', 'three'}", "var array = 'one', 'two', 'three'", "var array = ['one', 'two', 'three']"],
        answer: "var array = ['one', 'two', 'three']"
    },
    {
        question: "Which of the following is an example of camel case?",
        choices: ["background_color", "backgroundColor", "BackgroundColor", "Background-Color"],
        answer: "backgroundColor"
    }
]
// global variables
var score;
var numberOfQuestions = questionList.length;
var timeLeft = numberOfQuestions * 10;
var questionNumber = 0;

// set variables for html elements
var startButton = document.getElementById("start-button");
var startSplash = document.getElementById("start-splash");
var questionWrapper = document.getElementById("question-wrapper");
var clearButton = document.getElementById("clear-button");
var homeButton = document.getElementById("home-button");
var scoreList = document.getElementById("score-list");
var remainingTime = document.getElementById("timer");
var answerList = document.getElementById("answer-list");
var questionHeader = document.getElementById("question-header");

// Load Splash screen to start the quiz
startScreen()

function startScreen() {
    startSplash.style.display = "block";
}
// start quiz function (when startButton is clicked), hide start splash screen and show first question
function takeQuiz() {
    startSplash.setAttribute("style", "display: none;");
    questionWrapper.setAttribute("style", "display: block;");
    nextQuestion();
}

function nextQuestion () {
    var currentQuestion = questionList[questionNumber].question;
    var answerChoices = questionList[questionNumber].choices;
    questionHeader.textContent = currentQuestion;
    for (i = 0; i < answerChoices.length; i++) {
        var choice = document.createElement("li");
        choice.textContent = answerChoices[i];
        answerList.appendChild(choice);
    };
}

// function to determine if correct answer was clicked, if it was award point(s), if not deduct 10 seconds from timer
answerList.addEventListener("click", function(event){
    var answerChoice = event.target.textContent;
    console.log(answerChoice)

})
// Clear High Score
function clearScores() {

};



// add event listeners

startButton.addEventListener("click", takeQuiz);
clearButton.addEventListener("click", clearScores);
// answerList.addEventListener.("click", )
