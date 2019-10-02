import Question from './Question.js';
import Quiz from './Quiz.js'

const App = (() => {
  //cache the DOM
  const quizEl = document.querySelector(".jabquiz");
  const quizQuestionEl = document.querySelector(".jabquiz__question");
  const trackerEl = document.querySelector(".jabquiz__tracker");
  const taglineEl = document.querySelector(".jabquiz__tagline");
  const choicesEl = document.querySelector(".jabquiz__choices");
  const progressInnerEl = document.querySelector(".progress__inner");
  const nextButtonEl = document.querySelector(".next");
  const restartButtonEl = document.querySelector(".restart");

  const q1 = new Question(
    "What is a Pan Galactic Gargle Blaster?",
    ["A deadly weapon", "An alcoholic cocktail", "A type of spacecraft", "A type of joke only Vogons tell"],
    1
  )
  const q2 = new Question(
    "What's the official name of The Restaurant at the End of the Universe?",
    ["Café Lou", "Milliways", "Stravomula Beta", "The Duck & Goose"],
    1
  )

  const q3 = new Question(
    "What is the most intelligent species on earth",
    ["Dolphins", "Humans", "Mice", "Birds"],
    2
  )

  const q4 = new Question(
    "What is the most useful item for traveling?",
    ["A cup", "A map", "A knife", "A towel"],
    3
  )

  const q5 = new Question(
    "What is the Heart of Gold?",
    ["A boat", "Currency", "A ship", "A gem"],
    2
  )

  const q6 = new Question(
    "What is Earth?",
    ["A planet", "A computer", "A spaceship", "An animal"],
    1
  )

  const q7 = new Question(
    "Planet designer Slartibartfast won an award for designing...",
    ["The Gobi Desert", "The Pyrenees", "The Norwagian fjords", "The Grand Canyon"],
    2
  )

  const q8 = new Question(
    "According to the Guide, planet Earth is mostly...",
    ["Damp", "Uninhabitable", "Blue", "Harmless"],
    3
  )

  const q9 = new Question(
    "What is the most evil place in Galaxy?",
    ["Belgium", "Magrathea", "Frogstar World B", "The Moon"],
    2
  )

  const q10 = new Question(
    "What is the answer to the Ultimate Question?",
    ["Yes", "42", "B", "Towel"],
    1
  )

  const quiz = new Quiz([q1, q2, q3, q4, q5, q6, q7, q8, q9, q10]);

  const listeners = _ => {
    nextButtonEl.addEventListener("click", function() {
      const selectedRadioElem = document.querySelector('input[name="choice"]:checked');
      if (selectedRadioElem) {
        const key = Number(selectedRadioElem.getAttribute("data-order"));
        quiz.guess(key);
        renderAll();
      }
    })
    restartButtonEl.addEventListener("click", function() {
      // 1. reset the quiz
      quiz.reset();
      // 2. renderAll
      renderAll();
      // 3. restore the next button
      nextButtonEl.style.opacity = 1;
     resetTagLine();
    })
  }

  const setValue = (elem, value) => {
    elem.innerHTML = value;
  }

  const resetTagLine = _ => {
    document.querySelector(".jabquiz__tagline").innerHTML='Pick an option below!';

  }

  
  const renderQuestion = _ => {
    const question = quiz.getCurrentQuestion().question;
    setValue(quizQuestionEl, question)
  }  

  const renderChoicesElements = _ => {
    let markup = "";
    const currentChoices = quiz.getCurrentQuestion().choices;
    currentChoices.forEach((elem, index) => {
      markup += `
      <li class="jabquiz__choice">
      <input type="radio" name="choice" class="jabquiz__input" data-order="${index}" id="choice${index}">
      <label for="choice${index}" class="jabquiz__label">
        <i></i>
        <span>${elem}</span>
      </label>
    </li>
        `
    });
    setValue(choicesEl, markup);
  }
  
   const renderTracker = _ => {
     const index = quiz.currentIndex;
     setValue(trackerEl, `${index+1} of ${quiz.questions.length}`);
   }

   const getPercentage = (num1, num2) => {
    return Math.round((num1/num2) * 100);
  }

  const launch = (width, maxPercent) => {
    let loadingBar = setInterval(function() {
      if (width > maxPercent) {
        clearInterval(loadingBar);
      } else {
        width++;
        progressInnerEl.style.width = width + "%";
      }
    }, 3)
  }
  

   const renderProgress = _ => {
     // 1. width
     const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
     // 2. launch(0, width)
     launch(0, currentWidth);
   }
  

   const renderEndScreen = _ => {
     setValue(quizQuestionEl, `Great Job!`);
     setValue(taglineEl, `Complete!`);
     setValue(trackerEl, `Your score: ${getPercentage(quiz.score, quiz.questions.length)}%`);
     nextButtonEl.style.opacity = 0;
     renderProgress();
   }

  const renderAll = _ => {
    if (quiz.hasEnded()) {
    //render EndScreen
    renderEndScreen();
    } else {
      // 1. render the question
      renderQuestion();
      // 2. render the choices elements 
      renderChoicesElements();
      // 3. render tracker
      renderTracker();
      // 4. render progress
      renderProgress();
    }
  }
  return {
    renderAll: renderAll,
    listeners: listeners
  }
  
})();

App.renderAll();
App.listeners();


 