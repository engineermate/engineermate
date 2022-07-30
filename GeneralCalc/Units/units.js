// EngineerMate Functions by Anjian. Lu,2010.7.4
// All rights reserved.
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

function getAbout() {
    document.getElementById("outText").innerHTML = "About Us"
}

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

// Specific functions for this window
function loadXMLDoc(dname) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", dname, false);
    xhttp.send(); 
    return xhttp.responseXML;
}
function verify() {
    // 0 Object is not initialized
    // 1 Loading object is loading data
    // 2 Loaded object has loaded data
    // 3 Data from object can be worked with
    // 4 Object completely initialized
    if (xmlDoc.readyState != 4) {
        return false;
    }
}
function loadXMLString(txt) {
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(txt, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(txt);
    }
    return xmlDoc;
}
function calcUnit(num, uf1, uf2) {
    f1 = getFactor("unit1");
    f2 = getFactor("unit2");
    result = num * f2 / f1;
    document.getElementById("output").innerHTML = result.toFixed(4);
}
function getFactor(unit) {
    var n = getIndex("category");
    m = getIndex(unit)
    try {
        var f = x1[n].childNodes[m].childNodes[1].childNodes[0].nodeValue;
    }
    catch (e) { populateMenu();alert("select Category first and Re-enter");}    
    return f;     


}
function getIndex(txt) {
    var x = document.getElementById(txt);
    return x.selectedIndex;
}
function getSelectedName() {
    var x = document.getElementById(txt);
    var n = x.selectedIndex;
    return x.options[n].text;
}
function populateMenu() {
    var n = getIndex("category");
    addNode(n);                                     //adding nodes, i.e., options, for the dropdown menus unit 1 & unit 2.
    calcUnit(1,2,3);                                //variables 1,2,3 are only for passing arguments and the values actually are not used.
}
function addNode(opN) {                             //opN is the index of the selected unit category in the xml file (units.xml).
    var x = x1[opN].childNodes;
    document.getElementById('unit1').length = 0;    //clear the existing menu, whether have or not, first.
    for (i = 0; i < x.length; i++) {                                //x.length is the number of units of the selected category.
        var inText = x[i].childNodes[0].childNodes[0].nodeValue;    //get each unit by looping.
        var newText = document.createTextNode(inText);              //create the text node each time.
        var newGraf = document.createElement("option");             //create the element, i.e.,option.
        newGraf.appendChild(newText);                               //appending the text node (the text itself).
        var docBody = document.getElementById("unit1");             
        docBody.appendChild(newGraf);                               //complete the unit1 dropdown menu.
    }
    document.getElementById('unit2').length = 0;                    //repreat the above procedures to populate the unit2 dropdown menu.
    for (i = 0; i < x.length; i++) {
        var inText = x[i].childNodes[0].childNodes[0].nodeValue;
        var newText = document.createTextNode(inText);
        var newGraf = document.createElement("option");
        newGraf.appendChild(newText);
        var docBody = document.getElementById("unit2");
        docBody.appendChild(newGraf);
    }
    return false;
}

//function unit1to2(x,f1,f2) {
//    unit1to2 = x * f1 / f2;
//    return false;
//}


