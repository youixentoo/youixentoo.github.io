

function setGun(gun) {
    console.log(gun);
}

function setClass(character) {
//    console.log(character);
    if (character == "Assault") {
        $("#char_skills1").html(`<label>Killing Spree: <input type="number" min="0" max="25" step="1" value="0" name="ks"></label>`);
        $("#char_skills2").html(`<label>Deadly Force: <input type="number" min="0" max="25" step="1" value="0" name="df"></label>`);
    } else if (character == "Heavy") {
        $("#char_skills1").html(`<label>Hold The Line: <input type="number" min="0" max="25" step="1" value="0" name="htl"></label>`);
        $("#char_skills2").html("<label></label>");
    } else {
        $("#char_skills1").html("<label></label>");
        $("#char_skills2").html("<label></label>");
    }
}

function setVersion(version) {
    console.log(version);
}

function setHelmet(helmet) {
    console.log(helmet);
}

function setVest(vest) {
    console.log(vest);
}

function setGloves(gloves) {
    console.log(gloves);
}


function getDPS() {
    //TODO: Calc reload
    const weaponData = weaponJSON();
    const armourData = armourDPSJSON();
    const armourWithoutVersion = ["Dynamo", "Overwatch", "Mastodon", "Mako", "Vulkan", "Other"];
    let weaponName = "CM Proton Arc";
    let weapon = weaponData["Premium"][weaponName];
    let cores = 10;

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
    if ($.inArray(selectedHelmet, armourWithoutVersion)) {
        helmetVersion = $('input[name="helmet_ver"]:checked').val();
    }

    let selectedVest = $('input[name="select_vest"]:checked').val();
    let selectedGloves = $('select[name="select_gloves"] option:selected').val();
    if ($.inArray(selectedGloves, armourWithoutVersion)) {
        glovesVersion = $('input[name="gloves_ver"]:checked').val();
    }

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

    //console.log(weapon)
    let weaponAugments = getAugments([$('select[name="aug1"] option:selected').val(), $('input[name="aug1_grade"]').val()], [$('select[name="aug2"] option:selected').val(), $('input[name="aug2_grade"]').val()],
            [$('select[name="aug3"] option:selected').val(), $('input[name="aug3_grade"]').val()], [$('select[name="aug4"] option:selected').val(), $('input[name="aug4_grade"]').val()]);
    console.log("Augs: ", weaponAugments)

    // let weapon_class = "Flamethrower" // weapon["Class"]
    let masteries = getMasteries(weapon["Class"], $('input[name="gun_mastery"]').val(), $('select[name="hda"] option:selected').val(), $('input[name="helmet_mastery"]').val());
    console.log("Masteries: ", masteries)

    let helmetColl = $('input[name="helmet_collections_rel"]').is(":checked") ? true : false;
    let gunNormal = $('input[name="gun_collections_normal"]').is(":checked") ? true : false;
    let gunRed = $('input[name="gun_collections_red"]').is(":checked") ? true : false;
    let gunBlack = $('input[name="gun_collections_black"]').is(":checked") ? true : false;
    let collections = getCollections(weapon["Class"], gunNormal, gunRed, gunBlack, helmetColl);
    console.log("Collections: ", collections)

    // So guns have reload bonusses from amsteries and collections
    let gun_reload_mastery = 0;
    let gun_reload_collections = 0;
    let reload_bonus = getReload($('input[name="fr"]').val(), helmet_base_reload_bonus, vest_base_reload_bonus, gloves_base_reload_bonus, $('input[name="nimble"]').val(), gun_reload_mastery, gun_reload_collections);

    calculateDPS(weapon, weaponName, cores, weaponAugments, armourAugments, masteries, collections, class_char, class_level, deadly_force, crit_level, helmet_base_crit_bonus, gloves_base_crit_bonus, helmet_base_dmg_bonus, gloves_base_dmg_bonus, reload_bonus);
}


function calculateDPS(weapon, weaponName, cores, weaponAugments, armourAugments, masteries, collections, class_char, class_level, deadly_force, crit_level, helmet_base_crit_bonus, gloves_base_crit_bonus, helmet_base_dmg_bonus, gloves_base_dmg_bonus, reload_bonus) {
    //TODO: Fit super crit in this mess somewhere
    //TODO: Fix rounding error in multiplication of augments
    //TODO: Cap aug and add support for +5% lmg cap from collections and the +10% one from pistol masteries -- special for mustang
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
    let base_cores = 1 + (0.05 * cores);

    let pinpoint = (3 + (1 * (weaponAugments["pinpoint"] - 1))) * (weaponAugments["pinpoint"] > 0);
    // if mustang
    let cap_aug = clip_size * ([0, 1.1, 1.3, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4][weaponAugments["capacity"]]);
    let capacity = (clip_size * base_cores) + cap_aug;
    //console.log(capacity)
    let adaptive = weaponAugments["adaptive"];
    let smart_target = [0, 0.02, 0.04, 0.06, 0.08, 0.095, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17][armourAugments["smart_target"]];
    let target_assist = (2.5 + (0.5 * (armourAugments["target_assist"] - 1))) * (armourAugments["target_assist"] > 0);

    let hda_bonus = masteries["hda_mult"];
    let helm_mastery2 = 1 + (0.01 * masteries["helm_mast2"]);
    let gun_dmg_mastery = masteries["gun_dmg"];
    let gun_rps_mastery = masteries["gun_rps"];
    let gun_crit_mastery = masteries["gun_critc"];
    let gun_critdmg_mastery = masteries["gun_critdmg"];
    let gun_pierce_mastery = masteries["gun_pierce"];
    let shotgun_mastery5 = masteries["shotgun5"];

    let gun_dmg_collections = collections["gun_dmg"];
    let gun_rps_collections = collections["gun_rps"];
    let gun_pierce_collections = collections["gun_pierce"];
    let gun_critdmg_collections = collections["gun_critdmg"];
    let helmet_collections = 1 * collections["helmet"];

    let class_bonus;
    // Killing spree / HTL bonus
    if (class_char === "Assault") {
        class_bonus = 1 + (0.3 + (0.05 * (class_level - 1))) * (class_level > 0); //1 1.3-2.5
    } else if (class_char === "Heavy") {
        class_bonus = 1 + (0.3 + (0.04 * (class_level - 1))) * (class_level > 0); //1 1.3-2.26
    } else {
        class_bonus = 1;
    }

    // Crit
    let crit_skill_chance = (4 + (0.5 * (crit_level - 1))) * (crit_level > 0); //0% 4%-16%
    let crit_skill_mult = (1 + (0.05 + (0.04 * (crit_level - 1))) * (crit_level > 0)) + gun_critdmg_mastery + gun_critdmg_collections; //1 1.05-2.01
    let crit_chance = pinpoint + target_assist + crit_skill_chance + gun_crit_mastery + helmet_collections + helmet_base_crit_bonus + gloves_base_crit_bonus + gun_base_crit;
    let crit_bonus = (crit_chance * crit_skill_mult) / 100;

    // Main dps formula:
    let pure_damage = (1 + (0.1 * weaponAugments["deadly"])) * base_dmg * base_cores * gun_dmg_mastery * gun_dmg_collections * helm_mastery2 * hda_bonus * (1 + helmet_base_dmg_bonus + gloves_base_dmg_bonus + smart_target + (0.01 * deadly_force)) * (class_bonus + crit_bonus) * (pellets + shotgun_mastery5);
    let pure_DOT = (1 + (0.1 * weaponAugments["tenacious"])) * base_DOT * base_cores * hda_bonus; // Every gun that doesn't have DOT has base_DOT = 0
    let pure_rps = (1 + (0.1 * weaponAugments["oc"])) * base_cores * base_rps * gun_rps_collections * gun_rps_mastery;
    let pure_dps = (pure_damage + pure_DOT) * pure_rps;

    // Average
    let uptime = (capacity - 1) / pure_rps / ((capacity - 1) / pure_rps + reload_bonus * reload); // clip_size-1 because the last shot and reloading happen at the same time
    let average_dps = pure_dps * uptime;

    // Pierce
    let gun_pierce = (base_pierce * base_cores * (1 + (0.1 * weaponAugments["pierce"])) + gun_pierce_mastery + gun_pierce_collections) * class_bonus;
    let pure_pierce = pure_dps * gun_pierce;
    let average_pierce = average_dps * gun_pierce;

    console.log("------------")
    console.log("DPS:")
    console.log("Pure: ", pure_dps);
    console.log("Average: ", average_dps);
    console.log("Pure pierce: ", pure_pierce);
    console.log("Average pierce: ", average_pierce);

    // Special cases:
    // Calamity, T-189 MGL, Krakatoa, Every LMG, Every Pistol --> esp. Mustang
}

function getReload(reload_skill, helmet_base_reload_bonus, vest_base_reload_bonus, gloves_base_reload_bonus, nimble, gun_reload_mastery, gun_reload_collections) {
    return 0.2;
}

function getAugments(augment1, augment2, augment3, augment4) {
    console.log(augment1)
    console.log(augment2)
    console.log(augment3)
    console.log(augment4)

    let weaponAugments = {
        "deadly": 12,
        "oc": 12,
        "tenacious": 0,
        "pinpoint": 12,
        "adaptive": 12,
        "pierce": 0,
        "capacity": 0
    };

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
    let collectionStats = weaponColl[weaponClass];


    let collections = {
        "gun_dmg": 1,
        "gun_rps": 1,
        "gun_pierce": 0,
        "gun_critc": 0,
        "gun_critdmg": 0,
        "gun_capacity": 0,
        "gun_reload": 0,
        "helmet": helmetColl
    };

    return collections;
}