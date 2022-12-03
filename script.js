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

var displayQuestion = function() {
    nextEl.textContent = questions[cursor];
}
var advance = function() {
    if (cursor < questions.length - 1) {
        cursor++;
    }
    displayQuestion();
}

nextEl.addEventListener("click", advance)

displayQuestion();