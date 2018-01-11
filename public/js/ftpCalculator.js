var defaultFTP = 200;
console.log("Initializing JavaScript...");

function ftpCalculator(x) {
    // var x = document.forms["ftpInput"];
    // document.getElementById('ftp').innerHTML = x;
    
    var z2 = x * 0.56;
    var z3 = x * 0.84;
    var z4 = x * 0.91;
    var z5 = x * 1.06;
    var z6 = x * 1.20;
    var z7 = x * 1.50;
    
    document.getElementById('recovery').innerHTML = "< " + Math.round(z2);
    document.getElementById('endurance').innerHTML = Math.round(z2) + " - " + Math.round(z3);
    document.getElementById('tempo').innerHTML = Math.round(z3) + " - " + Math.round(z4);
    document.getElementById('lactateThreshold').innerHTML = Math.round(z4) + " - " + Math.round(z5);
    document.getElementById('vo2max').innerHTML = Math.round(z5) + " - " + Math.round(z6);
    document.getElementById('anaerobicCapacity').innerHTML = Math.round(z6) + " - " + Math.round(z7);
    document.getElementById('neuromuscular').innerHTML = "> " + Math.round(z7);
}

ftpCalculator(defaultFTP);

// var button = document.getElementById("theButton");
// button.onclick = function() {
//     var value =  document.getElementById('formValueId').value;
//     console.log("The value is:" + value);
//     ftpCalculator(value);
// }

document.getElementById("formValueId").onkeyup = function() {
    var value =  document.getElementById('formValueId').value;
    console.log("The value is:" + value);
    ftpCalculator(value);
};