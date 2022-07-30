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
function trianglebh(b, h) {
    var dec = document.getElementById('decimalp').selectedIndex;
    var a = parseFloat(b) * parseFloat(h) / 2;     
    document.getElementById("areabh").innerHTML = a.toFixed(dec);
}

function triangleabc(a, b, c) {
    a = parseFloat(a);
    b = parseFloat(b);
    c = parseFloat(c);
    var A = (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c);    
    A = Math.acos(A);
    A = A * 180 / Math.PI;  
    var B = (Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c);    
    B = Math.acos(B);
    B = B * 180 / Math.PI;        
    var p = (a + b + c) / 2;
    var a = Math.pow((p * (p - a) * (p - b) * (p - c)), 0.5);
    var dec = document.getElementById('decimalp').selectedIndex;
    document.getElementById("abcArea").innerHTML = a.toFixed(dec);
    document.getElementById("abcA").innerHTML = A.toFixed(dec);
    document.getElementById("abcB").innerHTML = B.toFixed(dec);    
}

function triangleaCb(a, C, b) {
    try {
        var a = parseFloat(a);
        var b = parseFloat(b);
        var C = parseFloat(C) / 180 * Math.PI;
        var d = Math.sin(C);
        var A = (1 / 2) * a * b * d;
        var c = Math.pow((Math.pow(a, 2) + Math.pow(b, 2) - 2 * a * b * Math.cos(C)), 0.5);
        var Aa = Math.atan((a * Math.sin(C)) / (b - a * Math.cos(C))) * 180 / Math.PI;
        var dec = document.getElementById('decimalp').selectedIndex;
        document.getElementById("aCbAangle").innerHTML = A.toFixed(dec);    
        document.getElementById("aCbcside").innerHTML = c.toFixed(dec);
        document.getElementById("aCbAarea").innerHTML = Aa.toFixed(dec);    }
        catch (errMsg) {
        alert(errMsg.message);
    }     
}

function triangleCaB(C, a, B) {
    try{
    var C = parseFloat(C) / 180 * Math.PI;
    var a = parseFloat(a);
    var B = parseFloat(B) / 180 * Math.PI;
    var A = Math.PI - C - B;
    var c = a * Math.sin(C) / Math.sin(A);
    var b = a * Math.sin(B) / Math.sin(A);
    var p = (a + b + c) / 2;
    
    var Area = Math.pow((p * (p - a) * (p - b) * (p - c)), 0.5);

    var dec = document.getElementById('decimalp').selectedIndex;
   
    document.getElementById("CaBcside").innerHTML = c.toFixed(dec);
    document.getElementById("CaBbside").innerHTML = b.toFixed(dec);    
    document.getElementById("CaBArea").innerHTML = Area.toFixed(dec);
    }   
    catch (errMsg){
    alert(errMsg.message);
}
         
}

function circleRh(D,hD) {
    //Dim Adry As Double      ' Adry - Dry area in pipe
    //Dim T As Double         ' T - angle form center to surfaces near pipe wall
    //Dim AinT As Double      ' Area within angle T
    //Dim Wsurface As Double  ' Width of water surface
    //Dim PipeWetA As Double
    //Dim PipeWetL As Double
    //Dim PipeWetC As Double
    var dec = document.getElementById('decimalp').selectedIndex;
    D = parseFloat(D);
    hD = parseFloat(hD);
    if (hD <= 0.5) {
        var T = Math.acos((D/ 2 - D * hD) / D * 2);
    }
    else {
        T = Math.PI - Math.acos((D * hD - D / 2) / D * 2);
        //alert(T);        
    }
    var Wsurface = D * Math.sin (T);
    var Adry = (D/ 2 - D* hD) * Wsurface / 2;
    var AinT = T * Math.pow((D), 2) / 4;
    var PipeWetC = D* T;
    var PipeWetA = AinT - Adry;
    var Rh = PipeWetA / PipeWetC;
    //alert(Rh);
    document.getElementById("CircWA").innerHTML = PipeWetA.toFixed(dec);
    document.getElementById("CircWL").innerHTML = PipeWetC.toFixed(dec);
    document.getElementById("CircRh").innerHTML = Rh.toFixed(dec);        
}

function cylinder(D, L,W, Mat) {
    D = parseFloat(D)/12;
    L = parseFloat(L);
    W = parseFloat(W) / 12;
    
    var dec = document.getElementById('decimalp').selectedIndex;
    //alert(dec);  
    var Mat;
    var R=1;
    switch (Mat) {
        case "Steel": R = 1; break;
        case "ABS": R = 0.135; break;        
        case "Aluminum": R = 0.35; break;        
        case "Brass": R = 1.12; break;
        case "Cast iron": R = 0.91; break;
        case "Concrete": R=0.31; break;
        case "Copper": R = 1.14; break;
        case "Ductile iron": R = 0.90;break;
        case "Fiberglass": R = 0.255; break;
        case "PP": R = 0.115; break;
        case "PVC": R = 0.176; break;
        case "S. Steel": R = 0.95; break;        
        case "Wrought iron": R = 0.98; break;
        //default: R = 1;
    }
    var V = 1 / 4 * Math.PI * Math.pow(D, 2)*L*7.4805;                      //Convert ft3 to gallons
    var Vwall = 1 / 4 * Math.PI * Math.pow((D + 2*W), 2)  * L*7.4805-V;
    var Wwall = Vwall * 490 * R / 7.4805;                                   //495 lb/cubft for rolled steel
    var Wwater = V * 62.43/7.4805;                                          //62.43 lb/ft3 @40F
    var Ww = Wwall + Wwater;
    document.getElementById("CylVol").innerHTML = V.toFixed(dec); 
    document.getElementById("CylWwo").innerHTML = Wwall.toFixed(dec);
    document.getElementById("CylWw").innerHTML = Ww.toFixed(dec);
    document.getElementById("SpWt").innerHTML = (495*R).toFixed(0)+" lb/cft";            
 }

 function cylinderSI(D, L,W, Mat) {
    D = parseFloat(D)/1000;           //Convert mm to m
    L = parseFloat(L);
    W = parseFloat(W)/1000;           //Convert mm to m
    var dec = document.getElementById('decimalp').selectedIndex;
    //alert(dec);  
    var Mat;
    var R=1;
    switch (Mat) {
        case "Steel": R = 1; break;
        case "ABS": R = 0.135; break;        
        case "Aluminum": R = 0.35; break;        
        case "Brass": R = 1.12; break;
        case "Cast iron": R = 0.91; break;
        case "Concrete": R=0.31; break;
        case "Copper": R = 1.14; break;
        case "Ductile iron": R = 0.90;break;
        case "Fiberglass": R = 0.255; break;
        case "PP": R = 0.115; break;
        case "PVC": R = 0.176; break;
        case "S. Steel": R = 0.95; break;        
        case "Wrought iron": R = 0.98; break;
        //default: R = 1;
    }
    var V = 1 / 4 * Math.PI * Math.pow(D, 2)*L;                         //Volume in M^3
    var Vwall = 1 / 4 * Math.PI * Math.pow((D + 2*W), 2)  * L-V;        //in M^3
    var Wwall = Vwall * 7929 * R ;                                      //7929 Kg/M3 for rolled steel
    var Wwater = V * 1000;                                              //1000Kg/m3 @4C
    var Ww = Wwall + Wwater;
    document.getElementById("CylVol").innerHTML = V.toFixed(dec); 
    document.getElementById("CylWwo").innerHTML = Wwall.toFixed(dec);
    document.getElementById("CylWw").innerHTML = Ww.toFixed(dec);
    document.getElementById("SpWt").innerHTML = (7929 * R).toFixed(0) + " Kg/m3";            
 }

