// EngineerMate Functions by Anjian. Lu,2010.7.4
// All rights reserved.
window.onload = initAll;

var xhr = false;

function initAll() {
// initiating drop down menu
    var allLinks = document.getElementsByTagName("a");

    for (var i = 0; i < allLinks.length; i++) {
        if (allLinks[i].className.indexOf("menuLink") > -1) {
            allLinks[i].onmouseover = toggleMenu;
            allLinks[i].onclick = clickHandler;
        }
    }

// loading xml file
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) { }
        }
    }
    if (xhr) {
        xhr.onreadystatechange = populateMenu;                              //when change happens
        xhr.open("GET", "xml/sd_hor.xml", true);                         //open the xml file and goto populateMenu function
        xhr.send(null);
    }
    else {
        alert("Sorry, but I couldn't create an XMLHttpRequest");
    }
}
// functions for menus
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

//The following funcions are specific for CW-HW
var ls = [['2"', 435], ['2-1/2"', 790], ['3"', 1288], ['4"', 2768], ['5"', 5024], ['6"', 8160], ['8"', 17600]];
function populateMenu() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var x = xhr.responseXML.getElementsByTagName("slope");          //get the xml portion with tagname "slope"
            addNode(x);                                                     //pass this part to addNode function      
        }
        else {
            alert("There was a problem with the request " + xhr.status);
        }
    }
}
function addNode(xdoc) {                                    //note the xdoc.
    var n = xdoc.length;                                    //x.length is the number of slope values.
    document.getElementById('slopes').length = 0;           //clear the existing menu, whether have or not, first.  
    for (i = 0; i < n; i++) {
        var inText = xdoc[i].getAttribute("sp");            //get slope by looping.
        var newText = document.createTextNode(inText);      //create the text node each time.Pay attention to text node and element node
        var newGraf = document.createElement("option");     //create the element, i.e.,option.
        newGraf.appendChild(newText);                       //appending the text node (the text itself).
        var docBody = document.getElementById("slopes");
        docBody.appendChild(newGraf);                       //complete the unit1 dropdown menu.
    }
    return false;
}
function stormflow(ih,sf) {
    var q = 0.01038961039 * ih * sf;
    document.getElementById("flow").innerHTML = q.toFixed(0);
    populateAreas();                                        //IMPORTANT!! call this function to refresh the Dn dropdown menu.
    return false;
}
function stormflowl(ih, sf) {
    var q = 0.01038961039 * ih * sf;
    document.getElementById("flowl").innerHTML = q.toFixed(0);
    populateLeaders();
    return false;
}
function populateAreas() {
    var n = getIndex("slopes");
    addAreas(n);                                                    //adding nodes, i.e., options, for the dropdown menus unit 1 & unit 2.
}
function addAreas(opN) {                                            //opN is the index of the selected unit category in the xml file (units.xml).
    var x = xhr.responseXML.getElementsByTagName("slope");
    //var y = x[opN].childNodes[3].getAttribute("inch");
    var y = x[opN].childNodes;
    var z = document.getElementById("inhr").value;
    document.getElementById('sfs').length = 0;                      //clear the existing menu, whether have or not, first.
    for (i = 0; i < y.length; i++) {                                //x.length is the number of units of the selected category.
        var inText = (y[i].childNodes[0].nodeValue*5/z).toFixed(0); //get each unit by looping.
        var newText = document.createTextNode(inText);              //create the text node each time.
        var newGraf = document.createElement("option");             //create the element, i.e.,option.
        newGraf.appendChild(newText);                               //appending the text node (the text itself).
        var docBody = document.getElementById("sfs");
        docBody.appendChild(newGraf);                               //complete the unit1 dropdown menu.
    }
    document.getElementById("Dn").innerHTML = "";                   //clear pipe size
    return false;
}
function getIndex(txt) {
    var x = document.getElementById(txt);
    n = x.selectedIndex;  
    return n
}
function getDn() {
    var x = document.getElementById('slopes');
    var m = x.selectedIndex;    
    var y = document.getElementById('sfs');
    var n = y.selectedIndex;
    var h = document.getElementById("inhr").value;
    var z = xhr.responseXML.getElementsByTagName("slope")[m].childNodes[n].getAttribute("inch");
    var b = xhr.responseXML.getElementsByTagName("slope")[m].childNodes[n].childNodes[0].nodeValue;
    document.getElementById("Dn").innerHTML = z;
    var h = document.getElementById("inhr").value;
    var a = document.getElementById("sqft").value;
    document.getElementById("marg").innerHTML = ((b / (a*h/5) - 1)*100).toFixed(0);
    return n
}
function populateLeaders() {
    var h = document.getElementById("inhrl").value;
    document.getElementById('leaders').length = 0;                      //clear the existing menu, whether have or not, first.
    for (var i = 0; i < ls.length; i++) {
        for (var j = 0; j < 2; j=j+2) {
            var inText = (ls[i][1]/h*5).toFixed(0);                     //get each unit by looping.
            var newText = document.createTextNode(inText);              //create the text node each time.
            var newGraf = document.createElement("option");             //create the element, i.e.,option.
            newGraf.appendChild(newText);                               //appending the text node (the text itself).
            var docBody = document.getElementById("leaders");
            docBody.appendChild(newGraf);                               //complete the unit1 dropdown menu.
        }
    }
}
function getLeaderDn() {
    var n = getIndex("leaders");
    var h = document.getElementById("inhrl").value;
    document.getElementById("Dnl").innerHTML = ls[n][0];
    var a1=document.getElementById("sqftl").value;
    var a2=ls[n][1]/h*5;
    document.getElementById("margl").innerHTML = ((a2 /a1 - 1) * 100).toFixed(0);
    return false;
}    