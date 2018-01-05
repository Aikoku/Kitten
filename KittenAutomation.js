// ==UserScript==
// @name         Kittens Game
// @namespace    http://bloodrizer.ru/games/kittens/#
// @version      0.1
// @description  Help
// @author       Mark
// @include      *bloodrizer.ru/games/kittens*
// @grant        none
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @run-at document-load
// ==/UserScript==

// Your code here...
$(document).ready( function (){
    console.log("Script Start");

    //Add here building by priority
    var whatToUpgrade = ['Workshop','Catnip field','Pasture','Aqueduct','Mine',
                         'Lumber Mill','Unic. Pasture','Library','Academy'];

    autoBuild = setInterval(function() {
        if(isMoreThan('catnip',0.95) || isMoreThan('wood',0.95) || isMoreThan('minerals',0.95)){
            for(var i = 0; i < gamePage.tabs[0].buttons.length; i++){
                for(var j = 0; j < whatToUpgrade.length; j++){
                    if(gamePage.tabs[0].buttons[i].opts.name.toLowerCase() == whatToUpgrade[j].toLowerCase()){
                        gamePage.tabs[0].buttons[i].buttonContent.click();
                        console.log("Script build "+whatToUpgrade[j]);
                    }
                }
            }
        }
    }, 4 * 1000);

    autoCraft = setInterval(function() {
        craftWhatTo('catnip','wood',0.98);
        craftWhatTo('wood','beam',0.98);
        craftWhatTo('minerals','slab',0.98);
        craftWhatTo('coal','steel',0.98);
        craftWhatTo('iron','plate',0.98);
    }, 10 * 1000);

    autoHunt = setInterval(function() {
        var catpower = gamePage.resPool.get('manpower');
        if (catpower.value / catpower.maxValue > 0.95) {
            $("a:contains('Send hunters')").click();
            if (gamePage.workshop.getCraft('parchment').unlocked)  { gamePage.craftAll('parchment');  }
            if (gamePage.workshop.getCraft('manuscript').unlocked) { gamePage.craftAll('manuscript'); }
            //if (gamePage.workshop.getCraft('compedium').unlocked)  { gamePage.craftAll('compedium');  }
            //if (gamePage.workshop.getCraft('blueprint').unlocked)  { gamePage.craftAll('blueprint');  }
        }
    }, 5 * 1000);

    starClick = setInterval(function() { $("#gameLog").find("input").click(); }, 2 * 1000);

});


function craftWhatTo(what,to,when){
    if (isMoreThan(what,when)) {
        craft(to);
    }
}

/*
Return true if current 'material' amount is more than 'when' parameter(In procent).
*/
function isMoreThan(material,when){
    if(gamePage.resPool.get(material).value / gamePage.resPool.get(material).maxValue > when){
        return true;
    }else{
        return false;
    }
}

function craft(name){
    gamePage.craftAll(name);
    console.log("Script craft "+name);
}
