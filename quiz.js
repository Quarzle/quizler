
let question_number = 1;
let score = 0;
let transitioning = false;
let option_shuffle = false;
let question_shuffle = false;

const music_quiz = [
    ["Common time, represented by a C, is equivalent to what time signature?", "4/4", "2/4", "3/4", "6/8", [1, 0, 0, 0]],
    ["How many semitones are there in one octave?", "8", "10", "12", "14", [0, 0, 1, 0]],
	["What key is an alto saxophone in?", "C", "D", "E♭", "A♭", [0, 0, 1, 0]],
	["Which of the following is not a transposing instrument?", "Cello", "Double bass", "Clarinet", "Trumpet", [1, 0, 0, 0]],
	["How many lines are there on a standard music stave?", "3", "4", "5", "6", [0, 0, 1, 0]],
	["What is the relative minor of C major?", "A minor", "E minor", "D minor", "G minor", [1, 0, 0, 0]],
    ["What key has one sharp in its key signature?", "G major", "D major", "A major", "F minor", [1, 0, 0, 0]],
    ["What clef puts middle c in the middle of the stave?", "The treble clef", "The alto clef", "The tenor clef", "The bass clef", [0, 1, 0, 0]]

	// ["?", "1", "2", "3", "4", [0, 0, 0, 0]],

];

let questions = [["This quiz is not configured correctly", "1", "2", "3", "4", [1, 1, 1, 1]]];

document.addEventListener('DOMContentLoaded', () => {
	let option_shuffle_setting = localStorage.getItem("option_shuffle");
	if (option_shuffle_setting == "false") {
		option_shuffle = false;
	} else if (option_shuffle_setting == "true") {
		option_shuffle = true;
	}

	let question_shuffle_setting = localStorage.getItem("question_shuffle");
	if (question_shuffle_setting == "true") {
		question_shuffle = true;
	} else if (question_shuffle_setting == "false") {
		question_shuffle = false;
	}

	let quiz_to_take = JSON.parse(localStorage.getItem("quiz_number"));

	setTimeout(() => {
        load_quiz(quiz_to_take);
    }, 3);
	

	// preload audio
	new Audio('audio/bloop.mp3');
	new Audio('audio/click.mp3');
	new Audio('audio/quiz_end.mp3');
	new Audio('audio/select_correct.mp3');
	new Audio('audio/select_incorrect.mp3');
	new Audio('audio/swoop.mp3');

	setTimeout(() => {
        load_question(question_number);
    }, 67);
});

function correct_answer_clicked(answer_number) {
    if (transitioning) {
        return;
    }
	const audio = new Audio('audio/select_correct.mp3');
	audio.play();
    transitioning = true;
    let question_holder = document.getElementById("QuestionHolder");
    let option = question_holder.children[answer_number-1];
    option.classList.add("correct");
    setTimeout(() => {
        score += 1;
        next_question();
    }, 700);
}

function incorrect_answer_clicked(answer_number) {
    if (transitioning) {
        return;
    }
	const audio = new Audio('audio/select_incorrect.mp3');
	audio.play();
    transitioning = true;
    let question_holder = document.getElementById("QuestionHolder");
    let option = question_holder.children[answer_number-1];
    option.classList.add("incorrect");
    setTimeout(() => {
        let i = 0;
        while (i < questions[question_number-1][5].length) {
            // console.log(questions[question_number-1][5][i]);
            if (questions[question_number-1][5][i] == 1) {
                question_holder.children[i].classList.add("correct");
            }
            i++;
        }
		const audio2 = new Audio('audio/click.mp3');
		audio2.play();
        setTimeout(() => {
            score += 0;
            next_question();
        }, 1000);
    }, 500);
}

function next_question() {
	const audio = new Audio('audio/swoop.mp3');
	audio.play();
    let main = document.getElementById("Main");
    main.style.transform = "translate(-100vw, 0)";
    setTimeout(() => {
        setTimeout(() => {
            question_number += 1;
            if (question_number < questions.length+1) {
                load_question(question_number);
            } else {
                end_quiz();
            }
        }, 350);
    }, 200);
}

function load_question(question_number) {
	if (question_shuffle && question_number == 1) {
		for (let i = questions.length - 1; i > 0; i--) { //magic ig
			const j = Math.floor(Math.random() * (i + 1));
			[questions[i], questions[j]] = [questions[j], questions[i]];
		}
	}

    transitioning = false;
    let main = document.getElementById("Main");
    main.style.transition = "none";
    main.innerHTML = "";
    main.style.transform = "translate(0, 0)";
    setTimeout(() => {
        main.style.transition = "all cubic-bezier(0.6,-0.46, 0.31, 0.95) 0.6s";
    }, 100);

    let question = questions[question_number - 1];

    let container = document.createElement('div');
    container.classList.add("question_container");
    container.id = "Question" + question_number;

    let q_title = document.createElement("h2");
    q_title.textContent = question[0];
    container.appendChild(q_title);

    let question_holder = document.createElement("div");
    question_holder.classList.add("answer_container");
    question_holder.id = "QuestionHolder";
	if (option_shuffle) {
		let options = [];
		for (let i = 0; i < 4; i++) {
			options.push([question[i + 1], question[5][i]]);
		}

		for (let i = options.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[options[i], options[j]] = [options[j], options[i]];
		}

		for (let i = 0; i < 4; i++) {
			question[i + 1] = options[i][0];
			question[5][i] = options[i][1];
		}
	}

	for (let i = 0; i < 4; i++) {
		let answer = document.createElement("div");
		answer.classList.add("answer");
		answer.textContent = question[i + 1];

		if (question[5][i] === 1) {
			answer.onclick = () => correct_answer_clicked(i + 1);
		} else {
			answer.onclick = () => incorrect_answer_clicked(i + 1);
		}

		// add hover sound
		answer.onmouseenter = () => {
			if (!transitioning) {
				// const audio = new Audio('audio/tap.mp3');
				// // randomize pitch
				// audio.playbackRate = Math.random() * (1.5 - 0.5) + 0.8;
				// audio.play();
			}
		}

		question_holder.appendChild(answer);
	}

    container.appendChild(question_holder);

    let question_numberer = document.createElement("h5");
    question_numberer.textContent = "Question " + question_number + "/" + questions.length;
    main.appendChild(question_numberer);
    main.appendChild(container);
	transitioning = true;
	setTimeout(() => {
		transitioning = false;
	}, 300);
}

function end_quiz() {
	const audio = new Audio('audio/quiz_end.mp3');
	audio.play();
    let main = document.getElementById("Main");
    main.style.transition = "none";
    main.innerHTML = "";
    main.style.transform = "translate(0, 0)";

    let end_header = document.createElement("h3");
    end_header.textContent = "Your score: "+score+" out of "+questions.length;
    main.appendChild(end_header);

	let retry_button = document.createElement("div");
	retry_button.classList.add("retry_button");
	retry_button.textContent = "Retry Quiz";
	retry_button.onclick = () => {
		question_number = 1;
		score = 0;
		load_question(question_number);
		const audio = new Audio('audio/bloop.mp3');
		audio.play();
	}
	main.appendChild(retry_button);

	let home_button = document.createElement("div");
	home_button.classList.add("retry_button");
	home_button.textContent = "Return Home";
	home_button.onclick = () => {
		home();
		const audio = new Audio('audio/bloop.mp3');
		audio.play();
	}
	main.appendChild(home_button);
}

function home() {
	window.open("index.html", "_self");
}

function load_quiz(quiz_number) {
	// load quiz from /quizzes/quiz_name.json
	fetch('/quizler/quizzes/')
		.then(response => response.text())
		.then(data => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(data, 'text/html');
			const links = doc.getElementsByTagName('a');
			let quiz = links[quiz_number];
			const quiz_href = quiz.getAttribute('href').split('%5C').pop();
			fetch('/quizzes/' + quiz_href)
				.then(response => response.json())
				.then(data => {
					console.log(data);
					questions = data;
				})
				.catch(error => console.error("Error fetching quiz data:", error));

		})
		.catch(error => console.error("Error fetching quiz directory:", error));
}
