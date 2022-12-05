var questionEl = document.querySelector(".question");
var cursor = 0;
var timeLeft = 80;
var timeEl = document.querySelector("#timer");
var headerEl = document.querySelector("header");
var mainEl = document.querySelector("#welcome");
var startButton = mainEl.querySelector("button");
var finalScores = document.querySelector("#final");
headerEl.style.display = "flex";
headerEl.style.justifyContent = "space-between";

var questions = [
    {
        text: "How much wood could a woodchuck chuck?",
        correctAnswer: "a",
        possible : [
            "a.",
            "b.",
            "c.",
            "d.",
        ],
    },
    {
        text: "Did you have your break today?",
        correctAnswer: "a",
        possible : [
            "a.",
            "b.",
            "c.",
            "d.",
        ],
    },
    {
        text: "Do you like ice cream?",
        correctAnswer: "a",
        possible : [
            "a.",
            "b.",
            "c.",
            "d.",
        ],
    },
    {
        text: "Whats your favorite pizza topping?",
        correctAnswer: "a",
        possible : [
            "a.",
            "b.",
            "c.",
            "d.",
        ],
    }
];

var correctChoices = ["d", "a", "c", "b",];

var init = function(event) {
    // event.preventDefault();
    mainEl.style.display = "block";
    questionEl.style.display = "none";
    finalScores.style.display = "none";
   
}

var displayTime = function() {
  timeEl.textContent = "Time Left: " + timeLeft;
}

var setTime = function() {
    displayTime();
    var countdown = setInterval(function() {
      timeLeft--;
      displayTime();
  
      if(timeLeft === 0 || questions.length === 0) {
        clearInterval(countdown);
      }
    }, 1000);
  }

var displayQuestion = function() {
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
    highscore();
}

var advance = function(event) {
    var element = event.target;
    if (element.matches(".question button")) {
        var answer = element.dataset.choice === correctChoices[cursor];
        if (cursor < questions.length - 1) {
            cursor++;
            questionEl.dataset.index = cursor;
        };
        displayQuestion();
        console.log(answer)
    };
};

var highscore = function () {
    mainEl.style.display = "none";
    questionEl.style.display = "none";
    finalScores.style.display = "block";
}

questionEl.addEventListener("click", advance)
startButton.addEventListener("click", function() {
    setTime()
    displayQuestion()
})


// displayQuestion();
// init();
