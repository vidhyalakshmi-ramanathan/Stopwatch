// Select elements correctly
const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];

let isPlay = false;
let sec,min;
let minCounter=0,secConuter = 0,centiCounter =0; 
let centiSec;
let isreset = false,lapitem=0;

// Function to toggle lap and reset buttons
const toggleButtons = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
};

// Function to handle play button click
const handlePlayClick = () => {
    if(!isPlay && !isreset){
        playButton.innerHTML= 'Pause';
        bg.classList.add('animation-bg');
        min = setInterval(() => {
            minute.innerHTML = `${++minCounter} :`;
        }, 60*1000);
        sec = setInterval(() => {
            if(secConuter ===60){
                secConuter =0;
            }
            second.innerHTML = `&nbsp;${++secConuter} :`;
        }, 1000);
        centiSec = setInterval(() => {
            if(centiCounter ===100){
                centiCounter =0;
            }
            centiSecond.innerHTML= `&nbsp;${++centiCounter} `;
        }, 10);
        isPlay = true;
        isreset = true;
    }else{
        playButton.innerHTML= 'Play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;   
        isreset = false;
        bg.classList.remove('animation-bg');
    }
    toggleButtons();
};
    
const reset = () => {
    isreset = true;
    handlePlayClick();
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    minute.innerHTML='0 :';
    second.innerHTML='&nbsp;0 :';
    centiSecond.innerHTML ='&nbsp;0 ';
    clearALL();
};
const lap=()=>{
    const li=document.createElement("li");
    const number=document.createElement("span");
    const timeStamp=document.createElement("span");
    li.setAttribute('class','lap-item');
    number.setAttribute('class','number');
    timeStamp.setAttribute('class','time-stamp');
    
    number.innerText=`#${++lapitem}`;
    timeStamp.innerHTML= `${minCounter} : ${secConuter} :${centiCounter} `;
    li.append(number,timeStamp);
    laps.append(li);
    clearButton.classList.remove("hidden");
};

const clearALL=() =>{
    laps.innerHTML='';
    laps.append(clearButton);
    clearButton.classList.add("hidden");
    lapitem =0;
};
// Add event listeners to buttons
playButton.addEventListener("click", handlePlayClick);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click",lap);
clearButton.addEventListener("click",clearALL);
