var questionEl = document.querySelector(".question");
var timeEl = document.querySelector("#timer");
var headerEl = document.querySelector("header");
var mainEl = document.querySelector("#welcome");
var startButton = mainEl.querySelector("button");
var finalScores = document.querySelector("article");
var retryEl = document.querySelector("#retry");
var initialsEl = document.querySelector("#initials");
var scoreEL = document.querySelector("#quizScore");
var submitBtn = document.querySelector("#score");
var highscorePage = document.querySelector("#allHighscores")

var cursor = 0;
var timeLeft = 80;
var score = 0;
var element = [];

headerEl.style.display = "flex";
headerEl.style.justifyContent = "space-between";

var questions = [
    {
        text: "Inside which HTML element do we put the JavaScript?",
        correctAnswer: "d",
        possible: [
            "a. <link>",
            "b. <src>",
            "c. <js>",
            "d. <script>",
        ],
    },
    {
        text: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        correctAnswer: "a",
        possible: [
            "a. <script src='file.js'>",
            "b. <script href='file.js'>",
            "c. <script name='file.js'>",
            "d. <script link='file.js'>",
        ],
    },
    {
        text: "The external JavaScript file must contain the <script> tag.",
        correctAnswer: "b",
        possible: [
            "a. True",
            "b. False",
        ],
    },
    {
        text: "How do you write 'Hello World' in an alert box?",
        correctAnswer: "c",
        possible: [
            "a. alertWindow('Hello world');",
            "b. prompt('Hello world');",
            "c. alert('Hello world');",
            "d. confirm('Hello world');",
        ],
    }
];

var correctChoices = ["d", "a", "b", "c",];

var init = function (event) {
    // event.preventDefault();
    mainEl.style.display = "block";
    questionEl.style.display = "none";
    highscorePage.style.display ="none";
}

var displayTime = function () {
    timeEl.textContent = "Time Left: " + timeLeft;
}

var setTime = function () {
    displayTime();
    var countdown = setInterval(function () {
        timeLeft--;
        displayTime();
        if (timeLeft === 0) {
            quizOver();
        }

    }, 1000);
}

var displayQuestion = function () {
    mainEl.style.display = "none";

    questionEl.querySelector("h2").textContent = questions[cursor].text;
    questionEl.querySelector("#possible").innerHTML = null;
    for (var buttonLabel of questions[cursor].possible) {
        var buttonEl = document.createElement("button");
        buttonEl.style.margin = "30px";
        buttonEl.textContent = buttonLabel;
        buttonEl.dataset.choice = buttonLabel[0];
        questionEl.querySelector("#possible").appendChild(buttonEl);
    }
}

var advance = function (event) {
    var element = event.target;
    if (element.matches(".question button")) {
        var answer = element.dataset.choice === correctChoices[cursor];
        if (cursor < questions.length - 1) {
            questionEl.dataset.index = cursor;
            displayQuestion();
        }
        cursor++;
        if (answer) {
            timeLeft += 10;
        } else if (!answer) {
            timeLeft -= 10;
        } else {
            quizOver();
        }
        if (cursor == questions.length) {
            quizOver();
        } else {
            displayQuestion();
        }
    }
    
};

var quizOver = function () {
    mainEl.style.display = "none";
    questionEl.style.display = "none";
    finalScores.style.display = "block";
    scoreEL.textContent = timeLeft;
    var highScore = {
        score: timeLeft,
        initials: initialsEl.ariaValueMax.trim(),
    }
    var highScoreList = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoreList.push(highScore);
    localStorage.setItem("highScores", JSON.stringify(highScoreList))

    
    clearInterval(countdown);
};

startButton.addEventListener("click", function () {
    setTime();
    displayQuestion();
});

questionEl.addEventListener("click", advance);

retryEl.addEventListener("click", function () {
    finalScores.style.display = "none";
    setTime();
    init();
});

submitBtn.addEventListener("click", function () {
    highscorePage.style.display = "block";
    finalScores.style.display = "none";

})
