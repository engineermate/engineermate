window.onload = initAll;

function initAll() {
    var allLinks = document.getElementsByTagName("a");

    for (var i = 0; i < allLinks.length; i++) {
        if (allLinks[i].className.indexOf("menuLink") > -1) {
            allLinks[i].onmouseover = toggleMenu;
            allLinks[i].onclick = clickHandler;
        }
    }
}

function clickHandler(evt) {
    if (evt) {
        if (typeof evt.target == "string") {
            toggleMenu(evt, evt.target);
        }
        else {
            toggleMenu(evt, evt.target.toString());
        }
    }
    else {
        toggleMenu(evt, window.event.srcElement.href);
    }
    return false;
}

function toggleMenu(evt, currMenu) {
    if (toggleMenu.arguments.length < 2) {
        var currMenu = this.href;
    }

    var startMenu = currMenu.lastIndexOf("/") + 1;
    var stopMenu = currMenu.lastIndexOf(".");
    var thisMenuName = currMenu.substring(startMenu, stopMenu);

    var thisMenu = document.getElementById(thisMenuName);
    thisMenu.style.display = "block";

    thisMenu.parentNode.className = thisMenuName;
    thisMenu.parentNode.onmouseout = function() {
        document.getElementById(this.className).style.display = "none";
    }
    thisMenu.parentNode.onmouseover = function() {
        document.getElementById(this.className).style.display = "block";
    }
}

//function getAbout() {
    //document.getElementById("outText").innerHTML = "About Us"
//}

//the following function is for initiate the dropdown menu:<sekect id="newLocation">
function initForm() {
    document.getElementById("newLocation").selectedIndex = 0;
    document.getElementById("newLocation").onchange = jumpPage;
}

function jumpPage() {
    var newLoc = document.getElementById("newLocation");
    var newPage = newLoc.options[newLoc.selectedIndex].value;

    if (newPage != "") {
        window.location = newPage;
    }
}

//the following fanctions are for generize the <select> <option> downmenu by number
function initFormGC() {
    document.getElementById("LocationA").selectedIndex = 0;
    document.getElementById("LocationA").onchange = jumpPageGC;
}

function jumpPageGC() {                                        //loc receives the passed value "docName'
    var newLoc = document.getElementById("LocationA");
    var newPage = newLoc.options[newLoc.selectedIndex].value;

    if (newPage != "") {
        window.location = newPage;
    }
}

function initFormWS() {
    document.getElementById("LocationB").selectedIndex = 0;
    document.getElementById("LocationB").onchange = jumpPageWS;
}

function jumpPageWS() {                                        //loc receives the passed value "docName'
    var newLoc = document.getElementById("LocationB");
    var newPage = newLoc.options[newLoc.selectedIndex].value;

    if (newPage != "") {
        window.location = newPage;
    }
}

function initFormST() {
    document.getElementById("LocationC").selectedIndex = 0;
    document.getElementById("LocationC").onchange = jumpPageST;
}

function jumpPageST() {                                        //loc receives the passed value "docName'
    var newLoc = document.getElementById("LocationC");
    var newPage = newLoc.options[newLoc.selectedIndex].value;

    if (newPage != "") {
        window.location = newPage;
    }
}

function initFormWW() {
    document.getElementById("LocationD").selectedIndex = 0;
    document.getElementById("LocationD").onchange = jumpPageWW;
}

function jumpPageWW() {                                        //loc receives the passed value "docName'
    var newLoc = document.getElementById("LocationD");
    var newPage = newLoc.options[newLoc.selectedIndex].value;

    if (newPage != "") {
        window.location = newPage;
    }
}

function initFormWW() {
    document.getElementById("LocationD").selectedIndex = 0;
    document.getElementById("LocationD").onchange = jumpPageWW;
}

function jumpPageWW() {                                        //loc receives the passed value "docName'
    var newLoc = document.getElementById("LocationD");
    var newPage = newLoc.options[newLoc.selectedIndex].value;

    if (newPage != "") {
        window.location = newPage;
    }
}

function initFormLB() {
    document.getElementById("LocationE").selectedIndex = 0;
    document.getElementById("LocationE").onchange = jumpPageLB;
}

function jumpPageLB() {                                        //loc receives the passed value "docName'
    var newLoc = document.getElementById("LocationE");
    var newPage = newLoc.options[newLoc.selectedIndex].value;

    if (newPage != "") {
        window.location = newPage;
    }
}
function initFormNS() {
    document.getElementById("LocationF").selectedIndex = 0;
    document.getElementById("LocationF").onchange = jumpPageNS;
}

function jumpPageNS() {                                        //loc receives the passed value "docName'
    var newLoc = document.getElementById("LocationF");
    var newPage = newLoc.options[newLoc.selectedIndex].value;

    if (newPage != "") {
        window.location = newPage;
    }
}
function initFormCN() {
    document.getElementById("LocationG").selectedIndex = 0;
    document.getElementById("LocationG").onchange = jumpPageCN;
}

function jumpPageCN() {                                        //loc receives the passed value "docName'
    var newLoc = document.getElementById("LocationG");
    var newPage = newLoc.options[newLoc.selectedIndex].value;

    if (newPage != "") {
        window.location = newPage;
    }
}