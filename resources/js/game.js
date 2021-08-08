var gameState = 0;
var states = ["firstMove", "montyMove", "secondMove", "end"];
var montyVariant;// = document.getElementById("montySelect").value;
var simsRuns = 0;
var totalSims;// = document.getElementById("simCountBox").value;
//document.getElementById("display_div_id").innerHTML = "1 / " + totalSims;
var firstDoor = -1;
var montyOpenDoor = -1;
var secondDoor = -1;
var prizeDoor = -1;
var totalWins = 0;
var totalLosses = 0;
var montyOpenedPrize = 0;
var totalWinsSwitch = 0;
var totalLossesSwitch = 0;
var playerSwitch;// = document.getElementById("switchCheck").checked;
var showPrize;// = document.getElementById("prizeCheck").checked;
var page; //true for research, false for play
var clicked;

//determine whether on play page or research page
window.addEventListener('load', () => {
    if (window.document.documentURI.includes("research")) {
        console.log("Research Page")
        page = true;
        montyVariant = document.getElementById("montySelect").value;
        totalSims = document.getElementById("simCountBox").value;
        document.getElementById("display_div_id").innerHTML = "1 / " + totalSims;
        playerSwitch = document.getElementById("switchCheck").checked;
        showPrize = document.getElementById("prizeCheck").checked;
        gameSetPrizeDoor();
    }
    else {
        console.log("Play Page")
        page = false;
        //randomize the monty type and prize door
        var randomMonty = Math.floor(Math.random() * 5);
        var montyDict = {
            0: "Standard Monty",
            1: "Ignorant Monty",
            2: "Angelic Monty",
            3: "Evil Monty",
            4: "Monty from Hell"
        }
        montyVariant = montyDict[randomMonty];
        prizeDoor = Math.floor(Math.random() * 3);
        console.log(montyDict[randomMonty] + " Prize Door: " + String(prizeDoor + 1));
        clicked = false;
    }
})

  window.playDoor = function(doorClicked) {
    if (!clicked && gameState == 0) {
        clicked = true;
        firstDoor = doorClicked;
        selectDoor(firstDoor, "yellow");
        setTimeout(function() {
            gameMontyMove();
            clicked = false;
            gameState = 2;
        }, 700);
    }
    else if (!clicked && doorClicked != montyOpenDoor) { //implies secondMove
        clicked = true;
        if (doorClicked == firstDoor) {
            //did not switch
            playerSwitch = false;
        }
        else {
            playerSwitch = true;
        }
        gameSecondMove();
        setTimeout(function() {
            gameTriggerEnd(doorClicked == prizeDoor);
        }, 700)
    }
}

window.setGameText = function (text) {
    document.getElementById("gameText").innerHTML = text;
}

window.updateMontyVariant = function (variant) {
    montyVariant = variant;
    // console.log('montyVariant', montyVariant);
}

window.updatePrizeBorder = function () {
    for(var i = 0; i < 3; i++) {
        document.getElementById("door" + (i + 1) + "btn").style.border = "solid 10px white";
    }
    if(showPrize == true) {
        document.getElementById("door" + (prizeDoor + 1) + "btn").style.border = "solid 10px red";
    }
}

window.gameSetPrizeDoor = function () {
    prizeDoor = Math.floor(Math.random() * 3);
    updatePrizeBorder();
}

//gameSetPrizeDoor();

window.setShowPrize = function (value) {
    showPrize = value;
    updatePrizeBorder();
}

window.setPlayerSwitch = function (value) {
    playerSwitch = value;
}

window.openDoor = function (door) {
    if(prizeDoor == door) {
        document.getElementById("door" + (door + 1) + "img").src = "img/carDoor.png";
    }
    else {
        document.getElementById("door" + (door + 1) + "img").src = "img/goatDoor.png";
    }
}

window.openAllDoors = function () {
    for(var i = 0; i < 3; i++) {
        if(prizeDoor == i) {
            document.getElementById("door" + (i + 1) + "img").src = "img/carDoor.png";
        }
        else {
            document.getElementById("door" + (i + 1) + "img").src = "img/goatDoor.png";
        }
    }
}

window.selectDoor = function (door, color) {
    document.getElementById("door" + (door + 1) + "btn").style.backgroundColor = color;
}

window.closeAllDoors = function () {
    document.getElementById("door1img").src = "img/closedDoor.png";
    document.getElementById("door2img").src = "img/closedDoor.png";
    document.getElementById("door3img").src = "img/closedDoor.png";
}

window.deselectDoors = function () {
    document.getElementById("door1btn").style.backgroundColor = "white";
    document.getElementById("door2btn").style.backgroundColor = "white";
    document.getElementById("door3btn").style.backgroundColor = "white";
}

window.switchDoors = function() {
    if(firstDoor == 0) {
        if(montyOpenDoor == 1) {
            secondDoor = 2;
        }
        else {
            secondDoor = 1;
        }
    }
    else if(firstDoor == 1) {
        if(montyOpenDoor == 0) {
            secondDoor = 2;
        }
        else {
            secondDoor = 0;
        }
    }
    else {
        if(montyOpenDoor == 1) {
            secondDoor = 0;
        }
        else {
            secondDoor = 1;
        }
    }
}

window.gameFirstMove = function () {
    firstDoor = Math.floor(Math.random() * 3);
    selectDoor(firstDoor, "yellow");
    setGameText(`You chose door ${firstDoor + 1}. Monty will open a door.`);
}

// DONE
window.gameStandardMonty = function () {
    do {
        montyOpenDoor = Math.floor(Math.random() * 3);
    } while ((montyOpenDoor == firstDoor) || (montyOpenDoor == prizeDoor));
    return true;
}

// DONE
window.gameIgnorantMonty = function () {
  do {
      montyOpenDoor = Math.floor(Math.random() * 3);
  } while (montyOpenDoor == firstDoor);
  return true;
}

// DONE
window.gameAngelicMonty = function () {
    if(firstDoor == prizeDoor) {
        return false;
    }
    do {
        montyOpenDoor = Math.floor(Math.random() * 3);
    } while (montyOpenDoor == firstDoor || montyOpenDoor == prizeDoor);
    return true;
}

// DONE
window.gameEvilMonty = function () {
    if(firstDoor != prizeDoor) {
        montyOpenDoor = prizeDoor;
        return true;
    }
    do {
        montyOpenDoor = Math.floor(Math.random() * 3);
    } while (montyOpenDoor == firstDoor);
    return true;
}

// DONE
window.gameMontyFromHell = function () {
    if(firstDoor != prizeDoor) {
        return false;
    }
    do {
        montyOpenDoor = Math.floor(Math.random() * 3);
    } while (montyOpenDoor == firstDoor);
    return true;
}

window.gameDetermineMontyMove = function () {
    if(montyVariant == "Standard Monty") {
        return gameStandardMonty();
    }
    else if(montyVariant == "Ignorant Monty") {
        return gameIgnorantMonty();
    }
    else if(montyVariant == "Angelic Monty") {
        return gameAngelicMonty();
    }
    else if(montyVariant == "Evil Monty") {
        return gameEvilMonty();
    }
    else {
        return gameMontyFromHell();
    }
}

window.gameMontyMove = function () {
    // if Monty opened a door and is allowing a switch
    if(gameDetermineMontyMove() == true) {
        // console.log(`monty picked ${montyOpenDoor} - you picked ${firstDoor}`);
        openDoor(montyOpenDoor);
        selectDoor(montyOpenDoor, "cyan");
        if(montyOpenDoor == prizeDoor) {
            // console.log("You lost -mmmmmmmmmmmmmmm");
            montyOpenedPrize++;
            setGameText(`Monty opened door ${montyOpenDoor + 1}.`);
            gameTriggerEnd(false);
            return true;
        }
        setGameText(`Monty opened door ${montyOpenDoor + 1}. Will you switch?`);
    }
    // if Monty didn't open a door and won't allow a switch
    else {
        setGameText(`Monty didn't give you the option to switch.`);
        gameTriggerEnd(firstDoor == prizeDoor);
        return true;
    }
    return false;
}

window.gameSecondMove = function () {
    if(playerSwitch == true) {
        switchDoors();
        setGameText(`You switched from door ${firstDoor + 1} to door ${secondDoor + 1}.`);
    }
    else {
        secondDoor = firstDoor;
        setGameText(`You chose to stick with door ${firstDoor + 1}.`);
    }
    selectDoor(firstDoor, "white");
    selectDoor(secondDoor, "yellow");
}

window.gameTriggerEnd = function (win) {
    // console.log("The prize door was", prizeDoor);
    openAllDoors();
    simsRuns++;
    if(win) {
        // console.log("You won");
        setGameText(document.getElementById("gameText").innerHTML + " You won.");
        if (page) {
            totalWins++;
            document.getElementById("wins").innerHTML = totalWins;
        }

    }
    else {
        // console.log("You lost");
        setGameText(document.getElementById("gameText").innerHTML + " You lost.");
        if (page) {
            totalLosses++;
            document.getElementById("losses").innerHTML = totalLosses;
        }
    }
    if (page) {
        updateCurrentSim();
        if(totalLosses !== 0) {
            document.getElementById("wl").innerHTML = totalWins / totalLosses;
        }
        updateProgBar();
        document.getElementById("winPercent").innerHTML = String((totalWins / (totalWins + totalLosses)) * 100) + "%";
        document.getElementById("montyOpenedPrize").innerHTML = montyOpenedPrize;
        document.getElementById("winsWithSwitch").innerHTML = totalWinsSwitch;
        document.getElementById("lossesWithSwitch").innerHTML = totalLossesSwitch;
        document.getElementById("totalWithSwitch").innerHTML = totalWinsSwitch + totalLossesSwitch;
        document.getElementById("winPercentWithSwitch").innerHTML = String((totalWinsSwitch / (totalWinsSwitch + totalLossesSwitch)) * 100) + "%";
    }
}

window.gameReset = function () {
    // console.log("game resetting");
    gameState = 0;
    gameSetPrizeDoor();
    deselectDoors();
    closeAllDoors();
    setGameText("Pick a door.");
}

window.simReset = function () {
    console.log("totalSims =", totalSims);
    gameState = 0;
    deselectDoors();
    closeAllDoors();
    setGameText("Pick a door.");
    simsRuns = 0;
    document.getElementById("display_div_id").innerHTML = "1 / " + totalSims;
    firstDoor = -1;
    montyOpenDoor = -1;
    secondDoor = -1;
    gameSetPrizeDoor();
    totalWins = 0;
    totalLosses = 0;
    montyOpenedPrize = 0;
    totalWinsSwitch = 0;
    totalLossesSwitch = 0;
    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("winPercent").innerHTML = "-";
    document.getElementById("montyOpenedPrize").innerHTML = "0";
    document.getElementById("winsWithSwitch").innerHTML = "0";
    document.getElementById("lossesWithSwitch").innerHTML = "0";
    document.getElementById("totalWithSwitch").innerHTML = "0";
    document.getElementById("winPercentWithSwitch").innerHTML = "-";
    updateTotalSims(totalSims);
}

window.updateCurrentSim = function () {
    if(simsRuns < totalSims) {
        document.getElementById("display_div_id").innerHTML = simsRuns + 1 + " / " + totalSims;
    }
    else {
        document.getElementById("display_div_id").innerHTML ="Finished simulations";
    }
}

window.updateTotalSims = function (newTotal) {
    totalSims = newTotal;
    document.getElementById("wins").innerHTML = totalWins;
    document.getElementById("losses").innerHTML = totalLosses;
    document.getElementById("wl").innerHTML = isNaN(totalWins / totalLosses) ? "-" : totalWins / totalLosses;
    updateCurrentSim();
    updateProgBar();
}

window.updateProgBar = function (newTotal) {
    document.getElementById("progBarSpan").style.width = Math.min((100 * simsRuns / totalSims), 100) + "%";
    if(simsRuns >= totalSims) {
        document.getElementById("progBarSpan").style.borderTopRightRadius = "20px";
        document.getElementById("progBarSpan").style.borderBottomRightRadius = "20px";
    }
    else {
        document.getElementById("progBarSpan").style.borderTopRightRadius = "8px";
        document.getElementById("progBarSpan").style.borderBottomRightRadius = "8px";
    }
}

window.gameStep = function () {
    if(simsRuns >= totalSims) {
        // console.log("Cannot step: finished simulations");
        return;
    }
    if(gameState == 0) {
        gameFirstMove(Math.random);
    }
    else if(gameState == 1) {
        if(gameMontyMove() == true) {
            // player did NOT get a chance to switch
            gameState = 3;
            return;
        }
    }
    else if(gameState == 2) {
        // player DID get a chance to switch
        gameSecondMove();
        if (prizeDoor == secondDoor) {
            totalWinsSwitch++;
        }
        else {
            totalLossesSwitch++;
        }
        gameTriggerEnd(prizeDoor == secondDoor);
    }

    gameState++;
    if(gameState == states.length) {
        gameReset();
    }
    // console.log(`gameState: ${states[gameState]} (${gameState})`);
}

window.gameNext = function () {
    // console.log("just clicked next:")
    if(simsRuns >= totalSims) {
        // console.log("Cannot step: finished simulations");
        return;
    }
    do {
        window.gameStep();
    } while(gameState !== states.length - 1);
}

window.gameRunAll = function () {
    // console.log("just clicked run all:")
    if(simsRuns >= totalSims) {
        // console.log("Cannot step: finished simulations");
        return;
    }
    while(simsRuns < totalSims) {
        // console.log("current sims run:", simsRuns);
        window.gameNext();
    }
    // console.log("just finished run all:")
}