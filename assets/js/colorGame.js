"use strict";

var stillPlaying = true; //Has Finished Game
var numSquares = 8; //# of Color Squares
var colors = []; //Colors List
var pickedColor; //Color to Match
var pickedColorRGB = {r:0,g:0,b:0};

var squares = document.querySelectorAll(".square"); //Color Squares
//RGB Title Text
var colorDisplay = {
    r: document.querySelector("#r"),
    g: document.querySelector("#g"),
    b: document.querySelector("#b")
};
var messageDisplay = document.querySelector("#message"); //Try Again / Correct Text
var header = document.querySelector("h1"); //Header With Title
var rgbSpan = document.querySelector("#rgbSpan"); //RGB span
var resetButton = document.querySelector("#reset"); //Reset Button
var modeButtons = document.querySelectorAll(".mode"); //Mode Buttons

//Setup Game
init();


function init(){
    //Handles Mode Switching
    setUpModeButtons();

    //Sets Up Click Listeners For Answer Checking
    setUpSquares();

    //Resets Game When Clicked
    resetButton.addEventListener("click",reset);
    
    //Set Up Color Change On RGB Click
    setUpRGBClick();

    //Sets up game
    reset();
}

//Handles Mode Switching
function setUpModeButtons(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click",function(){
            //Disable Selected From All Buttons
            for(var i = 0; i < modeButtons.length;i++){
                modeButtons[i].classList.remove("selected");
            }

            //Select Button
            this.classList.add("selected");

            //Decide Squares to Show
            switch(this.textContent.toLowerCase()){
                case "easy":
                    numSquares = 4;
                    break;
                case "medium":
                    numSquares = 8;
                    break;
                case "hard":
                    numSquares = 12;
                    break;
                default:
                    numSquares = 8;
                    break;
            }

            //Reset Game
            reset();
        });
    }
}

//Sets Up Click Listeners For Answer Checking
function setUpSquares(){
    for(var i = 0;i<squares.length;i++){
        squares[i].addEventListener("click",function(){
            //Square's Color
            var clickedColor = this.style.backgroundColor;
            //Must Be Opaque
            if(this.style.opacity==="1"){
                //Compare to Goal Color
                if(clickedColor === pickedColor && stillPlaying){ //Correct
                    messageDisplay.textContent = "Correct";
                    resetButton.textContent = "Play Again?";
                    //Changes Square to Match Chosen Color
                    changeColors(clickedColor);
                    this.classList.add("correct");
                    header.style.backgroundColor = clickedColor;
                    stillPlaying = false; //Game Won!
                }else if(stillPlaying){ //Wrong
                    this.style.opacity = 0;
                    messageDisplay.textContent = "Try Again!";
                }
            }
        })
    }
}

//Sets Up Click Listerners for RGB clicking
function setUpRGBClick(){
    colorDisplay.r.addEventListener("click",function(){changeHeaderColor(this, "r")});
    colorDisplay.b.addEventListener("click",function(){changeHeaderColor(this, "b")});
    colorDisplay.g.addEventListener("click",function(){changeHeaderColor(this, "g")});
}
//Changes Header Color
function changeHeaderColor(colorSpan, type){
    if(stillPlaying){
        return;
    }
    var value = colorSpan.textContent;
    //Get current color of "RGB"
    var currentRGB = getComputedStyle(rgbSpan).getPropertyValue('color').match(/([0-9]+), ([0-9]+), ([0-9]+)/);
    switch(type){
        case "r":
            changeRGBSpan(value, currentRGB[2],currentRGB[3],1,type,`rgb(${pickedColorRGB[type]}, 0, 0)`);
            break;
        case "g":
            changeRGBSpan(currentRGB[1],value,currentRGB[3],2,type,`rgb(0, ${pickedColorRGB[type]}, 0)`);
            break;
        case "b":
            changeRGBSpan(currentRGB[1],currentRGB[2],value,3,type,`rgb(0, 0, ${pickedColorRGB[type]})`);
            break;
        default:
            break;
    }
}
//Changes RGB Span and RGB color
function changeRGBSpan(r,g,b,index,type,newColor){
    //Change "RGB" color
    var newValue = `rgb(${r}, ${g}, ${b})`;
    rgbSpan.style.color = newValue;
    //Gets current color of "(R,G,B)" text
    var curColor = getComputedStyle(colorDisplay[type])["color"].match(/([0-9]+), ([0-9]+), ([0-9]+)/)
    //Change to White or to Color & Remove Color
    if(curColor[index] != pickedColorRGB[type]){
        colorDisplay[type].style.color = newColor;
    } else {
        colorDisplay[type].style.color = "rgb(255, 255, 255)";
        var curRGBColor = getComputedStyle(rgbSpan)["color"].match(/([0-9]+), ([0-9]+), ([0-9]+)/);
        rgbSpan.style.color = newValue.replace(curRGBColor[index],"0");
    }
}
//Reset Game
function reset(){
    //Reset texts
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";

    //Enable Playing
    stillPlaying = true;

    //Generate New Colors
    colors = generateRandomColors(numSquares);

    //Generate New Match Color
    pickColor();

    //Update ColorDisplay Text
    colorDisplay.r.textContent = pickedColorRGB.r;
    colorDisplay.g.textContent = pickedColorRGB.g;
    colorDisplay.b.textContent = pickedColorRGB.b;

    //Update Square Colors
    for(var i = 0;i<squares.length;i++){
        if(colors[i]){
            //Color Sqaures
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.opacity = 1;
        } else {
            //Hide Squares With No Color
            squares[i].style.opacity = 0;
        }
        squares[i].classList.remove("correct");
    }

    //Update RGB text colors
    colorDisplay.r.style.color = "rgb(255, 255, 255)";
    colorDisplay.g.style.color = "rgb(255, 255, 255)";
    colorDisplay.b.style.color = "rgb(255, 255, 255)";
    rgbSpan.style.color = "rgb(0, 0, 0)";

    //Update Header
    header.style.backgroundColor = "midnightblue";
}
var result;
//Returns Random Color
function pickColor(){
    var randomIndex = Math.floor(Math.random()*colors.length);
    pickedColor = colors[randomIndex];
    result = pickedColor.match(/([0-9]+), ([0-9]+), ([0-9]+)/);
    Object.assign(pickedColorRGB,{r: result[1],g: result[2],b: result[3]});
};

//Returns Random RGB Value List
function generateRandomColors(amount){
    //Placeholder
    var returnColors = [];

    //Add Amount Colors
    for(var i=0;i<amount;i++){
        //Add Random Color
        returnColors.push(randomColor());
    }

    return returnColors;
}

//Returns Random RGB Value
function randomColor(){
    //Pick "red" from 0 - 255
    var r = Math.floor(Math.random()*256);
    //Pick "green" from 0 - 255
    var g = Math.floor(Math.random()*256);
    //Pick "blue" from 0 - 255
    var b = Math.floor(Math.random()*256);

    //Build and return rbg value
    var rbg = `rgb(${r}, ${g}, ${b})`;
    return rbg;
}

//Changes Square to Match Chosen Color
function changeColors(color){
    for(var i = 0;i<colors.length;i++){
        squares[i].style.backgroundColor = color;
        squares[i].style.opacity = 1;
    }
}