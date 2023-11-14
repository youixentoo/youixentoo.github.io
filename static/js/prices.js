
/*
 * Function for displaying weapons or armour
 */
function setPriceType(priceType) {
//    console.log(character);
    if (priceType == "Weapon") {
        setWeaponSelect();
    } else {
        setArmourSelect();
    }
}
;

function getPrices() {
    let storedPriceType = sessionStorage.getItem("priceType");
    const banned = ["Z-1 Assault", "Z-2 LMP", "Z-5 Heavy"]
    const itemData = priceJSON()

    let itemVersion = $('input[name="version"]:checked').val();
    let itemName = $('#itemSelect option:selected').val();
    console.log(itemName)

    if (banned.includes(itemName)) {
        outputPrices.innerHTML = "<b>This item is not supported</b>"
        return
    }

    let basePrice;
    try {
        if (itemVersion == "Black") {
            basePrice = itemData[itemName]["Red"] * 2;
        } else {
            basePrice = itemData[itemName][itemVersion]
        }
    } catch (e) {
        if (e instanceof TypeError) {
            document.getElementById("outputPrices").innerHTML = "";
            outputPrices.innerHTML = "<b>Premiums don't have augment costs</b>"
            return
        } else {
            console.log(e);
        }
    }


    document.getElementById("outputPrices").innerHTML = "";
    if (storedPriceType == "Weapon") {
        outputPrices.innerHTML = augPriceTableWeapon(basePrice);
    } else {
        outputPrices.innerHTML = augPriceTableArmour(basePrice);
    }


    // console.log(roundNumber(basePrice);
}

function augPriceTableWeapon(basePrice) {
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
          ${Deadly_OC_Enl(basePrice / 5)}
      </tr>
      <tr>
          <th scope="row">Overclocked</th>
          ${Deadly_OC_Enl(basePrice / 5)}
      </tr>
      <tr>
          <th scope="row">Tenacious</th>
          ${tena(basePrice / 10)}
      </tr>
      <tr>
          <th scope="row">Adaptive</th>
          ${adap(basePrice / 20)}
      </tr>
      <tr>
          <th scope="row">Capacity</th>
          ${skel_cap_race(basePrice / 10)}
      </tr>
      <tr>
          <th scope="row">Pinpoint</th>
          ${pin(basePrice / 10)}
      </tr>
      <tr>
          <th scope="row">Piercing</th>
          ${pierce(basePrice / 5)}
      </tr>
      <tr>
          <th scope="row">Skeletonised</th>
          ${skel_cap_race(basePrice / 10)}
      </tr>
      <tr>
          <th scope="row">Biosynthesis</th>
          ${bio(basePrice / 10)}
      </tr>
      <tr>
          <th scope="row">Enlarged</th>
          ${Deadly_OC_Enl(basePrice / 5)}
      </tr>
      <tr>
          <th scope="row">Race Modded</th>
          ${skel_cap_race(basePrice / 10)}
      </tr>
  </tbody>
</table>
</div>`
}

function augPriceTableArmour(basePrice) {
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
          <th scope="row">Fortified</th>
          ${armour_high_magenta(basePrice / 20)}
      </tr>
      <tr>
          <th scope="row">Heat Resistant</th>
          ${armour_high_magenta(basePrice / 20)}
      </tr>
      <tr>
          <th scope="row">Hazchem</th>
          ${armour_high_magenta(basePrice / 20)}
      </tr>
      <tr>
          <th scope="row">Machine Assisted</th>
          ${armour_low_yellow(basePrice / 10)}
      </tr>
      <tr>
          <th scope="row">Body Fueling</th>
          ${armour_low_yellow(basePrice / 10)}
      </tr>
      <tr>
          <th scope="row">Nimble</th>
          ${armour_high_magenta(basePrice / 20)}
      </tr>
      <tr>
          <th scope="row">Smart Target</th>
          ${armour_low_yellow(basePrice / 10)}
      </tr>
      <tr>
          <th scope="row">Target Assist</th>
          ${Target_Assist(basePrice / 10)}
      </tr>
      <tr>
          <th scope="row">Tissue Repair</th>
          ${armour_high_magenta(basePrice / 20)}
      </tr>
      <tr>
          <th scope="row">Resuscitating</th>
          ${armour_high_magenta(basePrice / 20)}
      </tr>
      <tr>
          <th scope="row">Revitalising</th>
          ${armour_high_magenta(basePrice / 20)}
      </tr>
      <tr>
          <th scope="row">Energised</th>
          ${armour_high_magenta(basePrice / 20)}
      </tr>
      <tr>
          <th scope="row">CQC Enhanced</th>
          ${armour_high_magenta(basePrice / 20)}
      </tr>
  </tbody>
</table>
</div>`
}

function armour_low_yellow(basePrice) {
    return `<td>${roundNumber(basePrice * 1)}<br>${roundNumber(basePrice * 1)}</td>
          <td>${roundNumber(basePrice * 3)}<br>${roundNumber(basePrice * 4)}</td>
          <td>${roundNumber(basePrice * 5)}<br>${roundNumber(basePrice * 9)}</td>
          <td>${roundNumber(basePrice * 8)}<br>${roundNumber(basePrice * 17)}</td>
          <td>${roundNumber(basePrice * 12)}<br>${roundNumber(basePrice * 29)}</td>
          <td>${roundNumber(basePrice * 16)}<br>${roundNumber(basePrice * 45)}</td>
          <td>${roundNumber(basePrice * 20)}<br>${roundNumber(basePrice * 65)}</td>
          <td>${roundNumber(basePrice * 25)}<br>${roundNumber(basePrice * 90)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 120)}</td>
          <td>${roundNumber(basePrice * 35)}<br>${roundNumber(basePrice * 155)}</td>
          <td>${roundNumber(basePrice * 35)}<br>${roundNumber(basePrice * 190)}</td>
          <td>${roundNumber(basePrice * 35)}<br>${roundNumber(basePrice * 225)}</td>
  `
}

function armour_high_magenta(basePrice) {
    return `<td>${roundNumber(basePrice * 1)}<br>${roundNumber(basePrice * 1)}</td>
          <td>${roundNumber(basePrice * 3)}<br>${roundNumber(basePrice * 4)}</td>
          <td>${roundNumber(basePrice * 6)}<br>${roundNumber(basePrice * 10)}</td>
          <td>${roundNumber(basePrice * 10)}<br>${roundNumber(basePrice * 20)}</td>
          <td>${roundNumber(basePrice * 14)}<br>${roundNumber(basePrice * 34)}</td>
          <td>${roundNumber(basePrice * 18)}<br>${roundNumber(basePrice * 52)}</td>
          <td>${roundNumber(basePrice * 22)}<br>${roundNumber(basePrice * 74)}</td>
          <td>${roundNumber(basePrice * 28)}<br>${roundNumber(basePrice * 102)}</td>
          <td>${roundNumber(basePrice * 34)}<br>${roundNumber(basePrice * 136)}</td>
          <td>${roundNumber(basePrice * 40)}<br>${roundNumber(basePrice * 176)}</td>
          <td>${roundNumber(basePrice * 40)}<br>${roundNumber(basePrice * 216)}</td>
          <td>${roundNumber(basePrice * 40)}<br>${roundNumber(basePrice * 256)}</td>
  `
}

function Target_Assist(basePrice) {
    return `<td>${roundNumber(basePrice * 1)}<br>${roundNumber(basePrice * 1)}</td>
          <td>${roundNumber(basePrice * 2.5)}<br>${roundNumber(basePrice * 3.5)}</td>
          <td>${roundNumber(basePrice * 4.5)}<br>${roundNumber(basePrice * 8)}</td>
          <td>${roundNumber(basePrice * 7)}<br>${roundNumber(basePrice * 15)}</td>
          <td>${roundNumber(basePrice * 9)}<br>${roundNumber(basePrice * 24)}</td>
          <td>${roundNumber(basePrice * 11)}<br>${roundNumber(basePrice * 35)}</td>
          <td>${roundNumber(basePrice * 14)}<br>${roundNumber(basePrice * 49)}</td>
          <td>${roundNumber(basePrice * 17)}<br>${roundNumber(basePrice * 66)}</td>
          <td>${roundNumber(basePrice * 20)}<br>${roundNumber(basePrice * 86)}</td>
          <td>${roundNumber(basePrice * 23)}<br>${roundNumber(basePrice * 109)}</td>
          <td>${roundNumber(basePrice * 23)}<br>${roundNumber(basePrice * 132)}</td>
          <td>${roundNumber(basePrice * 23)}<br>${roundNumber(basePrice * 155)}</td>
  `
}

function Deadly_OC_Enl(basePrice) {
    return `<td>${roundNumber(basePrice * 1)}<br>${roundNumber(basePrice * 1)}</td>
          <td>${roundNumber(basePrice * 2)}<br>${roundNumber(basePrice * 3)}</td>
          <td>${roundNumber(basePrice * 6)}<br>${roundNumber(basePrice * 9)}</td>
          <td>${roundNumber(basePrice * 7)}<br>${roundNumber(basePrice * 16)}</td>
          <td>${roundNumber(basePrice * 10)}<br>${roundNumber(basePrice * 26)}</td>
          <td>${roundNumber(basePrice * 13.5)}<br>${roundNumber(basePrice * 39.5)}</td>
          <td>${roundNumber(basePrice * 17)}<br>${roundNumber(basePrice * 56.5)}</td>
          <td>${roundNumber(basePrice * 22)}<br>${roundNumber(basePrice * 78.5)}</td>
          <td>${roundNumber(basePrice * 26)}<br>${roundNumber(basePrice * 104.5)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 134.5)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 164.5)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 194.5)}</td>
  `
}


function skel_cap_race(basePrice) {
    return `<td>${roundNumber(basePrice * 1)}<br>${roundNumber(basePrice * 1)}</td>
          <td>${roundNumber(basePrice * 2)}<br>${roundNumber(basePrice * 3)}</td>
          <td>${roundNumber(basePrice * 6)}<br>${roundNumber(basePrice * 9)}</td>
          <td>${roundNumber(basePrice * 8)}<br>${roundNumber(basePrice * 17)}</td>
          <td>${roundNumber(basePrice * 10)}<br>${roundNumber(basePrice * 27)}</td>
          <td>${roundNumber(basePrice * 14)}<br>${roundNumber(basePrice * 41)}</td>
          <td>${roundNumber(basePrice * 17)}<br>${roundNumber(basePrice * 58)}</td>
          <td>${roundNumber(basePrice * 22)}<br>${roundNumber(basePrice * 80)}</td>
          <td>${roundNumber(basePrice * 26)}<br>${roundNumber(basePrice * 106)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 136)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 166)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 196)}</td>
  `
}

function adap(basePrice) {
    return `<td>${roundNumber(basePrice * 1)}<br>${roundNumber(basePrice * 1)}</td>
          <td>${roundNumber(basePrice * 1.6)}<br>${roundNumber(basePrice * 2.6)}</td>
          <td>${roundNumber(basePrice * 4.8)}<br>${roundNumber(basePrice * 7.4)}</td>
          <td>${roundNumber(basePrice * 7.2)}<br>${roundNumber(basePrice * 14.6)}</td>
          <td>${roundNumber(basePrice * 9.6)}<br>${roundNumber(basePrice * 24.2)}</td>
          <td>${roundNumber(basePrice * 12.4)}<br>${roundNumber(basePrice * 36.6)}</td>
          <td>${roundNumber(basePrice * 15.2)}<br>${roundNumber(basePrice * 51.8)}</td>
          <td>${roundNumber(basePrice * 18.4)}<br>${roundNumber(basePrice * 70.2)}</td>
          <td>${roundNumber(basePrice * 21.6)}<br>${roundNumber(basePrice * 91.8)}</td>
          <td>${roundNumber(basePrice * 25.2)}<br>${roundNumber(basePrice * 117)}</td>
          <td>${roundNumber(basePrice * 25.2)}<br>${roundNumber(basePrice * 142.2)}</td>
          <td>${roundNumber(basePrice * 25.2)}<br>${roundNumber(basePrice * 167.4)}</td>
  `
}

function pin(basePrice) {
    return `<td>${roundNumber(basePrice * 1)}<br>${roundNumber(basePrice * 1)}</td>
          <td>${roundNumber(basePrice * 2.5)}<br>${roundNumber(basePrice * 3.5)}</td>
          <td>${roundNumber(basePrice * 4.5)}<br>${roundNumber(basePrice * 8)}</td>
          <td>${roundNumber(basePrice * 7)}<br>${roundNumber(basePrice * 15)}</td>
          <td>${roundNumber(basePrice * 10)}<br>${roundNumber(basePrice * 25)}</td>
          <td>${roundNumber(basePrice * 13.5)}<br>${roundNumber(basePrice * 38.5)}</td>
          <td>${roundNumber(basePrice * 17)}<br>${roundNumber(basePrice * 55.5)}</td>
          <td>${roundNumber(basePrice * 22)}<br>${roundNumber(basePrice * 77.5)}</td>
          <td>${roundNumber(basePrice * 26)}<br>${roundNumber(basePrice * 103.5)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 133.5)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 163.5)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 193.5)}</td>
  `
}

function pierce(basePrice) {
    return `<td>${roundNumber(basePrice * 1)}<br>${roundNumber(basePrice * 1)}</td>
          <td>${roundNumber(basePrice * 2)}<br>${roundNumber(basePrice * 3)}</td>
          <td>${roundNumber(basePrice * 6)}<br>${roundNumber(basePrice * 9)}</td>
          <td>${roundNumber(basePrice * 7)}<br>${roundNumber(basePrice * 16)}</td>
          <td>${roundNumber(basePrice * 10)}<br>${roundNumber(basePrice * 26)}</td>
          <td>${roundNumber(basePrice * 13.5)}<br>${roundNumber(basePrice * 39.5)}</td>
          <td>${roundNumber(basePrice * 17)}<br>${roundNumber(basePrice * 56.5)}</td>
          <td>${roundNumber(basePrice * 22)}<br>${roundNumber(basePrice * 78.5)}</td>
          <td>${roundNumber(basePrice * 25.5)}<br>${roundNumber(basePrice * 104)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 134)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 164)}</td>
          <td>${roundNumber(basePrice * 30)}<br>${roundNumber(basePrice * 194)}</td>
  `
}

function bio(basePrice) {
    return `<td>${roundNumber(basePrice * 1)}<br>${roundNumber(basePrice * 1)}</td>
          <td>${roundNumber(basePrice * 2)}<br>${roundNumber(basePrice * 3)}</td>
          <td>${roundNumber(basePrice * 3)}<br>${roundNumber(basePrice * 6)}</td>
          <td>${roundNumber(basePrice * 4)}<br>${roundNumber(basePrice * 10)}</td>
          <td>${roundNumber(basePrice * 6)}<br>${roundNumber(basePrice * 16)}</td>
          <td>${roundNumber(basePrice * 8)}<br>${roundNumber(basePrice * 24)}</td>
          <td>${roundNumber(basePrice * 10)}<br>${roundNumber(basePrice * 34)}</td>
          <td>${roundNumber(basePrice * 12)}<br>${roundNumber(basePrice * 46)}</td>
          <td>${roundNumber(basePrice * 14)}<br>${roundNumber(basePrice * 60)}</td>
          <td>${roundNumber(basePrice * 15)}<br>${roundNumber(basePrice * 75)}</td>
          <td>${roundNumber(basePrice * 15)}<br>${roundNumber(basePrice * 90)}</td>
          <td>${roundNumber(basePrice * 15)}<br>${roundNumber(basePrice * 105)}</td>
  `
}

function tena(basePrice) {
    return `<td>${roundNumber(basePrice * 1)}<br>${roundNumber(basePrice * 1)}</td>
          <td>${roundNumber(basePrice * 2.5)}<br>${roundNumber(basePrice * 3.5)}</td>
          <td>${roundNumber(basePrice * 9)}<br>${roundNumber(basePrice * 12.5)}</td>
          <td>${roundNumber(basePrice * 14)}<br>${roundNumber(basePrice * 26.5)}</td>
          <td>${roundNumber(basePrice * 20)}<br>${roundNumber(basePrice * 46.5)}</td>
          <td>${roundNumber(basePrice * 27)}<br>${roundNumber(basePrice * 73.5)}</td>
          <td>${roundNumber(basePrice * 34)}<br>${roundNumber(basePrice * 107.5)}</td>
          <td>${roundNumber(basePrice * 44)}<br>${roundNumber(basePrice * 151.5)}</td>
          <td>${roundNumber(basePrice * 52)}<br>${roundNumber(basePrice * 203.5)}</td>
          <td>${roundNumber(basePrice * 60)}<br>${roundNumber(basePrice * 263.5)}</td>
          <td>${roundNumber(basePrice * 60)}<br>${roundNumber(basePrice * 323.5)}</td>
          <td>${roundNumber(basePrice * 60)}<br>${roundNumber(basePrice * 383.5)}</td>
  `
}

function roundNumber(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return (Math.round(n) / p).toLocaleString();
}


function setWeaponSelect() {
    sessionStorage.setItem('priceType', "Weapon");
    $("#itemSelect").html(`<optgroup label="Critical Mass">
        <option value="CM 202">CM 202</option>
        <option value="CM 205">CM 205</option>
        <option value="CM 225">CM 225</option>
        <option value="CM 307">CM 307</option>
        <option value="CM 330">CM 330</option>
        <option value="CM 351 Sunflare">CM 351 Sunflare</option>
        <option value="CM 401 Planet Stormer">CM 401 Planet Stormer</option>
        <option value="CM 440 Titan">CM 440 Titan</option>
        <option value="CM 451 Starburst">CM 451 Starburst</option>
        <option value="CM Gigavolt">CM Gigavolt</option>
        <option value="Sub-light COM2">Sub-light COM2</option>
        <option value="CM 505">CM 505</option>
        <option value="CM 530 BabyCOM">CM 530 BabyCOM</option>
        <option value="CM 800 Jupiter">CM 800 Jupiter</option>
        <option value="CM X-1 Furie">CM X-1 Furie</option>
        <option value="Planet Stormer Ltd Edition">Planet Stormer Ltd Edition</option>
        <option value="CM 352 Quasar">CM 352 Quasar</option>
        <option value="CM 505 Alpha Ltd. Edition">CM 505 Alpha Ltd. Edition</option>
        <option value="CM 369 Starfury">CM 369 Starfury</option>
        <option value="CM Laser Drill">CM Laser Drill</option>
        <option value="CM Proton Arc">CM Proton Arc</option>
        <option value="CM 000 Kelvin">CM 000 Kelvin</option>
        <option value="CM 467">CM 467</option>
    </optgroup>
    <optgroup label="Faction War">
        <option value="GG17">GG17</option>
        <option value="Festungsbrecher">Festungsbrecher</option>
        <option value="Thundershock">Thundershock</option>
        <option value="Phoenix">Phoenix</option>
        <option value="Avalanche">Avalanche</option>
        <option value="Kraken">Kraken</option>
        <option value="Exterminator">Exterminator</option>
        <option value="Krakatoa">Krakatoa</option>
        <option value="Havoc">Havoc</option>
        <option value="Depth Charge">Depth Charge</option>
    </optgroup>
    <optgroup label="HIKS">
        <option value="HIKS S300">HIKS S300</option>
        <option value="HIKS 3100">HIKS 3100</option>
        <option value="HIKS M1000">HIKS M1000</option>
        <option value="HIKS A10">HIKS A10</option>
        <option value="HIKS S4000">HIKS S4000</option>
        <option value="HIKS 888 CAW">HIKS 888 CAW</option>
    </optgroup>
    <optgroup label="HVM">
        <option value="HVM 001">HVM 001</option>
        <option value="HVM 002">HVM 002</option>
        <option value="HVM 004">HVM 004</option>
        <option value="HVM 005 G-Class">HVM 005 G-Class</option>
        <option value="HVM 008">HVM 008</option>
        <option value="HVM MPG">HVM MPG</option>
    </optgroup>
    <optgroup label="Rancor">
        <option value="Poison Claw">Poison Claw</option>
        <option value="Stripper">Stripper</option>
        <option value="Hard Thorn">Hard Thorn</option>
        <option value="Mixmaster">Mixmaster</option>
        <option value="Heartburn">Heartburn</option>
        <option value="Shredder">Shredder</option>
        <option value="Hotspot">Hotspot</option>
        <option value="Vitriol">Vitriol</option>
        <option value="Contagion">Contagion</option>
        <option value="Ricochet">Ricochet</option>
        <option value="Torment">Torment</option>
        <option value="Calamity">Calamity</option>
    </optgroup>
    <optgroup label="Ronson">
        <option value="Ronson 45">Ronson 45</option>
        <option value="Ronson 50">Ronson 50</option>
        <option value="Ronson 55">Ronson 55</option>
        <option value="Ronson 65-a">Ronson 65-a</option>
        <option value="Ronson 70">Ronson 70</option>
        <option value="Ronson LBM">Ronson LBM</option>
        <option value="Ronson WP Flamethrower">Ronson WP Flamethrower</option>
        <option value="Ronson WPX Incinerator">Ronson WPX Incinerator</option>
        <option value="Ronson 5X5">Ronson 5X5</option>
    </optgroup>
    <optgroup label="Rubicon Industries">
        <option value="RIA 313">RIA 313</option>
        <option value="RIA 1010">RIA 1010</option>
        <option value="RIA 7">RIA 7</option>
        <option value="RIA T7">RIA T7</option>
        <option value="RIA 20 Para">RIA 20 Para</option>
        <option value="RIA 20 DSC">RIA 20 DSC</option>
        <option value="RIA 20 Striker">RIA 20 Striker</option>
        <option value="RIA 30 Strikeforce">RIA 30 Strikeforce</option>
        <option value="RIA 40">RIA 40</option>
        <option value="RIA T40">RIA T40</option>
        <option value="RIA 45 Para">RIA 45 Para</option>
        <option value="RIA 50">RIA 50</option>
        <option value="RIA Trident">RIA Trident</option>
        <option value="RIA 8A">RIA 8A</option>
        <option value="RIA 15 SE">RIA 15 SE</option>
        <option value="RIA 75">RIA 75</option>
    </optgroup>
    <optgroup label="Shotlite">
        <option value="Sabre">Sabre</option>
        <option value="Mustang">Mustang</option>
        <option value="Phantom">Phantom</option>
        <option value="Shotlite Tempest">Shotlite Tempest</option>
        <option value="Raptor">Raptor</option>
        <option value="Hornet">Hornet</option>
        <option value="Supermarine">Supermarine</option>
        <option value="Bayonet">Bayonet</option>
        <option value="Banshee">Banshee</option>
        <option value="Supermarine Alpha Ltd Edition">Supermarine Alpha Ltd Edition</option>
    </optgroup>
    <optgroup label="Smokestack">
        <option value="Trailblazer">Trailblazer</option>
        <option value="1887 Shockfield">1887 Shockfield</option>
        <option value="Tombstone">Tombstone</option>
        <option value="Proposition">Proposition</option>
        <option value="Lone Star">Lone Star</option>
        <option value="Ahab">Ahab</option>
        <option value="Donderbus">Donderbus</option>
    </optgroup>
    <optgroup label="Teknoboom">
        <option value="Gebirgskanone">Gebirgskanone</option>
        <option value="T-101 Feldhaubitz">T-101 Feldhaubitz</option>
        <option value="T-102 Jagdfaust">T-102 Jagdfaust</option>
        <option value="Luftplatzen">Luftplatzen</option>
        <option value="Handkanone">Handkanone</option>
        <option value="Zerfallen">Zerfallen</option>
        <option value="T-189 MGL">T-189 MGL</option>
    </optgroup>
    <optgroup label="Z-Armtech">
        <option value="Z-1 Assault">Z-1 Assault</option>
        <option value="Z-2 LMP">Z-2 LMP</option>
        <option value="Z-5 Heavy">Z-5 Heavy</option>
    </optgroup>
    <optgroup label="Other">
        <option value="Clown Gun">Helter-Skelter</option>
    </optgroup>`);
}

function setArmourSelect() {
    sessionStorage.setItem('priceType', "Armour");
    $("#itemSelect").html(`<optgroup label="Atomic">
        <option value="Titan IRN HUD">Titan IRN HUD</option>
        <option value="Titan Teslashock">Titan Teslashock</option>
        <option value="Titan IDS 01">Titan IDS 01</option>
        <option value="Titan MEM Trooper">Titan MEM Trooper</option>
        <option value="Titan MEM Sprint">Titan MEM Sprint</option>
        <option value="Medusa Helmet">Medusa Helmet</option>
        <option value="Medusa Vest">Medusa Vest</option>
        <option value="Medusa Gloves">Medusa Gloves</option>
        <option value="Medusa Pants">Medusa Pants</option>
        <option value="Medusa Boots">Medusa Boots</option>
     </optgroup>
    <optgroup label="Faction War">
        <option value="Vulkan Helmet">Vulkan Helmet</option>
        <option value="Vulkan Vest">Vulkan Vest</option>
        <option value="Vulkan Pants">Vulkan Pants</option>
        <option value="Vulkan Gloves">Vulkan Gloves</option>
        <option value="Vulkan Boots">Vulkan Boots</option>
        <option value="Mako Helmet">Mako Helmet</option>
        <option value="Mako Vest">Mako Vest</option>
        <option value="Mako Pants">Mako Pants</option>
        <option value="Mako Gloves">Mako Gloves</option>
        <option value="Mako Boots">Mako Boots</option>
        <option value="Overwatch Helmet">Overwatch Helmet</option>
        <option value="Overwatch Chest">Overwatch Chest</option>
        <option value="Overwatch Pants">Overwatch Pants</option>
        <option value="Overwatch Gloves">Overwatch Gloves</option>
        <option value="Overwatch Boots">Overwatch Boots</option>
        <option value="Dynamo Helmet">Dynamo Helmet</option>
        <option value="Dynamo Chest">Dynamo Chest</option>
        <option value="Dynamo Legs">Dynamo Legs</option>
        <option value="Dynamo Gloves">Dynamo Gloves</option>
        <option value="Dynamo Boots">Dynamo Boots</option>
        <option value="Mastodon Helm">Mastodon Helm</option>
        <option value="Mastodon Chest">Mastodon Chest</option>
        <option value="Mastodon Legs">Mastodon Legs</option>
        <option value="Mastodon Gauntlets">Mastodon Gauntlets</option>
        <option value="Mastodon Boots">Mastodon Boots</option>
    </optgroup>
    <optgroup label="HVM">
        <option value="HVM Kevlar Helmet">HVM Kevlar Helmet</option>
        <option value="HVM Kevlar Vest">HVM Kevlar Vest</option>
        <option value="HVM Kevlar Gloves">HVM Kevlar Gloves</option>
        <option value="HVM Kevlar Pants">HVM Kevlar Pants</option>
        <option value="HVM Combat Boots">HVM Combat Boots</option>
        <option value="HVM Carbon Fibre Helmet">HVM Carbon Fibre Helmet</option>
        <option value="HVM Carbon Fibre Vest">HVM Carbon Fibre Vest</option>
        <option value="HVM Carbon Fibre Gloves">HVM Carbon Fibre Gloves</option>
        <option value="HVM Carbon Fibre Pants">HVM Carbon Fibre Pants</option>
        <option value="HVM Carbon Fibre Boots">HVM Carbon Fibre Boots</option>
    </optgroup>
    <optgroup label="Ronson">
        <option value="R1 Interceptor Helm">R1 Interceptor Helm</option>
        <option value="R4 Guardian Vest">R4 Guardian Vest</option>
        <option value="R6 Flamejuggler Gloves">R6 Flamejuggler Gloves</option>
        <option value="R7 Guardian Pants">R7 Guardian Pants</option>
        <option value="R8 Huntsman Boots">R8 Huntsman Boots</option>
    </optgroup>
    <optgroup label="Rubicon Industries">
        <option value="Trooper Helmet">Trooper Helmet</option>
        <option value="Trooper Vest">Trooper Vest</option>
        <option value="Trooper Gloves">Trooper Gloves</option>
        <option value="Trooper Pants">Trooper Pants</option>
        <option value="Trooper Boots">Trooper Boots</option>
        <option value="Special Forces Helmet">Special Forces Helmet</option>
        <option value="Special Forces Vest">Special Forces Vest</option>
        <option value="Special Forces Gloves">Special Forces Gloves</option>
        <option value="Special Forces Pants">Special Forces Pants</option>
        <option value="Special Forces Boots">Special Forces Boots</option>
        <option value="Hardplate Helm">Hardplate Helm</option>
        <option value="Hardplate Chest">Hardplate Chest</option>
        <option value="Hardplate Gauntlets">Hardplate Gauntlets</option>
        <option value="Hardplate Leg Protection">Hardplate Leg Protection</option>
        <option value="Hardplate Boots">Hardplate Boots</option>
        <option value="Rubicon Power Assist">Rubicon Power Assist</option>
        <option value="Heavy Trooper Vest">Heavy Trooper Vest</option>
    </optgroup>
    <optgroup label="Shotlite">
        <option value="Shotlite Hummingbird H1">Shotlite Hummingbird H1</option>
        <option value="Shotlite Hummingbird V1">Shotlite Hummingbird V1</option>
        <option value="Shotlite Hummingbird G1">Shotlite Hummingbird G1</option>
        <option value="Shotlite Hummingbird P1">Shotlite Hummingbird P1</option>
        <option value="Shotlite Starwalk Boots">Shotlite Starwalk Boots</option>
        <option value="Dragonfly Helmet">Dragonfly Helmet</option>
        <option value="Dragonfly Vest">Dragonfly Vest</option>
        <option value="Dragonfly Gloves">Dragonfly Gloves</option>
        <option value="Dragonfly Pants">Dragonfly Pants</option>
        <option value="Dragonfly Boots">Dragonfly Boots</option>
    </optgroup>
    <optgroup label="Spaceskin">
        <option value="Graphene Combat Hood">Graphene Combat Hood</option>
        <option value="Graphene Body Suit Top">Graphene Body Suit Top</option>
        <option value="Graphene Gloves">Graphene Gloves</option>
        <option value="Graphene Body Suit Bottom">Graphene Body Suit Bottom</option>
        <option value="Graphene Boots">Graphene Boots</option>
    </optgroup>
    <optgroup label="Other">
        <option value="Clown Armour">Clown</option>
    </optgroup>
`);
}

document.addEventListener('readystatechange', event => {
    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..
        sessionStorage.setItem('priceType', "Weapon");
    }
});


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
