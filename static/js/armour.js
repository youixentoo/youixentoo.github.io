function getArmour(){
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


  if(helmRes != undefined){
    var helmResists = calcHelmResists(helmRes, bae);
  }else{
    var helmResists = {"Fortified": 0, "Heat Resistant": 0, "Hazchem": 0}
  }

  if(vestRes != undefined){
    var vestResists = calcVestResists(vestRes, bae, checkboxValues);
  }else{
    var vestResists = {"Fortified": 0, "Heat Resistant": 0, "Hazchem": 0}
  }

  if(gloveRes != undefined){
    var glovesResists = calcGlovesResists(gloveRes, bae, checkboxValues);
  }else{
    var glovesResists = {"Fortified": 0, "Heat Resistant": 0, "Hazchem": 0}
  }

  if(pantRes != undefined){
    var pantsResists = calcPantsResists(pantRes, bae, checkboxValues);
  }else{
    var pantsResists = {"Fortified": 0, "Heat Resistant": 0, "Hazchem": 0}
  }

  if(bootRes != undefined){
    var bootsResists = calcBootsResists(bootRes, bae, checkboxValues);
  }else{
    var bootsResists = {"Fortified": 0, "Heat Resistant": 0, "Hazchem": 0}
  }

  //TODO: Ask what the 24,40,12,24,12 numbers are about (armourMod)
  //TODO: % calculation
  //TODO: Output visualisation

  document.getElementById("mod").innerHTML = "";
  mod.innerHTML = `<b>${$("#versionHelm option:selected").val()} ${$("#Helmet option:selected").val()}:</b> Fortified ${helmResists["Fortified"]}, Heat: ${helmResists["Heat Resistant"]}, Hazchem: ${helmResists["Hazchem"]}<br>
                   <b>${$("#versionVest option:selected").val()} ${$("#Vest option:selected").val()}:</b> Fortified ${vestResists["Fortified"]}, Heat: ${vestResists["Heat Resistant"]}, Hazchem: ${vestResists["Hazchem"]}<br>
                   <b>${$("#versionGloves option:selected").val()} ${$("#Boot option:selected").val()}:</b> Fortified ${glovesResists["Fortified"]}, Heat: ${glovesResists["Heat Resistant"]}, Hazchem: ${glovesResists["Hazchem"]}<br>
                   <b>${$("#versionPants option:selected").val()} ${$("#Pant option:selected").val()}:</b> Fortified ${pantsResists["Fortified"]}, Heat: ${pantsResists["Heat Resistant"]}, Hazchem: ${pantsResists["Hazchem"]}<br>
                   <b>${$("#versionBoots option:selected").val()} ${$("#Boot option:selected").val()}:</b> Fortified ${bootsResists["Fortified"]}, Heat: ${bootsResists["Heat Resistant"]}, Hazchem: ${bootsResists["Hazchem"]}<br>`;
}


function calcHelmResists(helmRes, bae){
  var helmMast = $('input[name="helmetMast"]').val();
  if(helmMast == 5){
    var addRes = [100,100,100]
  }else{
    var addRes = [0,0,0]
  }

  let helmResists = calcResists(helmRes, [$("#helmAug1 option:selected").val(), $("#helmAugLv1").val()],
                                         [$("#helmAug2 option:selected").val(), $("#helmAugLv2").val()],
                                         [$("#helmAug3 option:selected").val(), $("#helmAugLv3").val()],
                                         bae, $('input[name="helmetCore"]').val(), addRes, 24)
  return helmResists;
}

function calcVestResists(vestRes, bae, checkboxValues){
  var vestMast = $('input[name="vestMast"]').val();
  if(vestMast == 5){
    var addRes = [250,200,200]
  }else if(vestMast > 0){
    var addRes = [50,0,0]
  }else{
    var addRes = [0,0,0]
  }

  if($.inArray("vestNormal", checkboxValues) != -1){
    let previousVal = addRes[0]
    addRes.splice(0,1,previousVal+50)
  }

  if($.inArray("vestBlack", checkboxValues) != -1){
    let previousVal = addRes[0]
    addRes.splice(0,1,previousVal+250)
  }

  let vestResists = calcResists(vestRes, [$("#vestAug1 option:selected").val(), $("#vestAugLv1").val()],
                                         [$("#vestAug2 option:selected").val(), $("#vestAugLv2").val()],
                                         [$("#vestAug3 option:selected").val(), $("#vestAugLv3").val()],
                                         bae, $('input[name="vestCore"]').val(), addRes, 40)

  return vestResists;
}

function calcGlovesResists(glovesRes, bae, checkboxValues){
  var glovesMast = $('input[name="glovesMast"]').val();
  if(glovesMast == 5){
    var addRes = [100,100,125]
  }else if(glovesMast > 0){
    var addRes = [0,0,25]
  }else{
    var addRes = [0,0,0]
  }

  if($.inArray("glovesNormal", checkboxValues) != -1){
    let previousVal = addRes[1]
    addRes.splice(1,1,previousVal+50)
  }


  let glovesResists = calcResists(glovesRes, [$("#glovesAug1 option:selected").val(), $("#glovesAugLv1").val()],
                                         [$("#glovesAug2 option:selected").val(), $("#glovesAugLv2").val()],
                                         [$("#glovesAug3 option:selected").val(), $("#glovesAugLv3").val()],
                                         bae, $('input[name="glovesCore"]').val(), addRes, 12)
  return glovesResists;
}

function calcPantsResists(pantsRes, bae, checkboxValues){
  var pantsMast = $('input[name="pantsMast"]').val();
  if(pantsMast == 5){
    var addRes = [100,150,100]
  }else if(pantsMast > 0){
    var addRes = [0,50,0]
  }else{
    var addRes = [0,0,0]
  }

  if($.inArray("pantsBlack", checkboxValues) != -1){
    let previousVal = addRes[1]
    addRes.splice(1,1,previousVal+250)
  }

  let pantsResists = calcResists(pantsRes, [$("#pantsAug1 option:selected").val(), $("#pantsAugLv1").val()],
                                         [$("#pantsAug2 option:selected").val(), $("#pantsAugLv2").val()],
                                         [$("#pantsAug3 option:selected").val(), $("#pantsAugLv3").val()],
                                         bae, $('input[name="pantsCore"]').val(), addRes, 24)
  return pantsResists;
}

function calcBootsResists(bootsRes, bae, checkboxValues){
  var bootsMast = $('input[name="bootsMast"]').val();
  if(bootsMast == 5){
    var addRes = [100,100,125]
  }else if(bootsMast == 1){
    var addRes = [0,0,25]
  }else if(bootsMast > 1){
    var addRes = [0,25,25]
  }else{
    var addRes = [0,0,0]
  }

  if($.inArray("bootsNormal", checkboxValues) != -1){
    let previousVal = addRes[2]
    addRes.splice(2,1,previousVal+50)
  }

  if($.inArray("bootsBlack", checkboxValues) != -1){
    let previousVal = addRes[2]
    addRes.splice(2,1,previousVal+250)
  }


  let bootsResists = calcResists(bootsRes, [$("#bootsAug1 option:selected").val(), $("#bootsAugLv1").val()],
                                         [$("#bootsAug2 option:selected").val(), $("#bootsAugLv2").val()],
                                         [$("#bootsAug3 option:selected").val(), $("#bootsAugLv3").val()],
                                         bae, $('input[name="bootsCore"]').val(), addRes, 12)
  return bootsResists;
}



function calcResists(armourBaseFHC, aug1_lv, aug2_lv, aug3_lv, bae, core, addedResFHC, armourMod){
  var fortified = 0;
  var heatRes = 0;
  var hazchem = 0;
  if($.inArray(aug1_lv[0], ["Fortified", "Heat Resistant", "Hazchem"]) != -1){
    var resType1 = aug1_lv[0];
    var resLv1 = aug1_lv[1];
    var res1 = singleResist(armourBaseFHC, armourMod, resType1, resLv1, bae, core, 0)
    if(res1[0] == "Fortified"){
      fortified = res1[1]
    }else if(res1[0] == "Heat Resistant"){
      heatRes = res1[1]
    }else{
      hazchem = res1[1]
    }
  }

  if($.inArray(aug2_lv[0], ["Fortified", "Heat Resistant", "Hazchem"]) != -1){
    var resType2 = aug2_lv[0];
    var resLv2 = aug2_lv[1];
    var res2 = singleResist(armourBaseFHC, armourMod, resType2, resLv2, bae, core, 0)
    if(res2[0] == "Fortified"){
      fortified = res2[1]
    }else if(res2[0] == "Heat Resistant"){
      heatRes = res2[1]
    }else{
      hazchem = res2[1]
    }
  }

  if($.inArray(aug3_lv[0], ["Fortified", "Heat Resistant", "Hazchem"]) != -1){
    var resType3 = aug3_lv[0];
    var resLv3 = aug3_lv[1];
    var res3 = singleResist(armourBaseFHC, armourMod, resType3, resLv3, bae, core, 0)
    if(res3[0] == "Fortified"){
      fortified = res3[1]
    }else if(res3[0] == "Heat Resistant"){
      heatRes = res3[1]
    }else{
      hazchem = res3[1]
    }
  }

  if(fortified == 0){
    fortified = armourBaseFHC[0]*(1+0.07*bae)
  }
  if(heatRes == 0){
    heatRes = armourBaseFHC[1]*(1+0.07*bae)
  }
  if(hazchem == 0){
    hazchem = armourBaseFHC[2]*(1+0.07*bae)
  }

  return {"Fortified": fortified+addedResFHC[0], "Heat Resistant": heatRes+addedResFHC[1], "Hazchem": hazchem+addedResFHC[2]}
}


function singleResist(armourBaseFHC, armourMod, resType, resLv, bae, core, addedRes){
  var resists = 0;
  if(resType == "Fortified"){
    if(resLv > 5){
      var resAugs = armourBaseFHC[0]*((0.3*resLv+0.5)+(0.05*core))+(armourMod*resLv)
      resists = (1+0.07*bae)*resAugs+addedRes
    }else{
      var resAugs = armourBaseFHC[0]*((0.2*resLv+1)+(0.05*core))+(armourMod*resLv)
      resists = (1+0.07*bae)*resAugs+addedRes
    }
  }else if(resType == "Heat Resistant"){
    if(resLv > 5){
      var resAugs = armourBaseFHC[1]*((0.3*resLv+0.5)+(0.05*core))+(armourMod*resLv)
      resists = (1+0.07*bae)*resAugs+addedRes
    }else{
      var resAugs = armourBaseFHC[1]*((0.2*resLv+1)+(0.05*core))+(armourMod*resLv)
      resists = (1+0.07*bae)*resAugs+addedRes
    }
  }else{
    if(resLv > 4){
      var resAugs = armourBaseFHC[2]*((0.4*resLv+0.6)+(0.05*core))+(armourMod*resLv)
      resists = (1+0.07*bae)*resAugs+addedRes
    }else{
      var resAugs = armourBaseFHC[2]*((0.3*resLv+1)+(0.05*core))+(armourMod*resLv)
      resists = (1+0.07*bae)*resAugs+addedRes
    }
  }
  return [resType, resists]
}



function setHelmets(version){
  document.getElementById("helmets").innerHTML = "";
  if(version == "Faction"){
    helmets.innerHTML = `<select id="Helmet" name="Helmet" type="armour">
      <option value="---" selected="selected">---</option>
      <option value="Dynamo Helmet">Dynamo Helmet</option>
      <option value="Overwatch Helmet">Overwatch Helmet</option>
      <option value="Mastodon Helm">Mastodon Helm</option>
      <option value="Vulkan Helmet">Vulkan Helmet</option>
      <option value="Mako Helmet">Mako Helmet</option>
    </select>`
  }else{
    helmets.innerHTML = `<select id="Helmet" name="Helmet" type="armour">
      <option value="---" selected="selected">---</option>
      <option value="HVM Kevlar Helmet">HVM Kevlar Helmet</option>
      <option value="HVM Carbon Fibre Helmet">HVM Carbon Fibre Helmet</option>
      <option value="Trooper Helmet">Trooper Helmet</option>
      <option value="Special Forces Helmet">Special Forces Helmet</option>
      <option value="Hardplate Helm">Hardplate Helm</option>
      <option value="Shotlite Hummingbird H1">Shotlite Hummingbird H1</option>
      <option value="Dragonfly Helmet">Dragonfly Helmet</option>
      <option value="R1 Interceptor Helm">R1 Interceptor Helm</option>
      <option value="Graphene Combat Hood">Graphene Combat Hood</option>
      <option value="Titan IRN HUD" selected>Titan IRN HUD</option>
      <option value="Medusa Helmet">Medusa Helmet</option>
    </select>`
  }
}

function setVests(version){
  document.getElementById("vests").innerHTML = "";
  if(version == "Faction"){
    vests.innerHTML = `<select id="Vest" name="Vest" type="armour">
    <option value="---" selected="selected">---</option>
    <option value="Dynamo Chest">Dynamo Chest</option>
    <option value="Overwatch Chest" selected>Overwatch Chest</option>
    <option value="Mastodon Chest">Mastodon Chest</option>
    <option value="Vulkan Vest">Vulkan Vest</option>
    <option value="Mako Vest">Mako Vest</option>
    </select>`
  }else{
    vests.innerHTML = `<select id="Vest" name="Vest" type="armour">
    <option value="---" selected="selected">---</option>
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

function setGloves(version){
  document.getElementById("gloves").innerHTML = "";
  if(version == "Faction"){
    gloves.innerHTML = `<select id="Glove" name="Gloves" type="armour">
    <option value="---" selected="selected">---</option>
    <option value="Dynamo Gloves">Dynamo Gloves</option>
    <option value="Overwatch Gloves">Overwatch Gloves</option>
    <option value="Mastodon Gauntlets">Mastodon Gauntlets</option>
    <option value="Vulkan Gloves">Vulkan Gloves</option>
    <option value="Mako Gloves">Mako Gloves</option>
    </select>`
  }else{
    gloves.innerHTML = `<select id="Glove" name="Gloves" type="armour">
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
    <option value="Titan IDS 01" selected>Titan IDS 01</option>
    <option value="Medusa Gloves">Medusa Gloves</option>
    </select>`
  }
}

function setPants(version){
  document.getElementById("pants").innerHTML = "";
  if(version == "Faction"){
    pants.innerHTML = `<select id="Pant" name="Pants" type="armour">
      <option value="---" selected="selected">---</option>
      <option value="Dynamo Legs">Dynamo Legs</option>
      <option value="Overwatch Pants">Overwatch Pants</option>
      <option value="Mastodon Legs">Mastodon Legs</option>
      <option value="Vulkan Pants">Vulkan Pants</option>
      <option value="Mako Pants">Mako Pants</option>
    </select>`
  }else{
    pants.innerHTML = `<select id="Pant" name="Pants" type="armour">
      <option value="---" selected="selected">---</option>
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
      <option value="Medusa Pants" selected>Medusa Pants</option>
    </select>`
  }
}

function setBoots(version){
  document.getElementById("boots").innerHTML = "";
  if(version == "Faction"){
    boots.innerHTML = `<select id="Boot" name="Boots" type="armour">
      <option value="---" selected="selected">---</option>
      <option value="Dynamo Boots">Dynamo Boots</option>
      <option value="Overwatch Boots">Overwatch Boots</option>
      <option value="Mastodon Boots">Mastodon Boots</option>
      <option value="Vulkan Boots">Vulkan Boots</option>
      <option value="Mako Boots">Mako Boots</option>
    </select>`
  }else{
    boots.innerHTML = `<select id="Boot" name="Boots" type="armour">
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
      <option value="Titan MEM Sprint" selected>Titan MEM Sprint</option>
      <option value="Medusa Boots">Medusa Boots</option>
    </select>`
  }
}


document.addEventListener('readystatechange', event => {
    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..
        setHelmets("Black")
        setVests("Faction")
        setGloves("Black")
        setPants("Black")
        setBoots("Black")
    }
});
