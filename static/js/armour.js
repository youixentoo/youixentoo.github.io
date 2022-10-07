
//TODO: Output visualisation

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

    if (mobileView == "true") {
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
</table>`

    return outputTable;
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function getPercResists(totalRes) {
    var perc = 0;
    if (totalRes > 6000) {
        perc = (Math.sqrt(totalRes - 6000) / 5) + 74
        if (perc > 99) {
            perc = 99
        }
    } else {
        perc = Math.sqrt(totalRes)
    }
    return roundToTwo(perc)
}


function calcHelmResists(helmRes, bae) {
    var helmMast = $('input[name="helmetMast"]').val();
    if (helmMast == 5) {
        var addRes = [100, 100, 100]
    } else {
        var addRes = [0, 0, 0]
    }

    let helmResists = calcResists(helmRes, [$("#helmAug1 option:selected").val(), $("#helmAugLv1").val()],
            [$("#helmAug2 option:selected").val(), $("#helmAugLv2").val()],
            [$("#helmAug3 option:selected").val(), $("#helmAugLv3").val()],
            bae, $('input[name="helmetCore"]').val(), addRes, 24)
    return helmResists;
}

function calcVestResists(vestRes, bae, checkboxValues) {
    var vestMast = $('input[name="vestMast"]').val();
    if (vestMast == 5) {
        var addRes = [250, 200, 200]
    } else if (vestMast > 0) {
        var addRes = [50, 0, 0]
    } else {
        var addRes = [0, 0, 0]
    }

    if ($.inArray("vestNormal", checkboxValues) != -1) {
        let previousVal = addRes[0]
        addRes.splice(0, 1, previousVal + 50)
    }

    if ($.inArray("vestBlack", checkboxValues) != -1) {
        let previousVal = addRes[0]
        addRes.splice(0, 1, previousVal + 250)
    }

    let vestResists = calcResists(vestRes, [$("#vestAug1 option:selected").val(), $("#vestAugLv1").val()],
            [$("#vestAug2 option:selected").val(), $("#vestAugLv2").val()],
            [$("#vestAug3 option:selected").val(), $("#vestAugLv3").val()],
            bae, $('input[name="vestCore"]').val(), addRes, 40)

    return vestResists;
}

function calcGlovesResists(glovesRes, bae, checkboxValues) {
    var glovesMast = $('input[name="glovesMast"]').val();
    if (glovesMast == 5) {
        var addRes = [100, 100, 125]
    } else if (glovesMast > 0) {
        var addRes = [0, 0, 25]
    } else {
        var addRes = [0, 0, 0]
    }

    if ($.inArray("glovesNormal", checkboxValues) != -1) {
        let previousVal = addRes[1]
        addRes.splice(1, 1, previousVal + 50)
    }


    let glovesResists = calcResists(glovesRes, [$("#glovesAug1 option:selected").val(), $("#glovesAugLv1").val()],
            [$("#glovesAug2 option:selected").val(), $("#glovesAugLv2").val()],
            [$("#glovesAug3 option:selected").val(), $("#glovesAugLv3").val()],
            bae, $('input[name="glovesCore"]').val(), addRes, 12)
    return glovesResists;
}

function calcPantsResists(pantsRes, bae, checkboxValues) {
    var pantsMast = $('input[name="pantsMast"]').val();
    if (pantsMast == 5) {
        var addRes = [100, 150, 100]
    } else if (pantsMast > 0) {
        var addRes = [0, 50, 0]
    } else {
        var addRes = [0, 0, 0]
    }

    if ($.inArray("pantsBlack", checkboxValues) != -1) {
        let previousVal = addRes[1]
        addRes.splice(1, 1, previousVal + 250)
    }

    let pantsResists = calcResists(pantsRes, [$("#pantsAug1 option:selected").val(), $("#pantsAugLv1").val()],
            [$("#pantsAug2 option:selected").val(), $("#pantsAugLv2").val()],
            [$("#pantsAug3 option:selected").val(), $("#pantsAugLv3").val()],
            bae, $('input[name="pantsCore"]').val(), addRes, 24)
    return pantsResists;
}

function calcBootsResists(bootsRes, bae, checkboxValues) {
    var bootsMast = $('input[name="bootsMast"]').val();
    if (bootsMast == 5) {
        var addRes = [100, 125, 125]
    } else if (bootsMast == 1) {
        var addRes = [0, 0, 25]
    } else if (bootsMast > 1) {
        var addRes = [0, 25, 25]
    } else {
        var addRes = [0, 0, 0]
    }

    if ($.inArray("bootsNormal", checkboxValues) != -1) {
        let previousVal = addRes[2]
        addRes.splice(2, 1, previousVal + 50)
    }

    if ($.inArray("bootsBlack", checkboxValues) != -1) {
        let previousVal = addRes[2]
        addRes.splice(2, 1, previousVal + 250)
    }


    let bootsResists = calcResists(bootsRes, [$("#bootsAug1 option:selected").val(), $("#bootsAugLv1").val()],
            [$("#bootsAug2 option:selected").val(), $("#bootsAugLv2").val()],
            [$("#bootsAug3 option:selected").val(), $("#bootsAugLv3").val()],
            bae, $('input[name="bootsCore"]').val(), addRes, 12)
    return bootsResists;
}



function calcResists(armourBaseFHC, aug1_lv, aug2_lv, aug3_lv, bae, core, addedResFHC, armourMod) {
    var fortified = 0;
    var heatRes = 0;
    var hazchem = 0;
    if ($.inArray(aug1_lv[0], ["Fortified", "Heat Resistant", "Hazchem"]) != -1) {
        var resType1 = aug1_lv[0];
        var resLv1 = aug1_lv[1];
        var res1 = singleResist(armourBaseFHC, armourMod, resType1, resLv1, bae, core, 0)
        if (res1[0] == "Fortified") {
            fortified = res1[1]
        } else if (res1[0] == "Heat Resistant") {
            heatRes = res1[1]
        } else {
            hazchem = res1[1]
        }
    }

    if ($.inArray(aug2_lv[0], ["Fortified", "Heat Resistant", "Hazchem"]) != -1) {
        var resType2 = aug2_lv[0];
        var resLv2 = aug2_lv[1];
        var res2 = singleResist(armourBaseFHC, armourMod, resType2, resLv2, bae, core, 0)
        if (res2[0] == "Fortified") {
            fortified = res2[1]
        } else if (res2[0] == "Heat Resistant") {
            heatRes = res2[1]
        } else {
            hazchem = res2[1]
        }
    }

    if ($.inArray(aug3_lv[0], ["Fortified", "Heat Resistant", "Hazchem"]) != -1) {
        var resType3 = aug3_lv[0];
        var resLv3 = aug3_lv[1];
        var res3 = singleResist(armourBaseFHC, armourMod, resType3, resLv3, bae, core, 0)
        if (res3[0] == "Fortified") {
            fortified = res3[1]
        } else if (res3[0] == "Heat Resistant") {
            heatRes = res3[1]
        } else {
            hazchem = res3[1]
        }
    }

    if (fortified == 0) {
        fortified = (armourBaseFHC[0] * (1 + (0.05 * core))) * (1 + 0.07 * bae)
    }
    if (heatRes == 0) {
        heatRes = (armourBaseFHC[1] * (1 + (0.05 * core))) * (1 + 0.07 * bae)
    }
    if (hazchem == 0) {
        hazchem = (armourBaseFHC[2] * (1 + (0.05 * core))) * (1 + 0.07 * bae)
    }

    return {"Fortified": fortified + addedResFHC[0], "Heat Resistant": heatRes + addedResFHC[1], "Hazchem": hazchem + addedResFHC[2]}
}


function singleResist(armourBaseFHC, armourMod, resType, resLv, bae, core, addedRes) {
    var resists = 0;
    if (resType == "Fortified") {
        if (resLv > 5) {
            var resAugs = armourBaseFHC[0] * ((0.3 * resLv + 0.5) + (0.05 * core)) + (armourMod * resLv)
            resists = (1 + 0.07 * bae) * resAugs + addedRes
        } else {
            var resAugs = armourBaseFHC[0] * ((0.2 * resLv + 1) + (0.05 * core)) + (armourMod * resLv)
            resists = (1 + 0.07 * bae) * resAugs + addedRes
        }
    } else if (resType == "Heat Resistant") {
        if (resLv > 5) {
            var resAugs = armourBaseFHC[1] * ((0.3 * resLv + 0.5) + (0.05 * core)) + (armourMod * resLv)
            resists = (1 + 0.07 * bae) * resAugs + addedRes
        } else {
            var resAugs = armourBaseFHC[1] * ((0.2 * resLv + 1) + (0.05 * core)) + (armourMod * resLv)
            resists = (1 + 0.07 * bae) * resAugs + addedRes
        }
    } else {
        if (resLv > 6) {
            var resAugs = armourBaseFHC[2] * ((0.5 * resLv) + (0.05 * core)) + (armourMod * resLv)
            resists = (1 + 0.07 * bae) * resAugs + addedRes
        } else if (resLv > 4) {
            var resAugs = armourBaseFHC[2] * ((0.4 * resLv + 0.6) + (0.05 * core)) + (armourMod * resLv)
            resists = (1 + 0.07 * bae) * resAugs + addedRes
        } else {
            var resAugs = armourBaseFHC[2] * ((0.3 * resLv + 1) + (0.05 * core)) + (armourMod * resLv)
            resists = (1 + 0.07 * bae) * resAugs + addedRes
        }
    }
    return [resType, resists]
}

function setSelection(armourType, version) {

}

function update(value) {
    let storedData = JSON.parse(sessionStorage.getItem('armourData'));
    Object.keys(value).forEach(function (val, key) {
        storedData[val] = value[val];
    })
    sessionStorage.setItem('armourData', JSON.stringify(storedData));
}



function setHelmets(version) {
    let storedData = JSON.parse(sessionStorage.getItem("armourData"));
    update({"Helmets": version})

    if (version == "Other") {
        setHelmetsSelection(version)
    } else if (storedData["Helmets"] == "Other") {
        setHelmetsSelection(version)
    }
}

function setHelmetsSelection(version) {
    document.getElementById("helmets").innerHTML = "";
    if (version == "Other") {
        helmets.innerHTML = `<select class="form-select form-select-sm" id="Helmet" name="Helmet" type="armour">
      <option value="---">---</option>
      <option value="Dynamo Helmet">Dynamo Helmet</option>
      <option value="Overwatch Helmet">Overwatch Helmet</option>
      <option value="Mastodon Helm">Mastodon Helm</option>
      <option value="Vulkan Helmet">Vulkan Helmet</option>
      <option value="Mako Helmet">Mako Helmet</option>
      <option value="Clown Helm">Clown Helm</option>
    </select>`
    } else {
        helmets.innerHTML = `<select class="form-select form-select-sm" id="Helmet" name="Helmet" type="armour">
    <option value="---">---</option>
    <option value="HVM Kevlar Helmet">HVM Kevlar Helmet</option>
    <option value="HVM Carbon Fibre Helmet">HVM Carbon Fibre Helmet</option>
    <option value="Trooper Helmet">Trooper Helmet</option>
    <option value="Special Forces Helmet">Special Forces Helmet</option>
    <option value="Hardplate Helm">Hardplate Helm</option>
    <option value="Shotlite Hummingbird H1">Shotlite Hummingbird H1</option>
    <option value="Dragonfly Helmet">Dragonfly Helmet</option>
    <option value="R1 Interceptor Helm">R1 Interceptor Helm</option>
    <option value="Graphene Combat Hood">Graphene Combat Hood</option>
    <option value="Titan IRN HUD">Titan IRN HUD</option>
    <option value="Medusa Helmet">Medusa Helmet</option>
  </select>`
    }
}

function setVests(version) {
    let storedData = JSON.parse(sessionStorage.getItem("armourData"));
    update({"Vests": version})

    if (version == "Other") {
        setVestsSelection(version)
    } else if (storedData["Vests"] == "Other") {
        setVestsSelection(version)
    }
}

function setVestsSelection(version) {
    document.getElementById("vests").innerHTML = "";
    if (version == "Other") {
        vests.innerHTML = `<select class="form-select form-select-sm" id="Vest" name="Vest" type="armour">
    <option value="---">---</option>
    <option value="Dynamo Chest">Dynamo Chest</option>
    <option value="Overwatch Chest">Overwatch Chest</option>
    <option value="Mastodon Chest">Mastodon Chest</option>
    <option value="Vulkan Vest">Vulkan Vest</option>
    <option value="Mako Vest">Mako Vest</option>
    </select>`
    } else {
        vests.innerHTML = `<select class="form-select form-select-sm" id="Vest" name="Vest" type="armour">
    <option value="---">---</option>
    <option value="HVM Kevlar Vest">HVM Kevlar Vest</option>
    <option value="HVM Carbon Fibre Vest">HVM Carbon Fibre Vest</option>
    <option value="Trooper Vest">Trooper Vest</option>
    <option value="Special Forces Vest">Special Forces Vest</option>
    <option value="Hardplate Chest">Hardplate Chest</option>
    <option value="Rubicon Power Assist">Rubicon Power Assist</option>
    <option value="Heavy Trooper Vest">Heavy Trooper Vest</option>
    <option value="Shotlite Hummingbird V1">Shotlite Hummingbird V1</option>
    <option value="Dragonfly Vest">Dragonfly Vest</option>
    <option value="R4 Guardian Vest">R4 Guardian Vest</option>
    <option value="Graphene Body Suit Top">Graphene Body Suit Top</option>
    <option value="Titan Teslashock">Titan Teslashock</option>
    <option value="Medusa Vest">Medusa Vest</option>
    </select>`
    }
}

function setGloves(version) {
    let storedData = JSON.parse(sessionStorage.getItem("armourData"));
    update({"Gloves": version})

    if (version == "Other") {
        setGlovesSelection(version)
    } else if (storedData["Gloves"] == "Other") {
        setGlovesSelection(version)
    }
}

function setGlovesSelection(version) {
    document.getElementById("gloves").innerHTML = "";
    if (version == "Other") {
        gloves.innerHTML = `<select class="form-select form-select-sm" id="Glove" name="Gloves" type="armour">
    <option value="---">---</option>
    <option value="Dynamo Gloves">Dynamo Gloves</option>
    <option value="Overwatch Gloves">Overwatch Gloves</option>
    <option value="Mastodon Gauntlets">Mastodon Gauntlets</option>
    <option value="Vulkan Gloves">Vulkan Gloves</option>
    <option value="Mako Gloves">Mako Gloves</option>
    </select>`
    } else {
        gloves.innerHTML = `<select class="form-select form-select-sm" id="Glove" name="Gloves" type="armour">
    <option value="---" selected="selected">---</option>
    <option value="HVM Kevlar Gloves">HVM Kevlar Gloves</option>
    <option value="HVM Carbon Fibre Gloves">HVM Carbon Fibre Gloves</option>
    <option value="Trooper Gloves">Trooper Gloves</option>
    <option value="Special Forces Gloves">Special Forces Gloves</option>
    <option value="Hardplate Gauntlets">Hardplate Gauntlets</option>
    <option value="Shotlite Hummingbird G1">Shotlite Hummingbird G1</option>
    <option value="Dragonfly Gloves">Dragonfly Gloves</option>
    <option value="R6 Flamejuggler Gloves">R6 Flamejuggler Gloves</option>
    <option value="Graphene Gloves">Graphene Gloves</option>
    <option value="Titan IDS 01">Titan IDS 01</option>
    <option value="Medusa Gloves">Medusa Gloves</option>
    </select>`
    }
}

function setPants(version) {
    let storedData = JSON.parse(sessionStorage.getItem("armourData"));
    update({"Pants": version})

    if (version == "Other") {
        setPantsSelection(version)
    } else if (storedData["Pants"] == "Other") {
        setPantsSelection(version)
    }
}

function setPantsSelection(version) {
    document.getElementById("pants").innerHTML = "";
    if (version == "Other") {
        pants.innerHTML = `<select class="form-select form-select-sm" id="Pant" name="Pants" type="armour">
      <option value="---">---</option>
      <option value="Dynamo Legs">Dynamo Legs</option>
      <option value="Overwatch Pants">Overwatch Pants</option>
      <option value="Mastodon Legs">Mastodon Legs</option>
      <option value="Vulkan Pants">Vulkan Pants</option>
      <option value="Mako Pants">Mako Pants</option>
    </select>`
    } else {
        pants.innerHTML = `<select class="form-select form-select-sm" id="Pant" name="Pants" type="armour">
      <option value="---">---</option>
      <option value="HVM Kevlar Pants">HVM Kevlar Pants</option>
      <option value="HVM Carbon Fibre Pants">HVM Carbon Fibre Pants</option>
      <option value="Trooper Pants">Trooper Pants</option>
      <option value="Special Forces Pants">Special Forces Pants</option>
      <option value="Hardplate Leg Protection">Hardplate Leg Protection</option>
      <option value="Shotlite Hummingbird P1">Shotlite Hummingbird P1</option>
      <option value="Dragonfly Pants">Dragonfly Pants</option>
      <option value="R7 Guardian Pants">R7 Guardian Pants</option>
      <option value="Graphene Body Suit Bottom">Graphene Body Suit Bottom</option>
      <option value="Titan MEM Trooper">Titan MEM Trooper</option>
      <option value="Medusa Pants">Medusa Pants</option>
    </select>`
    }
}

function setBoots(version) {
    let storedData = JSON.parse(sessionStorage.getItem("armourData"));
    update({"Boots": version})

    if (version == "Other") {
        setBootsSelection(version)
    } else if (storedData["Boots"] == "Other") {
        setBootsSelection(version)
    }
}

function setBootsSelection(version) {
    document.getElementById("boots").innerHTML = "";
    if (version == "Other") {
        boots.innerHTML = `<select class="form-select form-select-sm" id="Boot" name="Boots" type="armour">
      <option value="---">---</option>
      <option value="Dynamo Boots">Dynamo Boots</option>
      <option value="Overwatch Boots">Overwatch Boots</option>
      <option value="Mastodon Boots">Mastodon Boots</option>
      <option value="Vulkan Boots">Vulkan Boots</option>
      <option value="Mako Boots">Mako Boots</option>
    </select>`
    } else {
        boots.innerHTML = `<select class="form-select form-select-sm" id="Boot" name="Boots" type="armour">
      <option value="---" selected="selected">---</option>
      <option value="HVM Combat Boots">HVM Combat Boots</option>
      <option value="HVM Carbon Fibre Boots">HVM Carbon Fibre Boots</option>
      <option value="Trooper Boots">Trooper Boots</option>
      <option value="Special Forces Boots">Special Forces Boots</option>
      <option value="Hardplate Boots">Hardplate Boots</option>
      <option value="Shotlite Starwalk Boots">Shotlite Starwalk Boots</option>
      <option value="Dragonfly Boots">Dragonfly Boots</option>
      <option value="R8 Huntsman Boots">R8 Huntsman Boots</option>
      <option value="Graphene Boots">Graphene Boots</option>
      <option value="Titan MEM Sprint">Titan MEM Sprint</option>
      <option value="Medusa Boots">Medusa Boots</option>
    </select>`
    }
}

document.addEventListener('readystatechange', event => {
    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..
        $("#MobileView").prop("checked", mobileCheck())
        if (pageAccessedByReload) {
            let storedData = JSON.parse(sessionStorage.getItem("armourData"));
            setHelmetsSelection(storedData["Helmets"])
            setVestsSelection(storedData["Vests"])
            setGlovesSelection(storedData["Gloves"])
            setPantsSelection(storedData["Pants"])
            setBootsSelection(storedData["Boots"])
        } else {
            setHelmetsSelection("Normal")
            setVestsSelection("Normal")
            setGlovesSelection("Normal")
            setPantsSelection("Normal")
            setBootsSelection("Normal")
            let data = {"Helmets": "null", "Vests": "null", "Gloves": "null", "Pants": "null", "Boots": "null"}
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
}
;

const pageAccessedByReload = (
        (window.performance.navigation && window.performance.navigation.type === 1) ||
        window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload')
        );
