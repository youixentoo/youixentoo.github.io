function getArmour(){
  var armourData = armourJSON()
  var helm = armourData["Helmet"]["Black"]["Titan IRN HUD"]
  console.log(helm)
  document.getElementById("mod").innerHTML = "";
  mod.innerHTML = `Black titan helm resists: ${helm}`;
}
