// Quiz questions as an array of objects
const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "New York", "Toronto"],
    answer: 0,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Jupiter", "Saturn", "Mars", "Earth"],
    answer: 2,
  },
  {
    question: "How many continents are there in the world?",
    options: ["9", "4", "7", "3"],
    answer: 2,
  },
  {
    question: "What is the name of the tallest mountain in the world?",
    options: ["Mount Everest", "K2", "Makalu", "Cho Oyu"],
    answer: 0,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Steve Jobs", "Leonardo da Vinci", "Napoleon", "Nelson Mandela"],
    answer: 1,
  },
  {
    question: "What is the largest ocean in the world?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
    ],
    answer: 2,
  },
  {
    question: "Who was the first person to walk on the moon?",
    options: [
      "Yuri Gagarin",
      "Buzz Aldrin",
      "Neil Armstrong",
      "Michael Collins",
    ],
    answer: 2,
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Quartz", "Iron", "Diamond"],
    answer: 3,
  },
  {
    question: "Which country is famous for inventing pizza?",
    options: ["France", "Italy", "Greece", "USA"],
    answer: 1,
  },
  {
    question: "What is the main gas found in the air we breathe?",
    options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
    answer: 3,
  },
  {
    question: "How many legs does a spider have?",
    options: ["6", "8", "10", "12"],
    answer: 1,
  },
  {
    question: "Which continent is the Sahara Desert located in?",
    options: ["Asia", "Africa", "South America", "Australia"],
    answer: 1,
  },
  {
    question: "What is the freezing point of water in Celsius?",
    options: ["100°C", "50°C", "0°C", "-10°C"],
    answer: 2,
  },
  {
    question: "Which language has the most native speakers in the world?",
    options: ["English", "Hindi", "Mandarin Chinese", "Spanish"],
    answer: 2,
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Lion", "Elephant", "Leopard"],
    answer: 1,
  },
];

document.getElementById("start-game-button").addEventListener("click", () => {
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("start-game-button").style.display = "none";
  quiz.init();
});

document.getElementById("next-btn").addEventListener("click", () => {
  quiz.nextQuestion();
});

// Quiz game object
const quiz = {
  questionNumber: 1,
  currentIndex: 0,
  score: 0,
  selectedOption: null,

  init: function () {
    this.displayQuestion();
  },

  displayQuestion: function () {
    // Clear previous question
    document.getElementById("question").textContent = "";
    document.getElementById("options").innerHTML = "";

    // Show current question
    const currentQuestion = quizQuestions[this.currentIndex]; //gets the entire first 'object' (e.g,  question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1, explanation: "Basic addition gives us 2 + 2 = 4") from the array and puts into currentQuestion variable.
    document.getElementById("question").textContent =
      this.questionNumber +
      "/" +
      quizQuestions.length +
      " " +
      "-" +
      " " +
      currentQuestion.question; //gets only the question part (question: "What is 2 + 2?") from the 'object' and adds that to  document.getElementById("question").textContent.

    // Add options
    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.className = "option";
      optionElement.textContent = option;
      optionElement.dataset.index = index;

      optionElement.addEventListener("click", () => {
        this.selectOption(index);
      });

      document.getElementById("options").appendChild(optionElement);
    });
  },

  selectOption: function (index) {
    // Remove selected class from all options
    const options = document.querySelectorAll(".option");
    options.forEach((option) => {
      option.classList.remove("selected");
    });

    // Add selected class to clicked option
    options[index].classList.add("selected");
    this.selectedOption = index;
    document.getElementById("next-btn").disabled = false;
  },

  nextQuestion: function () {
    const feedbackEl = document.getElementById("feedback");

    // Show feedback based on correct/wrong
    const correctAnswerIndex = quizQuestions[this.currentIndex].answer;
    if (this.selectedOption === correctAnswerIndex) {
      this.score++;
      feedbackEl.textContent = "✅ Correct!";
      feedbackEl.style.color = "green";
      feedbackEl.style.padding = "15px";
    } else {
      feedbackEl.textContent = `❌ Wrong! Correct answer: ${
        quizQuestions[this.currentIndex].options[correctAnswerIndex]
      }`;
      feedbackEl.style.color = "red";
      feedbackEl.style.padding = "15px";
    }

    // Move to next question after a short delay
    setTimeout(() => {
      this.currentIndex++;
      this.questionNumber++;
      this.selectedOption = null;
      document.getElementById("next-btn").disabled = true;

      feedbackEl.textContent = ""; // clear feedback

      if (this.currentIndex < quizQuestions.length) {
        this.displayQuestion();
      } else {
        this.showResults();
      }
    }, 1500); // 1.5 sec delay so user can read feedback
  },

  showResults: function () {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("next-btn").style.display = "none";

    const resultElement = document.getElementById("result");
    resultElement.textContent = `You scored ${this.score} out of ${quizQuestions.length}!`;
    resultElement.style.color = "green";
    resultElement.style.fontSize = "32px";

    if (this.score > 12) {
      resultElement.textContent += " Excellent Score!!😇";
    } else if (this.score > 10) {
      resultElement.textContent += " Good Game!!😊";
    } else if (this.score > 8) {
      resultElement.textContent += " Well Played!!😊";
    } else {
      resultElement.textContent += " You need more practice!!😑";
    }

    //restart game button
    const restartButton = document.createElement("button");
    restartButton.id = "restart-btn";
    restartButton.textContent = "Restart quiz";

    //restartButton styles
    restartButton.style.backgroundColor = "#4CAF50";
    restartButton.style.color = "white";
    restartButton.style.padding = "10px 20px";
    restartButton.style.height = "40px";
    restartButton.style.width = "150px";
    restartButton.style.border = "none";
    restartButton.style.borderRadius = "5px";
    restartButton.style.cursor = "pointer";
    restartButton.style.marginTop = "20px";

    restartButton.addEventListener("mouseenter", () => {
      restartButton.style.backgroundColor = "blue";
      restartButton.style.color = "white";
      restartButton.style.transform = "scale(1.05)";
      restartButton.style.transition = "all 0.3s ease";
    });

    restartButton.addEventListener("mouseleave", () => {
      restartButton.style.backgroundColor = "green";
      restartButton.style.color = "white";
      restartButton.style.transform = "";
    });

    document.getElementById("result").appendChild(restartButton);
    document.getElementById(restartButton.id).addEventListener("click", () => {
      // Reset internal state
      quiz.currentIndex = 0;
      quiz.questionNumber = 1;
      quiz.score = 0;
      quiz.selectedOption = null;

      // Show question container and next button again
      document.getElementById("question-container").style.display = "block";
      document.getElementById("next-btn").style.display = "inline-block";

      // Clear the result section
      document.getElementById("result").innerHTML = "";

      // Re-initialize the quiz
      quiz.init();
    });

    //end-game button
    const endGame = document.createElement("button");
    endGame.id = "end-game-btn";
    endGame.textContent = "End Game";

    //endGame button styles
    endGame.style.backgroundColor = "#4CAF50";
    endGame.style.color = "white";
    endGame.style.padding = "10px 20px";
    endGame.style.height = "40px";
    endGame.style.width = "150px";
    endGame.style.border = "none";
    endGame.style.borderRadius = "5px";
    endGame.style.cursor = "pointer";
    endGame.style.marginTop = "20px";

    endGame.addEventListener("mouseenter", () => {
      endGame.style.backgroundColor = "blue";
      endGame.style.color = "white";
      endGame.style.transform = "scale(1.05)";
      endGame.style.transition = "all 0.3s ease";
    });

    endGame.addEventListener("mouseleave", () => {
      endGame.style.backgroundColor = "green";
      endGame.style.color = "white";
      endGame.style.transform = "";
    });

    document.getElementById("result").appendChild(endGame);
    document.getElementById(endGame.id).addEventListener("click", () => {
      location.reload(); // This reloads the page
    });
  },
};
