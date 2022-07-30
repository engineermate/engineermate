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

//Specific functions for this calc
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
function getIndex(txt) {
    var x = document.getElementById(txt);
    n = x.selectedIndex;
    return n
}
function getSelectedName() {
    var x = document.getElementById(txt);
    var n = x.selectedIndex;
    return x.options[n].text;
}
function populateMenu() {
    var n = getIndex("pipes");
    addNode(n);                                             //adding nodes, i.e., options, for the dropdown menus pipes.
    showData();
}
function addNode(opN) {                                     //opN is the index of the selected unit category in the xml file (pipedata.xml).
   var x = x1[opN].childNodes;
   document.getElementById('Dns').length = 0;               //clear the existing menu, whether have or not, first.  
    for (i = 0; i < x.length; i++) {                        //x.length is the number of pipes of the selected category.
        var inText = x[i].getAttribute("desp");             //get each pipe by looping.
        var newText = document.createTextNode(inText);      //create the text node each time.
        var newGraf = document.createElement("option");     //create the element, i.e.,option.
        newGraf.appendChild(newText);                       //appending the text node (the text itself).
        var docBody = document.getElementById("Dns");             
        docBody.appendChild(newGraf);                       //complete the unit1 dropdown menu.
    }
    return false;
}
function showData() {
    var n = 0, m = 0;
    n = getIndex("pipes");
    m = getIndex("Dns"); 
    var Di = x1[n].childNodes[m].childNodes[0].childNodes[0].nodeValue;
    var E = x1[n].childNodes[m].childNodes[1].childNodes[0].nodeValue; 
    var F = x1[n].childNodes[m].childNodes[2].childNodes[0].nodeValue;
    var T = x1[n].childNodes[m].childNodes[3].childNodes[0].nodeValue;     
    var R = x1[n].childNodes[m].childNodes[4].childNodes[0].nodeValue;
    var C = x1[n].childNodes[m].childNodes[5].childNodes[0].nodeValue;     
    var A = x1[n].childNodes[m].childNodes[6].childNodes[0].nodeValue;
    var bv = x1[n].childNodes[m].childNodes[7].childNodes[0].nodeValue;    
    var G = x1[n].childNodes[m].childNodes[8].childNodes[0].nodeValue;

    document.getElementById("Di").innerHTML = (Di*25.4).toFixed(0);
    document.getElementById("E").innerHTML = (E*0.3048).toFixed(1);   
    document.getElementById("F").innerHTML = (F*0.3048).toFixed(1);    
    document.getElementById("T").innerHTML = (T*0.3048).toFixed(1);    
    document.getElementById("R").innerHTML = (R*0.3048).toFixed(1);    
    document.getElementById("C").innerHTML = (C*0.3048).toFixed(1);    
    document.getElementById("A").innerHTML = (A*0.3048).toFixed(1);    
    document.getElementById("B").innerHTML = (bv*0.3048).toFixed(1);    
    document.getElementById("G").innerHTML = (G*0.3048).toFixed(1);     

}


