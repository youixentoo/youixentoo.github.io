/*
 TODO:
  - Correct super crit formula - Done
  - Fix clip size - Almost
    - Add mastodon
    - Move capacity calc to own function - Done
    - Add 'clip pity' to ref data - Done
  - Implement burst weapons
  - Don't do adrenaline
  - Other alberk features from sheet
    - HTL duration - propably not
  - Cry
  - Flamers (mastery)
  - Comments
  - Edge cases (Calamity, T-189 MGL, Krakatoa, Starfury, Mustang, Raptor, Zerf and others if I forgot any)
  - Adaptive
  - Info boxes explaining terms (pure/avg dps, DoT, etc)
  - Message for unsupported weapons, black pistols etc
  - Time to kill a nm necro?
 *
 */


function setClass(character) {
//    console.log(character);
    if (character == "Assault") {
        $("#char_skills1").html(`<label>Killing Spree: <input type="number" min="0" max="25" step="1" value="0" name="ks"></label>`);
        $("#char_skills2").html(`<label>Deadly Force: <input type="number" min="0" max="25" step="1" value="0" name="df"></label>`);
    } else if (character == "Heavy") {
        $("#char_skills1").html(`<label>Hold The Line: <input type="number" min="0" max="25" step="1" value="0" name="htl"></label>`);
        $("#char_skills2").html(`<label>Moving: <input type="checkbox" name="htl_moving" value="true"></label>`);
    } else {
        $("#char_skills1").html("<label></label>");
        $("#char_skills2").html("<label></label>");
    }
}

function getDPS() {
    const weaponData = weaponJSON();
    const armourData = armourDPSJSON();
    //const armourWithoutVersion = ["Dynamo", "Overwatch", "Mastodon", "Mako", "Vulkan", "Other"];

    let weaponVersion = $('input[name="version"]:checked').val();
    let weaponName = $('select[name="gun_name"] option:selected').val();
    let weapon = weaponData[weaponVersion][weaponName];
    // Easiest to just check if not undefined
    if (!weapon) {
        setOutput("Weapon not supported")
        console.error("Error getting weapon data")
        return null;
    }
    let cores = $('input[name="core"]').val();

    let class_char = $('input[name="character"]:checked').val();
    let class_level = 0;
    let deadly_force = 0;
    if (class_char === "Assault") {
        class_level = $('input[name="ks"]').val();
        deadly_force = $('input[name="df"]').val();
    } else if (class_char === "Heavy") {
        class_level = $('input[name="htl"]').val();
    }

    let crit_level = $('input[name="crit"]').val();

    let helmetVersion = "Normal";
    let glovesVersion = "Normal";
    let selectedHelmet = $('select[name="select_helmet"] option:selected').val();
//    if ($.inArray(selectedHelmet, armourWithoutVersion)) {
//        helmetVersion = $('input[name="helmet_ver"]:checked').val();
//    }

    let selectedVest = $('input[name="select_vest"]:checked').val();
    let selectedGloves = $('select[name="select_gloves"] option:selected').val();
//    if ($.inArray(selectedGloves, armourWithoutVersion)) {
//        glovesVersion = $('input[name="gloves_ver"]:checked').val();
//    }

    let helmetStats = armourData["Helmet"][selectedHelmet][helmetVersion];
    let vestStats = armourData["Vest"][selectedVest];
    let glovesStats = armourData["Gloves"][selectedGloves][glovesVersion];

    let helmet_base_crit_bonus = helmetStats["Crit"];
    let helmet_base_dmg_bonus = helmetStats["Dmg"];
    let helmet_base_reload_bonus = helmetStats["Reload"];
    let vest_base_reload_bonus = vestStats["Reload"];
    let gloves_base_crit_bonus = glovesStats["Crit"];
    let gloves_base_dmg_bonus = glovesStats["Dmg"];
    let gloves_base_reload_bonus = glovesStats["Reload"];

    let armourAugments = {
        "smart_target": $('input[name="smart_target"]').val(),
        "target_assist": $('input[name="target_assist"]').val()
    };

    let weaponAugments = getAugments([$('select[name="aug1"] option:selected').val(), $('input[name="aug1_grade"]').val()], [$('select[name="aug2"] option:selected').val(), $('input[name="aug2_grade"]').val()],
            [$('select[name="aug3"] option:selected').val(), $('input[name="aug3_grade"]').val()], [$('select[name="aug4"] option:selected').val(), $('input[name="aug4_grade"]').val()]);
//    console.log("Augs: ", weaponAugments)

    // let weapon_class = "Flamethrower" // weapon["Class"]
    let masteries = getMasteries(weapon["Class"], $('input[name="gun_mastery"]').val(), $('select[name="hda"] option:selected').val(), $('input[name="helmet_mastery"]').val());
//    console.log("Masteries: ", masteries)

    let helmetColl = $('input[name="helmet_collections_rel"]').is(":checked") ? true : false;
    let gunNormal = $('input[name="gun_collections_normal"]').is(":checked") ? true : false;
    let gunRed = $('input[name="gun_collections_red"]').is(":checked") ? true : false;
    let gunBlack = $('input[name="gun_collections_black"]').is(":checked") ? true : false;
    let collections = getCollections(weapon["Class"], gunNormal, gunRed, gunBlack, helmetColl);
//    console.log("Collections: ", collections)
    // weapon["Class"]
    // TODO: "Race Modded"
    let gun_mast_coll_reload = masteries["gun_reload"] + collections["reload"];
    let gloves_reload_mastery = 0.1 * ($('input[name="gloves_mastery"]').val() >= 3);
    let gloves_reload_collections = $('input[name="gloves_collections_red"]').is(":checked") ? 0.1 : 0;
    let reload_bonus = getReload($('input[name="fr"]').val(), helmet_base_reload_bonus, vest_base_reload_bonus, gloves_base_reload_bonus, $('input[name="nimble"]').val(), gun_mast_coll_reload, gloves_reload_mastery, gloves_reload_collections);
    console.log("Reload return:", reload_bonus)

    let output = calculateDPS(weapon, weaponName, cores, weaponAugments, armourAugments, masteries, collections, class_char, class_level, deadly_force, crit_level, helmet_base_crit_bonus, gloves_base_crit_bonus, helmet_base_dmg_bonus, gloves_base_dmg_bonus, reload_bonus);
    setOutput(output);
}

function setOutput(output) {
    $("#resultsNormal").html(output);
}


function calculateDPS(weapon, weaponName, cores, weaponAugments, armourAugments, masteries, collections, class_char, class_level, deadly_force, crit_level, helmet_base_crit_bonus, gloves_base_crit_bonus, helmet_base_dmg_bonus, gloves_base_dmg_bonus, reload_bonus) {
    //TODO: Mastodon clip size increase?
    //TODO: Add mastery lv 3 flamer
    let base_dmg = weapon["Damage"];
    let base_DOT = weapon["DOT"];
    let base_rps = weapon["RPS"];
    let clip_size = weapon["Clip"];
    let reload = weapon["Reload"];
    let base_pierce = weapon["Pierce"];
    let pellets = weapon["Pellets"];
    let gun_base_crit = weapon["Crit"];
    let clipPity = weapon["ClipPity"];
    let base_cores = 1 + (0.05 * cores);

    let pinpoint = (3 + (1 * (weaponAugments["Pinpoint"] - 1))) * (weaponAugments["Pinpoint"] > 0);
    let adaptive = weaponAugments["Adaptive"];
    let smart_target = [0, 0.02, 0.04, 0.06, 0.08, 0.095, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17][armourAugments["smart_target"]];
    let target_assist = (2.5 + (0.5 * (armourAugments["target_assist"] - 1))) * (armourAugments["target_assist"] > 0);

    let hda_bonus = masteries["hda_mult"];
    let helm_mastery2 = 1 + (0.01 * masteries["helm_mast2"]);
    let gun_dmg_mastery = 1 + (0.01 * masteries["gun_dmg"]);
    let gun_rps_mastery = 1 + (0.01 * masteries["gun_rps"]);
    let gun_crit_mastery = masteries["gun_critc"];
    let gun_critdmg_mastery = masteries["gun_critdmg"];
    let gun_pierce_mastery = masteries["gun_pierce"];
    let gun_capacity_mastery = masteries["gun_capacity"];
    let shotgun_mastery5 = masteries["shotgun5"];
    let super_crit = 1 + (0.45 * masteries["superCrit"]);

    let gun_dmg_collections = 1 + (0.01 * collections["dmg"]);
    let gun_rps_collections = 1 + (0.01 * collections["rps"]);
    let gun_pierce_collections = collections["pierce"];
    let gun_capacity_collections = collections["capacity"];
    let gun_crit_collections = collections["critc"];
    let gun_critdmg_collections = collections["critdmg"];
    let helmet_collections = 1 * collections["helmet"];

    let class_bonus;
    // Killing spree / HTL bonus
    if (class_char === "Assault") {
        class_bonus = 1 + (0.3 + (0.05 * (class_level - 1))) * (class_level > 0); //1 1.3-2.5
    } else if (class_char === "Heavy") {
        let htl_moving = $('input[name="htl_moving"]').is(":checked") ? 0.5 : 1;
        class_bonus = 1 + (0.3 + (0.04 * (class_level - 1))) * (class_level > 0) * htl_moving; //1 1.3-2.26
    } else {
        class_bonus = 1;
    }

    // Capacity
    let capacity = getCapacity(clipPity, clip_size, (1*cores), base_cores, gun_capacity_mastery, gun_capacity_collections, weaponAugments["Capacity"]);

    // Crit
    let crit_skill_chance = (4 + (0.5 * (crit_level - 1))) * (crit_level > 0); //0% 4%-16%
    let crit_skill_mult = (1 + (0.05 + (0.04 * (crit_level - 1))) * (crit_level > 0)); //1 1.05-2.01
    let crit_chance = (pinpoint + target_assist + crit_skill_chance + gun_crit_mastery + gun_crit_collections + helmet_collections + helmet_base_crit_bonus + gloves_base_crit_bonus + gun_base_crit)/100;
    let crit_dmg_bonus = (1+(gun_critdmg_mastery/100))*(1+(gun_critdmg_collections/100));
//    let crit_bonus = (crit_chance * crit_skill_mult * super_crit) / 100;
//    console.log("crit_bonus, crit_chance, crit_skill_mult, super_crit - Values:")
//    console.log(crit_bonus, crit_chance, crit_skill_mult, super_crit)
    //##
//    console.log("crit_chance:", crit_chance);
//    console.log("class_bonus:", class_bonus);
//    console.log("crit_skill_mult:", crit_skill_mult);
//    console.log("crit_dmg_bonus:", crit_dmg_bonus);
//    console.log("super_crit:", super_crit);
    let damage_boost = (1-crit_chance) * class_bonus + crit_chance * (class_bonus + crit_skill_mult) * crit_dmg_bonus * super_crit;
//    console.log("damage_boost:", damage_boost);

    // Main dps formula:
    let displayed_damage = (1 + (0.1 * weaponAugments["Deadly"])) * base_dmg * base_cores * gun_dmg_mastery * gun_dmg_collections * helm_mastery2 * (1 + helmet_base_dmg_bonus + gloves_base_dmg_bonus + smart_target + (0.01 * deadly_force));
    let pure_damage = displayed_damage * hda_bonus * damage_boost * (pellets + shotgun_mastery5);
    let pure_DOT = (1 + (0.1 * weaponAugments["Tenacious"])) * base_DOT * base_cores * hda_bonus * (pellets + shotgun_mastery5); // Every gun that doesn't have DOT has base_DOT = 0
    let pure_rps = (1 + (0.1 * weaponAugments["Overclocked"])) * base_cores * base_rps * gun_rps_collections * gun_rps_mastery;
    let pure_dps = Math.floor((pure_damage + pure_DOT) * pure_rps);
    console.log("############")
    console.log("Displayed dmg:", displayed_damage);
    console.log("Displayed rps:", pure_rps);
    console.log("Displayed cap:", capacity);

    // Average
    let uptime = (capacity - 1) / pure_rps / ((capacity - 1) / pure_rps + reload_bonus * reload); // clip_size-1 because the last shot and reloading happen at the same time
    console.log("uptime", uptime)
    let average_dps = Math.floor(pure_dps * uptime);

    // Pierce
    let gun_pierce = (base_pierce * base_cores * (1 + (0.1 * weaponAugments["Piercing"])) + gun_pierce_mastery + gun_pierce_collections) * class_bonus;
    let pure_pierce = Math.floor(pure_dps * gun_pierce);
    let average_pierce = Math.floor(average_dps * gun_pierce);

    let tempOutput = `<p><br>
    <u><b>${weaponName}:</u></b><br>
    <i>DPS:</i><br>
    <b>Pure:</b> ${pure_dps.toLocaleString('en-US')}<br>
    <b>Average:</b> ${average_dps.toLocaleString('en-US')}<br>
    <b>Pure pierce:</b> ${pure_pierce.toLocaleString('en-US')}<br>
    <b>Average pierce:</b> ${average_pierce.toLocaleString('en-US')}<br><br>
    <i>Displayed stats:</i><br>
    <b>Damage: </b> ${displayed_damage.toLocaleString('en-US')}<br>
    <b>RPS: </b> ${pure_rps.toLocaleString('en-US')}<br>
    <b>Capacity: </b> ${capacity.toLocaleString('en-US')}
    </p>`;
    console.log("------------")
    console.log("DPS:")
    console.log("Pure: ", pure_dps);
    console.log("Average: ", average_dps);
    console.log("Pure pierce: ", pure_pierce);
    console.log("Average pierce: ", average_pierce);
    console.log("############end")

    return tempOutput;
    // Special cases:
    // Calamity, T-189 MGL, Krakatoa, Starfury, Mustang, Raptor
}

function getReload(reload_skill, helmet_base_reload_bonus, vest_base_reload_bonus, gloves_base_reload_bonus, nimble, gun_mast_coll_reload, gloves_reload_mastery, gloves_reload_collections) {
    // Guns have mastery reload OR coll reload OR none, not both
    let fastReload = 1 - Math.pow(0.965, reload_skill);
    let glovesReload = gloves_base_reload_bonus + (2.5 * parseInt(nimble));
//    console.log(helmet_base_reload_bonus, vest_base_reload_bonus, gloves_base_reload_bonus, nimble, gun_reload_mastery, gun_reload_collections, gloves_reload_mastery, gloves_reload_collections)
//    console.log("Calced")
//    console.log(fastReload, glovesReload)
    let reloadCalced = ((100 - (glovesReload + helmet_base_reload_bonus + vest_base_reload_bonus)) / 100) * (1 - fastReload) * (1 - gun_mast_coll_reload) - (gloves_reload_mastery + gloves_reload_collections);
    let reloadBonus = roundNumber(reloadCalced, 4);
//    console.log("Reload:", reloadBonus) //, ((100-(glovesReload+helmet_base_reload_bonus+vest_base_reload_bonus))/100), (1-fastReload), (1-placeholder_gun_mast_coll), (gloves_reload_mastery+gloves_reload_collections));
    if (reloadBonus < 0.2) {
        return 0.2;
    } else {
        return reloadBonus;
    }
}

function getCapacity(clipPity, clip_size, cores, base_cores, gun_capacity_mastery, gun_capacity_collections, capAug) {
    let initialCap = clip_size * ([0, 0.1, 0.3, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.5][capAug]);
    let capCorrection = [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0][capAug];
    if(initialCap % 1 == 0){
        initialCap -= capCorrection;
    }else{
        initialCap = Math.floor(initialCap);
    }
    let cap_aug_amount = 0;
    if(initialCap < capAug){
        cap_aug_amount = capAug;
    }else{
        cap_aug_amount = initialCap;
    }
    
    let clip_cores = 0;
    if(clipPity){
        let additionCapCores = Math.floor(clip_size * (base_cores-1));
        if(additionCapCores < cores){
            clip_cores = cores;
        }else{
            clip_cores = additionCapCores;
        }
    }else{
        clip_cores = Math.round(clip_size * (base_cores-1))
    }
    
    let armour_check = 0;
    // DP4 in sheet
     
    let mastery_cap = 0;
    if (typeof gun_capacity_mastery === 'string' || gun_capacity_mastery instanceof String) { // if % based
        let perc_conv = 0.01 * parseInt(gun_capacity_mastery.slice(0, -1));
        mastery_cap = Math.floor(clip_size * perc_conv);
        if(mastery_cap < 1){
            mastery_cap = 1;
        }
    } else { // static amount
        mastery_cap += gun_capacity_mastery;
    }

    let collections_cap = 0;
    if (typeof gun_capacity_collections === 'string' || gun_capacity_collections instanceof String) {
        collections_cap += (clip_size * 1 + Math.round(0.01 * parseInt(gun_capacity_collections.slice(0, -2)))); // So, "5%" gets stored as "5%0"
    } else {
        collections_cap += gun_capacity_collections;
    }
    
//    let cap_new = clip_size + cap_aug_amount + clip_cores + armour_check + mastery_perc + mastery_abs
    let capacity = clip_size + cap_aug_amount + clip_cores + armour_check + mastery_cap + collections_cap;
    
//    console.log("initialCap", initialCap);
//    console.log("#####");
//    console.log("clip_size", clip_size);
//    console.log("cap_aug_amount", cap_aug_amount);
//    console.log("clip_cores", clip_cores);
//    console.log("armour_check", armour_check);
//    console.log("mastery_cap", mastery_cap);
//    console.log("collections_cap", collections_cap);
//    console.log("#####");
//    console.log("capacity", capacity);
    
    return capacity;
}

function getSCMultiplier(){
    
}

function getAugments(...augments) {
    let weaponAugments = {
        "Deadly": 0,
        "Overclocked": 0,
        "Tenacious": 0,
        "Pinpoint": 0,
        "Adaptive": 0,
        "Piercing": 0,
        "Capacity": 0,
        "Race Modded": 0
    };

    augments.forEach((augment) => {
        if (weaponAugments.hasOwnProperty(augment[0])) {
            weaponAugments[augment[0]] = parseInt(augment[1]);
        }
    });

    return weaponAugments;
}

function getMasteries(weaponClass, gunMasteryLevel, hda_mult, HelmetMastery) {
    let masteryStats = weaponMasteries(weaponClass, gunMasteryLevel);

    let otherMasteries = {
        "hda_mult": hda_mult,
        "helm_mast2": HelmetMastery >= 2
    };

    let masteries = Object.assign({}, masteryStats, otherMasteries);
    return masteries;
}

function getCollections(weaponClass, gunNormal, gunRed, gunBlack, helmetColl) {
    const weaponColl = weaponCollections();
    let normalColl, redColl, blackColl;

    if (gunNormal) {
        normalColl = weaponColl[weaponClass]["Normal"];
    } else {
        normalColl = {
            "dmg": 0,
            "rps": 0,
            "pierce": 0,
            "critc": 0,
            "critdmg": 0,
            "capacity": 0,
            "reload": 0

        };
    }
    if (gunRed) {
        redColl = weaponColl[weaponClass]["Red"];
    }
    if (gunBlack) {
        blackColl = weaponColl[weaponClass]["Black"];
    }

    let tempColl = addToCollDict(normalColl, redColl);
    let collections = addToCollDict(tempColl, blackColl);
    collections["helmet"] = helmetColl;

    return collections;
}

function addToCollDict(dict1, dict2) {
    //TODO: Check
    for (var key in dict2) {
        if (dict2.hasOwnProperty(key)) {
            dict1[key] = dict2[key] + dict1[key];
        }
    }
    return dict1;
}

function roundNumber(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
}
