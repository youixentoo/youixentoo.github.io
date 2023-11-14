
/*
 TODO:
 Output visualisation
 Add hp calculation; https://discord.com/channels/760402578147115038/981692196099063838/1070506298141052958
 Share code: a-z for armour, version, augs.
 helm, aug1, aug2, aug3, version, vest, aug1, etc.
 Gear: A-Z
 Augs: 0-= + Level: 0-<
 Version: 0-3
 Cores: 0-:
 Mastery: 0-5
 Collections: A or B (*3)
 BAE: 0-I
 
 ### Rework above entirely ###
 Make code usable in weapon calc for easy import. 
 */

const letterNumber = s => s.split('').map(s => s.charCodeAt() - 48);
const armourVers = ["Normal", "Red", "Black", "Other"];

function compressCode(code){
    return code;
}

function decompressCode(code){
    return code;
}

function getCode() {
    // bs here
    var unCode = "C112233161ABAD223344172BABE132435183ABAF243546194BABG1526371:5ABA?";
    $('input[name="codeGen"]').val(compressCode(unCode));
}

function useCode() {
    var deCode = decompressCode($('input[name="codeGen"]').val());
    if (deCode.length !== 66) { // Code should always be 66 characters long
        return;
    }
    var convertedCode = letterNumber(deCode);
    //console.log(convertedCode);
    // B112233112BBAB112233112BBAB112233112BBAB112233112BBAB112233112BBA<

    // Helm
    var helmVer = armourVers[convertedCode[7]];
    setHelmets(helmVer, convertedCode[0], false);
    $("#versionHelm").val(helmVer);
    var helmAugs = $("#helmAug1 option").toArray().map(o => o.value);
    $("#helmAug1").val(helmAugs[convertedCode[1]]).change();
    $("#helmAug2").val(helmAugs[convertedCode[3]]).change();
    $("#helmAug3").val(helmAugs[convertedCode[5]]).change(); //-49
    $("#helmAugLv1").val(convertedCode[2]);
    $("#helmAugLv2").val(convertedCode[4]);
    $("#helmAugLv3").val(convertedCode[6]);
    $("#helmCore").val(convertedCode[8]);
    $("#helmMast").val(convertedCode[9]);

    // Vest
    var vestVer = armourVers[convertedCode[20]];
    console.log(vestVer, convertedCode[13]);
    setVests(vestVer, convertedCode[13], false);
    $("#versionVest").val(vestVer);
    var vestAugs = $("#vestAug1 option").toArray().map(o => o.value);
    $("#vestAug1").val(vestAugs[convertedCode[14]]).change();
    $("#vestAug2").val(vestAugs[convertedCode[16]]).change();
    $("#vestAug3").val(vestAugs[convertedCode[18]]).change();
    $("#vestAugLv1").val(convertedCode[15]);
    $("#vestAugLv2").val(convertedCode[17]);
    $("#vestAugLv3").val(convertedCode[19]);
    $("#vestCore").val(convertedCode[21]);
    $("#vestMast").val(convertedCode[22]);

    // Gloves
    var glovesVer = armourVers[convertedCode[33]];
    setGloves(glovesVer, convertedCode[26], false);
    $("#versionGloves").val(glovesVer);
    var glovesAugs = $("#glovesAug1 option").toArray().map(o => o.value);
    $("#glovesAug1").val(glovesAugs[convertedCode[27]]).change();
    $("#glovesAug2").val(glovesAugs[convertedCode[29]]).change();
    $("#glovesAug3").val(glovesAugs[convertedCode[31]]).change();
    $("#glovesAugLv1").val(convertedCode[28]);
    $("#glovesAugLv2").val(convertedCode[30]);
    $("#glovesAugLv3").val(convertedCode[32]);
    $("#glovesCore").val(convertedCode[34]);
    $("#glovesMast").val(convertedCode[35]);

    // Pants
    var pantsVer = armourVers[convertedCode[46]];
    setPants(pantsVer, convertedCode[39], false);
    $("#versionPants").val(pantsVer);
    var pantsAugs = $("#pantsAug1 option").toArray().map(o => o.value);
    $("#pantsAug1").val(pantsAugs[convertedCode[40]]).change();
    $("#pantsAug2").val(pantsAugs[convertedCode[42]]).change();
    $("#pantsAug3").val(pantsAugs[convertedCode[44]]).change();
    $("#pantsAugLv1").val(convertedCode[41]);
    $("#pantsAugLv2").val(convertedCode[43]);
    $("#pantsAugLv3").val(convertedCode[45]);
    $("#pantsCore").val(convertedCode[47]);
    $("#pantsMast").val(convertedCode[48]);

    // Boots
    var bootsVer = armourVers[convertedCode[59]];
    setBoots(bootsVer, convertedCode[52], false);
    $("#versionBoots").val(bootsVer);
    var bootsAugs = $("#bootsAug1 option").toArray().map(o => o.value);
    $("#bootsAug1").val(bootsAugs[convertedCode[53]]).change();
    $("#bootsAug2").val(bootsAugs[convertedCode[55]]).change();
    $("#bootsAug3").val(bootsAugs[convertedCode[57]]).change();
    $("#bootsAugLv1").val(convertedCode[54]);
    $("#bootsAugLv2").val(convertedCode[56]);
    $("#bootsAugLv3").val(convertedCode[58]);
    $("#bootsCore").val(convertedCode[60]);
    $("#bootsMast").val(convertedCode[61]);

    // Not specific
    $("#bae").val(convertedCode[65]);
    $(".form-check-input").val([convertedCode[10] === 18 ? "helmetNormal" : " ", convertedCode[11] === 18 ? "helmetRed" : " ", convertedCode[12] === 18 ? "helmetBlack" : " ",
        convertedCode[23] === 18 ? "vestNormal" : " ", convertedCode[24] === 18 ? "vestRed" : " ", convertedCode[25] === 18 ? "vestBlack" : " ",
        convertedCode[36] === 18 ? "glovesNormal" : " ", convertedCode[37] === 18 ? "glovesRed" : " ", convertedCode[38] === 18 ? "glovesBlack" : " ",
        convertedCode[49] === 18 ? "pantsNormal" : " ", convertedCode[50] === 18 ? "pantsRed" : " ", convertedCode[51] === 18 ? "pantsBlack" : " ",
        convertedCode[62] === 18 ? "bootsNormal" : " ", convertedCode[63] === 18 ? "bootsRed" : " ", convertedCode[64] === 18 ? "bootsBlack" : " "]);
}

function getArmour() {
    const armourData = armourJSON()

    var bae = $('input[name="bae"]').val();
    var helmRes = armourData["Helmet"][$("#versionHelm option:selected").val()][$("#Helmet option:selected").val()];
    var vestRes = armourData["Vest"][$("#versionVest option:selected").val()][$("#Vest option:selected").val()];
    var gloveRes = armourData["Gloves"][$("#versionGloves option:selected").val()][$("#Glove option:selected").val()];
    var pantRes = armourData["Pants"][$("#versionPants option:selected").val()][$("#Pant option:selected").val()];
    var bootRes = armourData["Boots"][$("#versionBoots option:selected").val()][$("#Boot option:selected").val()];

    const checkboxValues = [
        ...document.querySelectorAll('[type="checkbox"]:checked')
    ].map(el => el.value);

    let mobileView = $("#MobileView").is(":checked") ? "true" : "false";

    if (helmRes != undefined) {
        var helmResists = calcHelmResists(helmRes, bae);
    } else {
        var helmResists = {"Fortified": 0, "Heat Resistant": 0, "Hazchem": 0}
    }

    if (vestRes != undefined) {
        var vestResists = calcVestResists(vestRes, bae, checkboxValues);
    } else {
        var vestResists = {"Fortified": 0, "Heat Resistant": 0, "Hazchem": 0}
    }

    if (gloveRes != undefined) {
        var glovesResists = calcGlovesResists(gloveRes, bae, checkboxValues);
    } else {
        var glovesResists = {"Fortified": 0, "Heat Resistant": 0, "Hazchem": 0}
    }

    if (pantRes != undefined) {
        var pantsResists = calcPantsResists(pantRes, bae, checkboxValues);
    } else {
        var pantsResists = {"Fortified": 0, "Heat Resistant": 0, "Hazchem": 0}
    }

    if (bootRes != undefined) {
        var bootsResists = calcBootsResists(bootRes, bae, checkboxValues);
    } else {
        var bootsResists = {"Fortified": 0, "Heat Resistant": 0, "Hazchem": 0}
    }

    var totalFort = helmResists["Fortified"] + vestResists["Fortified"] + glovesResists["Fortified"] + pantsResists["Fortified"] + bootsResists["Fortified"];
    var totalHeat = helmResists["Heat Resistant"] + vestResists["Heat Resistant"] + glovesResists["Heat Resistant"] + pantsResists["Heat Resistant"] + bootsResists["Heat Resistant"];
    var totalHaz = helmResists["Hazchem"] + vestResists["Hazchem"] + glovesResists["Hazchem"] + pantsResists["Hazchem"] + bootsResists["Hazchem"];

    var percFort = getPercResists(totalFort);
    var percHeat = getPercResists(totalHeat);
    var percHaz = getPercResists(totalHaz);

    if (mobileView === "true") {
        document.getElementById("resultsNormal").innerHTML = "";
        document.getElementById("mobileResults").innerHTML = "";
        mobileResults.innerHTML = generateOutput(percFort, percHeat, percHaz, totalFort, totalHeat, totalHaz,
                helmResists["Fortified"], helmResists["Heat Resistant"], helmResists["Hazchem"],
                vestResists["Fortified"], vestResists["Heat Resistant"], vestResists["Hazchem"],
                glovesResists["Fortified"], glovesResists["Heat Resistant"], glovesResists["Hazchem"],
                pantsResists["Fortified"], pantsResists["Heat Resistant"], pantsResists["Hazchem"],
                bootsResists["Fortified"], bootsResists["Heat Resistant"], bootsResists["Hazchem"])
        /*
         mobileResults.innerHTML = `<p><i>Mobile results come here:</i><br>
         <u>Total resists:</u><br>
         <b>Fortified:</b> ${percFort}% <b>Heat:</b> ${percHeat}% <b>Hazchem:</b> ${percHaz}%<br>
         <b>Fortified:</b> ${roundToTwo(totalFort)} <b>Heat:</b> ${roundToTwo(totalHeat)} <b>Hazchem:</b> ${roundToTwo(totalHaz)}<br><br>
         <u>Totals per armour piece:</u><br>
         <b>${$("#versionHelm option:selected").val()} ${$("#Helmet option:selected").val()}:</b> Fortified ${helmResists["Fortified"]}, Heat: ${helmResists["Heat Resistant"]}, Hazchem: ${helmResists["Hazchem"]}<br>
         <b>${$("#versionVest option:selected").val()} ${$("#Vest option:selected").val()}:</b> Fortified ${vestResists["Fortified"]}, Heat: ${vestResists["Heat Resistant"]}, Hazchem: ${vestResists["Hazchem"]}<br>
         <b>${$("#versionGloves option:selected").val()} ${$("#Glove option:selected").val()}:</b> Fortified ${glovesResists["Fortified"]}, Heat: ${glovesResists["Heat Resistant"]}, Hazchem: ${glovesResists["Hazchem"]}<br>
         <b>${$("#versionPants option:selected").val()} ${$("#Pant option:selected").val()}:</b> Fortified ${pantsResists["Fortified"]}, Heat: ${pantsResists["Heat Resistant"]}, Hazchem: ${pantsResists["Hazchem"]}<br>
         <b>${$("#versionBoots option:selected").val()} ${$("#Boot option:selected").val()}:</b> Fortified ${bootsResists["Fortified"]}, Heat: ${bootsResists["Heat Resistant"]}, Hazchem: ${bootsResists["Hazchem"]}</p>`; */
    } else {
        document.getElementById("resultsNormal").innerHTML = "";
        document.getElementById("mobileResults").innerHTML = "";
        resultsNormal.innerHTML = generateOutput(percFort, percHeat, percHaz, totalFort, totalHeat, totalHaz,
                helmResists["Fortified"], helmResists["Heat Resistant"], helmResists["Hazchem"],
                vestResists["Fortified"], vestResists["Heat Resistant"], vestResists["Hazchem"],
                glovesResists["Fortified"], glovesResists["Heat Resistant"], glovesResists["Hazchem"],
                pantsResists["Fortified"], pantsResists["Heat Resistant"], pantsResists["Hazchem"],
                bootsResists["Fortified"], bootsResists["Heat Resistant"], bootsResists["Hazchem"])
        /*
         resultsNormal.innerHTML = `<p><i>Normal results come here:</i><br>
         <u>Total resists:</u><br>
         <b>Fortified:</b> ${percFort}% <b>Heat:</b> ${percHeat}% <b>Hazchem:</b> ${percHaz}%<br>
         <b>Fortified:</b> ${roundToTwo(totalFort)} <b>Heat:</b> ${roundToTwo(totalHeat)} <b>Hazchem:</b> ${roundToTwo(totalHaz)}<br><br>
         <u>Totals per armour piece:</u><br>
         <b>${$("#versionHelm option:selected").val()} ${$("#Helmet option:selected").val()}:</b> Fortified ${helmResists["Fortified"]}, Heat: ${helmResists["Heat Resistant"]}, Hazchem: ${helmResists["Hazchem"]}<br>
         <b>${$("#versionVest option:selected").val()} ${$("#Vest option:selected").val()}:</b> Fortified ${vestResists["Fortified"]}, Heat: ${vestResists["Heat Resistant"]}, Hazchem: ${vestResists["Hazchem"]}<br>
         <b>${$("#versionGloves option:selected").val()} ${$("#Glove option:selected").val()}:</b> Fortified ${glovesResists["Fortified"]}, Heat: ${glovesResists["Heat Resistant"]}, Hazchem: ${glovesResists["Hazchem"]}<br>
         <b>${$("#versionPants option:selected").val()} ${$("#Pant option:selected").val()}:</b> Fortified ${pantsResists["Fortified"]}, Heat: ${pantsResists["Heat Resistant"]}, Hazchem: ${pantsResists["Hazchem"]}<br>
         <b>${$("#versionBoots option:selected").val()} ${$("#Boot option:selected").val()}:</b> Fortified ${bootsResists["Fortified"]}, Heat: ${bootsResists["Heat Resistant"]}, Hazchem: ${bootsResists["Hazchem"]}</p>`;*/
    }

}


function generateOutput(percFort, percHeat, percHaz, totalFort, totalHeat, totalHaz,
        helmFort, helmHeat, helmHaz, vestFort, vestHeat, vestHaz,
        glovesFort, glovesHeat, glovesHaz, pantsFort, pantsHeat, pantsHaz,
        bootsFort, bootsHeat, bootsHaz) {
    let outputTable = `<table class="table align-middle">
    <thead class="table-secondary align-middle">
      <tr>
        <th colspan="4" class="text-center" name="borderless">Resistances</th>
      <tr>
        <th class="border-secondary"></th>
        <th class="border-secondary">Fortified</th>
        <th class="border-secondary">Heat</th>
        <th class="border-secondary">Hazchem</th>
      </tr>
    </thead>
    <tbody class="table-light">
        <tr>
            <th scope="row">Perc</th>
            <td>${percFort}%</td>
            <td>${percHeat}%</td>
            <td>${percHaz}%</td>
        </tr>
        <tr>
          <th scope="row">Total</th>
          <td>${roundToTwo(totalFort)}</td>
          <td>${roundToTwo(totalHeat)}</td>
          <td>${roundToTwo(totalHaz)}</td>
        </tr>
        <tr>
          <td colspan=4>
            <table class="table mb-0">
              <thead class="align-middle">
                <tr>
                  <th class="border-secondary"></th>
                  <th class="border-secondary">Fortified</th>
                  <th class="border-secondary">Heat</th>
                  <th class="border-secondary">Hazchem</th>
                </tr>
              </thead>
              <tbody>
                <th scope="row">Helmet</th>
                <td>${roundToTwo(helmFort)}</td>
                <td>${roundToTwo(helmHeat)}</td>
                <td>${roundToTwo(helmHaz)}</td>
              </tr>
              <tr>
                <th scope="row">Vest</th>
                <td>${roundToTwo(vestFort)}</td>
                <td>${roundToTwo(vestHeat)}</td>
                <td>${roundToTwo(vestHaz)}</td>
              </tr>
              <tr>
                <th scope="row">Gloves</th>
                <td>${roundToTwo(glovesFort)}</td>
                <td>${roundToTwo(glovesHeat)}</td>
                <td>${roundToTwo(glovesHaz)}</td>
              </tr>
              <tr>
                <th scope="row">Pants</th>
                <td>${roundToTwo(pantsFort)}</td>
                <td>${roundToTwo(pantsHeat)}</td>
                <td>${roundToTwo(pantsHaz)}</td>
              </tr>
              <tr>
                <th scope="row">Boots</th>
                <td>${roundToTwo(bootsFort)}</td>
                <td>${roundToTwo(bootsHeat)}</td>
                <td>${roundToTwo(bootsHaz)}</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
</table>`;

    return outputTable;
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function getPercResists(totalRes) {
    var perc = 0;
    if (totalRes > 6000) {
        perc = (Math.sqrt(totalRes - 6000) / 5) + 74;
        if (perc > 99) {
            perc = 99;
        }
    } else {
        perc = Math.sqrt(totalRes);
    }
    return roundToTwo(perc);
}


function calcHelmResists(helmRes, bae) {
    var helmMast = $('input[name="helmetMast"]').val();
    if (helmMast == 5) {
        var addRes = [100, 100, 100];
    } else {
        var addRes = [0, 0, 0];
    }

    let helmResists = calcResists(helmRes, [$("#helmAug1 option:selected").val(), $("#helmAugLv1").val()],
            [$("#helmAug2 option:selected").val(), $("#helmAugLv2").val()],
            [$("#helmAug3 option:selected").val(), $("#helmAugLv3").val()],
            bae, $('input[name="helmetCore"]').val(), addRes, 24);
    return helmResists;
}

function calcVestResists(vestRes, bae, checkboxValues) {
    var vestMast = $('input[name="vestMast"]').val();
    if (vestMast == 5) {
        var addRes = [250, 200, 200];
    } else if (vestMast > 0) {
        var addRes = [50, 50, 50];
    } else {
        var addRes = [0, 0, 0];
    }

    if ($.inArray("vestNormal", checkboxValues) !== -1) {
        let previousVal = addRes[0];
        addRes.splice(0, 1, previousVal + 50);
    }

    if ($.inArray("vestBlack", checkboxValues) !== -1) {
        let previousVal = addRes[0];
        addRes.splice(0, 1, previousVal + 250);
    }

    let vestResists = calcResists(vestRes, [$("#vestAug1 option:selected").val(), $("#vestAugLv1").val()],
            [$("#vestAug2 option:selected").val(), $("#vestAugLv2").val()],
            [$("#vestAug3 option:selected").val(), $("#vestAugLv3").val()],
            bae, $('input[name="vestCore"]').val(), addRes, 40);

    return vestResists;
}

function calcGlovesResists(glovesRes, bae, checkboxValues) {
    var glovesMast = $('input[name="glovesMast"]').val();
    if (glovesMast == 5) {
        var addRes = [100, 100, 125];
    } else if (glovesMast > 0) {
        var addRes = [0, 0, 25];
    } else {
        var addRes = [0, 0, 0];
    }

    if ($.inArray("glovesNormal", checkboxValues) !== -1) {
        let previousVal = addRes[1];
        addRes.splice(1, 1, previousVal + 50);
    }


    let glovesResists = calcResists(glovesRes, [$("#glovesAug1 option:selected").val(), $("#glovesAugLv1").val()],
            [$("#glovesAug2 option:selected").val(), $("#glovesAugLv2").val()],
            [$("#glovesAug3 option:selected").val(), $("#glovesAugLv3").val()],
            bae, $('input[name="glovesCore"]').val(), addRes, 12);
    return glovesResists;
}

function calcPantsResists(pantsRes, bae, checkboxValues) {
    var pantsMast = $('input[name="pantsMast"]').val();
    if (pantsMast == 5) {
        var addRes = [100, 150, 100];
    } else if (pantsMast > 0) {
        var addRes = [0, 50, 0];
    } else {
        var addRes = [0, 0, 0];
    }

    if ($.inArray("pantsBlack", checkboxValues) !== -1) {
        let previousVal = addRes[1];
        addRes.splice(1, 1, previousVal + 250);
    }

    let pantsResists = calcResists(pantsRes, [$("#pantsAug1 option:selected").val(), $("#pantsAugLv1").val()],
            [$("#pantsAug2 option:selected").val(), $("#pantsAugLv2").val()],
            [$("#pantsAug3 option:selected").val(), $("#pantsAugLv3").val()],
            bae, $('input[name="pantsCore"]').val(), addRes, 24);
    return pantsResists;
}

function calcBootsResists(bootsRes, bae, checkboxValues) {
    var bootsMast = $('input[name="bootsMast"]').val();
    if (bootsMast == 5) {
        var addRes = [100, 125, 125];
    } else if (bootsMast == 1) {
        var addRes = [0, 0, 25];
    } else if (bootsMast > 1) {
        var addRes = [0, 25, 25];
    } else {
        var addRes = [0, 0, 0];
    }

    if ($.inArray("bootsNormal", checkboxValues) !== -1) {
        let previousVal = addRes[2];
        addRes.splice(2, 1, previousVal + 50);
    }

    if ($.inArray("bootsBlack", checkboxValues) !== -1) {
        let previousVal = addRes[2];
        addRes.splice(2, 1, previousVal + 250);
    }


    let bootsResists = calcResists(bootsRes, [$("#bootsAug1 option:selected").val(), $("#bootsAugLv1").val()],
            [$("#bootsAug2 option:selected").val(), $("#bootsAugLv2").val()],
            [$("#bootsAug3 option:selected").val(), $("#bootsAugLv3").val()],
            bae, $('input[name="bootsCore"]').val(), addRes, 12);
    return bootsResists;
}



function calcResists(armourBaseFHC, aug1_lv, aug2_lv, aug3_lv, bae, core, addedResFHC, armourMod) {
    var fortified = 0;
    var heatRes = 0;
    var hazchem = 0;
    if ($.inArray(aug1_lv[0], ["Fortified", "Heat Resistant", "Hazchem"]) !== -1) {
        var resType1 = aug1_lv[0];
        var resLv1 = aug1_lv[1];
        var res1 = singleResist(armourBaseFHC, armourMod, resType1, resLv1, bae, core, 0);
        if (res1[0] === "Fortified") {
            fortified = res1[1];
        } else if (res1[0] === "Heat Resistant") {
            heatRes = res1[1];
        } else {
            hazchem = res1[1];
        }
    }

    if ($.inArray(aug2_lv[0], ["Fortified", "Heat Resistant", "Hazchem"]) !== -1) {
        var resType2 = aug2_lv[0];
        var resLv2 = aug2_lv[1];
        var res2 = singleResist(armourBaseFHC, armourMod, resType2, resLv2, bae, core, 0);
        if (res2[0] === "Fortified") {
            fortified = res2[1];
        } else if (res2[0] === "Heat Resistant") {
            heatRes = res2[1];
        } else {
            hazchem = res2[1];
        }
    }

    if ($.inArray(aug3_lv[0], ["Fortified", "Heat Resistant", "Hazchem"]) !== -1) {
        var resType3 = aug3_lv[0];
        var resLv3 = aug3_lv[1];
        var res3 = singleResist(armourBaseFHC, armourMod, resType3, resLv3, bae, core, 0);
        if (res3[0] === "Fortified") {
            fortified = res3[1];
        } else if (res3[0] === "Heat Resistant") {
            heatRes = res3[1];
        } else {
            hazchem = res3[1];
        }
    }

    if (fortified === 0) {
        fortified = (armourBaseFHC[0] * (1 + (0.05 * core))) * (1 + 0.07 * bae);
    }
    if (heatRes === 0) {
        heatRes = (armourBaseFHC[1] * (1 + (0.05 * core))) * (1 + 0.07 * bae);
    }
    if (hazchem === 0) {
        hazchem = (armourBaseFHC[2] * (1 + (0.05 * core))) * (1 + 0.07 * bae);
    }

    return {"Fortified": fortified + addedResFHC[0], "Heat Resistant": heatRes + addedResFHC[1], "Hazchem": hazchem + addedResFHC[2]};
}


function singleResist(armourBaseFHC, armourMod, resType, resLv, bae, core, addedRes) {
    var resists = 0;
    if (resType === "Fortified") {
        if (resLv > 5) {
            var resAugs = armourBaseFHC[0] * ((0.3 * resLv + 0.5) + (0.05 * core)) + (armourMod * resLv);
            resists = (1 + 0.07 * bae) * resAugs + addedRes;
        } else {
            var resAugs = armourBaseFHC[0] * ((0.2 * resLv + 1) + (0.05 * core)) + (armourMod * resLv);
            resists = (1 + 0.07 * bae) * resAugs + addedRes;
        }
    } else if (resType === "Heat Resistant") {
        if (resLv > 5) {
            var resAugs = armourBaseFHC[1] * ((0.3 * resLv + 0.5) + (0.05 * core)) + (armourMod * resLv);
            resists = (1 + 0.07 * bae) * resAugs + addedRes;
        } else {
            var resAugs = armourBaseFHC[1] * ((0.2 * resLv + 1) + (0.05 * core)) + (armourMod * resLv);
            resists = (1 + 0.07 * bae) * resAugs + addedRes;
        }
    } else {
        if (resLv > 6) {
            var resAugs = armourBaseFHC[2] * ((0.5 * resLv) + (0.05 * core)) + (armourMod * resLv);
            resists = (1 + 0.07 * bae) * resAugs + addedRes;
        } else if (resLv > 4) {
            var resAugs = armourBaseFHC[2] * ((0.4 * resLv + 0.6) + (0.05 * core)) + (armourMod * resLv);
            resists = (1 + 0.07 * bae) * resAugs + addedRes;
        } else {
            var resAugs = armourBaseFHC[2] * ((0.3 * resLv + 1) + (0.05 * core)) + (armourMod * resLv);
            resists = (1 + 0.07 * bae) * resAugs + addedRes;
        }
    }
    return [resType, resists];
}

function setSelection(armourType, version) {

}

function update(value) {
    let storedData = JSON.parse(sessionStorage.getItem('armourData'));
    Object.keys(value).forEach(function (val, key) {
        storedData[val] = value[val];
    });
    sessionStorage.setItem('armourData', JSON.stringify(storedData));
}



function setHelmets(version, setIndex=17, fromChange=true) {
    let storedData = JSON.parse(sessionStorage.getItem("armourData"));
    update({"Helmets": version});
    if (fromChange) {
        if (version === "Other") {
            setHelmetsSelection(version, setIndex)
        } else if (storedData["Helmets"] == "Other") {
            setHelmetsSelection(version, setIndex)
        }
    } else {
        setHelmetsSelection(version, setIndex);
    }
}

function setHelmetsSelection(version, setIndex) {
    document.getElementById("helmets").innerHTML = "";
    if (version === "Other") {
        helmets.innerHTML = `<select id="Helmet" name="Helmet" type="armour">
      <option value="---" ${setIndex === 17 ? 'selected=selected' : ''}>---</option>
      <option value="Dynamo Helmet" ${setIndex === 18 ? 'selected=selected' : ''}>Dynamo Helmet</option>
      <option value="Overwatch Helmet" ${setIndex === 19 ? 'selected=selected' : ''}>Overwatch Helmet</option>
      <option value="Mastodon Helm" ${setIndex === 20 ? 'selected=selected' : ''}>Mastodon Helm</option>
      <option value="Vulkan Helmet" ${setIndex === 21 ? 'selected=selected' : ''}>Vulkan Helmet</option>
      <option value="Mako Helmet" ${setIndex === 22 ? 'selected=selected' : ''}>Mako Helmet</option>
      <option value="Clown Helm" ${setIndex === 23 ? 'selected=selected' : ''}>Clown Helm</option>
    </select>`;
    } else {
        helmets.innerHTML = `<select id="Helmet" name="Helmet" type="armour">
    <option value="---" ${setIndex === 17 ? 'selected=selected' : ''}>---</option>
    <option value="HVM Kevlar Helmet" ${setIndex === 18 ? 'selected=selected' : ''}>HVM Kevlar Helmet</option>
    <option value="HVM Carbon Fibre Helmet" ${setIndex === 19 ? 'selected=selected' : ''}>HVM Carbon Fibre Helmet</option>
    <option value="Trooper Helmet" ${setIndex === 20 ? 'selected=selected' : ''}>Trooper Helmet</option>
    <option value="Special Forces Helmet" ${setIndex === 21 ? 'selected=selected' : ''}>Special Forces Helmet</option>
    <option value="Hardplate Helm" ${setIndex === 22 ? 'selected=selected' : ''}>Hardplate Helm</option>
    <option value="Shotlite Hummingbird H1" ${setIndex === 23 ? 'selected=selected' : ''}>Shotlite Hummingbird H1</option>
    <option value="Dragonfly Helmet" ${setIndex === 24 ? 'selected=selected' : ''}>Dragonfly Helmet</option>
    <option value="R1 Interceptor Helm" ${setIndex === 25 ? 'selected=selected' : ''}>R1 Interceptor Helm</option>
    <option value="Graphene Combat Hood" ${setIndex === 26 ? 'selected=selected' : ''}>Graphene Combat Hood</option>
    <option value="Titan IRN HUD" ${setIndex === 27 ? 'selected=selected' : ''}>Titan IRN HUD</option>
    <option value="Medusa Helmet" ${setIndex === 28 ? 'selected=selected' : ''}>Medusa Helmet</option>
  </select>`;
    }
}

function setVests(version, setIndex=17, fromChange=true) {
    let storedData = JSON.parse(sessionStorage.getItem("armourData"));
    update({"Vests": version});
    if (fromChange) {
        if (version === "Other") {
            setVestsSelection(version, setIndex);
        } else if (storedData["Vests"] == "Other") {
            setVestsSelection(version, setIndex);
        }
    } else {
        setVestsSelection(version, setIndex);
    }
}

function setVestsSelection(version, setIndex) {
    document.getElementById("vests").innerHTML = "";
    if (version === "Other") {
        vests.innerHTML = `<select id="Vest" name="Vest" type="armour">
    <option value="---" ${setIndex === 17 ? 'selected=selected' : ''}>---</option>
    <option value="Dynamo Chest" ${setIndex === 18 ? 'selected=selected' : ''}>Dynamo Chest</option>
    <option value="Overwatch Chest" ${setIndex === 19 ? 'selected=selected' : ''}>Overwatch Chest</option>
    <option value="Mastodon Chest" ${setIndex === 20 ? 'selected=selected' : ''}>Mastodon Chest</option>
    <option value="Vulkan Vest" ${setIndex === 21 ? 'selected=selected' : ''}>Vulkan Vest</option>
    <option value="Mako Vest" ${setIndex === 22 ? 'selected=selected' : ''}>Mako Vest</option>
    <option value="Clown Chest" ${setIndex === 23 ? 'selected=selected' : ''}>Clown Chest</option>
    </select>`;
    } else {
        vests.innerHTML = `<select id="Vest" name="Vest" type="armour">
    <option value="---" ${setIndex === 17 ? 'selected=selected' : ''}>---</option>
    <option value="HVM Kevlar Vest" ${setIndex === 18 ? 'selected=selected' : ''}>HVM Kevlar Vest</option>
    <option value="HVM Carbon Fibre Vest" ${setIndex === 19 ? 'selected=selected' : ''}>HVM Carbon Fibre Vest</option>
    <option value="Trooper Vest" ${setIndex === 20 ? 'selected=selected' : ''}>Trooper Vest</option>
    <option value="Special Forces Vest" ${setIndex === 21 ? 'selected=selected' : ''}>Special Forces Vest</option>
    <option value="Hardplate Chest" ${setIndex === 22 ? 'selected=selected' : ''}>Hardplate Chest</option>
    <option value="Rubicon Power Assist" ${setIndex === 23 ? 'selected=selected' : ''}>Rubicon Power Assist</option>
    <option value="Heavy Trooper Vest" ${setIndex === 24 ? 'selected=selected' : ''}>Heavy Trooper Vest</option>
    <option value="Shotlite Hummingbird V1" ${setIndex === 25 ? 'selected=selected' : ''}>Shotlite Hummingbird V1</option>
    <option value="Dragonfly Vest" ${setIndex === 26 ? 'selected=selected' : ''}>Dragonfly Vest</option>
    <option value="R4 Guardian Vest" ${setIndex === 27 ? 'selected=selected' : ''}>R4 Guardian Vest</option>
    <option value="Graphene Body Suit Top" ${setIndex === 28 ? 'selected=selected' : ''}>Graphene Body Suit Top</option>
    <option value="Titan Teslashock" ${setIndex === 29 ? 'selected=selected' : ''}>Titan Teslashock</option>
    <option value="Medusa Vest" ${setIndex === 30 ? 'selected=selected' : ''}>Medusa Vest</option>
    </select>`;
    }
}

function setGloves(version, setIndex=17, fromChange=true) {
    let storedData = JSON.parse(sessionStorage.getItem("armourData"));
    update({"Gloves": version});
    if (fromChange) {
        if (version === "Other") {
            setGlovesSelection(version, setIndex);
        } else if (storedData["Gloves"] == "Other") {
            setGlovesSelection(version, setIndex);
        }
    } else {
        setGlovesSelection(version, setIndex);
    }
}

function setGlovesSelection(version, setIndex) {
    document.getElementById("gloves").innerHTML = "";
    if (version === "Other") {
        gloves.innerHTML = `<select id="Glove" name="Gloves" type="armour">
    <option value="---" ${setIndex === 17 ? 'selected=selected' : ''}>---</option>
    <option value="Dynamo Gloves" ${setIndex === 18 ? 'selected=selected' : ''}>Dynamo Gloves</option>
    <option value="Overwatch Gloves" ${setIndex === 19 ? 'selected=selected' : ''}>Overwatch Gloves</option>
    <option value="Mastodon Gauntlets" ${setIndex === 20 ? 'selected=selected' : ''}>Mastodon Gauntlets</option>
    <option value="Vulkan Gloves" ${setIndex === 21 ? 'selected=selected' : ''}>Vulkan Gloves</option>
    <option value="Mako Gloves" ${setIndex === 22 ? 'selected=selected' : ''}>Mako Gloves</option>
    <option value="Clown Gauntlets" ${setIndex === 23 ? 'selected=selected' : ''}>Clown Gauntlets</option>
    </select>`;
    } else {
        gloves.innerHTML = `<select id="Glove" name="Gloves" type="armour">
    <option value="---" ${setIndex === 17 ? 'selected=selected' : ''}>---</option>
    <option value="HVM Kevlar Gloves" ${setIndex === 18 ? 'selected=selected' : ''}>HVM Kevlar Gloves</option>
    <option value="HVM Carbon Fibre Gloves" ${setIndex === 19 ? 'selected=selected' : ''}>HVM Carbon Fibre Gloves</option>
    <option value="Trooper Gloves" ${setIndex === 20 ? 'selected=selected' : ''}>Trooper Gloves</option>
    <option value="Special Forces Gloves" ${setIndex === 21 ? 'selected=selected' : ''}>Special Forces Gloves</option>
    <option value="Hardplate Gauntlets" ${setIndex === 22 ? 'selected=selected' : ''}>Hardplate Gauntlets</option>
    <option value="Shotlite Hummingbird G1" ${setIndex === 23 ? 'selected=selected' : ''}>Shotlite Hummingbird G1</option>
    <option value="Dragonfly Gloves" ${setIndex === 24 ? 'selected=selected' : ''}>Dragonfly Gloves</option>
    <option value="R6 Flamejuggler Gloves" ${setIndex === 25 ? 'selected=selected' : ''}>R6 Flamejuggler Gloves</option>
    <option value="Graphene Gloves" ${setIndex === 26 ? 'selected=selected' : ''}>Graphene Gloves</option>
    <option value="Titan IDS 01" ${setIndex === 27 ? 'selected=selected' : ''}>Titan IDS 01</option>
    <option value="Medusa Gloves" ${setIndex === 28 ? 'selected=selected' : ''}>Medusa Gloves</option>
    </select>`;
    }
}

function setPants(version, setIndex=17, fromChange=true) {
    let storedData = JSON.parse(sessionStorage.getItem("armourData"));
    update({"Pants": version});
    if (fromChange) {
        if (version === "Other") {
            setPantsSelection(version, setIndex);
        } else if (storedData["Pants"] == "Other") {
            setPantsSelection(version, setIndex);
        }
    } else {
        setPantsSelection(version, setIndex);
    }
}

function setPantsSelection(version, setIndex) {
    document.getElementById("pants").innerHTML = "";
    if (version === "Other") {
        pants.innerHTML = `<select id="Pant" name="Pants" type="armour">
      <option value="---" ${setIndex === 17 ? 'selected=selected' : ''}>---</option>
      <option value="Dynamo Legs" ${setIndex === 18 ? 'selected=selected' : ''}>Dynamo Legs</option>
      <option value="Overwatch Pants" ${setIndex === 19 ? 'selected=selected' : ''}>Overwatch Pants</option>
      <option value="Mastodon Legs" ${setIndex === 20 ? 'selected=selected' : ''}>Mastodon Legs</option>
      <option value="Vulkan Pants" ${setIndex === 21 ? 'selected=selected' : ''}>Vulkan Pants</option>
      <option value="Mako Pants" ${setIndex === 22 ? 'selected=selected' : ''}>Mako Pants</option>
      <option value="Clown Legs" ${setIndex === 23 ? 'selected=selected' : ''}>Clown Legs</option>
    </select>`;
    } else {
        pants.innerHTML = `<select id="Pant" name="Pants" type="armour">
      <option value="---" ${setIndex === 17 ? 'selected=selected' : ''}>---</option>
      <option value="HVM Kevlar Pants" ${setIndex === 18 ? 'selected=selected' : ''}>HVM Kevlar Pants</option>
      <option value="HVM Carbon Fibre Pants" ${setIndex === 19 ? 'selected=selected' : ''}>HVM Carbon Fibre Pants</option>
      <option value="Trooper Pants" ${setIndex === 20 ? 'selected=selected' : ''}>Trooper Pants</option>
      <option value="Special Forces Pants" ${setIndex === 21 ? 'selected=selected' : ''}>Special Forces Pants</option>
      <option value="Hardplate Leg Protection" ${setIndex === 22 ? 'selected=selected' : ''}>Hardplate Leg Protection</option>
      <option value="Shotlite Hummingbird P1" ${setIndex === 23 ? 'selected=selected' : ''}>Shotlite Hummingbird P1</option>
      <option value="Dragonfly Pants" ${setIndex === 24 ? 'selected=selected' : ''}>Dragonfly Pants</option>
      <option value="R7 Guardian Pants" ${setIndex === 25 ? 'selected=selected' : ''}>R7 Guardian Pants</option>
      <option value="Graphene Body Suit Bottom" ${setIndex === 26 ? 'selected=selected' : ''}>Graphene Body Suit Bottom</option>
      <option value="Titan MEM Trooper" ${setIndex === 27 ? 'selected=selected' : ''}>Titan MEM Trooper</option>
      <option value="Medusa Pants" ${setIndex === 28 ? 'selected=selected' : ''}>Medusa Pants</option>
    </select>`;
    }
}

function setBoots(version, setIndex=17, fromChange=true) {
    let storedData = JSON.parse(sessionStorage.getItem("armourData"));
    update({"Boots": version});
    if (fromChange) {
        if (version === "Other") {
            setBootsSelection(version, setIndex);
        } else if (storedData["Boots"] == "Other") {
            setBootsSelection(version, setIndex);
        }
    } else {
        setBootsSelection(version, setIndex);
    }
}

function setBootsSelection(version, setIndex) {
    document.getElementById("boots").innerHTML = "";
    if (version === "Other") {
        boots.innerHTML = `<select id="Boot" name="Boots" type="armour">
      <option value="---" ${setIndex === 17 ? 'selected=selected' : ''}>---</option>
      <option value="Dynamo Boots" ${setIndex === 18 ? 'selected=selected' : ''}>Dynamo Boots</option>
      <option value="Overwatch Boots" ${setIndex === 19 ? 'selected=selected' : ''}>Overwatch Boots</option>
      <option value="Mastodon Boots" ${setIndex === 20 ? 'selected=selected' : ''}>Mastodon Boots</option>
      <option value="Vulkan Boots" ${setIndex === 21 ? 'selected=selected' : ''}>Vulkan Boots</option>
      <option value="Mako Boots" ${setIndex === 22 ? 'selected=selected' : ''}>Mako Boots</option>
      <option value="Clown Boots" ${setIndex === 23 ? 'selected=selected' : ''}>Clown Boots</option>
    </select>`;
    } else {
        boots.innerHTML = `<select id="Boot" name="Boots" type="armour">
      <option value="---" ${setIndex === 17 ? 'selected=selected' : ''}>---</option>
      <option value="HVM Combat Boots" ${setIndex === 18 ? 'selected=selected' : ''}>HVM Combat Boots</option>
      <option value="HVM Carbon Fibre Boots" ${setIndex === 19 ? 'selected=selected' : ''}>HVM Carbon Fibre Boots</option>
      <option value="Trooper Boots" ${setIndex === 20 ? 'selected=selected' : ''}>Trooper Boots</option>
      <option value="Special Forces Boots" ${setIndex === 21 ? 'selected=selected' : ''}>Special Forces Boots</option>
      <option value="Hardplate Boots" ${setIndex === 22 ? 'selected=selected' : ''}>Hardplate Boots</option>
      <option value="Shotlite Starwalk Boots" ${setIndex === 23 ? 'selected=selected' : ''}>Shotlite Starwalk Boots</option>
      <option value="Dragonfly Boots" ${setIndex === 24 ? 'selected=selected' : ''}>Dragonfly Boots</option>
      <option value="R8 Huntsman Boots" ${setIndex === 25 ? 'selected=selected' : ''}>R8 Huntsman Boots</option>
      <option value="Graphene Boots" ${setIndex === 26 ? 'selected=selected' : ''}>Graphene Boots</option>
      <option value="Titan MEM Sprint" ${setIndex === 27 ? 'selected=selected' : ''}>Titan MEM Sprint</option>
      <option value="Medusa Boots" ${setIndex === 28 ? 'selected=selected' : ''}>Medusa Boots</option>
    </select>`;
    }
}

document.addEventListener('readystatechange', event => {
    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..
        $("#MobileView").prop("checked", mobileCheck());
        if (pageAccessedByReload) {
            let storedData = JSON.parse(sessionStorage.getItem("armourData"));
            setHelmetsSelection(storedData["Helmets"]);
            setVestsSelection(storedData["Vests"]);
            setGlovesSelection(storedData["Gloves"]);
            setPantsSelection(storedData["Pants"]);
            setBootsSelection(storedData["Boots"]);
        } else {
            setHelmetsSelection("Normal");
            setVestsSelection("Normal");
            setGlovesSelection("Normal");
            setPantsSelection("Normal");
            setBootsSelection("Normal");
            let data = {"Helmets": "null", "Vests": "null", "Gloves": "null", "Pants": "null", "Boots": "null"};
            sessionStorage.setItem('armourData', JSON.stringify(data));
        }
    }
});

function mobileCheck() {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

const pageAccessedByReload = (
        (window.performance.navigation && window.performance.navigation.type === 1) ||
        window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload')
);
