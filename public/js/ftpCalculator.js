/* global $ */ 

var defaultFTP = 200;
var ftpTitles = ["","Power Zone","Power Limits <br> (Watts)"];
var ftpText = [
    // { 
    //     name: "",
    //     title: "",
    //     maxHR: ""
    // },
    { 
        name: "Active Recovery",
        title: "Increase blood flow to muscles to flush out waste products and provide nutrients",
        maxHR: 0.56
    },
    { 
        name: "Endurance",
        title: "Improves fat metabolism and ability to use oxygen, produce power and increases efficiency. Increases economy",
        maxHR: 0.84
    },
    { 
        name: "Tempo",
        title: "Improves carbohydrate metabolism, gives fast twitch muscle slow-twitch muscle characteristics",
        maxHR: 0.91
    },
    { 
        name: "Lactate Threshold",
        title: "Improves carbohydrate metabolism, develops lactate threshold, changes some fast twitch muscle to slow-twitch",
        maxHR: 1.06
    },
    { 
        name: "VO2 Max",
        title: "Develops cardiovascular system and VO2max, improves anaerobic energy production and speeds turnover of waste products",
        maxHR: 1.2
    },
    { 
        name: "Anaerobic Capacity",
        title: "Increases maximum muscle power, develops cardiovascular system and VO2max, increases threshold",
        maxHR: 1.5
    },
    { 
        name: "Neuromuscular",
        title: "Very short, very high intensity efforts that generally place greater stress on musculoskeletal rather than metabolic systems. Power useful as guide, but only in reference to prior similar efforts, not TT pace.",
        maxHR: 1.5
    }
]

function ftpColumnTitles() { //adds column titles to FTP table
    for (var i = 0; i < document.querySelectorAll(".zoneTitles th").length; i++) { //Populates the FTP table title row
        document.querySelectorAll(".zoneTitles th")[i].innerHTML = ftpTitles[i];
    }
}

function ftpTrainingZones() { //adds names of power zones to table
    for (var i = 0; i < document.querySelectorAll(".zoneText").length; i++) {
        document.querySelectorAll(".zoneText")[i].innerHTML = ftpText[i].name;
    }
}

function ftpTrainingZoneTooltip() { //adds tooltip text of power zones to table
    // console.log(document.querySelectorAll(".ftpZones tr").length);
    for (var i = 0; i < document.getElementsByClassName("ftpZoneRow").length; i++) {
        document.getElementsByClassName("ftpZoneRow")[i].title = ftpText[i].title;
    }
}

function ftpCalculator(x) { //calculates & populates power zones to table based on FTP input
    var zoneMax = 0;
    for (var i = 0; i < document.getElementsByClassName("zonesHR").length; i++) {
        var zoneMin = zoneMax;
        var zoneMax = Math.round(ftpText[i].maxHR * x);
        if (x < 100 || x > 999 || isNaN(zoneMax) ) { 
            document.getElementsByClassName("zonesHR")[i].innerHTML = "";
        } else if (i + 1 < document.getElementsByClassName("zonesHR").length) { //populate upper and lower limits of power zones
            document.getElementsByClassName("zonesHR")[i].innerHTML = zoneMin + " - " + zoneMax;
        } else { //populate lower limit of final (neuromuscular) power zone
            document.getElementsByClassName("zonesHR")[i].innerHTML = "> " + zoneMax;
        }
    }
}

ftpCalculator(defaultFTP, //initialize program; populate training zones, limits and tooltips
    ftpColumnTitles(), 
    ftpTrainingZones(), 
    ftpTrainingZoneTooltip()
);

document.getElementById("formValueId").onkeyup = function() { //recalculates power zones when user enters FTP
    var value =  document.getElementById('formValueId').value;
    ftpCalculator(value);
}