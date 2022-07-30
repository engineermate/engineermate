// EngineerMate Functions by Anjian. Lu,2010.7.4
// All rights reserved.

// Specific functions for this window

function cylinder(D, L,W, Mat, dec) {
    D = parseFloat(D)/12;
    L = parseFloat(L);
    W = parseFloat(W) / 12;
    var sel = document.getElementById("decimalp");

    dec=sel.options[sel.selectedIndex].value;
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
    var V = 1 / 4 * Math.PI * Math.pow(D, 2)*L*7.4805;      //Convert ft3 to gallons
    var Vwall = 1 / 4 * Math.PI * (Math.pow(D + 2*W, 2) - Math.pow(D , 2)) * L*7.4805;
    var Wwall = Vwall * 490 * R / 7.4805;                               //495 lb/cuft for rolled steel
    var Wwater = V * 62.43/7.4805;                                      //62.43 lb/ft3 @40F
    var Ww = Wwall + Wwater;
    document.getElementById("CylVol").innerHTML = V.toFixed(dec); 

    document.getElementById("CylWwo").innerHTML = Wwall.toFixed(dec);     
    document.getElementById("CylWw").innerHTML = Ww.toFixed(dec);        
 }
 function Qriser1in(Nr){
     var q = 1.893 * Nr;
     document.getElementById("Qriser1").innerHTML = q.toFixed(2);          
 }
 function Qriser1_5in(Nr) {
     var q = 3.785 * Nr;
     document.getElementById("Qriser1_5").innerHTML = q.toFixed(2);
 }
 function Qriser2in(Nr) {
     var q = 7.57 * Nr;
     document.getElementById("Qriser2").innerHTML = q.toFixed(2);
 }
 function Qfu(fu) {
     fu = fu / 20;
     var q = 3.785 * fu;
     document.getElementById("Qfu").innerHTML = q.toFixed(2);
 }
