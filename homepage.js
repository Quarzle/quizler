
document.addEventListener("DOMContentLoaded", () => {

	if (localStorage.getItem("quiz_name") == null) {
		localStorage.setItem("quiz_name", "testing_quiz.json");
	}

	find_available_quizzes();

	let option_shuffle = localStorage.getItem("option_shuffle");
	if (option_shuffle == "true") {
		document.getElementById("OptionShuffleToggle").classList.add("toggled");
	}
	let question_shuffle = localStorage.getItem("question_shuffle");
	if (question_shuffle == "true") {
		document.getElementById("QuestionShuffleToggle").classList.add("toggled");
	}

	// preload audio
	new Audio('audio/bloop.mp3');
	new Audio('audio/click.mp3');
	new Audio('audio/tap.mp3');
});

function run() {
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

function update_quiz_display(quiz_index) {
    
    let dropdown_content = document.getElementById("DropdownContent");
    // Reset active class on all dropdown links
    for (let dropdown_link of dropdown_content.children) {
        dropdown_link.classList.remove("active");
    }
    if (quiz_index <= dropdown_content.children.length) {
        dropdown_content.children[quiz_index - 1].classList.add("active");
    }

}


// json quiz functions

// find available quizzes in the /quizzes/ directory and list them in the dropdown menu
function find_available_quizzes() {
    fetch('./quizzes/quizzes.json')  // Fetch the manifest
        .then(response => response.json())
        .then(data => {
            const dropdownContent = document.getElementById('DropdownContent');
            data.quizzes.forEach((quiz, index) => {
                // Create a dropdown link for each quiz
                let quizOption = document.createElement('a');
                quizOption.className = 'dropdown-link';
                quizOption.textContent = quiz.name;  // Display the quiz name
                quizOption.onclick = () => {
                    localStorage.setItem('quiz_name', quiz.file);  // Save the selected quiz filename
                    update_quiz_display(index + 1);  // Load the selected quiz
                };
                dropdownContent.appendChild(quizOption);  // Add the link to the dropdown
				if (localStorage.getItem("quiz_name") == quiz.file) {
					update_quiz_display(index + 1);
				}
            });
        })
        .catch(error => console.error("Error fetching quiz manifest:", error));
}
