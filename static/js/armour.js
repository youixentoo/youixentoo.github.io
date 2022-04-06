function getArmour(){
  var armourData = armourJSON()

  var selectedVerHelm = 8;
  var selectedVerVest = $("#versionVest option:selected").val();
  var selectedVerGloves = $("#versionGloves option:selected").val();
  var selectedVerPants = $("#versionPants option:selected").val();
  var selectedVerBoots = $("#versionBoots option:selected").val();

  var helm = armourData["Helmet"][$("#versionHelm option:selected").val()][$("#Helmet option:selected").val()]
  console.log(helm)
  document.getElementById("mod").innerHTML = "";
  mod.innerHTML = `${$("#versionHelm option:selected").val()} ${$("#Helmet option:selected").val()} resists: ${helm}`;
}


function setHelmets(version){
  document.getElementById("helmets").innerHTML = "";
  if(version == "Faction"){
    helmets.innerHTML = `<select id="Helmet" name="Helmet">
      <option value="---" selected="selected">---</option>
      <option value="Dynamo Helmet">Dynamo Helmet</option>
      <option value="Overwatch Helmet">Overwatch Helmet</option>
      <option value="Mastodon Helm">Mastodon Helm</option>
      <option value="Vulkan Helmet">Vulkan Helmet</option>
      <option value="Mako Helmet">Mako Helmet</option>
    </select>`
  }else{
    helmets.innerHTML = `<select id="Helmet" name="Helmet">
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
      <option value="Titan IRN HUD">Titan IRN HUD</option>
      <option value="Medusa Helmet">Medusa Helmet</option>
    </select>`
  }
}

function setVests(version){
  document.getElementById("vests").innerHTML = "";
  if(version == "Faction"){
    vests.innerHTML = `<select id="Vest" name="Vest">
    <option value="---" selected="selected">---</option>
    <option value="Dynamo Chest">Dynamo Chest</option>
    <option value="Overwatch Chest">Overwatch Chest</option>
    <option value="Mastodon Chest">Mastodon Chest</option>
    <option value="Vulkan Vest">Vulkan Vest</option>
    <option value="Mako Vest">Mako Vest</option>
    </select>`
  }else{
    vests.innerHTML = `<select id="Vest" name="Vest">
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
    gloves.innerHTML = `<select id="Glove" name="Gloves">
    <option value="---" selected="selected">---</option>
    <option value="Dynamo Gloves">Dynamo Gloves</option>
    <option value="Overwatch Gloves">Overwatch Gloves</option>
    <option value="Mastodon Gauntlets">Mastodon Gauntlets</option>
    <option value="Vulkan Gloves">Vulkan Gloves</option>
    <option value="Mako Gloves">Mako Gloves</option>
    </select>`
  }else{
    gloves.innerHTML = `<select id="Glove" name="Gloves">
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

function setPants(version){
  document.getElementById("pants").innerHTML = "";
  if(version == "Faction"){
    pants.innerHTML = `<select id="Pant" name="Pants">
      <option value="---" selected="selected">---</option>
      <option value="Dynamo Legs">Dynamo Legs</option>
      <option value="Overwatch Pants">Overwatch Pants</option>
      <option value="Mastodon Legs">Mastodon Legs</option>
      <option value="Vulkan Pants">Vulkan Pants</option>
      <option value="Mako Pants">Mako Pants</option>
    </select>`
  }else{
    pants.innerHTML = `<select id="Pant" name="Pants">
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
      <option value="Medusa Pants">Medusa Pants</option>
    </select>`
  }
}

function setBoots(version){
  document.getElementById("boots").innerHTML = "";
  if(version == "Faction"){
    boots.innerHTML = `<select id="Boot" name="Boots">
      <option value="---" selected="selected">---</option>
      <option value="Dynamo Boots">Dynamo Boots</option>
      <option value="Overwatch Boots">Overwatch Boots</option>
      <option value="Mastodon Boots">Mastodon Boots</option>
      <option value="Vulkan Boots">Vulkan Boots</option>
      <option value="Mako Boots">Mako Boots</option>
    </select>`
  }else{
    boots.innerHTML = `<select id="Boot" name="Boots">
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
        setHelmets("Normal")
        setVests("Normal")
        setGloves("Normal")
        setPants("Normal")
        setBoots("Normal")
    }
});
