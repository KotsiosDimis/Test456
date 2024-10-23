const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submitQuiz");

let quizData = []; // This will hold the fetched quiz data

// Function to fetch the JSON questions from questions.json
function loadQuizData() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            quizData = data;
            buildQuiz(); // Call the function to build the quiz after loading data
        })
        .catch(error => console.error('Error fetching quiz data:', error));
}

// Function to build the quiz
function buildQuiz() {
    const output = [];
    quizData.forEach((currentQuestion, questionNumber) => {
        const choices = [];
        currentQuestion.choices.forEach((choice, index) => {
            choices.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${choice}">
                    ${choice}
                </label>`
            );
        });
        output.push(
            `<div class="question">
                <span class="question-number">${questionNumber + 1}. </span>
                ${currentQuestion.question}
            </div>
            <div class="choices"> ${choices.join("")} </div>`
        );
    });
    quizContainer.innerHTML = output.join("");
}

// Function to show quiz results
function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".choices");
    let score = 0;
    const wrongAnswers = [];

    quizData.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selectedAnswer = (answerContainer.querySelector(`input[name=question${questionNumber}]:checked`) || {}).value;
        if (selectedAnswer === currentQuestion.answer) {
            score++;
        } else {
            wrongAnswers.push(`Λάθος στην ερώτηση ${questionNumber + 1}. Η σωστή απάντηση είναι: ${currentQuestion.answer}`);
        }
    });

    resultsContainer.innerHTML = `Το σκορ σας είναι: ${score} / ${quizData.length}.<br>${wrongAnswers.join("<br>")}`;
}

// Function to show quiz results
function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".choices");
    let score = 0;
    const wrongAnswers = [];

    quizData.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selectedAnswer = (answerContainer.querySelector(`input[name=question${questionNumber}]:checked`) || {}).value;

        if (selectedAnswer === currentQuestion.answer) {
            score++;
            answerContainer.classList.add("correct"); // Add correct class to green
        } else {
            wrongAnswers.push(`Λάθος στην ερώτηση ${questionNumber + 1}. Η σωστή απάντηση είναι: ${currentQuestion.answer}`);
            answerContainer.classList.add("incorrect"); // Add incorrect class to red
        }
    });

    resultsContainer.innerHTML = `Το σκορ σας είναι: ${score} / ${quizData.length}.<br>${wrongAnswers.join("<br>")}`;
}

// Event listener for form submission
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    showResults();
});

// Call loadQuizData to start the process
loadQuizData();