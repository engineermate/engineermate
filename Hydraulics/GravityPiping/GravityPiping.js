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

//Flow and velocity in gravity piping
function flow_Mann(n,Dia,hD,Slope) {
    var h,R,Rh,Tdeg,Lwet,Lsurface,Atot,Adry,Awet,V,q,qg;
    R = Dia / 2;
    h = hD * Dia;
    if (hD <= 0.5){
        Tdeg = Math.acos((Dia / 2 - Dia * hD) / Dia * 2);
        }
    else{
        Tdeg = 3.1416 - Math.acos((Dia * hD - Dia / 2) / Dia * 2)
    }
    Lwet = Dia / 12 * Tdeg;
    Lsurface = Dia / 12 * Math.sin(Tdeg);
    Atot = Tdeg * Math.pow((Dia / 12), 2) / 4;
    Adry = (Dia / 12 / 2 - Dia / 12 * hD) * Lsurface / 2;
    Awet = Atot - Adry;
    Rh = Awet / Lwet;
    V = 1.486 / n * Math.pow(Rh, 0.6667) * Math.pow( Slope, 0.5);
    q = V * Awet; //in cfs
    qg = V * Awet * 448.8311688312; //convert cfs to gpm    
    document.getElementById("Mann_cfs").innerHTML = q.toFixed(3);  
    document.getElementById("Mann_gpm").innerHTML = qg.toFixed(1);      
    document.getElementById("Mann_v_here").innerHTML = V.toFixed(2);      
    document.getElementById("Mann_Rh_here").innerHTML = Rh.toFixed(3);
}

function flow_MannSI(n, Dia, hD, Slope) {
    var h, R, Rh, Tdeg, Lwet, Lsurface, Atot, Adry, Awet, V, q, qg;
    Dia = Dia / 1000;
    R = Dia / 2;
    h = hD * Dia;
    if (hD <= 0.5) {
        Tdeg = Math.acos((Dia / 2 - Dia * hD) / Dia * 2);
    }
    else {
        Tdeg = Math.PI - Math.acos((Dia * hD - Dia / 2) / Dia * 2)
    }
    Lwet = Dia * Tdeg;
    Lsurface = Dia * Math.sin(Tdeg);
    Atot = Tdeg * Math.pow(Dia, 2) / 4;
    Adry = (Dia / 2 - Dia * hD) * Lsurface / 2;
    Awet = Atot - Adry;
    Rh = Awet / Lwet;
    V = 1 / n * Math.pow(Rh, 0.6667) * Math.pow(Slope, 0.5);
    q = V * Awet * 1000;        //in L/s
    qg = V * Awet * 86400;      //convert to m3/d   
    document.getElementById("Mann_L/s").innerHTML = q.toFixed(2);
    document.getElementById("Mann_m3/d").innerHTML = qg.toFixed(0);
    document.getElementById("Mann_v_here").innerHTML = V.toFixed(3);
    document.getElementById("Mann_Rh_here").innerHTML = Rh.toFixed(3);
}

//Pipe size based on flow in gravity piping flowing full
function dia_Mann(n, q, Slope) {
    var D,d, Q, V;
    n = parseFloat(n);
    q = parseFloat(q);
    Slope = parseFloat(Slope);
    Q = q / 448.8311688312; //convert gpm to cfs    
    D=1.335*Math.pow(n,3/8)*Math.pow(Q,3/8) *Math.pow(Slope,-3/16);
    V = 1.486 / n * Math.pow(D / 4, 2 / 3) * Math.pow(Slope, 1/2);
    d = D * 12;       
    document.getElementById("MannD_dia").innerHTML = d.toFixed(1);    
    document.getElementById("MannD_cfs").innerHTML = Q.toFixed(3);
    document.getElementById("MannD_v").innerHTML = V.toFixed(3);
}
// Pipe size based on flow in gravity piping flowing full - in SI system
function dia_MannSI(n, q, Slope) {
    var d, D, Q, V;
    Q=q/1000;                                                       //convert L/s to M3/s
    D=1.548*Math.pow(n,3/8)*Math.pow(Q,3/8) *Math.pow(Slope,-3/16);
    V =1 / n * Math.pow(D / 4, 2 / 3) * Math.pow(Slope, 1/2);
    d = D * 1000;  
                                                     //convert m to mm
    document.getElementById("MannD_dia").innerHTML = d.toFixed(0);  //cmd - cubic meter per day  
    document.getElementById("MannD_cmd").innerHTML = (q*86.4).toFixed(0);
    document.getElementById("MannD_v").innerHTML = V.toFixed(3);
}