var qAndA = [
    {
        question: "What year did TED Begin?",
        choices: ["1984", "1990", "2000", "2006"],
        answer: "1984",
        picture: "assets/images/1984.jpg"
    },
    {
        question: "What do the letters TED stand for?",
        choices: ["Technology, Entertainment, and Design",
                  "Technology, Engineering, and Design",
                  "Teaching, Education, and Dreams",
                  "Transparency, Ethics, and Discussion"],
        answer: "Technology, Entertainment, and Design",
        picture: "assets/images/wordCloud.jpg"

    },
    {
        question: "What is the time limit for a TED talk?",
        choices: ["20 Minutes", "18 Minutes", "25 Minutes", "15 Minutes"],
        answer: "18 Minutes",
        picture: "assets/images/stopwatch18.jpg"

    },
    {
        question: "Which of these musical acts has NOT appeared on the TED stage?",
        choices: ["They Might Be Giants", "Reggie Watts", "Bobby McFerrin", "Andrew Bird"],
        answer: "Bobby McFerrin",
        picture: "assets/images/bobbyMcferrin.jpg"

    },
    {
        question: "Prior to 2014, where was the conference held?",
        choices: ["San Francisco, California", "Long Beach, California", "Vancouver, British Columbia", "New York, New York"],
        answer: "Long Beach, California",
        picture: "assets/images/Long-Beach-Convention-Center.jpg"

    },
    {
        question: "Who started the TED conferences?",
        choices: ["Al Gore", "Benoit Mandelbrot", "Chris Anderson", "Richard Saul Wurman and Harry Marks"],
        answer: "Richard Saul Wurman and Harry Marks",
        picture: "assets/images/richardAndHarry.jpg"

    },
    {
        question: "Which of these was NOT part of the first TED conference?",
        choices: ["A demonstration of the first eBook",
                    "A presentation by Tim Berners-Lee on his vision of a global hyperlinked information system", 
                    "A demonstration of Compact Disk Technology",
                    "One of the first demonstrations of the Macintosh Personal Computer"],
        answer: "A presentation by Tim Berners-Lee on his vision of a global hyperlinked information system",
        picture: "assets/images/timBernersLee.jpg"
    },
    {
        question: "Which of these were among the first six topics posted on the TED website?",
        choices: ["The Web as a City", "Mosquitos, Malaria, and Education", "A Guerilla Gardener in South Central LA", "Do Schools Kill Creativity"],
        answer: "Do Schools Kill Creativity",
        picture: "assets/images/schoolsKillCreativity.jpg"

    },
    {
        question: "Who delivered the most popular TED talk?",
        choices: ["Ken Robinson", "Al Gore", "Nicolas Negroponte", "Donald Trump"],
        answer: "Ken Robinson",
        picture: "assets/images/sirKenRobinson.jpg"

    },
    {
        question: "How do people attend the annual conference?",
        choices: ["By invitation", "By purchasing tickets through TicketMaster", "By application", "By donation"],
        answer: "By application",
        picture: "assets/images/application.jpg"
    }
];

var quest;
var choice1;
var choice2;
var choice3;
var choice4;
var ans;
var pic;
var correct = 0;
var incorrect = 0;
var unAnswered = 0;
var intervalId;
var timeoutId;
var timer = 10;
var i = 0;

// On game start, display a timer with 20 seconds on the clock that begins counting down.
function decrement () {
    timer--;
    $("#timer").html("<h2>" + timer + "</h2>");
    
// If the timer runs out before the player answers the question, increment the unanswered counter, let the player 
//know what the correct answer was and display the corresponding image for three seconds before moving on to the next question.
    if(timer === 0) {
        clearInterval(intervalId);
        unAnswered++;
        incorrect++;
        // console.log(unAnswered);
        $("#timer").html("<h2>You ran out of time. The correct answer was:</h2>");
        $("#question").html("<h2>"+ ans + "</h2>");
        $("#answers").html("<img src ='" + pic + "'</>");  
        if (i < qAndA.length) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(playGame, 3000);
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(endGame, 3000);
        } 
    }
}

// Display the first question along with choices.

function playGame() {
    console.log(i);
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    intervalId = setInterval(decrement, 1000);
    if (i < qAndA.length) {
        quest = qAndA[i].question;
        choice1 = qAndA[i].choices[0];
        choice2 = qAndA[i].choices[1];
        choice3 = qAndA[i].choices[2];
        choice4 = qAndA[i].choices[3];
        ans = qAndA[i].answer;
        pic = qAndA[i].picture;
        timer = 10;
        i++;
        newRound();
    } else {
        endGame();
    }
}

function newRound() {
        $("#timer").empty();
        $("#question").empty();
        $("#answers").empty();
        $("#timer").html("<h2>" + timer + "</h2>");
        $("#question").append("<h2>" + quest + "</h2>");
        $("#answers").append("<h3>" + choice1 + "</h3>");
        $("#answers").append("<h3>" + choice2 + "</h3>");
        $("#answers").append("<h3>" + choice3 + "</h3>");
        $("#answers").append("<h3>" + choice4 + "</h3>");
        $("#answers").on("click", "h3", function() {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            var guess = $(this).text();
            if(guess === ans) {
                correct++;
                $("#timer").html("<h2>You are correct!</h2>");
                $("#question").html("<h2>"+ ans + "</h2>");
                $("#answers").html("<img src ='" + pic + "'</>");
                clearTimeout(timeoutId);
            } else {
                incorrect++;
                $("#timer").html("<h2>Sorry, the correct answer was:</h2>");
                $("#question").html("<h2>"+ ans + "</h2>");
                $("#answers").html("<img src ='" + pic + "'</>");
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(playGame, 3000);
            
        });


}
// On page load, create a button in the game area that says start, and begins the game on click.

$(document).ready($("#question").append("<button>Start</button>"));
$("button").on("click", playGame);








// Highlight the choice the player hover's over before click.

// Compare the user's choice from on click, to the correct answer.
// Change the game area's text to let the play know if they were correct or not, increment the proper counter,
// and display an image relating to the answer for three seconds.

function resetGame(){
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    i = 0;
    correct = 0;
    incorrect = 0;
    unAnswered = 0;
    $("#timer").empty();
    $("#question").empty();
    $("#answers").empty();
    $("#question").append("<button>Start</button>");
    $("button").on("click", playGame);
    
}
// Reset the timer and display the next question and set of choices.



function endGame(){
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    i = 0;
    $("#timer").empty();
    $("#question").empty();
    $("#answers").empty();
    $("#timer").html("<h2>Correct: " + correct + "</h2>");
    $("#question").html("<h2>Incorrect: " + incorrect + "</h2>");
    $("#answers").html("<h2>Unanswered: " + unAnswered + "</h2>");
    resetID = setTimeout(resetGame, 3000);
}

