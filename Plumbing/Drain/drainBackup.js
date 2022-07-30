// EngineerMate Functions by Anjian. Lu,2010.7.4
// All rights reserved.
// Drain sizing with DFU

window.onload = initAll;

var xhr = false;
var xst = false;
function initAll() {
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        xst = new XMLHttpRequest();        
    }
    else {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");           //create this object for drainsize.xml
                xst = new ActiveXObject("Microsoft.XMLHTTP");           //create this object for stacksize.xml       
            }
            catch (e) { }
        }
    }

    if (xhr) {
        xhr.onreadystatechange = ""; //populateMenu;                    //populate menu when window first have been loaded and when change happens
        xhr.open("GET", "xml/drainsize.xml", true);                     //open the xml file and goto populateMenu function
        xhr.send(null);
    }
    else {
        alert("Sorry, but I couldn't create an XMLHttpRequest");
    }
    
    if (xst) {
        xst.onreadystatechange = ""; //populateMenu;                    //populate menu when window first have been loaded and when change happens
        xst.open("GET", "xml/stacksize.xml", true);                     //open the xml file and goto populateMenu function
        xst.send(null);
    }
    else {
        alert("Sorry, but I couldn't create an XMLHttpRequest");
    }    
    
    
}
function populateMenu() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var x = xhr.responseXML.getElementsByTagName("bldgdrain");          //get the xml portion with tagname "slope"
            addNode(x);                                                     //pass this part to addNode function      
        }
        else {
            alert("There was a problem with the request " + xhr.status);
        }
    }
}
function addNode(xdoc) {                                    //note the xdoc.
    var n = xdoc.length;                                    //x.length is the number of slope values.
    document.getElementById('bldgds').length = 0;            //clear the existing menu, whether have or not, first.  
    for (i = 0; i < n; i++) {
        var inText = xdoc[i].getAttribute("Dn");            //get slope by looping.
        var newText = document.createTextNode(inText);      //create the text node each time.Pay attention to text node and element node
        var newGraf = document.createElement("option");     //create the element, i.e.,option.
        newGraf.appendChild(newText);                       //appending the text node (the text itself).
        var docBody = document.getElementById("bldgds");
        docBody.appendChild(newGraf);                       //complete the unit1 dropdown menu.
        //alert("I got stack d's");
    }
    return false;
}
function getBldgDrainSize(u) {
    document.getElementById("dd").innerHTML = "";           //clear content
    document.getElementById("DFUm").innerHTML = "";         //clear content    
    document.getElementById("margin").innerHTML = "";       //clear content
    var x = xhr.responseXML.getElementsByTagName("bldgdrain");
    var xo = document.getElementById("slopes");
    var n = xo.selectedIndex;                               //get selected index from the slopes dropdown menu
    var m = x.length;                                       //got number of drain pipe sizes of the whole file

    for (i = 0; i < m; i++) {
        var y = x[i].childNodes[n].childNodes[0].nodeValue;   //get DFU items under a particular size of waste stack.
        if (y == "na") {
            i++;
        } 
        if (y - u > -0.1) {                                //Warning!! CANNOT USE y>DFU
            //alert("y= " + y + "; DFU= " + DFU);
            var l = x[i].childNodes[n].childNodes.length;   //get number of DFU items                   
            for (j = 0; j < l; j++) {
                //var z = x[i].childNodes[n].childNodes[0].nodeValue;        //loop Dn
                var z1 = x[i].childNodes[n].childNodes[0].nodeValue;  //get the allowed DFU
                if (z1 - u > -0.1) {
                    var z2 = (z1 - u) / u * 100;
                    var z3 = x[i].getAttribute("Dn");                   
                    document.getElementById("dd").innerHTML = z3;                    
                    document.getElementById("DFUm").innerHTML = z1;
                    document.getElementById("margin").innerHTML = z2.toFixed(1) + " %";
                    if (z2 > 200) { 
                    document.getElementById("margin").innerHTML = "Slope may be too small!";
                    }
                    return false;
                }
            }
        }
    }
    return false;
}
function selectBldgDrainSize(u) {
    var x = xhr.responseXML.getElementsByTagName("DFU");
    var n = x.length;
    var m = document.getElementById("bldgds").length;
    for (i = 0; i < n; i++) {
        var y = x[i].getAttribute("value");
        var yn = x[i].nodeName;
        var yn1 = x[i].parentNode.getAttribute("Dn");
        if (y - u > -0.1) {
            for (j = 0; j < m; j++) {
                var z = document.getElementById("bldgds")[j].value;
                if (z == yn1) {
                    document.getElementById("bldgds").selectedIndex = j;
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

function getDrainSize(u){
    var hbd = [[1.5, 3], [2, 6], [2.5, 12], [3, 20], [4, 160], [5, 360], [6, 620], [8, 1400], [10, 2500], [12, 2900], [15, 7000]];        //total for horizontal branch connecting to stack
    document.getElementById("dhd").innerHTML = "";              //clearing output fields
    document.getElementById("DFUmh").innerHTML = "";
    document.getElementById("marginh").innerHTML = "";

    var n = hbd.length;
    for (var j = 1; j < n; j++) {

        if (hbd[j][1] > u-1) {
            var hd = hbd[j][0];
            document.getElementById("dhd").innerHTML = hd;
            document.getElementById("DFUmh").innerHTML = hbd[j][1];
            var r=(hbd[j][1] - u)/u*100;
            document.getElementById("marginh").innerHTML = r.toFixed(1) + " %";
            return false;      
         }  
    } 
}

function getStackSize(lv, fu) {
    var nd = 0;
    var n = 0;
    var dia=""
    document.getElementById("dsd").innerHTML = "";                  //clearing output fields
    //document.getElementById("DFUms").innerHTML = "";
    document.getElementById("marginh").innerHTML = "";
    var x = xst.responseXML.getElementsByTagName("stack");
    n = x.length;
    var x1 = document.getElementById('Nint');                       //this is the m2s object, i.e. the drop down menu of areas
    nd = x1.selectedIndex;     
    //var lvn =
    document.getElementById("margins").innerHTML = nd;
 
    for (var j = 0; j < n; j++) {
        var y = x[j].childNodes;
        var fum = y[nd].childNodes[0].nodeValue;
        if (fum*1.0 >= fu*1.0+1.0) {                                         //force to convert to numbers and compare
            dia = x[j].getAttribute("Dn")
            //z = xhr.responseXML.getElementsByTagName("slope")[m].childNodes[n].getAttribute("inch");
            document.getElementById("dsd").innerHTML = dia;           
            document.getElementById("DFUms").innerHTML = fum;
            document.getElementById("margins").innerHTML = (((fum/fu)-1)*100).toFixed(0);      
            return false; 
        }
    }
}
