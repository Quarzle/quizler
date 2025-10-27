new Audio('audio/bloop.mp3');
new Audio('audio/click.mp3');

document.addEventListener("DOMContentLoaded", () => {
	let option_shuffle = localStorage.getItem("option_shuffle");
	if (option_shuffle == "true") {
		document.getElementById("OptionShuffleToggle").classList.add("toggled");
	}
	let question_shuffle = localStorage.getItem("question_shuffle");
	if (question_shuffle == "true") {
		document.getElementById("QuestionShuffleToggle").classList.add("toggled");
	}

	if (localStorage.getItem("quiz_number") == null) {
		localStorage.setItem("quiz_number", "1");
	} else {
		quiz(JSON.parse(localStorage.getItem("quiz_number")));
	}
});

function run() {
	console.log("button pressed");
	let expander = document.getElementById("Expander");
	expander.style.width = "1%";
	expander.style.height = "1%";
	expander.style.scale = "300";

	let main = document.getElementById("Main");
	main.style.transform = "translate(-100vw, 0)";

	const audio = new Audio('audio/bloop.mp3');
	audio.play();

	setTimeout(() => {
		window.open("quiz.html", "_self");
	}, 500);
}

function toggle_option_shuffle() {
	const audio = new Audio('audio/click.mp3');
	audio.play();
	let current = localStorage.getItem("option_shuffle");
	if (current == "false" || current == null) {
		localStorage.setItem("option_shuffle", "true");
	} else {
		localStorage.setItem("option_shuffle", "false");
	}
	document.getElementById("OptionShuffleToggle").classList.toggle("toggled");
}

function toggle_question_shuffle() {
	const audio = new Audio('audio/click.mp3');
	audio.play();
	let current = localStorage.getItem("question_shuffle");
	if (current == "false" || current == null) {
		localStorage.setItem("question_shuffle", "true");
	} else {
		localStorage.setItem("question_shuffle", "false");
	}
	document.getElementById("QuestionShuffleToggle").classList.toggle("toggled");
}

function quiz(quiz_number) {
	localStorage.setItem("quiz_number", JSON.stringify(quiz_number));
	let dropdown_content = document.getElementById("DropdownContent");
	for (let dropdown_link of dropdown_content.children) {
		dropdown_link.classList.remove("active");
	}
	dropdown_content.children[quiz_number-1].classList.add("active");

	let begin_button = document.getElementById("BeginButton");
	// begin_button.textContent("");
}