//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//QUESTIONS AND ANSWERS STORE


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const store = {
  questions: [
    {
      question: 'As of 2020, who is the current manager of Leeds United F.C.?',
      answers: [
        'Marcelo Bielsa',
        'Mr. Bean',
        'Chris Moore',
        'Del-boy'
      ],
      correctAnswer: 'Marcelo Bielsa'
    },
    {
      question: 'When was the most recent promotion to the Premier League for Leeds United F.C. ?',
      answers: [
        '1970',
        '2015',
        '2020',
        '2005'
      ],
      correctAnswer: '2020'
    },
    {
      question: 'Who is the current owner of Leeds United F.C. ?',
      answers: [
        'Andrea Radrizzani',
        'Massimo Cellino',
        'Roman Abramovich',
        'Ferran Soriano'
      ],
      correctAnswer: 'Andrea Radrizzani'
    },
    {
      question: 'How many English league titles have Leeds United F.C. won?',
      answers: [
        '7',
        '0',
        '8',
        '3'
      ],
      correctAnswer: '3'
    },
    {
      question: 'Who is the Goalkeeper for Leeds United F.C. ?',
      answers: [
        'Illan Meslier',
        'Luke Ayling',
        'Robin Koch',
        'Liam Cooper'
      ],
      correctAnswer: 'Illan Meslier'
    },
    {
      question: 'How many FA cup wins does Leeds United F.C. have?',
      answers: [
        '2',
        '3',
        '1',
        '4'
      ],
      correctAnswer: '1'
    },
    {
      question: 'How many League Cup wins does Leeds United F.C. have?',
      answers: [
        '1',
        '2',
        '3',
        '4'
      ],
      correctAnswer: '1'
    },
    {
      question: 'How many Inter-Cities Fairs Cups does Leeds United F.C. have?',
      answers: [
        '2',
        '3',
        '4',
        '5'
      ],
      correctAnswer: '2'
    },
    {
      question: 'What is on Leeds United F.C. badge?',
      answers: [
        'White Rose of York',
        'Blue Swan of Leeds',
        'Gold Crown of Decades',
        'Red Ring of Fire'
      ],
      correctAnswer: 'White Rose of York'
    },
    {
      question: 'Where is Leeds United F.C. stadium located?',
      answers: [
        'Abbey Road',
        'Oxford Street',
        'Bourbon Street',
        'Elland Road'
      ],
      correctAnswer: 'Elland Road'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//QUIZ FUNCTIONALITY//


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function handleReadyToPlay() {
  //This function will be responsible for displaying a message asking if the player is ready and using a 'Yes' button to begin. Once button selected, quiz will start and first question will display
  return `
  <div class="start-box">
    <form>
      <p>Hello! Are you ready to test your Leeds United F.C. knowledge?</p>
      <hr>
      <button type="submit" id="quiz-start" class="center-button" autofocus>Yes!</button>
    </form>
  </div>
  `;
  console.log('`handleReadyToPlay` ran');
}


function beginQuiz() {
  //This function begins the quiz by switching value of quizStarted to 'true'//
  store.quizStarted = true;
  console.log('`beginQuiz` ran')
}


function handleQuestionSetProgress() {
  //This function is responsible for tracking the current question # and displaying the number of answered questions
  return `
  <div>
    <ul>
      <li id="question-number"> Question ${store.questionNumber + 1} of ${store.questions.length}</li>
      <hr>
      <li>${store.score} of ${store.questions.length} correct</li>
    </ul>
  </div>
  `;
}


function handleQuestionHtml() {
  //This is responsible for displaying current question
  let indexQuestion = store.questions[store.questionNumber];

  return `${indexQuestion.question}`;
  console.log('indexQuestion')
}


function handleAnswersHtml() {
  //This is responsible for tracking and displaying answer banks for each question, and uses accumulator to cycle through the answers
  let bankedAnswers = store.questions[store.questionNumber].answers;
  let currentAnswerHtml = "";

  for (let i = 0; i < bankedAnswers.length; i++) {
    currentAnswerHtml += `
    <div id="choice-container-${i}">
      <input type="radio" name="choices" id="choice${i + 1}" value="${bankedAnswers[i]}" tabindex="${i + 1}" required="">
      <label for ="choice${i + 1}">${bankedAnswers[i]}</label>
    </div>`
  }
  return currentAnswerHtml;
}


function restartQuiz() {
  //This function resets store objects
  store.quizStarted = false;
  store.questionNumber = 0;
  store.score = 0;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//RENDER//


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderQuizApp() {
  //This will be responsible for rendering the quiz app in the DOM
  //This generates the 'Starting page, as quizStarted is 'false'//
  if (store.quizStarted === false) {
    $('main').html(handleReadyToPlay());
    return;
  }
  else if (store.questionNumber >= 0 && store.questionNumber < store.questions.length) {
    $("main").html(returnCompleteQuestionHtml());
  }
  else {
    $("main").html(handleResultsofQuiz());
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//HTML//


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleCorrectAnswerHtml() {
  //This function is responsible for rendering html for correct answer submission
  return `
  <div class="answer-container">
  <p>You are correct!</p>
  <button type="button" id="next-question-btn" class="btn">Next Question</button>
  ${handleQuestionSetProgress()}`
}



function handleIncorrectAnswerHtml() {
  //This function is responsible for rendering html for incorrect answer submission
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  let chosenAnswer = $("input[name=choices]:checked").val();

  return `
  <div class="answer-container">
    <p>You are incorrect! You chose ${chosenAnswer}</p>
    <hr>
    <p>The correct answer was ${correctAnswer}</p>
    <button type="button" id="next-question-btn" class="btn">Next Question</button>
    ${handleQuestionSetProgress()}
  </div>`
}



function returnCompleteQuestionHtml() {
  //This function is responsible for rendering combined question and answer bank
  return `
  <div class = "question-box">
    <form>
      <legend>${handleQuestionHtml()}</legend>
      <fieldset>${handleAnswersHtml()}</fieldset>
      <button type="button" id="submit-answer-btn" class="btn">Submit</button>
    </form>
    ${handleQuestionSetProgress()}
  </div>
  `
}



function handleResultsofQuiz() {
//This function handles pass/fail and results of the quiz
  if (store.score <= 6) {
    return `
  <div class="question-box">
    <p>Sorry, you failed! Your score is ${store.score} out of ${store.questions.length}. </p>
    <button type="button" id="restart-quiz-btn" class="btn">Try Again?</button>
  </div>
  `;
  }
  return `
  <div class="question-box">
    <p>You passed! Your score is ${store.score} out of ${store.questions.length}. </p>
    <button type="button" id="restart-quiz-btn" class="btn">Restart</button>
  </div>
  `;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//EVENT HANDLERS


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleSubmitBegin() {
  //This function is responsible for recognizing when the quizStart button is clicked to begin the quiz
  $('main').on('click', '#quiz-start', (event) => {
    event.preventDefault();
    beginQuiz();
    renderQuizApp();
    console.log('`handleSubmitBegin` ran')
  });
}


function checkAnswer() {
  //This checks submitted answer and responds if answer chosen is correct, incorrect, or empty
  $("main").on("click", "#submit-answer-btn", (event) => {
    event.preventDefault();
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;
    let submittedAnswer = $("input[name=choices]:checked").val();

    if (submittedAnswer === undefined) {
      alert("Please choose an answer");
    }
    else if (submittedAnswer === correctAnswer) {
      $(".question-box").hide();
      //increase score by 1
      store.score++
      $("main").html(handleCorrectAnswerHtml());
      store.questionNumber++
    }
    else if (submittedAnswer !== correctAnswer) {
      $(".question-box").hide();
      $("main").html(handleIncorrectAnswerHtml());
      store.questionNumber++
    }
  });
  console.log('`checkAnswer` ran');
}


function handleNextQuestion() {
  //This function handles the Next Button, which renders the next question
  $("main").on("click", "#next-question-btn", (event) => {
    renderQuizApp();
  });
}


function restartButton() {
  //This function restarts the quiz when the restart button is clicked
  $("main").on("click", "#restart-quiz-btn", (event) => {
    restartQuiz();
    renderQuizApp();
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//QUIZ LOGIC FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleQuizStartup() {
  renderQuizApp();
  handleSubmitBegin();
  checkAnswer();
  handleNextQuestion();
  restartButton();

  console.log('handleQuizStartup ran');
}

$(handleQuizStartup);

/*test*/
/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)