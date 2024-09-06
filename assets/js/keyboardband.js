"use strict"
//The Level System
var level = 1;
var exp = 0;
var expToComplete = 20;

var levelSpan = $(".level");
var progress = $(".progress");
var canvas = $("#myCanvas");

//Display
var circles = [];
var keyData = {
    a: {
        color: '#4cdaab',
        sound: new Howl({
            src: ['assets/files/sounds/bubbles.mp3']
          })
    },
    b: {
        color: '#b8cb38',
        sound: new Howl({
            src: ['assets/files/sounds/clay.mp3']
          })
    },
    c: {
        color: '#c66edb',
        sound: new Howl({
            src: ['assets/files/sounds/confetti.mp3']
          })
    },
    d: {
        color: '#159450',
        sound: new Howl({
            src: ['assets/files/sounds/dotted-spiral.mp3']
          })
    },
    e: {
        color: '#b02624',
        sound: new Howl({
            src: ['assets/files/sounds/flash-1.mp3']
          })
    },
    f: {
        color: '#80418c',
        sound: new Howl({
            src: ['assets/files/sounds/flash-2.mp3']
          })
    },
    g: {
        color: '#a5c9d8',
        sound: new Howl({
            src: ['assets/files/sounds/flash-3.mp3']
          })
    },
    h: {
        color: '#4d005f',
        sound: new Howl({
            src: ['assets/files/sounds/glimmer.mp3']
          })
    },
    i: {
        color: '#6a17ec',
        sound: new Howl({
            src: ['assets/files/sounds/moon.mp3']
          })
    },
    j: {
        color: '#6bdd3e',
        sound: new Howl({
            src: ['assets/files/sounds/pinwheel.mp3']
          })
    },
    k: {
        color: '#08ca68',
        sound: new Howl({
            src: ['assets/files/sounds/piston-1.mp3']
          })
    },
    l: {
        color: '#7be801',
        sound: new Howl({
            src: ['assets/files/sounds/piston-2.mp3']
          })
    },
    m: {
        color: '#98a425',
        sound: new Howl({
            src: ['assets/files/sounds/piston-3.mp3']
          })
    },
    n: {
        color: '#8c4cd7',
        sound: new Howl({
            src: ['assets/files/sounds/prism-1.mp3']
          })
    },
    o: {
        color: '#8193e6',
        sound: new Howl({
            src: ['assets/files/sounds/prism-2.mp3']
          })
    },
    p: {
        color: '#b678c9',
        sound: new Howl({
            src: ['assets/files/sounds/prism-3.mp3']
          })
    },
    q: {
        color: '#173b16',
        sound: new Howl({
            src: ['assets/files/sounds/splits.mp3']
          })
    },
    r: {
        color: '#8879f1',
        sound: new Howl({
            src: ['assets/files/sounds/squiggle.mp3']
          })
    },
    s: {
        color: '#725ef7',
        sound: new Howl({
            src: ['assets/files/sounds/strike.mp3']
          })
    },
    t: {
        color: '#1e58c4',
        sound: new Howl({
            src: ['assets/files/sounds/suspension.mp3']
          })
    },
    u: {
        color: '#a7647b',
        sound: new Howl({
            src: ['assets/files/sounds/timer.mp3']
          })
    },
    v: {
        color: '#470de9',
        sound: new Howl({
            src: ['assets/files/sounds/ufo.mp3']
          })
    },
    w: {
        color: '#5d03ad',
        sound: new Howl({
            src: ['assets/files/sounds/veil.mp3']
          })
    },
    x: {
        color: '#bba5eb',
        sound: new Howl({
            src: ['assets/files/sounds/wipe.mp3']
          })
    },
    y: {
        color: '#0027ad',
        sound: new Howl({
            src: ['assets/files/sounds/zig-zag.mp3']
          })
    },
    z: {
        color: '#8da799',
        sound: new Howl({
            src: ['assets/files/sounds/corona.mp3']
          })
    }
}

//For Random Circle Spawning on Keypress
function onKeyDown(e) {
    var data = keyData[event.key.toLowerCase()]
    if(data){
        var maxPoint = new Point(view.size.width,view.size.height);
        var point = Point.random() * maxPoint;
        var myCircle = new Path.Circle(point, 200);
        myCircle.fillColor = data.color;
        data.sound.play();
        circles.push(myCircle);
        giveExp(1);
    }
}

//For Giving Exp
function giveExp(amount){
    exp+=amount;
    if(exp>expToComplete){
        levelup();
    }
    progress.css("flex-grow",exp/expToComplete);
    progress.css("background-color","yellow");
    setTimeout(function(){
        progress.css("background-color","darkblue");
    },500)
}

//For Leveling Up
function levelup(){
    exp = 0;
    expToComplete*=1.05;
    levelSpan.text(++level);
    color = randomColor();
    canvas.css("background-color",color);
    setTimeout(function(){
        canvas.css("background-color","black");
    },500)
}

var colors = ["red","lightblue","yellow","magenta","purple","green","cyan","white","orange","pink"];
//Gets a random color
function randomColor(){
    color = colors[Math.floor(Math.random()*colors.length)];
    return color;
}

//For Animating Circle
function onFrame(){
    circles.forEach(function(circle,i){
        circle.fillColor.hue+=1;
        circle.scale(.9);
        if(circle.area < 1){
            circle.remove();
            circles.splice(i, 1);
          }
    })
}
