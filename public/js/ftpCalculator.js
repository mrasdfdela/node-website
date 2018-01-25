/* global $ */ 

var defaultFTP = 200;
var ftpText = [
    { 
        name: "",
        text: "",
        maxHR: "" 
    },
    { 
        name: "Active Recovery",
        text: "Increase blood flow to muscles to flush out waste products and provide nutrients	",
        maxHR: 0.56
    },
    { 
        name: "Endurance",
        text: "Improves fat metabolism and ability to use oxygen, produce power and increases efficiency. Increases economy	",
        maxHR: 0.84
    },
    { 
        name: "Tempo",
        text: "Improves carbohydrate metabolism, gives fast twitch muscle slow-twitch muscle characteristics	",
        maxHR: 0.91
    },
    { 
        name: "Lactate Threshold",
        text: "Improves carbohydrate metabolism, develops lactate threshold, changes some fast twitch muscle to slow-twitch	",
        maxHR: 1.06
    },
    { 
        name: "VO2 Max",
        text: "Develops cardiovascular system and VO2max, improves anaerobic energy production and speeds turnover of waste products	",
        maxHR: 1.2
    },
    { 
        name: "Anaerobic Capacity",
        text: "Increases maximum muscle power, develops cardiovascular system and VO2max, increases threshold	",
        maxHR: 1.5
    },
    { 
        name: "Neuromuscular",
        text: "Very short, very high intensity efforts that generally place greater stress on musculoskeletal rather than metabolic systems. Power useful as guide, but only in reference to prior similar efforts, not TT pace.",
        maxHR: 1.5
    }
]

function ftpTrainingZones() {
    for (var i = 0; i < document.getElementsByClassName("zoneNames").length; i++) {
        document.getElementsByClassName("zoneNames")[i].innerHTML = ftpText[i+1].name;
    }
}

function ftpCalculator(x) {
    for (var i = 0; i < document.getElementsByClassName("zonesHR").length; i++) {
        var zoneMin = Math.round(ftpText[i].maxHR * x);
        var zoneMax = Math.round(ftpText[i+1].maxHR * x);
        if (x < 100) {
            //do nothing
        } else if (zoneMin != zoneMax) {
            document.getElementsByClassName("zonesHR")[i].innerHTML = zoneMin + " - " + zoneMax;
        } else {
            document.getElementsByClassName("zonesHR")[i].innerHTML = "> " + zoneMax;
        }
    }
}

for (var i = 0; i < document.getElementsByTagName("tr").length; i++) {
    document.querySelectorAll("tr")[i].setAttribute("title", ftpText[i]['text']);
}

document.getElementById("formValueId").onkeyup = function() {
    var value =  document.getElementById('formValueId').value;
    ftpCalculator(value);
};
ftpCalculator(defaultFTP, ftpTrainingZones());