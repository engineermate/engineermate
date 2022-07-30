
// Flow measurement - in USC system
function Orifice(C, d, P) {
    var Psi;
    C = parseFloat(C);
    d = parseFloat(d);
    P = parseFloat(P); 
    Ppsi=P/27.6799;       
    Q=29.84*C*Math.pow(d,2)*Math.pow(Ppsi,0.5); 

    document.getElementById("orifpsi").innerHTML = Ppsi.toFixed(2);  //cmd - cubic meter per day  
    document.getElementById("orifQ").innerHTML = Q.toFixed(2);
    //document.getElementById("MannD_v").innerHTML = V.toFixed(3);
}
function OrificeSI(C, d, P) {
    var Psi;
    C = parseFloat(C);
    d = parseFloat(d);
    P = parseFloat(P);
    Pkpa = P / 101.9716;
    Q = 4 * C * Math.pow(d, 2) * Math.pow(Pkpa, 0.5);

    document.getElementById("orifkPa").innerHTML = Pkpa.toFixed(2);  //cmd - cubic meter per day  
    document.getElementById("orifQsi").innerHTML = Q.toFixed(0);
    //document.getElementById("MannD_v").innerHTML = V.toFixed(3);
}