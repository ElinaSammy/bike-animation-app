// 🎯 ELEMENTS
const startBtn = document.getElementById("startBtn");
const sliderArea = document.getElementById("sliderArea");
const slider = document.getElementById("speedSlider");
const bike = document.getElementById("bike");
const speedValue = document.getElementById("speedValue");

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const screen4 = document.getElementById("screen4");
const screen5 = document.getElementById("screen5");

const warningScreen = document.getElementById("warningScreen");
const warningText = document.getElementById("warningText");
const warningSpeed = document.getElementById("warningSpeed");

const fallingBike = document.getElementById("fallingBike");
const statusText = document.getElementById("statusText");
const helpBtn = document.getElementById("helpBtn");
const fallText = document.getElementById("fallText");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const restartBtn = document.getElementById("restartBtn");

const birds = document.getElementById("birds");
const bonkText = document.getElementById("bonkText");
const bonkImage = document.getElementById("bonkImage");

const bike90 = document.getElementById("bike90");
const balloonScreen = document.getElementById("balloonScreen");
const continueBtn = document.getElementById("continueBtn");

// 🎵 AUDIO
const engineSound = document.getElementById("engineSound");
const broomSound = document.getElementById("broomSound");
const crashSound = document.getElementById("crashSound");
const alarmSound = document.getElementById("alarmSound");
const superheroSound = document.getElementById("superheroSound");
const bonkSound = document.getElementById("bonkSound");
const drumrollSound = document.getElementById("drumrollSound");

document.body.addEventListener("click", () => {
    alarmSound.load();
    superheroSound.load();
    bonkSound.load();
    drumrollSound.load();
}, { once: true });

// 🧠 STATE
let sliderUsed = false;
let crashed = false;
let noCount = 0;

// 🚀 START RIDE
startBtn.addEventListener("click", () => {
    engineSound.loop = true;
    engineSound.currentTime = 0;
    engineSound.play();

    startBtn.style.display = "none";

    setTimeout(() => {
        sliderArea.style.display = "block";
    }, 1500);
});

// 🎚️ SLIDER LOGIC (ONLY ONE LISTENER ✅)
slider.addEventListener("input", () => {

    let speed = parseInt(slider.value);
    speedValue.innerText = speed;

    // 🎵 switch engine → broom
    if (!sliderUsed) {
        sliderUsed = true;

        engineSound.pause();
        engineSound.currentTime = 0;

        broomSound.loop = true;
        broomSound.currentTime = 0;
        broomSound.play();
    }

    // 🚴 bike movement
    let maxMove = window.innerWidth - 300;
    let position = (speed / 240) * maxMove;
    bike.style.left = position + "px";

    // 💥 CRASH
    if (speed >= 240 && !crashed) {

        crashed = true;

        // 🔇 stop broom
        broomSound.pause();
        broomSound.currentTime = 0;

        screen1.style.display = "none";
        warningScreen.style.display = "flex";

        const warningWords = ["W","WA","WAR","WARN","WARNI","WARNIN","WARNING"];

        let i = 0;

        let typing = setInterval(() => {

            warningText.innerHTML = warningWords[i];
            i++;

            if (i >= warningWords.length) {

                clearInterval(typing);
                warningSpeed.style.opacity = "1";

                setTimeout(() => {

                    // 💥 crash sound
                    crashSound.currentTime = 0;
                    crashSound.play();

                    warningScreen.style.display = "none";
                    alarmSound.currentTime = 0;
                    alarmSound.play();
                    screen2.style.display = "flex";
                    screen2.classList.add("screenShake");

                    fallText.style.opacity = "1";
                    fallingBike.classList.add("fall");

                    setTimeout(() => {

                        statusText.innerHTML = "💥 CRASH 💥";
                        statusText.classList.add("crashShake");
                        statusText.style.opacity = "1";
                        fallText.style.opacity = "0";

                    }, 1200);

                    setTimeout(() => {

                        statusText.innerHTML =
                        "Current Status:<br><br>Stuck in Bug Crater";

                        helpBtn.style.opacity = "1";

                    }, 2200);

                }, 1500);
            }

        }, 250);
    }
});

// 👉 SCREEN 2 → SCREEN 3
helpBtn.addEventListener("click",()=>{

    screen2.style.display="none";

    screen3.style.display="flex";

    superheroSound.currentTime = 0;
    superheroSound.play();

    testerBubble.style.opacity="0";
    trustButtons.style.display="none";

    testerImage.classList.add("testerEntry");

    setTimeout(()=>{

        testerBubble.style.opacity="1";

    },1000);

    setTimeout(()=>{

        trustButtons.style.display="flex";

    },1800);

});

yesBtn.addEventListener("click",()=>{

    alert("Speed Violation Confirmed 😡 Initiating Bonk Protocol 🔨");

    screen3.style.display = "none";

    screen4.style.display = "flex";

    bonkSequence();

});


noBtn.addEventListener("click",()=>{

    noCount++;
    if(noCount >= 1){

        noBtn.style.background = "#ff3b3b";
        noBtn.style.color = "white";
    
    }

    noBtn.style.transform =
    `rotate(${Math.random()*20-10}deg)`;

    if(noCount === 1){

        noBtn.innerHTML =
        "😠<br>Select YES";

        yesBtn.style.transform =
        "scale(1.2)";
    }

    else if(noCount === 2){

        noBtn.innerHTML =
        "😡<br>Wrong Choice";

        yesBtn.style.transform =
        "scale(1.5)";
    }

    else if(noCount === 3){

        noBtn.innerHTML =
        "🤨<br>There Is No NO";

        yesBtn.style.transform =
        "scale(1.8)";
    }

    else if(noCount === 4){

        noBtn.innerHTML =
        "😭<br>Fine... YES";
    
        noBtn.style.background =
        "#990000";
    
        yesBtn.style.transform =
        "scale(3)";
    
        yesBtn.style.position =
        "relative";
    
        yesBtn.style.zIndex = "10";
    
    }

    else if(noCount >= 5){

        noBtn.style.opacity = ".1";
    
        noBtn.style.pointerEvents = "none";
    
        yesBtn.style.transform =
        "scale(4)";
    
        yesBtn.innerHTML =
        "YES 😎";
    
    }

});

// 🔨 BONK SEQUENCE
function bonkSequence(){

    restartBtn.style.display = "none";

    birds.style.opacity = "0";

    bonkImage.style.opacity = "0";

    bonkImage.classList.remove("bonkDrop");

    screen4.classList.remove("screenShake");

    // WHO TOLD YOU

    bonkText.innerHTML =
    "WHO TOLD YOU";

    // TO EXCEED THE SPEED

    setTimeout(()=>{

        bonkText.innerHTML =
        "WHO TOLD YOU<br><br>TO EXCEED THE SPEED?";

    },1500);

    // 240 REALLY

    setTimeout(()=>{

        bonkText.innerHTML =
        "240???<br><br>REALLY???";

    },4000);

    // BONK TEXT

    setTimeout(()=>{

        bonkText.innerHTML =
        "🔨 BONK 🔨";

    },6000);

    // SHAKE + BONK IMAGE

    setTimeout(()=>{

        screen4.classList.add("screenShake");

        bonkImage.style.opacity = "1";

        bonkImage.classList.add("bonkDrop");

        bonkSound.currentTime = 0;
        bonkSound.play();

    },7000);

    // DIZZY BIRDS

    setTimeout(()=>{

        screen4.classList.remove("screenShake");
    
        bonkText.innerHTML =
        "😵";
    
        birds.style.opacity = "1";
    
        birds.classList.add("flyBirds");
    
    },8500);
    
    
    // LET THE BIRDS FINISH THEIR CIRCLE
    
    setTimeout(()=>{
    
        birds.style.opacity = "0";
    
        birds.classList.remove("flyBirds");
    
        bonkText.innerHTML =
        "Okay... maybe 240 was too much 😆";
    
    },15000);
    
    
    // LET'S START AGAIN
    
    setTimeout(()=>{
    
        bonkText.innerHTML =
        "Let's Start Again 😆";
    
    },17000);
    
    
    // SHOW BUTTON
    
    setTimeout(()=>{
    
        restartBtn.style.display =
        "block";
    
    },18500);


}

// 🔁 RESTART → SCREEN 5
restartBtn.addEventListener("click", () => {

    screen4.style.display = "none";
    screen5.style.display = "block";

    screen5Sequence();
});

// 🎈 SCREEN 5 ANIMATION
function screen5Sequence(){

    continueBtn.style.display="none";

    // 🥁 START DRUMROLL LOOP
    drumrollSound.loop = true;
    drumrollSound.currentTime = 0;
    drumrollSound.play();

    balloonScreen.classList.remove("balloonRise");

    bike90.classList.remove("safeRide");

    // small reset

    setTimeout(()=>{

        bike90.classList.add("safeRide");

    },100);

    // balloon starts after bike exits

    setTimeout(()=>{

        balloonScreen.classList.add("balloonRise");

    },5000);


}