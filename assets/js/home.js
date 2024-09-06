"use strict";
onload=()=>{
    //Handles large info containers
    let largeInfoContainers = document.querySelectorAll(".large-info-container-pictures");
    let imgs;
    for(let container of largeInfoContainers){
        let imgs = container.querySelectorAll("a");
        //Changes the image in the container
        const addVisible = (switchClass)();
        addVisible(imgs, ["visible", "fade"]); //Runs  for first time
        window.setInterval(addVisible, 10000, imgs, ["visible","fade"]); //Changes image every 3.5 seconds
    }

    //Pushes all elements of tag a from small-info-container-pictures into imgs
    let smallInfoContainers = document.querySelectorAll(".small-info-container-pictures");
    for(let container of smallInfoContainers){
        let imgs = container.querySelectorAll("a");
        window.setTimeout(function(imgs){
            //Changes the background of the images (loops between children)
            const changeBackground = (switchClass)();
            changeBackground(imgs, ["img-roll"]); //Runs changeBackground for first time
            window.setInterval(changeBackground, 3500, imgs, ["img-roll"]); //Changes background every 3.5 seconds
        },50+containerIndex++*750,imgs);
    }
}
function switchClass(){
    let imgNum = 0; //Current image index
    return function(imgs, classNames){
        if(imgs.length>0){
            for(let className of classNames){
                if(imgs[imgNum-1]){imgs[imgNum-1].classList.remove(className);}
                imgs[imgNum%imgs.length].classList.add(className);
            }
            imgNum = (imgNum%imgs.length)+1;
        }
    }
}