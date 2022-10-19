


function getPrices(){
  const banned = ["Z-1 Assault", "Z-2 LMP", "Z-5 Heavy", "Helter-Skelter"]
  const weaponData = priceJSON()

  let weaponVersion = $('input[name="version"]:checked').val();
  let weaponName = $('select[name="gun_name"] option:selected').val();

  if(banned.includes(weaponName)) {
    outputPrices.innerHTML = "<b>This gun is not supported</b>"
    return
  }

  let basePrice;
  try{
    if(weaponVersion == "Black"){
      basePrice = weaponData[weaponName]["Red"] * 2;
    }else{
      basePrice = weaponData[weaponName][weaponVersion]
    }
  }catch(e) {
    if (e instanceof TypeError) {
      document.getElementById("outputPrices").innerHTML = "";
      outputPrices.innerHTML = "<b>Premiums don't have augment costs</b>"
      return
  }else{
    console.log(e);
  }
}


  document.getElementById("outputPrices").innerHTML = "";
  outputPrices.innerHTML = augPriceTable(basePrice);

  // console.log(roundNumber(basePrice);
}

function augPriceTable(basePrice){
  return `<div class="table-responsive">
  <table class="table align-middle">
  <thead class="table-secondary align-middle">
    <tr>
      <th class="border-secondary"></th>
      <th class="border-secondary">1</th>
      <th class="border-secondary">2</th>
      <th class="border-secondary">3</th>
      <th class="border-secondary">4</th>
      <th class="border-secondary">5</th>
      <th class="border-secondary">6</th>
      <th class="border-secondary">7</th>
      <th class="border-secondary">8</th>
      <th class="border-secondary">9</th>
      <th class="border-secondary">10</th>
      <th class="border-secondary">11</th>
      <th class="border-secondary">12</th>
    </tr>
  </thead>
  <tbody class="table-light">
      <tr>
          <th scope="row">Deadly</th>
          ${Deadly_OC_Enl(basePrice/5)}
      </tr>
      <tr>
          <th scope="row">Overclocked</th>
          ${Deadly_OC_Enl(basePrice/5)}
      </tr>
      <tr>
          <th scope="row">Tenacious</th>
          ${tena(basePrice/10)}
      </tr>
      <tr>
          <th scope="row">Adaptive</th>
          ${adap(basePrice/20)}
      </tr>
      <tr>
          <th scope="row">Capacity</th>
          ${skel_cap_race(basePrice/10)}
      </tr>
      <tr>
          <th scope="row">Pinpoint</th>
          ${pin(basePrice/10)}
      </tr>
      <tr>
          <th scope="row">Piercing</th>
          ${pierce(basePrice/5)}
      </tr>
      <tr>
          <th scope="row">Skeletonised</th>
          ${skel_cap_race(basePrice/10)}
      </tr>
      <tr>
          <th scope="row">Biosynthesis</th>
          ${bio(basePrice/10)}
      </tr>
      <tr>
          <th scope="row">Enlarged</th>
          ${Deadly_OC_Enl(basePrice/5)}
      </tr>
      <tr>
          <th scope="row">Race Modded</th>
          ${skel_cap_race(basePrice/10)}
      </tr>
  </tbody>
</table>
</div>`
}

function Deadly_OC_Enl(basePrice){
  return `<td>${roundNumber(basePrice*1)}<br>${roundNumber(basePrice*1)}</td>
          <td>${roundNumber(basePrice*2)}<br>${roundNumber(basePrice*3)}</td>
          <td>${roundNumber(basePrice*6)}<br>${roundNumber(basePrice*9)}</td>
          <td>${roundNumber(basePrice*7)}<br>${roundNumber(basePrice*16)}</td>
          <td>${roundNumber(basePrice*10)}<br>${roundNumber(basePrice*26)}</td>
          <td>${roundNumber(basePrice*13.5)}<br>${roundNumber(basePrice*39.5)}</td>
          <td>${roundNumber(basePrice*17)}<br>${roundNumber(basePrice*56.5)}</td>
          <td>${roundNumber(basePrice*22)}<br>${roundNumber(basePrice*78.5)}</td>
          <td>${roundNumber(basePrice*26)}<br>${roundNumber(basePrice*104.5)}</td>
          <td>${roundNumber(basePrice*30)}<br>${roundNumber(basePrice*134.5)}</td>
          <td>${roundNumber(basePrice*30)}<br>${roundNumber(basePrice*164.5)}</td>
          <td>${roundNumber(basePrice*30)}<br>${roundNumber(basePrice*194.5)}</td>
  `
}


function skel_cap_race(basePrice){
  return `<td>${roundNumber(basePrice*1)}<br>${roundNumber(basePrice*1)}</td>
          <td>${roundNumber(basePrice*2)}<br>${roundNumber(basePrice*3)}</td>
          <td>${roundNumber(basePrice*6)}<br>${roundNumber(basePrice*9)}</td>
          <td>${roundNumber(basePrice*8)}<br>${roundNumber(basePrice*17)}</td>
          <td>${roundNumber(basePrice*10)}<br>${roundNumber(basePrice*27)}</td>
          <td>${roundNumber(basePrice*14)}<br>${roundNumber(basePrice*41)}</td>
          <td>${roundNumber(basePrice*17)}<br>${roundNumber(basePrice*58)}</td>
          <td>${roundNumber(basePrice*22)}<br>${roundNumber(basePrice*80)}</td>
          <td>${roundNumber(basePrice*26)}<br>${roundNumber(basePrice*106)}</td>
          <td>${roundNumber(basePrice*30)}<br>${roundNumber(basePrice*136)}</td>
          <td>${roundNumber(basePrice*30)}<br>${roundNumber(basePrice*166)}</td>
          <td>${roundNumber(basePrice*30)}<br>${roundNumber(basePrice*196)}</td>
  `
}

function adap(basePrice){
  return `<td>${roundNumber(basePrice*1)}<br>${roundNumber(basePrice*1)}</td>
          <td>${roundNumber(basePrice*1.6)}<br>${roundNumber(basePrice*2.6)}</td>
          <td>${roundNumber(basePrice*4.8)}<br>${roundNumber(basePrice*7.4)}</td>
          <td>${roundNumber(basePrice*7.2)}<br>${roundNumber(basePrice*14.6)}</td>
          <td>${roundNumber(basePrice*9.6)}<br>${roundNumber(basePrice*24.2)}</td>
          <td>${roundNumber(basePrice*12.4)}<br>${roundNumber(basePrice*36.6)}</td>
          <td>${roundNumber(basePrice*15.2)}<br>${roundNumber(basePrice*51.8)}</td>
          <td>${roundNumber(basePrice*18.4)}<br>${roundNumber(basePrice*70.2)}</td>
          <td>${roundNumber(basePrice*21.6)}<br>${roundNumber(basePrice*91.8)}</td>
          <td>${roundNumber(basePrice*25.2)}<br>${roundNumber(basePrice*117)}</td>
          <td>${roundNumber(basePrice*25.2)}<br>${roundNumber(basePrice*142.2)}</td>
          <td>${roundNumber(basePrice*25.2)}<br>${roundNumber(basePrice*167.4)}</td>
  `
}

function pin(basePrice){
  return `<td>${roundNumber(basePrice*1)}<br>${roundNumber(basePrice*1)}</td>
          <td>${roundNumber(basePrice*2.5)}<br>${roundNumber(basePrice*3.5)}</td>
          <td>${roundNumber(basePrice*4.5)}<br>${roundNumber(basePrice*8)}</td>
          <td>${roundNumber(basePrice*7)}<br>${roundNumber(basePrice*15)}</td>
          <td>${roundNumber(basePrice*10)}<br>${roundNumber(basePrice*25)}</td>
          <td>${roundNumber(basePrice*13.5)}<br>${roundNumber(basePrice*38.5)}</td>
          <td>${roundNumber(basePrice*17)}<br>${roundNumber(basePrice*55.5)}</td>
          <td>${roundNumber(basePrice*22)}<br>${roundNumber(basePrice*77.5)}</td>
          <td>${roundNumber(basePrice*26)}<br>${roundNumber(basePrice*103.5)}</td>
          <td>${roundNumber(basePrice*30)}<br>${roundNumber(basePrice*133.5)}</td>
          <td>${roundNumber(basePrice*30)}<br>${roundNumber(basePrice*163.5)}</td>
          <td>${roundNumber(basePrice*30)}<br>${roundNumber(basePrice*193.5)}</td>
  `
}

function pierce(basePrice){
  return `<td>${roundNumber(basePrice*1)}<br>${roundNumber(basePrice*1)}</td>
          <td>${roundNumber(basePrice*2)}<br>${roundNumber(basePrice*3)}</td>
          <td>${roundNumber(basePrice*6)}<br>${roundNumber(basePrice*9)}</td>
          <td>${roundNumber(basePrice*7)}<br>${roundNumber(basePrice*16)}</td>
          <td>${roundNumber(basePrice*10)}<br>${roundNumber(basePrice*26)}</td>
          <td>${roundNumber(basePrice*13.5)}<br>${roundNumber(basePrice*39.5)}</td>
          <td>${roundNumber(basePrice*17)}<br>${roundNumber(basePrice*56.5)}</td>
          <td>${roundNumber(basePrice*22)}<br>${roundNumber(basePrice*78.5)}</td>
          <td>${roundNumber(basePrice*25.5)}<br>${roundNumber(basePrice*104)}</td>
          <td>${roundNumber(basePrice*30)}<br>${roundNumber(basePrice*134)}</td>
          <td>${roundNumber(basePrice*30)}<br>${roundNumber(basePrice*164)}</td>
          <td>${roundNumber(basePrice*30)}<br>${roundNumber(basePrice*194)}</td>
  `
}

function bio(basePrice){
  return `<td>${roundNumber(basePrice*1)}<br>${roundNumber(basePrice*1)}</td>
          <td>${roundNumber(basePrice*2)}<br>${roundNumber(basePrice*3)}</td>
          <td>${roundNumber(basePrice*3)}<br>${roundNumber(basePrice*6)}</td>
          <td>${roundNumber(basePrice*4)}<br>${roundNumber(basePrice*10)}</td>
          <td>${roundNumber(basePrice*6)}<br>${roundNumber(basePrice*16)}</td>
          <td>${roundNumber(basePrice*8)}<br>${roundNumber(basePrice*24)}</td>
          <td>${roundNumber(basePrice*10)}<br>${roundNumber(basePrice*34)}</td>
          <td>${roundNumber(basePrice*12)}<br>${roundNumber(basePrice*46)}</td>
          <td>${roundNumber(basePrice*14)}<br>${roundNumber(basePrice*60)}</td>
          <td>${roundNumber(basePrice*15)}<br>${roundNumber(basePrice*75)}</td>
          <td>${roundNumber(basePrice*15)}<br>${roundNumber(basePrice*90)}</td>
          <td>${roundNumber(basePrice*15)}<br>${roundNumber(basePrice*105)}</td>
  `
}

function tena(basePrice){
  return `<td>${roundNumber(basePrice*1)}<br>${roundNumber(basePrice*1)}</td>
          <td>${roundNumber(basePrice*2.5)}<br>${roundNumber(basePrice*3.5)}</td>
          <td>${roundNumber(basePrice*9)}<br>${roundNumber(basePrice*12.5)}</td>
          <td>${roundNumber(basePrice*14)}<br>${roundNumber(basePrice*26.5)}</td>
          <td>${roundNumber(basePrice*20)}<br>${roundNumber(basePrice*46.5)}</td>
          <td>${roundNumber(basePrice*27)}<br>${roundNumber(basePrice*73.5)}</td>
          <td>${roundNumber(basePrice*34)}<br>${roundNumber(basePrice*107.5)}</td>
          <td>${roundNumber(basePrice*44)}<br>${roundNumber(basePrice*151.5)}</td>
          <td>${roundNumber(basePrice*52)}<br>${roundNumber(basePrice*203.5)}</td>
          <td>${roundNumber(basePrice*60)}<br>${roundNumber(basePrice*263.5)}</td>
          <td>${roundNumber(basePrice*60)}<br>${roundNumber(basePrice*323.5)}</td>
          <td>${roundNumber(basePrice*60)}<br>${roundNumber(basePrice*383.5)}</td>
  `
}

function roundNumber(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
}


/*
function skel_cap_race(roundNumber(basePrice){
  return `<td>${roundNumber(basePrice*1)}<br>${roundNumber(basePrice*1)}</td>
          <td>${roundNumber(basePrice*)}<br>${roundNumber(basePrice*)}</td>
          <td>${roundNumber(basePrice*)}<br>${roundNumber(basePrice*)}</td>
          <td>${roundNumber(basePrice*)}<br>${roundNumber(basePrice*)}</td>
          <td>${roundNumber(basePrice*)}<br>${roundNumber(basePrice*)}</td>
          <td>${roundNumber(basePrice*)}<br>${roundNumber(basePrice*)}</td>
          <td>${roundNumber(basePrice*)}<br>${roundNumber(basePrice*)}</td>
          <td>${roundNumber(basePrice*)}<br>${roundNumber(basePrice*)}</td>
          <td>${roundNumber(basePrice*)}<br>${roundNumber(basePrice*)}</td>
          <td>${roundNumber(basePrice*)}<br>${roundNumber(basePrice*)}</td>
          <td>${roundNumber(basePrice*)}<br>${roundNumber(basePrice*)}</td>
          <td>${roundNumber(basePrice*)}<br>${roundNumber(basePrice*)}</td>
  `
}
*/
