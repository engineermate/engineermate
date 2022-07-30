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

var fut = [[1, 3], [2, 5], [3, 6.5], [4, 8], [5, 9.4], [6, 10.7], [7, 11.8], [8, 12.8], [9, 13.7], [10, 14.6], [11, 15.4], [12, 16], [13, 16.5], [14, 17], [15, 17.5], [16, 18], [17, 18.4], [18, 18.8], [19, 19.2], [20, 19.6], [25, 21.5], [30, 23.3], [35, 24.9], [40, 26.3], [45, 27.7], [50, 29.1], [60, 32], [70, 35], [80, 38], [90, 41], [100, 43.5], [120, 48], [140, 52.5], [160, 57], [180, 61], [200, 65], [225, 70], [250, 75], [275, 80], [300, 85], [400, 105], [500, 125], [750, 170], [1000, 210], [1250, 240], [1500, 270], [1750, 300], [2000, 325], [2500, 380], [3000, 435], [4000, 525], [5000, 600], [6000, 650], [7000, 700], [8000, 730], [9000, 760], [10000, 790]];
var fuv = [[1, "na, "], [2,"na, "], [3,"na, "], [4,"na, "], [5, 15], [6, 17.4], [7, 19.8], [8, 22.2], [9, 24.6], [10, 27], [15, 31], [20, 35], [25, 38], [30, 41], [40, 47], [50, 51], [60, 55], [80, 62], [100, 68], [120, 74], [140, 78], [160, 83], [180, 87], [200, 91], [225, 95], [250, 100], [275, 105], [300, 110], [400, 125], [500, 140], [750, 175], [1000, 218], [1250, 240], [1500, 270], [1750, 300], [2000, 325], [2500, 380], [3000, 435], [4000, 525], [5000, 600], [6000, 650], [7000, 700], [8000, 730], [9000, 760], [10000, 790]];

function convertFUtoQ(u) { 
    var m = fut.length;
    for (i = 1;i<m;i++){
        if (u == 10000){
            document.getElementById("Qt").innerHTML = 790;
            convertFUvtoQ(u)
        }
        if (fut[i][0] > u & fut[i-1][0] <= u) {
            var qt = fut[i - 1][1] + (fut[i][1] - fut[i - 1][1]) * (u - fut[i - 1][0]) / (fut[i][0] - fut[i - 1][0]);
            document.getElementById("Qt").innerHTML = (qt * 0.06309).toFixed(2);
            convertFUvtoQ(u)
            return false;
        }
    }
}
function convertFUvtoQ(u) { 
    var n = fuv.length;
    for (var j = 1; j < n; j++) {
        if (u == 10000) {
            document.getElementById("Qv").innerHTML = 790;
        }

        if (fuv[j][0] > u & fuv[j - 1][0] <= u) {
            var qv = fuv[j - 1][1] + (fuv[j][1] - fuv[j - 1][1]) * (u - fuv[j - 1][0]) / (fuv[j][0] - fuv[j - 1][0]);
            if (u < 5) {
                document.getElementById("Qv").innerHTML = "na";
            }
            else { 
                document.getElementById("Qv").innerHTML = (qv*0.06309).toFixed(2);
            } 
            return false;
        }
    }     
}
function hwpercent(tm, tc, th) {
    var PhwMult = (tm - tc) / (th - tc) * 100;
    if (tm > th){
        PhwMult ="Error!";
        document.getElementById("pm").innerHTML = "Error!";
        return false;
    }
    document.getElementById("ph").innerHTML = PhwMult.toFixed(1);
    document.getElementById("pc").innerHTML = (100-PhwMult).toFixed(1);
    document.getElementById("pm").innerHTML = "100.0";        
    return false;
}
function power(q, tc, th,e){
    e=e/100;
    var mbh = 500.72 * q * 0.2642 / 60 * (th - tc)*1.8 /e/ 1000;
    var kw = 500.72 * q * 0.2642 / 60 * (th - tc) * 1.8 / e / 3412;
    var lb = 500.72 * q * 0.2642 * 0.4536 / 60 * (th - tc) * 1.8 / e / 960;
    document.getElementById("mbh").innerHTML = mbh.toFixed(1);
    document.getElementById("kw").innerHTML = kw.toFixed(1);
    document.getElementById("Kgh").innerHTML =lb.toFixed(1);
    return false;
}

function powerSI(q, tc, th,e){
    e=e/100;
    var kw = q/60 * (th - tc)* 4.186 / e;
    var kg = q/60 * (th - tc) * 4.186 /(2233/3600)/ e;
    var mbh = kw/0.2931;  
      
    document.getElementById("mbh").innerHTML = mbh.toFixed(1);
    document.getElementById("kw").innerHTML = kw.toFixed(3);
    document.getElementById("Kgh").innerHTML =kg.toFixed(1);
    
    return false;
}