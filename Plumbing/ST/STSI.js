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

//The following funcions are specific for Storm Drain
var ls = [['50', 40], ['65', 73], ['75', 120], ['100', 257], ['125', 467], ['150', 758], ['200', 1635]];
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
function stormflow(mmh, sqm) {
    var q = mmh / 3600 * sqm;                                       //unit: L/s 
    document.getElementById("flow").innerHTML = q.toFixed(2);   
    populateAreas();                                                //IMPORTANT!! call this function to refresh the Dn dropdown menu.
    return false;
}
function stormflowl(mmh, sqm) {
    var q =mmh/3600 * sqm;
    document.getElementById("flowl").innerHTML = q.toFixed(2);
    populateLeaders();
    return false;
}
function populateAreas() {
    var n = getIndex("slopes");                                     //get the selected index n in the slope dropdown menu and use it for                                                                                  //addAreas() function
    addAreas(n);                                                    //adding nodes, i.e., options, for the dropdown menus unit 1 & unit 2.
}
function addAreas(opN) {                                            //opN is the index of the selected slope (sd_hor.xml).
    var x = xhr.responseXML.getElementsByTagName("slope");
    //var y = x[opN].childNodes[3].getAttribute("inch");
    var y = x[opN].childNodes;
    var z = document.getElementById("mmhr").value;
    document.getElementById("m2s").length = 0;                      //clear the existing menu, whether have or not, first.
    for (i = 0; i < y.length; i++) {                                //x.length is the number of units of the selected category.
        var inText = (y[i].childNodes[0].nodeValue*5/(z/25.4)*0.09290304).toFixed(0);   //get each unit by looping, shift to right column and converted from sft to m2.
        var newText = document.createTextNode(inText);              //create the text node each time.
        var newGraf = document.createElement("option");             //create the element, i.e.,option.
        newGraf.appendChild(newText);                               //appending the text node (the text itself).
        var docBody = document.getElementById("m2s");
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
    var x = document.getElementById('slopes');                      //this is the lopes object in the html page
    var m = x.selectedIndex;                                        //this is the index number of selected slope dropdown menu
    var y = document.getElementById('m2s');                         //this is the m2s object, i.e. the drop down menu of areas
    var n = y.selectedIndex;                                        //this is the index number of selected areas dropdown menu
    var h = document.getElementById("mmhr").value;                  //this is the rain density entered
    var z = xhr.responseXML.getElementsByTagName("slope")[m].childNodes[n].getAttribute("inch");
    var b = xhr.responseXML.getElementsByTagName("slope")[m].childNodes[n].childNodes[0].nodeValue;
    document.getElementById("Dn").innerHTML = z*25;                 //convert the diameter in inches to mm
    var h = document.getElementById("mmhr").value;
    var a = document.getElementById("sqmh").value;
    var q = document.getElementById("flow").value;
    var ac = b / (h / 25.4) * 5 * 0.09290304;
    document.getElementById("marg").innerHTML =((ac/a-1)*100).toFixed(0);
    return n
}
function populateLeaders() {
    var h = document.getElementById("mmhrl").value;
    document.getElementById('leaders').length = 0;                      //clear the existing menu, whether have or not, first.
    for (var i = 0; i < ls.length; i++) {
        for (var j = 0; j < 2; j=j+2) {
            var inText = (ls[i][1] / (h / 25.4) * 5).toFixed(0);                     //get each unit by looping.           
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
    var h = document.getElementById("mmhrl").value;
    document.getElementById("Dnl").innerHTML = ls[n][0];
    var a1=document.getElementById("sqml").value;
    var a2=ls[n][1]/h*127;
    document.getElementById("margl").innerHTML = ((a2 /a1 - 1) * 100).toFixed(0)            
    return false;
}    