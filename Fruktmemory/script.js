var cardarray = [];
var clickedcards = [];
var clickedcardbacks = [];
var clickamount = 0;
var correctcards = 0;

//FISHER-YATES SHUFFLE
function shuffleArray(array, cardamount) {
    for (var i = cardamount - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
//FISHER-YATES SHUFFLE

// TESTING

//------------------------------------------------------------------------NEW GAME FUNCTION------------------------------------------------------------------------//
function start(cardamount) {
    var container = document.getElementById("gameContainer");
    var scoreboard = document.getElementById("scoreboard");
    
    //NEW GAME PREP
    container.innerHTML = "";
    scoreboard.innerHTML = "";
    clickamount = 0;
    clickedcards.length = 0;
    clickedcardbacks.length = 0;
    cardarray.length = 0;

    //BOARD BUILDING
    container.style.width = cardamount / 0.04 + "px";
    container.style.gridTemplateRows = "repeat(4, 1fr)";
    container.style.gridTemplateColumns = "repeat(" + cardamount / 4 + ", 1fr)";

    //CARDBACK CREATION
    for (var i = 0; i < cardamount; i++) {
        var createcardback = document.createElement("div");
        createcardback.style.backgroundImage = "url(style/images/backside.png)";
        createcardback.className = "cardback";
        createcardback.id = "cardback" + i;
        container.appendChild(createcardback);
    }

    //CARDFRONT CREATION
    for (var i = 0; i < cardamount; i++) {
        var createcard = document.createElement("div");
        var cardback = document.getElementById("cardback" + i);
        createcard.className = "card";
        createcard.id = "card" + i;
        cardarray.push(createcard.id);
        createcard.style.visibility = "hidden";
        createcard.style.pointerEvents = "none";
        cardback.appendChild(createcard);
        cardback.addEventListener("click", onclickfunction);
    }

    //CARDARRAY SHUFFLE
    shuffleArray(cardarray, cardamount);
    var j = 0;
    var pictures = ["url(style/images/picture1.png)", "url(style/images/picture2.png)", "url(style/images/picture3.png)", "url(style/images/picture4.png)", "url(style/images/picture5.png)", "url(style/images/picture6.png)", "url(style/images/picture7.png)", "url(style/images/picture8.png)"]

    for (var i = 0; i < cardamount; i++) {
        if (j == cardamount / 4) {
            j = 0;
        }
        var frontcard = document.getElementById(cardarray[i]);
        frontcard.style.backgroundImage = pictures[j];
        j = j + 1;
    }

    var createscorecard = document.createElement("div");
    var createcorrect = document.createElement("div");
    createscorecard.innerHTML = "Correct";
    createscorecard.id = "scorecard";
    createscorecard.style.fontSize = "1.5em";
    createscorecard.style.textAlign = "center";
    createscorecard.style.borderRadius = "5%";
    createscorecard.style.boxShadow = "1px 1px 2px 2px gray";
    scoreboard.appendChild(createscorecard);
    createcorrect.id = "correct";
    createcorrect.innerHTML = correctcards + "/" + cardamount;
    createcorrect.style.fontWeight = "bold";
    createscorecard.appendChild(createcorrect);


}

//------------------------------------------------------------------------ONCLICK FUNCTION------------------------------------------------------------------------//

function onclickfunction() {

    clickamount = clickamount + 1;
    this.style.visibility = "hidden";
    this.firstElementChild.style.visibility = "visible";

    var score = document.getElementById("correct");
    clickedcards.push(this.firstElementChild);
    clickedcardbacks.push(this);

    if (clickamount > 1) {
        if (clickedcards[1].style.backgroundImage != clickedcards[0].style.backgroundImage) {
            
            document.getElementById("gameContainer").style.pointerEvents = "none";

            setTimeout(function () {
                clickedcards[0].style.visibility = "hidden";
                clickedcardbacks[0].style.visibility = "visible";
                clickedcards[1].style.visibility = "hidden";
                clickedcardbacks[1].style.visibility = "visible";
                clickamount = 0;
                clickedcards.length = 0;
                clickedcardbacks.length = 0;
                document.getElementById("gameContainer").style.pointerEvents = "auto";
            }, 600);


        } else {
            correctcards = correctcards * 1 + 2;
            clickamount = 0;
            clickedcards.length = 0;
            clickedcardbacks.length = 0;

        }

        if (correctcards == cardarray.length) {
            score.innerHTML += " <br>Winner!";
            score.parentElement.style.border = "3px solid lightgreen";
            score.parentElement.style.boxShadow = "1px 1px 20px 2px lightgreen";
        }
    }
}
