let question_number = 1
let score = 0
transitioning = false

const questions = [
    ["Question 1: What is the square root of 169", "1", "-44", "13", "67", [0, 0, 1, 0]],
    ["Question 2: How many moons does jupiter have?", "Exactly 1", "More than 11", "I don't know", "I don't care", [0, 1, 0, 0]],
    ["Question 3: A trigonal planar shape forms when a molecule has what number of bonded electron regions around the central atom?", "1", "2", "3", "4", [0, 0, 1, 0]],
    ["Question 4: How many letters are in the english alphabet?", "1", "26", "36", "24", [0, 1, 0, 0]],
    ["Question 5: What year did the american revolution start?", "1776", "6767", "1936", "2024", [1, 0, 0, 0]],
    ["Question 6: What clef puts middle c in the middle of the stave?", "The treble clef", "The alto clef", "The tenor clef", "The bass clef", [0, 0, 1, 0]],
    ["Question 7: What is the name of a twelve sided shape?", "Heptagon", "Dodecagon", "Icosahedron", "Dodecahedron", [0, 1, 0, 1]],
    ["Question 8: which of the following is a square root of 1?", "-1", "-2", "0.1", "10", [1, 0, 0, 0]]
]

document.addEventListener('DOMContentLoaded', () => {
    load_question(question_number)
});

function correct_answer_clicked(answer_number) {
    if (transitioning) {
        return
    }
    transitioning = true
    let question_holder = document.getElementById("QuestionHolder")
    let option = question_holder.children[answer_number-1]
    option.classList.add("correct")
    setTimeout(() => {
        score += 1
        next_question()
    }, 700);
}

function incorrect_answer_clicked(answer_number) {
    if (transitioning) {
        return
    }
    transitioning = true
    let question_holder = document.getElementById("QuestionHolder")
    let option = question_holder.children[answer_number-1]
    option.classList.add("incorrect")
    setTimeout(() => {
        let i = 0
        while (i < questions[question_number-1][5].length) {
            // console.log(questions[question_number-1][5][i])
            if (questions[question_number-1][5][i] == 1) {
                question_holder.children[i].classList.add("correct")
            }
            i++
        }
        setTimeout(() => {
            score += 0
            next_question()
        }, 1000);
    }, 500);
}

function next_question() {
    let main = document.getElementById("Main")
    main.style.transform = "translate(-100vw, 0)"
    setTimeout(() => {
        setTimeout(() => {
            question_number += 1
            if (question_number < questions.length+1) {
                load_question(question_number)
            } else {
                end_quiz()
            }
        }, 350);
    }, 200);
}

function load_question(question_number) {
    transitioning = false
        let main = document.getElementById("Main")
    main.style.transition = "none"
    main.innerHTML = ""
    main.style.transform = "translate(0, 0)"
    setTimeout(() => {
        main.style.transition = "all cubic-bezier(0.6,-0.46, 0.31, 0.95) 0.6s"
    }, 100);

    let question = questions[question_number - 1]

    let container = document.createElement('div')
    container.classList.add("question_container")
    container.id = "Question" + question_number

    let q_title = document.createElement("h2")
    q_title.textContent = question[0]
    container.appendChild(q_title)

    let question_holder = document.createElement("div")
    question_holder.classList.add("answer_container")
    question_holder.id = "QuestionHolder"

    // Create each answer
    for (let i = 0; i < 4; i++) {
        let answer = document.createElement("div")
        answer.classList.add("answer")
        answer.textContent = question[i + 1]

        if (question[5][i] === 1) {
            answer.onclick = () => correct_answer_clicked(i + 1)
        } else {
            answer.onclick = () => incorrect_answer_clicked(i + 1)
        }

        question_holder.appendChild(answer)
    }

    container.appendChild(question_holder)

    let question_numberer = document.createElement("h5")
    question_numberer.textContent = "Question " + question_number + "/" + questions.length
    main.appendChild(question_numberer)
    main.appendChild(container)
}

function end_quiz() {
    let main = document.getElementById("Main")
    main.style.transition = "none"
    main.innerHTML = ""
    main.style.transform = "translate(0, 0)"

    let end_header = document.createElement("h3")
    end_header.textContent = "Your score: "+score+" out of "+questions.length
    main.appendChild(end_header)
}