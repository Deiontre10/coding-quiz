var questionEl = document.querySelector(".question");
var cursor = 0;

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

var correctChoices = ["", "", "", "",];

var displayQuestion = function() {
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
var advance = function(event) {
    var element = event.target;
    if (element.matches(".question button")) {
        var answer = element.dataset.choice === correctChoices[cursor];
        if (cursor < questions.length - 1) {
            cursor++;
            questionEl.dataset.index = cursor;
        };
        displayQuestion();
    };
};

questionEl.addEventListener("click", advance)

displayQuestion();