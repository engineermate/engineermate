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
function flow(v, d) {

    q = v * Math.PI * Math.pow((d / 12), 2) / 4 * 7.48051948052 * 60;
    document.getElementById("here").innerHTML = q.toFixed(1);   
}

function V(q, d) {
     v=q / 7.48051948052/ 60/Math.PI/ Math.pow((d / 12), 2) * 4 ;
     document.getElementById("v_here").innerHTML = v.toFixed(3);
}

function STsf(SF, Slope) {
    //q = v * Math.PI * Math.pow((d / 12), 2) / 4 * 7.48051948052 * 60;
    document.getElementById("here").innerHTML = "to be completed";
}

//Friction loss, ft/ft
function frictionloss(c,d,q) {
    var v,h;
    v = q * 3.785411784 / 1000 / Math.pow(.3048, 3) / 60 / (Math.pow((d / 12),2) * Math.PI  / 4)
    h = Math .pow((v / (1.318 * c * Math .pow((d / 12 / 4), 0.63))),1.85);    
    document.getElementById("fric_here").innerHTML = h.toFixed(4);
}

function flow_Mann(n,Dia,hD,Slope) {
    var h,R,Rh,Tdeg,Lwet,Lsurface,Atot,Adry,Awet,V,q,qg;
    R = Dia / 2;
    h = hD * Dia;
    if (hD <= 0.5){
        Tdeg = Math.acos((Dia / 2 - Dia * hD) / Dia * 2);
        }
    else{
        Tdeg = Math.PI - Math.acos((Dia * hD - Dia / 2) / Dia * 2)
    }
    Lwet = Dia / 12 * Tdeg;
    Lsurface = Dia / 12 * Math.sin(Tdeg);
    Atot = Tdeg * Math.pow((Dia / 12), 2) / 4;
    Adry = (Dia / 12 / 2 - Dia / 12 * hD) * Lsurface / 2;
    Awet = Atot - Adry;
    Rh = Awet / Lwet;
    V = 1.486 / n * Math.pow(Rh, 2/3) * Math.pow( Slope, 0.5);
    q = V * Awet; //in cfs
    qg = V * Awet * 448.8311688312; //convert cfs to gpm    
    document.getElementById("Mann_cfs").innerHTML = q.toFixed(3);  
    document.getElementById("Mann_gpm").innerHTML = qg.toFixed(1);      
    document.getElementById("Mann_v_here").innerHTML = V.toFixed(2);      
    document.getElementById("Mann_Rh_here").innerHTML = Rh.toFixed(3);        
}
function qtest(Ps,Pr,Qt,Qr) {
    var K;
    K = Qt / Math.pow((Ps - Pr), 0.540541);  
    Pa = Ps - Math.pow((Qr / K), 1.85);
    document.getElementById("Pava").innerHTML = Pa.toFixed(2); 
    return;
}

