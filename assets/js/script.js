//--------Section variables-----------//

var highScoreLink = document.querySelector(".leftHeader");
var TimerArea = document.querySelector(".rightHeader");
var introSection = document.getElementById("introSummary");
var startButtonSection = document.querySelector(".startButtonsArea");
var answerAreaSection = document.querySelector(".answerArea");
var endAreaSection = document.querySelector(".endArea");
var highScoresPageSection = document.querySelector(".highScoresPage");
//never hidden: titleIntro, Header, footer

//------------item variables---------//

var timerEl = document.getElementById("countDown");
var titleBlockVar = document.getElementById("titleBlock");
var startButton = document.querySelector("#startQuiz");
var answer1Button = document.querySelector("#answer1");
var answer2Button = document.querySelector("#answer2");
var answer3Button = document.querySelector("#answer3");
var answer4Button = document.querySelector("#answer4");
var submitButton = document.getElementById("submitBtn");
var submitScoreButton = document.getElementById("submitScoreBtn");
var initialsSection = document.getElementById("initials");
var yourScoreArea = document.getElementById("scoreYours");
var wrongAnswerArea = document.getElementById("wrongAnswer");
var goBackButton = document.querySelector("#goBack");
var clearScoresButton = document.querySelector("#clearScores");

//--------------value variables-----------//

var userScore = {
  // name: "",
  // highScore: ""
};
var userScoreSets;
var userScorePrev = localStorage.getItem("userScoreSets");
if (userScorePrev) {
  userScoreSets = JSON.parse(userScorePrev);
} else {
  userScoreSets = [];
}
var i = 0;
var answerSet = {};
var rightWrong = 0;
var timeLeft = 180;
var endTime = "";
var userInitials = "";
var highScoreResult = "";
var timeInterval;

//-----------quiz questions array------------//
const myQuestions = [
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich",
      d: "none of the above",
    },
    correctAnswer: "C",
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm",
      d: "none of the above",
    },
    correctAnswer: "C",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: {
      a: "<js>",
      b: "<javascript>",
      c: "<script>",
      d: "<scripting>",
    },
    correctAnswer: "C",
  },
  {
    question: "What is the correct JavaScript syntax to change the content of the HTML element below? <p id='demo'>This is a demonstration.</p>",
    answers: {
      a: "demo.innerHTML = 'Hello World!'",
      b: "document.getElementByName('p').innerHTML = 'Hello World!'",
      c: "document.getElement('p').innerHTML = 'Hello World!'",
      d: "document.getElementById('demo').innerHTML = 'Hello World!'",
    },
    correctAnswer: "D",
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: {
      a: "function myFunction()",
      b: "function = myFunction()",
      c: "function:myFunction()",
      d: "function(MyFunction);",
    },
    correctAnswer: "A",
  },
  {
    question: "How to write an IF statement in JavaScript?",
    answers: {
      a: "if i == 5 then",
      b: "if (i ==5){}",
      c: "i i=5 then()",
      d: "none of the above",
    },
    correctAnswer: "B",
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: {
      a: "The <body> section",
      b: "The <head> section",
      c: "Both the <head> section and the <body> section are correct",
      d: "Neither of these",
    },
    correctAnswer: "A",
  },
  {
    question: "How can you add a comment in a JavaScript?",
    answers: {
      a: "<!--This is a comment-->",
      b: "'This is a comment'",
      c: "//This is a comment",
      d: "append.note: This is a comment",
    },
    correctAnswer: "C",
  },
  {
    question: "Will a function automatically run?",
    answers: {
      a: "Yes; They will run in order from top of the script file",
      b: "No; They must be called later in the script file",
      c: "Yes; They will run as long as they are capitalized",
      d: "No; They must be called in HTML",
    },
    correctAnswer: "B",
  },
  {
    question: "Which of these is accurate of FOR LOOP statements?",
    answers: {
      a: "for (loop time, array length, action to var)",
      b: "for (starting point, loop until, action to var)",
      c: "for (action to var, starting point, loop time)",
      d: "for (array start, array end, action to array",
    },
    correctAnswer: "B",
  },
];

//--------timer, starts at 180 seconds-----------//
function countdown() {
  timeInterval = setInterval(function () {
    // the timer still has more than 1 second and states "# of seconds remaining"
    if (timeLeft > 1) {
      timerEl.textContent = " " + timeLeft + " seconds remaining";
      timeLeft--;
    } // the timer is at one second and states "1 second" remaining"
    else if (timeLeft === 1) {
      timerEl.textContent = " " + timeLeft + " second remaining";
      timeLeft--;
    } // timer is out of time the function stops, and calls display message function
    else {
      timerEl.textContent = "End";
      clearInterval(timeInterval);
      failedPage();
    }
  }, 1000);
}

////-----------when to show which sections---------////
function hideShowStart() {
  wrongAnswerArea.textContent = " ";
  highScoreLink.style.display = "block";
  TimerArea.style.display = "block";
  introSection.style.display = "block";
  startButtonSection.style.display = "block";
  answerAreaSection.style.display = "none";
  endAreaSection.style.display = "none";
  highScoresPageSection.style.display = "none";
}

function hideShowMain() {
  highScoreLink.style.display = "block";
  TimerArea.style.display = "block";
  introSection.style.display = "none";
  startButtonSection.style.display = "none";
  answerAreaSection.style.display = "block";
  endAreaSection.style.display = "none";
  highScoresPageSection.style.display = "none";
}

function hideShowEnd() {
  highScoreLink.style.display = "block";
  TimerArea.style.display = "block";
  introSection.style.display = "none";
  startButtonSection.style.display = "none";
  answerAreaSection.style.display = "none";
  endAreaSection.style.display = "block";
  highScoresPageSection.style.display = "none";
}

function hideShowHighScores() {
  highScoreLink.style.display = "none";
  TimerArea.style.display = "none";
  introSection.style.display = "none";
  startButtonSection.style.display = "none";
  answerAreaSection.style.display = "none";
  endAreaSection.style.display = "none";
  highScoresPageSection.style.display = "block";
}

////----- player's results--------////

//------If you run out of time page--------//
function failedPage() {
  highScoreLink.style.display = "none";
  TimerArea.style.display = "block";
  introSection.style.display = "none";
  startButtonSection.style.display = "none";
  answerAreaSection.style.display = "none";
  endAreaSection.style.display = "none";
  highScoresPageSection.style.display = "none";
  titleBlockVar.textContent = "You Have Run Out Of Time";
  wrongAnswerArea.textContent = "Please Refresh The Page And Try Again";
}

//------- end page to enter initials and see score-------//
function finalPage() {
  hideShowEnd();
  //grabs time at quiz completion
  clearInterval(timeInterval);
  titleBlockVar.textContent = "All Done!";
  //current players score
  var scoreTitleSection = document.getElementById("scoreTitle");
  scoreTitleSection.textContent = "Your Score is " + timeLeft;
}

//-------what question to pull from array---------//

function displayQuestion() {
  if (i < 10) {
    titleBlockVar.textContent = myQuestions[i].question;
    answer1Button.textContent = myQuestions[i].answers.a;
    answer2Button.textContent = myQuestions[i].answers.b;
    answer3Button.textContent = myQuestions[i].answers.c;
    answer4Button.textContent = myQuestions[i].answers.d;
  } else {
    finalPage();
  }
}

//----- test if player picked the correct answer for each question---//
function answerCreation() {
  var answerOptions = document.querySelectorAll('input[name="answerSelect"]');
  console.log(answerOptions);
  var answerA = document.getElementById("answer1Select").checked;
  var answerB = document.getElementById("answer2Select").checked;
  var answerC = document.getElementById("answer3Select").checked;
  var answerD = document.getElementById("answer4Select").checked;
  if (answerA == true) {
    answerNow = "A";
  } else if (answerB == true) {
    answerNow = "B";
  } else if (answerC == true) {
    answerNow = "C";
  } else if (answerD == true) {
    answerNow = "D";
  } else {
    answerNow = null;
  }
  //error if no answer
  if (answerNow == null) {
    wrongAnswerArea.textContent = "You Must Select An Answer";
  } else if (myQuestions[i].correctAnswer === answerNow) {
    rightWrong = rightWrong;
    wrongAnswerArea.textContent = " ";
    // uncheck radio buttons
    answer1Select.checked = false;
    answer2Select.checked = false;
    answer3Select.checked = false;
    answer4Select.checked = false;
    i++;
  } else {
    rightWrong = rightWrong + 1;
    ////point to background rightWrong var
    //add to minus 10 seconds from timer
    timeLeft = timeLeft - 10;
    wrongAnswerArea.textContent = "Incorrect";
  }
  displayQuestion();
}

//--------------highscores page------------
function highScoresPage() {
  //grab initials from final page
  userInitials = document.getElementById("initials").value;
 
  if (userInitials == "") {
    alert("Add Your Initials!");
    finalPage();
  } else {
    //current player results
    userScore.name = userInitials;
    userScore.highScore = timeLeft;
    yourScoreArea.textContent = "Your High Score is " + userScore.highScore;
  }
  //merge and sort all scores array
  userScoreSets.push(userScore);
  userScoreSets.sort(function (a, b) {
    return b.highScore - a.highScore;
  });
  localStorage.setItem("userScoreSets", JSON.stringify(userScoreSets));
  hideShowHighScores();
  
  titleBlockVar.textContent = " High Scores ";
  
  yourScoreArea.textContent =
  "Congratulations " + userScore.name + " your score is: " + userScore.highScore;
  
  displayHighScores()
}

function displayHighScores(){
  ////create div elements to list all the high scores from overallscores array
  var listScores = document.querySelector(".highScoresList");
  var c = 0;
  while (c < userScoreSets.length) {
    var li = document.createElement("li");
    li.classList.add("pastScores");
    li.innerText =
      c +
      1 +
      ".    " +
      userScoreSets[c].name +
      " scored " +
      userScoreSets[c].highScore;
    listScores.appendChild(li);
    c++;
  }
}

// Go Back button -- returns to start page
function goBack() {
  location.reload();
}

// clear all scores button -- clear local storage
function clearScores() {
  localStorage.clear();
  location.reload();
}

// high scores page from header link
function highScoresPageNoResults() {
  hideShowHighScores();
  yourScoreArea.textContent = "High Scores to Beat!"
  displayHighScores()
    }


//---------------Event listener-----------
hideShowStart();
startButton.addEventListener("click", countdown);
startButton.addEventListener("click", hideShowMain);
startButton.addEventListener("click", displayQuestion);
submitButton.addEventListener("click", answerCreation);
submitScoreButton.addEventListener("click", highScoresPage);
goBackButton.addEventListener("click", goBack);
clearScoresButton.addEventListener("click", clearScores);
highScoreLink.addEventListener("click", highScoresPageNoResults);
