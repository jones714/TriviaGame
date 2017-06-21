$(document).ready(function() {


function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

console.log(" here");


$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	generateHTML();

	timerWrapper();

}); 

$("body").on("click", ".answer", function(event){
	
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		

		clearInterval(theClock);
		generateWin();
	}
	else {
		
		clearInterval(theClock);
		generateLoss();
	}
});

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); 

}); 

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong-answer-bro.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong-answer-bro.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What is the motto of House Stark?", "What pharse do you use to tell a Dragon to breath fire?", "Who appointed Ned Stark as 'hand of the king'?", "Who initiated King Joffrey's assassination?", "What are the names of Dracarys Targaryan's three dragons?", "What is the official name of the entire book series?", "how wide and how tall was the wall?", "Tyrion Lannister the self-proclaimed god of what?"];
var answerArray = [["Winter is coming", " It's getting chilly", "Burr, my feet are frozen", "Seriously, do they ever heat this castle?"], ["dothraki","Dracarys","Valar doharis","Light'em up bitches!"], ["Jon Arryn", "Robert Baratheon", "Lord Varys", "Stannis Baratheon"], ["Margery Tyrell","Lady Olenna Tyrell","Petyr Baelish","Tyrion Lannister"], ["Dragol, Rhaelar and Viserya", "Drogon, Rhaegal and Viserion", " Drogon, Rhaegal and Viserion", "Drogal, Rhaegar, and Viseron"], [" The Game of Thrones","A Song of Ice and Fire","The Winds of Winter","A Clash of Kings"], [" 200 miles and is 500ft tal", " 300 miles and is 700ft tall", "400 miles and is 600ft tall", "500 miles and is 800ft tall"], [" Tits and wine"," Breasts and ale","Boobs and booze","Knockers and PBR"]];
var correctAnswers = ["A. Winter is coming", "B. Dracarys ", "B. Robert Baratheon", "b. Lady Olenna Tyrell ", "B. Drogon, Rhaegal, Viserion", "B. A Song of Ice and Fire", "B. 300 miles and is 700ft tall", "A. Tits and wine"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sound/sword-slash1.mp3");
