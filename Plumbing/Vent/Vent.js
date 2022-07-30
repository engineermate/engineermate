// EngineerMate Functions by Anjian. Lu,2010.7.4
// All rights reserved.

window.onload = initAll;
// For menus
var xhr = false;

function initAll() {

    var allLinks = document.getElementsByTagName("a");

    for (var i = 0; i < allLinks.length; i++) {
        if (allLinks[i].className.indexOf("menuLink") > -1) {
            allLinks[i].onmouseover = toggleMenu;
            allLinks[i].onclick = clickHandler;
        }
    }
// loading xml files
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
        xhr.onreadystatechange = populateMenu;                              //populate menu when window first have been loaded and when change happens
        xhr.open("GET", "xml/ventsize.xml", true);                       //open the xml file and goto populateMenu function
        xhr.send(null);
    }
    else {
        alert("Sorry, but I couldn't create an XMLHttpRequest");
    }
}
// The following functions are for menus
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

//The following funcions are specific for Vent

function populateMenu() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var x = xhr.responseXML.getElementsByTagName("stack");          //get the xml portion with tagname "stack"
            addNode(x);                                                     //pass this part to addNode function      
        }
        else {
            alert("There was a problem with the request " + xhr.status);
        }
    }
}
function addNode(xdoc) {                                    //note the xdoc.
    var n = xdoc.length;                                    //x.length is the number of slope values.
    document.getElementById('stkds').length = 0;            //clear the existing menu, whether have or not, first.  stkds is the waste stack
    for (i = 0; i < n; i++) {
        var inText = xdoc[i].getAttribute("Dn");            //get Dn by looping.
        var newText = document.createTextNode(inText);      //create the text node each time.Pay attention to text node and element node
        var newGraf = document.createElement("option");     //create the element, i.e.,option.
        newGraf.appendChild(newText);                       //appending the text node (the text itself).
        var docBody = document.getElementById("stkds");
        docBody.appendChild(newGraf);                       //complete the Waste Stack dropdown menu.
        //alert("stack d's");

    }
    return false;
}

function getVentSize(DFU, TDL) {
    document.getElementById("vd").innerHTML = "";
    document.getElementById("DFUm").innerHTML = "";    
    document.getElementById("TDLm").innerHTML = "";
    var x = xhr.responseXML.getElementsByTagName("stack"); 
    var xo = document.getElementById("stkds");
    var n = xo.selectedIndex;
    var m = x[n].childNodes.length;                         //got number of DFU's of the selected stack size  

    for (i = 0; i < m; i++) {
        var y = x[n].childNodes[i].getAttribute("value");   //get DFU items under a particular size of waste stack.
        if (y - DFU > -0.1) {                                //Warning!! CANNOT USE y>DFU
            //alert("y= " + y + "; DFU= " + DFU);
            var l = x[n].childNodes[i].childNodes.length;   //get number of DFU items
            for (j = 0; j < l; j++) {
                var z = x[n].childNodes[i].childNodes[j].getAttribute("Dn");        //loop Dn
                var z1 = x[n].childNodes[i].childNodes[j].childNodes[0].nodeValue;  //get the allowed TDL
                //alert("TDLm= " + z1 + "; TDL= " + TDL);
                if (z1 - TDL > -0.1) {                                               //Warning!! CANNOT USE z1>TDL
                    var z2 = x[n].childNodes[i].childNodes[j].getAttribute("Dn");
                    document.getElementById("vd").innerHTML = z2;
                    var z3 = x[n].childNodes[i].childNodes[j].parentNode.getAttribute("value");
                    var z4 = x[n].childNodes[i].childNodes[j].childNodes[0].nodeValue;  //let's get the allowed TDL
                    document.getElementById("DFUm").innerHTML = z3;
                    document.getElementById("TDLm").innerHTML = z4;                    
                    return false;
                }
            }
        }
    }
}
function selectStackSize(u) {
    var x = xhr.responseXML.getElementsByTagName("DFU");
    var n = x.length;
    var m = document.getElementById("stkds").length;
    for (i = 0; i < n; i++) {
        var y = x[i].getAttribute("value");
        var yn = x[i].nodeName;        
        var yn1 = x[i].parentNode.getAttribute("Dn");
        if (y - u > -0.1) {
            for (j = 0; j < m; j++) {
                var z=document.getElementById("stkds")[j].value;
                if (z ==yn1) {
                    document.getElementById("stkds").selectedIndex = j;
            return false;                       
                }
            }

        }
    }
    
}

var xsp;                                                        //for holding sump vent xml
function loadXMLDoc(dname) {                                    //loading the sump vent xml file
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", dname, false);
    xhttp.send();
    xsp = xhttp.responseXML;
    return xhttp.responseXML;
}
function getSumpVentSize(q, ln) {                               //
    document.getElementById("vsd").innerHTML = "";              //clearing output fields
    document.getElementById("Qmsp").innerHTML = "";
    document.getElementById("TDLmsp").innerHTML = "";
    
    var x = xsp.getElementsByTagName("vsize");                  //get all vent sizes
    var n = x.length;                                           //number of sizes
    for (i = 0; i < n; i++) {
        var m = x[i].childNodes.length;                         //looping each size
        for (j = 0; j < m; j++) {
            var y = x[i].childNodes[j].getAttribute("value");   //get max flow of the size selected
            var z = x[i].childNodes[j].childNodes[0].nodeValue; //get max TDL of the size selected
            if (y-q>-0.1 & z-ln>-0.1) {                         //comparing flow and TDL
                var vd = x[i].getAttribute("dn");               //if conditions are met, write the results
                document.getElementById("vsd").innerHTML = vd;
                document.getElementById("Qmsp").innerHTML = y; 
                document.getElementById("TDLmsp").innerHTML = z;                
                return false;
            }                     
        }
    }
}