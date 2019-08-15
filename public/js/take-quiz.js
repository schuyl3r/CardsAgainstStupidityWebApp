let score
let timerCount
let qtitle
let qauthor
let qsubject
let qdescription
let qpublic
let qdeck
let nQuestion
let timerMax
let timer

$(document).ready(function () {


    let quiz_id = $("#mainQuiz").attr("data-id")

    $.ajax({
        url: "/quiz/retrieve_quiz",
        method: "GET",
        data: {
            qid: quiz_id
        },
        success: function (result) {
            if (result == "0") {
                console.log("Quiz not found")
            } else {
                qtitle = result.title
                qsubject = result.subject
                qdescription = result.description
                qpublic = result.public
                qdeck = result.deck
                qauthor = result.author
                showPrestart()
            }
        },
    })

    $('#takeQuizForm').submit(function (e) {
        e.preventDefault()

        timerCount = $("#timerCount").val()
        timerMax = timerCount

        score = 0
        nQuestion = 0

        startMainQuiz()
        addButtonFunction()
        addKeyboardFunction()

        console.log("start")
    })


})

function showNextQuestion() {


    if (nQuestion < qdeck.length) {
        startTimer()

    } else {
        showResults()
    }

}

function startTimer() {

    let pair = qdeck[nQuestion]
    var question = pair["Question"]
    var answer = pair["Answer"]

    timerCount = timerMax;

    if (timerCount > 0) {

        $("#questionArea").text(question)
        $("#card-tracker").text("Question " + (nQuestion + 1) + "/" + qdeck.length)

        timer = setInterval(async function () {

            $("#answerArea").text("Answer Revealed in " + timerCount + " seconds.")

            if (timerCount == -1) {
                $("#answerArea").text(answer)
            } else {
                timerCount--;
            }

        }, 1000);
    } else {
        $("#questionArea").text(question)
        $("#answerArea").text(answer)
    }
}


function startMainQuiz() {
    hideAll()
    document.getElementById("mainQuizContainer").style.display = "block"
    $("#quiz-name").text(qtitle)
    $("#quiz-subject").text(qsubject)
    $("#quiz-author").text("By " + qauthor.username)

    showNextQuestion()
}

function showPrestart() {
    hideAll()
    document.getElementById("preStartContainer").style.display = "block"

    $("#qTitle").text(qtitle)
    $("#qSubject").text(qsubject)
    $("#qDescription").text(qdescription)
    $("#qNumberFlashcards").text(qdeck.length + " Flashcards")
    $("#qAuthor").text("By " + qauthor.username)

}

function showResults() {
    hideAll()
    document.getElementById("endResultContainer").style.display = "flex"

    $("#correctAnswers").text(score + "/" + qdeck.length)

    $("#tryAgainBtn").click(() => {
        document.location.reload()
    })

}

function hideAll() {
    document.getElementById("preStartContainer").style.display = "none"
    document.getElementById("mainQuizContainer").style.display = "none"
    document.getElementById("endResultContainer").style.display = "none"
}


function addKeyboardFunction() {
    document.addEventListener('keyup', function (event) {
        if (event.defaultPrevented) {
            return;
        }

        var key = event.key || event.keyCode;

        if (key === 'K' || key === 'k' || key === 'd') {
            knewAnswer();
        } else if (key === 'G' || key === 'g' || key === 'a') {
            guessedAnswer();
        }
    });
}



function addButtonFunction() {
    $("#guessed-button").click(() => {
        guessedAnswer()
    })

    $("#knew-button").click(() => {
        knewAnswer()
    })
}

function knewAnswer() {
    nQuestion++
    score++
    clearInterval(timer);
    showNextQuestion()
}

function guessedAnswer() {
    nQuestion++
    clearInterval(timer);
    showNextQuestion()
}