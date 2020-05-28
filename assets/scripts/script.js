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
var score = 0;
var numberOfQuestions = questionList.length;
var timeLeft = numberOfQuestions * 10;
var questionNumber = 0;


// set variables for html elements
var startButton = document.getElementById("start-button");
var startSplash = document.getElementById("start-splash");
var questionWrapper = document.getElementById("question-wrapper");
var finalScore = document.getElementById("final-score");
var scoreWrapper = document.getElementById("scores-wrapper");
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
    questionWrapper.style.display = "none";
    scoreWrapper.style.display = "none";
    finalScore.style.display = "none";
}
// start quiz function (when startButton is clicked), hide start splash screen and show first question
function takeQuiz() {
;
    startSplash.setAttribute("style", "display: none;");
    questionWrapper.setAttribute("style", "display: block;");
    countDown();
    nextQuestion();
}

// Function to populate elements with next question
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
    var correctAnswer = questionList[questionNumber].answer;
    var answerChoice = event.target.textContent;

    if (answerChoice === correctAnswer) {
        score++;

    }
    else {
        timeLeft = timeLeft - 10;

    };

    questionNumber++;

    if (questionNumber < numberOfQuestions){
        answerList.innerHTML = "";
        nextQuestion();
    }
    else {
        endQuiz();
        
    }
});

function endQuiz() {
    score = (score * 5 + timeLeft);
    questionWrapper.style.display = "none";
    document.getElementById("your-score").innerHTML = "Your score is " + score + "!";
    finalScore.style.display = "block";

    
}

// Function to count the timer down from starting point
function countDown () {
    var timer = setInterval(function() {
        timeLeft--;
        remainingTime.textContent = "Time Remaining: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timer);
            endQuiz();
        }
        else if (questionNumber === numberOfQuestions) {
            clearInterval(timer);
        }
    
    }, 1000);
    
    remainingTime.textContent = "Time Remaining: " + timeLeft;
};

// Find high scores and show them
function renderHighScores() {

}

// Clear High Score
function clearScores() {

};

// add event listeners
homeButton.addEventListener("click", startScreen);
startButton.addEventListener("click", takeQuiz);
clearButton.addEventListener("click", clearScores);


