var questionEl = document.querySelector(".question");
var timeEl = document.querySelector("#timer");
var headerEl = document.querySelector("header");
var mainEl = document.querySelector("#welcome");
var startButton = document.querySelector("#startQuiz");
var finalScores = document.querySelector("#finished");
var retryEl = document.querySelector("#retry");
var initialsEl = document.querySelector("#initials");
var scoreEL = document.querySelector("#quizScore");
var submitBtn = document.querySelector("#score");
var highScorePage = document.querySelector("#allHighscores")
var containerEl = document.querySelector("#container")
var clearScoresEl = document.querySelector("#clearScores")

var cursor = 0;
var timeLeft = 80;
var element = [];
var timeInterval;

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
        text: "What is the correct syntax for referring to an external script called 'file.js'?",
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
}

var displayTime = function () {
    timeEl.textContent = "Time Left: " + timeLeft;
}

var setTime = function () {
    displayTime();
    timeInterval = setInterval(function () {
        displayTime();
        if (timeLeft === 0) {
            quizOver();
        } 
        timeLeft--;

    }, 1000);
}

var displayQuestion = function () {
    var currentQuestion = questions[cursor];

    questionEl.querySelector("h2").textContent = currentQuestion.text;
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
        }
        if (cursor >= questions.length) {
            quizOver();
            return;
        } else {
            displayQuestion();
        }
    }
    displayQuestion();
};

var quizOver = function () {
    hideScreens();
    finalScores.style.display = "block";
    scoreEL.textContent = timeLeft;

    var highScore = {
        score: timeLeft,
        initials: initialsEl.value.trim(),
    }
    var highScoreList = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoreList.push(highScore);
    localStorage.setItem("highScores", JSON.stringify(highScoreList));

    for (var i = 0; i < highScoreList.length; i++) {
        var listEl = document.createElement("li");
        listEl.textContent = highScoreList[i].initials + ": " + highScoreList[i].score;
        highScorePage.querySelector("ul").appendChild(listEl);

    }
    
    clearInterval(timeInterval);
};

var hideScreens = function () {
    var sections = document.querySelectorAll("section");
    console.log(sections);
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none"
    }
};

startButton.addEventListener("click", function () {
    setTime();
    displayQuestion();
    hideScreens();
    questionEl.style.display = "block";
});

questionEl.addEventListener("click", advance);

retryEl.addEventListener("click", function () {
    console.log("display start screen")
    // hideScreens();
    mainEl.style.display = "block";
    // setTime();
    // init();
    // displayQuestion();
    window.location.reload();
});

submitBtn.addEventListener("click", function () {
    hideScreens();
    highScorePage.style.display = "block";
    
});

clearScoresEl.addEventListener("click", function () {
    localStorage.clear();
});

hideScreens();
mainEl.style.display = "block";