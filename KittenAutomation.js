// ==UserScript==
// @name         Kittens Game
// @namespace    http://bloodrizer.ru/games/kittens/#
// @version      0.1
// @description  Help
// @author       Mark
// @include      *bloodrizer.ru/games/kittens*
// @grant        none
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @require
// @run-at document-load
// ==/UserScript==

// Your code here...

//Add here building by priority
var whatToUpgrade = ['Workshop','Catnip field','Pasture','Aqueduct','Mine',
                     'Lumber Mill','Unic. Pasture','Library','Academy','Tradepost',
                     'Hut','Log House','Smelter'];

// Copy After This Line:


$(document).ready( function (){

    console.log("Script Start");
    if(localStorage.craftCount == "NaN"){
        localStorage.craftCount = 0;
        localStorage.buildCount = 0;
        localStorage.huntCount = 0;
    }

    autoBuild = setInterval(function() {
        if(isMoreThan('catnip',0.5) || isMoreThan('wood',0.5) || isMoreThan('minerals',0.5)){
            for(var i = 0; i < gamePage.tabs[0].buttons.length; i++){
                if(gamePage.tabs[0].buttons[i].model.enabled){
                    for(var j = 0; j < whatToUpgrade.length; j++){
                        if(gamePage.tabs[0].buttons[i].opts.name.toLowerCase() == whatToUpgrade[j].toLowerCase()){
                            if(gamePage.tabs[0].buttons[i].model.enabled){
                                gamePage.tabs[0].buttons[i].buttonContent.click();
                                localStorage.buildCount++;
                                console.log("Script build ["+localStorage.buildCount+"] "+whatToUpgrade[j]);
        }}}}}}
    }, 4 * 1000);

    autoCraft = setInterval(function() {
        craftWhatTo('catnip','wood',0.98);
        craftWhatTo('wood','beam',0.98);
        craftWhatTo('minerals','slab',0.98);
        craftWhatTo('coal','steel',0.98);
        craftWhatTo('iron','plate',0.98);
    }, 10 * 1000);

    autoHunt = setInterval(function() {
        if (isMoreThan('manpower',0.95)) {
            $("a:contains('Send hunters')").click();
            localStorage.huntCount++;
            console.log("Script hunt ["+localStorage.huntCount+"] ");
            if (gamePage.workshop.getCraft('parchment').unlocked)  { craft('parchment');  }
            //if (gamePage.workshop.getCraft('manuscript').unlocked) { craft('manuscript'); }
            //if (gamePage.workshop.getCraft('compedium').unlocked)  { craft('compedium');  }
            //if (gamePage.workshop.getCraft('blueprint').unlocked)  { craft('blueprint');  }
        }
    }, 5 * 1000);

    autoPrey = setInterval(function() {
        if (isMoreThan('faith',0.95)) {
            $("a:contains('Praise the sun!')").click();
            localStorage.craftCount++;
            console.log("Script faith ["+localStorage.craftCount+"] ");

        }
    }, 10 * 1000);

    starClick = setInterval(function() { $("#observeBtn").click(); }, 2 * 1000);

});

function craftWhatTo(what,to,when){
    if (isMoreThan(what,when)) {
        craft(to);
    }
}

//Return true if current 'material' amount is more than 'when' parameter(In procent).
function isMoreThan(material,when){
    if(gamePage.resPool.get(material).value / gamePage.resPool.get(material).maxValue > when){
        return true;
    }else{
        return false;
    }
}

function craft(name){
    gamePage.craftAll(name);
    localStorage.craftCount++;
    console.log("Script craft ["+localStorage.craftCount+"] "+name);
}
