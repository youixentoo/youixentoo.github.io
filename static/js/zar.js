const weaponColours = ["white", "lightgreen", "lightblue", "magenta", "gold"];

function getDPS() {
    const weaponData = zarWeaponJSON();

    // Select weapon from page and get the associated for it
    let weaponName = $('select[name="gun_name"] option:selected').val();
    let weaponDisplayName = $('select[name="gun_name"] option:selected').text();
    let weaponVersion = $('select[name="gun_rarity"] option:selected').val();
    let weaponLevel = $('select[name="gun_level"] option:selected').val();
    let weapon = weaponData[weaponName];
    let weaponMods = getMods();

    let rarity_dmg_mult = Math.pow(1.5, weaponVersion);

    // let weaponDamageType = weapon["Type"]
    // console.log(weaponName, weaponVersion, rarity_dmg_mult, weaponLevel, weapon);

    calcDPS(weaponDisplayName, weaponVersion, weaponLevel, weapon, weaponLevel, rarity_dmg_mult, weaponMods);
};



function calcDPS(weaponName, weaponVersion, weaponLevel, weapon, weaponLevel, rarity_dmg_mult, weaponMods) {
    let timeBetweenShots = weapon["timeBetweenShots"];
    let base_dmg = weapon["damage"] * rarity_dmg_mult;
    let base_crit = weapon["critChance"];
    let base_reload = weapon["reloadTime"];
    let base_clipsize = weapon["magazineCapacity"];
    let base_range = weapon["range"];

    let dot = weapon["dot"] * rarity_dmg_mult;
    let dot_duration = weapon["dot_duration"];
    let dot_chance = weapon["elementalEffectInfo"]["chance"];

    let crit_dmg_mult = weapon["critDamageMultiplier"];
    let hda_mult = weapon["hdAmmoDamageMultiplier"];
    let pierce = weapon["pierce"];
    let wepCategory = weapon["weaponCategory"];

    let burst_size = weapon["burstSize"];
    let burst_delay = weapon["burstDelay"];
    let is_multi_pellet = weapon["projectileMultiPellet"]; // 1=True, 0=False
    let pelletCount = weapon["projectilePelletCount"]; // Above needed as none multi pellet guns have 0 pellets
    let base_movement = weapon["equippedMovementReduction"]*100; // To get as %
    let base_firing = weapon["firingMovementReduction"]*100; // To get as %
    // let base_accuracy = weapon[""]
    let dotPerSecond = (dot / dot_duration) * dot_chance;
    if(isNaN(dotPerSecond)){
        dotPerSecond = 0; 
    }
    let clipSize = getClipSize(base_clipsize, weaponMods["Clip"]);
    // console.log(base_clipsize, weaponMods["Clip"], clipSize);

    // Else it uses the reload of only the first shot in a clip for shotguns
    if(wepCategory === "Shotgun"){
        base_reload = base_reload * clipSize;
    }
    let reloadTime = getReloadTime(base_reload, weaponMods["Reload"]);
    // console.log(base_reload, weaponMods["Reload"], reloadTime);

    let critChance = getCritChance(base_crit, weaponMods["Crit"]);
    // console.log(base_crit, weaponMods["Crit"], critChance);

    let range = getRange(base_range, weaponMods["Range"]);
    // console.log(base_range, weaponMods["Range"], range)

    let damage = getDamage(base_dmg, weaponMods["Damage"], weaponLevel);
    // console.log(base_dmg, weaponMods["Damage"], weaponLevel, damage);

    let [uptime, rps] = getUptimeAndRPS(timeBetweenShots, clipSize, burst_size, burst_delay, reloadTime);
    // console.log(uptime, rps);

    let avgCritDmgBoost = getAverageCritBonus(critChance, crit_dmg_mult);
    // console.log(avgCritDmgBoost);

    let [movementEquipped, movementFiring] = getMovement(base_movement, base_firing, weaponMods["Movement"]);

    // console.log(weaponName, weaponVersion, weaponLevel, damage, rps, uptime, reloadTime, avgCritDmgBoost, dotPerSecond, is_multi_pellet, pelletCount, range, pierce, hda_mult);
    let html_table_component = getDPSZAR(weaponName, weaponVersion, weaponLevel, damage, rps, uptime, reloadTime, avgCritDmgBoost, dotPerSecond, is_multi_pellet, pelletCount, range, pierce, clipSize, hda_mult, movementEquipped, movementFiring, wepCategory);
    // console.log(html_table_component);

    let outTable = document.getElementById("dpsTable").getElementsByTagName("tbody")[0].insertRow(0);
    outTable.innerHTML = html_table_component;
};


function getDPSZAR(weaponName, weaponVersion, weaponLevel, damage, rps, uptime, reloadTime, avgCritDmgBoost, dotPerSecond, is_multi_pellet, pelletCount, range, pierce, capacity, hda_mult, movementEquipped, movementFiring, wepCategory) {
    // console.log(weaponName, weaponVersion, weaponLevel, damage, rps, uptime, reloadTime, avgCritDmgBoost, dotPerSecond, is_multi_pellet, pelletCount, range, pierce, hda_mult);
    let totalDamagePerShot;
    if (is_multi_pellet == 1) { // if true 
        totalDamagePerShot = ((damage * avgCritDmgBoost) * pelletCount) + dotPerSecond;
    } else {
        totalDamagePerShot = (damage * avgCritDmgBoost) + dotPerSecond;
    }

    let pureDps = totalDamagePerShot * rps;
    let avgDPS = (totalDamagePerShot * rps) * uptime;

    return `<tr>
                <td style="background-color:${weaponColours[parseInt(weaponVersion)]};">${weaponName} (${weaponLevel})</td>
                <td>${wepCategory}</td>
                <td>${roundNumber(pureDps, 2).toLocaleString()}</td>
                <td>${roundNumber(avgDPS, 2).toLocaleString()}</td>
                <td>${roundNumber(uptime * 100, 2).toLocaleString()}%</td>
                <td>${capacity.toLocaleString()}</td>
                <td>${reloadTime.toLocaleString()}</td>
                <td>${pierce.toLocaleString()}</td>
                <td>${range.toLocaleString()}</td>
                <td>${movementEquipped.toLocaleString()}%</td>
                <td>${movementFiring.toLocaleString()}%</td>
            </tr>`;
};


function getAverageCritBonus(critChance, crit_dmg_mult) {
    // if there is a 50% you deal +100% dmg, you deal x1.5 dmg on average
    return (1 - critChance) + critChance * crit_dmg_mult;
};

function getUptimeAndRPS(timeBetweenShots, clipSize, burst_size, burst_delay, reloadTime) {
    // 1 shot of rps between last shot and reloading
    // aka: Cant use the sas4 uptime formula
    // let rps;
    let timeToEmpty;
    if (burst_size > 1) {
        let burstTimeFrame = timeBetweenShots + burst_delay * (burst_size - 1);
        timeToEmpty = clipSize * (burstTimeFrame / burst_size)
        // Burst weapons:
        /*
            timeBetweenShots does not indicate rps or effective rps
            The time it takes for one burst to fire and have it's cooldown period, is the timeBetweenShots + burstDelay*(burstAmount-1)
            Only after that a second burst can be fired
            In line with regular guns, after the last burst, there is a waiting period equal to the timeBetweenShots value
        */
    } else {
        timeToEmpty = clipSize * timeBetweenShots;
    }
    return [timeToEmpty / (timeToEmpty + timeBetweenShots + reloadTime), (clipSize / timeToEmpty)];
};

function getMovement(base_movement, base_firing, movementBonusses){
    let sumBonusses = movementBonusses.reduce((accum, curVal) => accum + curVal, 0,)
    let bonus = (1-(sumBonusses/100));
    return [roundNumber(base_movement * bonus, 2), roundNumber(base_firing * bonus, 2)];
};

function getDamage(base_dmg, dmgBonusses, weaponLevel) {
    let levelBonus = 1 + (weaponLevel * 0.05);
    let sumBonusses = dmgBonusses.reduce((accum, curVal) => accum + curVal, 0,)
    return (base_dmg * levelBonus) + sumBonusses
};

function getRange(base_range, rangeBonusses) {
    let sumBonusses = rangeBonusses.reduce((accum, curVal) => accum + curVal, 0,) / 100;
    return roundNumber(base_range * (1 + sumBonusses), 2);
};

function getCritChance(base_crit, critBonusses) {
    let sumBonusses = critBonusses.reduce((accum, curVal) => accum + curVal, 0,) / 100;
    return base_crit + sumBonusses;
};

function getClipSize(base_clipsize, clipBonusses) {
    let sumBonusses = clipBonusses.reduce((accum, curVal) => accum + curVal, 0,) / 100;
    // console.log(base_clipsize*(1+sumBonusses));
    return Math.floor(base_clipsize * (1 + sumBonusses));
};

function getReloadTime(base_reload, reloadBonusses) {
    let sumBonusses = reloadBonusses.reduce((accum, curVal) => accum + curVal, 0,) / 100;
    // console.log(sumBonusses);
    return roundNumber(base_reload * (1 + sumBonusses), 2);
};


function getMods() {
    // { modName: {type: dmg, value: 1}, ...}
    // { Range: [1,2,...], Damage: [1,2,3,...], ....}
    let modifierTypes = { "Range": [], "Damage": [], "Accuracy": [], "Crit": [], "Reload": [], "Clip": [], "Movement": [] }
    let modsDict = {};
    let modsForm = $("#modsForm").serializeArray();
    for (item of modsForm) {
        let itemDict = {};
        let itemName;
        if (item.name.endsWith("_v")) {
            itemDict["value"] = item.value;
            itemName = item.name.substring(0, 3);
        } else {
            itemDict["type"] = item.value;
            itemName = item.name
        }

        if (!(modsDict.hasOwnProperty(itemName))) { // if not contains
            modsDict[itemName] = itemDict;
        } else {
            modsDict[itemName] = Object.assign(modsDict[itemName], itemDict);
        }
    }

    Object.entries(modsDict).forEach(([objName, objData]) => {
        if (!(objData.type === "")) {
            modifierTypes[objData.type].push(parseFloat(objData.value));
        }
    });
    return modifierTypes;
};



/*
 * Rounds a number to a specified amount of decimal places.
 * Default: 0
 */
function roundNumber(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
};


/*
 * 
 * Clears the output tables
 */
function clearTable() {
    $("#dpsTable tbody>tr").remove();
};