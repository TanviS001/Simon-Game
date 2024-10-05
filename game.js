let gamePattern=[];
let userClickedPattern=[];
let buttonColors=["red", "blue", "green", "yellow"];
var level=0;

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);  
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
                level++;
                $("#level-title").text("Level " + level);
                userClickedPattern=[];
            }, 1000);
        }
    } else {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/"+randomChosenColour+".mp3");
    audio.play();  
};

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    $("#" + userChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/"+userChosenColour+".mp3");
    audio.play();
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(event) {
    nextSequence();
    level++;
    $("#level-title").text("Level " + level);
});
