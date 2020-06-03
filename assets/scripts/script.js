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
var highscores = [];
var currentScore = [];

// variables for html elements
var startButton = document.getElementById("start-button");
var startSplash = document.getElementById("start-splash");
var questionWrapper = document.getElementById("question-wrapper");
var scoreForm = document.getElementById("final-score");
var scoreWrapper = document.getElementById("scores-wrapper");
var clearButton = document.getElementById("clear-button");
var homeButton = document.getElementById("home-button");
var scoreList = document.getElementById("score-list");
var remainingTime = document.getElementById("timer");
var answerList = document.getElementById("answer-list");
var questionHeader = document.getElementById("question-header");
var scoreSubmission = document.getElementById("score-submission");
var initials = document.getElementById("initials");
var highscoreLink = document.getElementById("highscore-link");
var rightOrWrong = document.getElementById("right-or-wrong");

// Load Splash screen to start the quiz
startScreen();
loadHighscores();


function startScreen() {
    score = 0;
    timeLeft = numberOfQuestions * 10;
    questionNumber = 0;
    startSplash.style.display = "block";
    questionWrapper.style.display = "none";
    scoreWrapper.style.display = "none";
    scoreForm.style.display = "none";

};

// start quiz function (when startButton is clicked), hide start splash screen and show first question
function takeQuiz() {
    score = 0;
    timeLeft = numberOfQuestions * 10;
    questionNumber = 0;
    startSplash.style.display = "none";
    questionWrapper.style.display = "block";

    nextQuestion();
    // Start timer 
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

// Function to populate elements with next question
function nextQuestion () {
    var currentQuestion = questionList[questionNumber].question;
    var answerChoices = questionList[questionNumber].choices;
    questionHeader.textContent = currentQuestion;
    answerList.innerHTML = ("");
    for (i = 0; i < answerChoices.length; i++) {
        var choice = document.createElement("li");
        choice.textContent = answerChoices[i];
        answerList.appendChild(choice);
    };
};

// function to determine if correct answer was clicked, if it was award point(s), if not deduct 10 seconds from timer
answerList.addEventListener("click", function(event){
    var correctAnswer = questionList[questionNumber].answer;
    var answerChoice = event.target.textContent;

    if (answerChoice === correctAnswer) {
        score++;
        rightOrWrong.style.color = "#5d9256";
        rightOrWrong.textContent = "Correct"
    }
    else {
        timeLeft = timeLeft - 10;
        rightOrWrong.style.color = "#AB1813";
        rightOrWrong.textContent = "Incorrect, the correct answer is: " + correctAnswer;
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

// hide question wrapper, calculate score, and show the score submission form
function endQuiz() {
    score = (score * 5 + timeLeft);
    questionWrapper.style.display = "none";
    rightOrWrong.textContent = "";
    document.getElementById("your-score").innerHTML = "Your score is " + score + "!";
    scoreForm.style.display = "block";
    // pull high scores from local storage and add current score, then arrange the scores highest to lowest
    loadHighscores();
    scoreSubmission.addEventListener("submit", function(event) {
    event.preventDefault();

    
    var user = initials.value.toUpperCase();
    if (user === "") {
        alert("Initials cannot be blank");

    }
    else {
        highscores.push({"initials": user, "points":score});
    }
    scoreForm.style.display = "none";

    highscores.sort(function(a,b){
        return b.points - a.points;
    })

    localStorage.setItem("highscores", JSON.stringify(highscores));

    displayHighscores(); 
    return;
  
});
};

// pull scores from local memory, add them to the empty array
function loadHighscores() {
    highscores = [];
    var savedScores = JSON.parse(localStorage.getItem("highscores"));
    if (savedScores !== null) {
        highscores = savedScores;
    }


};

// Pass high scores into the html and display to user
function displayHighscores() {
    
    scoreWrapper.style.display = "block"
    startSplash.style.display = "none";
    questionWrapper.style.display = "none";
    scoreForm.style.display = "none";

    
    scoreList.innerHTML = "";
    // render new li for each set of user initials
    for (var i = 0; i < highscores.length; i++) {
        var userInitials = highscores[i]["initials"];
        var highscore = highscores[i]["points"];
        var li = document.createElement("li");

        if (i % 2 !== 0) {
            li.style.backgroundColor = "rgba(88, 185, 136, 0.452)";
        }

        li.textContent = userInitials + "......" + highscore;
        scoreList.appendChild(li);
    }

};

// add event listeners
homeButton.addEventListener("click", () => {
    startSplash.style.display = "block";
    scoreWrapper.style.display = "none"
});
startButton.addEventListener("click", takeQuiz);
highscoreLink.addEventListener("click", displayHighscores);
clearButton.addEventListener("click", () => {
    localStorage.clear();
    loadHighscores();
    displayHighscores();

});
