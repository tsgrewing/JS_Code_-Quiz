// set up a variable with an array of question objects(each index with a question, array of answers, and the correct answer that matches one of the answers in the array)
var questionList = [
    {
        question: "Which of the following is NOT an example of a falsy value?",
        choices: ["NaN", "null", "'False'", "undefined"],
        answer: "'False'"
    }
    {
        question: "Which of these is the logical operator that means 'or'?",
        choices: ["##", "==", "&&", "||"],
        answer: "||" 
    }
    {
        question: "Which of these is a string?",
        choices: ["'5'", "5", "true", "None of these"],
        answer: "'5'" 
    }
    {
        question: "What is the correct way to write an array in JavaScript?",
        choices: ["var array = ('one', 'two', 'three')", "var array = {'one', 'two', 'three'}", "var array = 'one', 'two', 'three'", "var array = ['one', 'two', 'three']"],
        answer: "var array = ['one', 'two', 'three']"
    }
    {
        question: "Which of the following is an example of camel case?",
        choices: ["background_color", "backgroundColor", "BackgroundColor", "Background-Color"],
        answer: "backgroundColor"
    }
]
// global variables
var score;
var timeLeft;

// set variables for html elements
var startButton = document.getElementById("start-button");
var startSplash = document.getElementById("start-splash");
var questionWrapper = document.getElementById("question-wrapper");
var clearButton = document.getElementById("clear-button");
var homeButton = document.getElementById("home-button");
var scoreList = document.getElementById("score-list");
var remainingTime = document.getElementById("timer");

// start quiz function (when startButton is clicked), hide start splash screen and show first question
function startQuiz() {

}

// add event listener for question div 

// function to determine if correct answer was clicked, if it was award point(s), if not deduct 10 seconds from timer

