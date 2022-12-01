var nextEl = document.querySelector("#next");
var cursor = 0;
var questions = ["How much wood could a woodchuck chuck?",
"Did you have your break today?",
"Do you like ice cream?",
"Whats your favorite pizza topping?"
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