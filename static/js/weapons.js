/*
 TODO:
 - Formatted output
 - Info boxes explaining terms (pure/avg dps, DoT, etc)

 - Code saving/exporting for sharing builds (Edit armour code)
    - Menu with pre-loaded codes
 - Time to kill menu for bosses
    - Adaptive/BCB
    - Shooting at boss dps for assault rifles
    - Stacked bosses? (Capped by pierce)

 - Cleanup
 - Cut off output table
 *
 */

function ttk(){
    // Black pistols are not caught, not sure if it's worth the effort
    // Verify kill times
    //  - Zerf time seems high
    // Burst: time between shots not affected by adren / burst timeout not reset after reload
    // General damage multiplier --> zerf wall/corner (needs input/button)
    // standing still with pbe
    // Concussion?
    // PBE --> Multiple bosses stacked
    //     - PBE/General: pierce capped

    // Adren cooldown - done
    // HTL cooldown - done
    // Toggle KS perma on/off -- possibly specify duration of ks - done
    // >> NOT << checking if enough energy to activate adren/htl continuously >> NOT <<
    const bossData = bossJSON();
    let dpsData = getDPS(true);
    // let drainTime = dpsData[1] / (dpsData[5] * dpsData[7])
    // console.log("dps data", dpsData);

    // ### User defined variables ###
    // let selectedBoss = "Necrosis";
    // let bossVersion = "Savage";
    const isHeavy = (dpsData[0][4] === "Heavy");
    let selectedBoss = $('select[name="ttk_boss"] option:selected').val();
    let bossVersion = $('select[name="ttk_version"] option:selected').val();
    let bossMod = $('select[name="ttk_location"] option:selected').val();
    let zombieModifier = $('select[name="ttk_modifier"] option:selected').val(); // Elite - None - Nightmarish
    let damageMultiplier = $('input[name="ttk_dmg_mult"]').val();
    let stackedBosses = 2; // 1 - 60 (spawn cap)
    // let ksDuration;
    // let ksDuration = Infinity;
    let ks_infinite = $('input[name="ttk_ks_infinte"]').is(":checked");
    if(ks_infinite){
        ksDuration = Infinity;
    }else{
        ksDuration = $('input[name="ttk_ks_duration"]').val();
    }
    // console.log("selcteds", selectedBoss, bossVersion, bossMod, zombieModifier, ksDuration);

    // ### End of user defined variables ###
    let bossHP = bossData[selectedBoss][bossVersion]["HP"][bossMod];
    let bossResists = bossData[selectedBoss][bossVersion]["Resists"][dpsData[0][11]]/100;
    if(zombieModifier === "Nightmarish" & bossResists < 0.75){ // resists stay at 75% for nightmarish enraged devs
        bossResists = 0.75; // TODO: Check if true for all bosses (or like check how it works for like mech and wicker)
    }

    [classDmgBonus, classDmgDuration] = getClassDmgSkillBonusses(dpsData[0][4], dpsData[0][5], ksDuration);
    const dmgSingleShotWithBonusses = getDmgOneShot(dpsData[0][0], classDmgBonus, dpsData[0][13], dpsData[0][14], dpsData[0][15], dpsData[0][16], dpsData[0][2], dpsData[0][1], dpsData[0][21], damageMultiplier);
    const dmgSingleShotWithoutBonusses = getDmgOneShot(dpsData[0][0], 1, dpsData[0][13], dpsData[0][14], dpsData[0][15], dpsData[0][16], dpsData[0][2], dpsData[0][1], dpsData[0][21], damageMultiplier);
    const effectiveBossResistances = getEffectiveBossResistances(bossResists, dpsData[0][9], dpsData[0][12], dpsData[0][10]);
    
    let maxClipsRequired = maxClipsToKill(selectedBoss, bossHP, effectiveBossResistances, (dpsData[0][0] + dpsData[0][1] + dpsData[0][2]), dpsData[0][9], dpsData[0][12], dpsData[0][10], dpsData[0][8]);
    // console.log("Max clips needed: ", maxClipsRequired, dmgSingleShotWithBonusses, dmgSingleShotWithoutBonusses);

    timeScale = shotsTimeScale(maxClipsRequired, dpsData);
    console.log("timescale", timeScale); // print timescale
    [accumulativeTime, accumulativeShots] = bossKill(selectedBoss, bossHP, effectiveBossResistances, dmgSingleShotWithBonusses, dmgSingleShotWithoutBonusses, classDmgDuration, isHeavy, timeScale)

    let bossVersionMessage;
    if(bossVersion === "Standard"){
        bossVersionMessage = " ";
    }else{
        bossVersionMessage = ` ${bossVersion} `;
    }

    let bossModMessage;
    if(zombieModifier === "None"){
        bossModMessage = "";
    }else{
        bossModMessage = " Elite";
    }

    let ammoPriceMessage = getAmmoCost(dpsData[0][18], dpsData[0][11], dpsData[0][20], dpsData[0][19], accumulativeShots);
    let TTKMessage = `When using a ${dpsData[0][22]}, killing a ${bossMod}${bossVersionMessage}${selectedBoss}${bossModMessage} will take on average ${roundNumber(accumulativeTime, 4).toLocaleString()} seconds, for an average dps of ${roundNumber(bossHP/accumulativeTime, 4).toLocaleString()}. Requiring ${accumulativeShots.toLocaleString()} shots and costing $${ammoPriceMessage.toLocaleString()}`
    console.log(TTKMessage);

    let outArea = document.getElementById("ttk-out");
    outArea.innerHTML+=`<a>${TTKMessage}</a><br>`;

function getAmmoCost(weaponClass, damageType, weaponVersion, hdaBonusMultiplier, shotsFired){
    // Premium ammo is standard_ammo * 6.4; chem/heat is *2, energy *3. Std and Black pistol ammo is free. 
    // red: std * 10, black: std * 12
    const initialAmmoPrices = ammoPrices();
    let ammoCost = initialAmmoPrices[weaponClass];

    if(damageType === "Energy"){
        ammoCost *= 3;
    }else if(damageType === "Physical"){
    }else{
        ammoCost *= 2;
    }

    if(weaponVersion === "Normal"){
        if(weaponClass === "Pistol" & hdaBonusMultiplier == 1.0){
            ammoCost = 0;
        }
    }else if(weaponVersion === "Red"){
        ammoCost *= 10;
    }else{
        if(weaponClass === "Pistol" & hdaBonusMultiplier == 1.0){
            ammoCost = 0;
        }else{
            ammoCost *= 12;
        }
    }
    
    if(hdaBonusMultiplier > 1.0){
        ammoCost *= 6.4;
    }

    return Math.ceil(shotsFired*ammoCost);
}

function bossKill(selectedBoss, currentBossHP, effectiveBossResists, dmgSingleShotWithBonusses, dmgSingleShotWithoutBonusses, currentClassDmgDuration, hasCooldown, timeScale){
    // hasCooldown only applies to htl, calc assumes 100% uptime of biobomb and ks doesnt get retriggered if running out
    const devEnragedSplit = [0.8, 0.2];
    const htlCooldown = 30 - currentClassDmgDuration;
    const baseClassDuration = currentClassDmgDuration;
    let cooldownClassSkill = htlCooldown;
    
    let accumulativeTime = 0;
    let accumulativeShots = 0;
    let index = 0;
    let currentDmgOfShot;
    let currentDmgReductionOfShot;
    
    while(currentBossHP > 0){
        [shotOrReload, time] = timeScale[index]
        if(shotOrReload === "reload"){
            accumulativeTime += time;
            if(hasCooldown){
                if(cooldownClassSkill === htlCooldown){ // if htl is active
                    if(time <= currentClassDmgDuration){ // if reload time is shorter or equal to remaining duration
                        currentClassDmgDuration -= time;
                    }else{ // htl running out during reloading
                        currentClassDmgDuration -= time;
                        cooldownClassSkill = htlCooldown + currentClassDmgDuration;
                        currentClassDmgDuration = baseClassDuration;
                    }
                }else{ // htl not active
                    if(cooldownClassSkill <= time){ // reload time is shorter or equal to remaining cooldown
                        cooldownClassSkill -= time;
                    }else{ // htl activating during reloading
                        cooldownClassSkill -= time;
                        currentClassDmgDuration = baseClassDuration + cooldownClassSkill;
                        cooldownClassSkill = htlCooldown;
                    }
                }
            }else{
                currentClassDmgDuration -= time;
            }

        }else{
            if(hasCooldown){
                // remainingAdrenTime > 0 & remainingAdrenCooldown === adrenCooldownTime){ // check if adren is still active and not on cooldown
                if(currentClassDmgDuration > 0 & cooldownClassSkill == htlCooldown){
                    currentDmgOfShot = dmgSingleShotWithBonusses;
                    if(time <= currentClassDmgDuration){
                        currentClassDmgDuration -= time;
                    }else{ // shot will be shot with htl bonus, but htl will end and be on cooldown
                        cooldownClassSkill = htlCooldown - currentClassDmgDuration;
                        currentClassDmgDuration = baseClassDuration;
                    }
                }else{ // when htl is off and/or on cooldown
                    if(cooldownClassSkill <= 0){ // if cooldown is over --> htl active again
                        currentDmgOfShot = dmgSingleShotWithBonusses;
                        currentClassDmgDuration -= time;
                        cooldownClassSkill = htlCooldown;
                    }else{
                        currentDmgOfShot = dmgSingleShotWithoutBonusses;
                        cooldownClassSkill -= time;
                    }
                }

            }else{ // for ks as it does have a skill duration, but no cooldown
                if(currentClassDmgDuration > 0){
                    currentDmgOfShot = dmgSingleShotWithBonusses;
                    currentClassDmgDuration -= time;
                }else{
                    currentDmgOfShot = dmgSingleShotWithoutBonusses;
                }
            }

            // damage reduction calculations
            if(selectedBoss === "Devastator" & currentBossHP > (currentBossHP * devEnragedSplit[1])){
                currentDmgReductionOfShot = 1;
            }else{
                currentDmgReductionOfShot = (1-effectiveBossResists);
            }
            // bossHP -= shotOrReload;
            currentBossHP -= currentDmgOfShot * currentDmgReductionOfShot;
            accumulativeShots++;
            accumulativeTime += time;
        }
        index++;
    }
    return [accumulativeTime, accumulativeShots];

}

function getEffectiveBossResistances(bossResistances, adaptive, mastery, bioBomb){
    let effectiveBossResistances = (bossResistances - adaptive - mastery) * bioBomb;
    if(effectiveBossResistances < 0){
        effectiveBossResistances = 0;
    }
    return effectiveBossResistances;
}


function maxClipsToKill(selectedBoss, bossHP, bossResists, damage, adaptive, mastery, bioBomb, capacity){
    const devEnraged = [0.8, 0.2];
    // console.log(selectedBoss, bossHP, bossResists, damage, adaptive, mastery, bioBomb);
    let newBossResists = (bossResists - adaptive - mastery) * bioBomb;
    // console.log(newBossResists);
    if(newBossResists < 0){
        newBossResists = 0;
    };
    // console.log(newBossResists);
    let shotsRequired;
    if(selectedBoss === "Devastator"){
        shotsRequired = ((bossHP*devEnraged[0]) / damage) + ((bossHP*devEnraged[1]) / (damage * (1-newBossResists)))
    }else{
        shotsRequired = bossHP / (damage * (1-newBossResists)) 
    }
    return Math.ceil(shotsRequired / capacity);
}


function shotsTimeScale(maxClipsRequired, dpsData){
    // Cooldown htl: 30 sec, adrenaline: 25 sec
    const adrenBonus = dpsData[0][6];
    const adrenDuration = dpsData[0][7];
    const adrenCooldownTime = 25 - adrenDuration;
    let capacity =  dpsData[0][8];
    let burstData = specialCases(dpsData[0][22], "Burst")
    // console.log(classDmgBonus, classDmgDuration, adrenBonus, adrenDuration, dmgSingleShotWithBonusses, dmgSingleShotWithoutBonusses);
    console.log("has burst", burstData);
    
    let maxScaleSize = maxClipsRequired + (maxClipsRequired - 1);

    let remainingAdrenTime = adrenDuration;
    let remainingAdrenCooldown = adrenCooldownTime;

    let burstCarryOver = 0;
    let shotsArray = [];
    // crI; clip/reload index, always has the pattern of clip-reload-clip etc
    for(let crI = 0; crI < maxScaleSize; crI++){
        if(crI % 2 == 0){ // even
            [remainingAdrenTime, remainingAdrenCooldown, clipTimes, burstCarryOver] = calcClipDrainTime(capacity, dpsData[0][3], adrenBonus, remainingAdrenTime, remainingAdrenCooldown, adrenDuration, adrenCooldownTime, burstData, burstCarryOver);
            shotsArray.push(clipTimes);
        }else{ // odd
            [remainingAdrenTime, remainingAdrenCooldown, reloadTime] = calcTimeSpendReloading(dpsData[0][17], adrenBonus, remainingAdrenTime, remainingAdrenCooldown, adrenDuration, adrenCooldownTime);
            shotsArray.push(reloadTime);
        }
    };
    let flattenedShotsArray = shotsArray.flat() // From [ Array(x) [ Array(x) [ Array(2) ] ] ] to [ Array(x) [ Array(2) ] ]

    console.log("\n####\nshowArray flat: ", flattenedShotsArray);
    return flattenedShotsArray;
}

function calcTimeSpendReloading(regularReloadTime, adrenBonus, remainingAdrenTime, remainingAdrenCooldown, adrenDuration, adrenCooldownTime){
    // console.log("adren", adrenBonus)
    const reloadingWithAdren = regularReloadTime / (1+(adrenBonus - 1));
    let reloadTime = [];
    
    if(remainingAdrenCooldown === adrenCooldownTime){   // if adren active or partially active and not on cooldown
        if(reloadingWithAdren <= remainingAdrenTime){  // if shot time is lower of equal to remaining active time
            reloadTime.push(["reload", reloadingWithAdren]);
            remainingAdrenTime -= reloadingWithAdren;
        }else{ // when shot time is longer than remaining active time (partial) (adren running out)
            let fractionAmountReloadingWithAdren = remainingAdrenTime / reloadingWithAdren;
            [timeSpendReloadAdren, timeLeftReloading] = calcPartialReload(fractionAmountReloadingWithAdren, reloadingWithAdren, regularReloadTime);
            reloadTime.push(["reload", timeSpendReloadAdren + timeLeftReloading]);

            remainingAdrenTime = adrenDuration;
            remainingAdrenCooldown = adrenCooldownTime - timeLeftReloading;
        }
    }else{ // reloading when adren on cooldown
        if(remainingAdrenCooldown <= 0){ // if adren cooldown over, accounts for partial activation
            remainingAdrenTime += remainingAdrenCooldown;
            let fractionalReloadAdren = (adrenDuration - remainingAdrenTime) / reloadingWithAdren;
            [timeSpendReloadAdren, timeLeftReloading] = calcPartialReload(fractionalReloadAdren, reloadingWithAdren, regularReloadTime)
            reloadTime.push(["reload", timeSpendReloadAdren + timeLeftReloading])

            remainingAdrenCooldown = adrenCooldownTime;
            remainingAdrenTime = adrenDuration - timeSpendReloadAdren;
        }else{ // reloading without adren
            reloadTime.push(["reload", regularReloadTime])
            remainingAdrenCooldown -= regularReloadTime;
        }
    }
    
    return [remainingAdrenTime, remainingAdrenCooldown, reloadTime];
}

function calcPartialReload(fractionAmountReloadingWithAdren, reloadingWithAdren, regularReloadTime){
    let timeSpendReloadAdren = reloadingWithAdren * fractionAmountReloadingWithAdren;
    let timeLeftReloading = regularReloadTime * (1 - fractionAmountReloadingWithAdren);
    return [timeSpendReloadAdren, timeLeftReloading];
}

function calcClipDrainTime(capacity, gunRps, adrenBonus, remainingAdrenTime, remainingAdrenCooldown, adrenDuration, adrenCooldownTime, burstData, burstCarryOver){
    // console.log("funalcClipDrainTime", capacity, gunRps, adrenBonus, remainingAdrenTime);
    const fullClipAdrenTime = capacity / (gunRps * adrenBonus);
    const timeOfAdrenShot = fullClipAdrenTime / capacity;
    const regularClipTime = capacity / gunRps;
    const timeOfRegularShot = regularClipTime / capacity;
    let clipTimes = [];
    // let burstCarryOver = 0;

    // #### TODO: check if the remaining burst time gets added before or after the reload, if neither, this might actually give a higher rps than it's supposed to
    if(burstData){ // --> if the weapon is a burst weapon
        const burstTime = burstData["Amount"] * burstData["Delay"];
        const timeBetweenBurstsAdren = 1 / (gunRps * adrenBonus);
        const timeBetweenBurstsReg = 1 / gunRps;
        const amountOfBursts = capacity / burstData["Amount"];
        const reloadOverlap = (amountOfBursts - Math.floor(amountOfBursts)) * burstData["Amount"];
        let toSortTimeLine = []

        let burstStartTime = 0;
        // if(burstCarryOver > 0){

        // }else{ // } // burst carry over
        // if(remainingAdrenTime > 0 & remainingAdrenCooldown == adrenCooldownTime){ // if adren active for whole clip
        let timeBetweenBursts;
        // let adrenActive = (adrenDuration > 0) ? true : false;
        for(let burstIndex = 0; burstIndex < Math.floor(amountOfBursts); burstIndex++){ // time between bursts is affected by adren (rps), shots within a burst arent 
            let shot;
            if(remainingAdrenTime > 0 & remainingAdrenCooldown == adrenCooldownTime){ // adren hasnt run out and isnt on cooldown
                timeBetweenBursts = timeBetweenBurstsAdren
            }else{
                if(remainingAdrenCooldown <= 0){ // adren cooldown over --> adren active again
                    timeBetweenBursts = timeBetweenBurstsAdren
                }else{ // adren on cooldown or off
                    timeBetweenBursts = timeBetweenBurstsReg
                }
            }

            for(shot = 1; shot <= burstData["Amount"]; shot++){
                var shotIn_timeLine = burstStartTime + (shot * burstData["Delay"])
                toSortTimeLine.push({startTime: burstStartTime, shotCount: shot-1, value: shotIn_timeLine});

                if(remainingAdrenTime > 0 & remainingAdrenCooldown == adrenCooldownTime){ // if adren active and not on cooldown
                    remainingAdrenTime -= timeBetweenBursts;
                }else{
                    if(remainingAdrenCooldown == adrenCooldownTime){ // if adren ran out last shot
                        remainingAdrenCooldown += remainingAdrenTime;
                        remainingAdrenTime = adrenCooldownTime;
                    }else{ // if adren is off and is currently on cooldown
                        if(remainingAdrenCooldown <= 0){ // if cooldown is over --> adren active again
                            remainingAdrenTime = (adrenDuration - timeBetweenBursts) + remainingAdrenCooldown; // can only be negative or 0 here, can activate just before the shot is fired
                            remainingAdrenCooldown = adrenCooldownTime;
                        }else{
                            remainingAdrenCooldown -= timeBetweenBursts;
                        }
                    }
                }
                
            }
            // console.log("burst s time", burstStartTime);
            burstStartTime += (timeBetweenBursts);
            remainingAdrenTime -= timeBetweenBursts

            
        }

        for(let remainingShots = 1; remainingShots <= reloadOverlap; remainingShots++){
            var remShotIn_timeLine = burstStartTime + (remainingShots * burstData["Delay"])
            toSortTimeLine.push({startTime: burstStartTime, shotCount: remainingShots-1, value: remShotIn_timeLine});
            remainingAdrenTime -= remShotIn_timeLine;
        }

        burstCarryOver = reloadOverlap;
 
        /*
        if(fullClipAdrenTime <= remainingAdrenTime & remainingAdrenCooldown == adrenCooldownTime){ // if adren active for whole clip
            for(let shot = 1; shot <= capacity; shot++){
                if(shot == capacity){ // last shot, happens at same time of reload, so no subtraction
                    clipTimes.push(["shot", 0]);
                }else{
                    // console.log("shot:cap", shot, capacity);
                    clipTimes.push(["shot", timeOfAdrenShot]);
                }
            }
            remainingAdrenTime -= fullClipAdrenTime;
        }else{ 
            for(let shot = 1; shot <= capacity; shot++){
                if(shot == capacity){ // last shot, happens at same time of reload, so no subtraction
                    clipTimes.push(["shot", 0]);
                }else{
                    if(remainingAdrenTime > 0 & remainingAdrenCooldown === adrenCooldownTime){ // check if adren is still active and not on cooldown
                        clipTimes.push(["shot", timeOfAdrenShot]);
                        if(timeOfAdrenShot <= remainingAdrenTime){ // if there is time remaining for a adren shot
                            remainingAdrenTime -= timeOfAdrenShot;
                        }else{ // shot will still be shot with adren active, but adren will end and will be on cooldown
                            remainingAdrenCooldown = adrenCooldownTime - remainingAdrenTime;
                            remainingAdrenTime = adrenDuration; // reset adren
                        }
                    }else{ // when adren is off and/or on cooldown
                        if(remainingAdrenCooldown <= 0){ // if cooldown is over --> adren active again
                            clipTimes.push(["shot", timeOfAdrenShot]);
                            remainingAdrenTime = (adrenDuration - timeOfAdrenShot) + remainingAdrenCooldown; // can only be negative or 0 here, can activate just before the shot is fired
                            remainingAdrenCooldown = adrenCooldownTime;
                        }else{  // adren off and not on cooldown (no adren)
                            clipTimes.push(["shot", timeOfRegularShot]);
                            remainingAdrenCooldown -= timeOfRegularShot;
                        }
                    }
                }
            }
        }*/
        

        // console.log("unsort", toSortTimeLine);
        toSortTimeLine.sort((a,b) => a.value - b.value)

        console.log("sorted", toSortTimeLine)
        // required for adjusting the drain time for the last burst at high rps, as it won't get overlapped
        // let timeAdjust = Math.max(burstTime - timeBetweenBursts, 0) * (1+(amountOfBursts - Math.ceil(amountOfBursts)));
        // [ 0, 0.02, 0.04, 0.06, 0.05510844239294082, 0.07510844239294082, 0.09510844239294082, 0.11510844239294082, 0.11021688478588164, 0.13021688478588164, … ]
        // let newRps = capacity / ((timeBetweenBursts * amountOfBursts) + timeAdjust);

        /*
        #####

        To get accurate times for clipTimes, you need to find the difference between the current and next shot ==> To get the time value of x, subtract index x with index x-1.

        Loop over list, start at index 1
        #####

        0: Object { startTime: 0, shotCount: 0, value: 0.02 }
        1: Object { startTime: 0, shotCount: 1, value: 0.04 }
        2: Object { startTime: 0, shotCount: 2, value: 0.06 }
        3: Object { startTime: 0.04925079687789349, shotCount: 0, value: 0.06925079687789348 }
        4: Object { startTime: 0, shotCount: 3, value: 0.08 }

        ==>
            cliptimes = [["shot", 0.02], ["shot", 0.02], ["shot", 0.02], ["shot", 0,00925079687789348], ["shot", 0,01074920312210652]]

        */

        // toSortTimeLine.forEach((obj) => {
        //     clipTimes.push(["shot", obj.value - (obj.startTime)]);
        // });
        clipTimes.push(["shot", toSortTimeLine[0].value]) // To store first shot of clip
        for(let indexSortTimeLine = 1; indexSortTimeLine < toSortTimeLine.length; indexSortTimeLine++){
            clipTimes.push(["shot", toSortTimeLine[indexSortTimeLine].value-toSortTimeLine[indexSortTimeLine-1].value])
        }

        console.log("clip time", clipTimes)
        // console.log("bursT", capacity, burstTime, timeBetweenBursts, amountOfBursts, reloadOverlap, Math.floor(amountOfBursts), timeBetweenBursts - burstTime);
        // exit
        // if(burstShotsRemaining != 0){ // shooting 1 of 4 shots before reload, does not reset the 'burst' after reloading. 

        // }else{
        //     // raptor: 4 rps, 0.02s delay
        //     // Time between bursts: 1/4 = 0.25s
        //     // 1 burst takes 0.08s, after which there is 0.25-0.08=0.17 cooldown
        //     // positive
        //     // --
        //     // 10 cores, oc 12: 13.2 rps 
        //     // TbB: 1/13.2 = 0.07575
        //     // With a burst time of 0.08, there is a 0.07575-0.08=-0.004242 cooldown
        //     // negative

        //     // ria 75: 1 rps, 0.1s delay
        //     // time between bursts: 1/1 = 1s
        //     // 1 burst takes 0.4s, after which there is a 1-0.4=0.6s cooldown 
        //     // positive
        //     // --
        //     // 10 cores, oc 12: 3.3 rps 
        //     // time between bursts: 1/3.3 = 0.3030. 
        //     // With a burst time of 0.4, there is a 0.3030-0.4=-0.09696 cooldown 
        //     // negative
        //     // (~5 rps and -0.2s cooldown with adren)
        //     /*
        //     shot1burst1, 0.1s, shot2burst1, 0.1s, shot3burst1, 0.003s, shot1burst2, 0.097s, shot4burst1, 0.003s, shot1burst2, 0.1s, shot3burst2, 0.003s, shot1burst3, 0.097s, shot4burst2, 0.003s, shot2burst3, 0.1s, ....

        //     burstTimeFrame = burstAmount * burstDelay (0.4)
        //     timeBetweenBursts = 1/rps (0.3 maxed) (0.6 non)
        //     shots = []
        //     if timeBetweenBursts > burstTimeFrame: // standard, easy calc
        //         cooldown = timeBetweenBursts - burstTimeFrame 
        //         for index, shot in clip:
        //             if index+1 % burstAmount == 3 and index+1 > 0:
        //                 shots.push(["shot", burstDelay+cooldown]) 
        //             else:
        //                 shots.push(["shot", burstDelay])


        //     else if timeBetweenBursts < burstTimeFrame:
        //         for shot in clip:
        //             pass
        //     else: // if both are equal
        //         for shot in clip:
        //             pass

        //     */
        //     // ==
        //     // 
        //     // oc 10: 2 rps
        //     // time between bursts: 1/2 = 0.5s
        //     // with a burst time of 0.4, there is a 0.5-0.4=0.1 cooldown
        //     // positive
        //     // --
        //     // 5 cores, oc 10: 2.5 rps
        //     // time between bursts: 1/2.5 = 0.4s
        //     // with a burst time of 0.4, there is a 0.4-0.4=0 cooldown
        //     // equal
        // }
    }else{  // --> if the weapon is NOT a burst weapon
        if(fullClipAdrenTime <= remainingAdrenTime & remainingAdrenCooldown == adrenCooldownTime){ // if adren active for whole clip
            for(let shot = 1; shot <= capacity; shot++){
                if(shot == capacity){ // last shot, happens at same time of reload, so no subtraction
                    clipTimes.push(["shot", 0]);
                }else{
                    // console.log("shot:cap", shot, capacity);
                    clipTimes.push(["shot", timeOfAdrenShot]);
                }
            }
            remainingAdrenTime -= fullClipAdrenTime;
        }else{ 
            for(let shot = 1; shot <= capacity; shot++){
                if(shot == capacity){ // last shot, happens at same time of reload, so no subtraction
                    clipTimes.push(["shot", 0]);
                }else{
                    if(remainingAdrenTime > 0 & remainingAdrenCooldown === adrenCooldownTime){ // check if adren is still active and not on cooldown
                        clipTimes.push(["shot", timeOfAdrenShot]);
                        if(timeOfAdrenShot <= remainingAdrenTime){ // if there is time remaining for a adren shot
                            remainingAdrenTime -= timeOfAdrenShot;
                        }else{ // shot will still be shot with adren active, but adren will end and will be on cooldown
                            remainingAdrenCooldown = adrenCooldownTime - remainingAdrenTime;
                            remainingAdrenTime = adrenDuration; // reset adren
                        }
                    }else{ // when adren is off and/or on cooldown
                        if(remainingAdrenCooldown <= 0){ // if cooldown is over --> adren active again
                            clipTimes.push(["shot", timeOfAdrenShot]);
                            remainingAdrenTime = (adrenDuration - timeOfAdrenShot) + remainingAdrenCooldown; // can only be negative or 0 here, can activate just before the shot is fired
                            remainingAdrenCooldown = adrenCooldownTime;
                        }else{  // adren off and not on cooldown (no adren)
                            clipTimes.push(["shot", timeOfRegularShot]);
                            remainingAdrenCooldown -= timeOfRegularShot;
                        }
                    }
                }
            }
        }
    }
    
    console.log("returnvalsclipdraintime", [remainingAdrenTime, remainingAdrenCooldown, clipTimes, burstCarryOver]);
    return [remainingAdrenTime, remainingAdrenCooldown, clipTimes, burstCarryOver];
}
    

    // < array: [[shot, time],[shot, time],["reload", time],[shot, time],...] >
    // next:
    // < array: [[dmg, time],[dmg, time],["reload", time],[dmg, time],...] >
    // next:
    /*
    let accumulativeTime = 0;
    let accumulativeShots = 0;
    let index = 0;
    while(bossHP > 0){
        [dmgOrReload, time] = array[index]
        if(dmgOrReload === "reload"){
            accumulativeTime += time;
        }else{
            bossHP -= dmgOrReload;
            accumulativeShots++;
            accumulativeTime += time;
        }
        index++;
    }
    return [accumulativeTime, accumulativeShots];

    */
   
    



function getClassDmgSkillBonusses(classChar, classLevel, ksDuration){
    let classBonus;
    let classDuration;
    if (classChar === "Assault") {
        classBonus = 1 + (0.3 + (0.05 * (classLevel - 1))) * (classLevel > 0); //1 1.3-2.5
        classDuration = ksDuration;
        // if(ksOverride){
        //     classDuration = ksDuration;
        // }else{
        //     classDuration = (classLevel > 0) ? (2 + 0.1 * (classLevel - 1)) : 0;
        // } 
    } else if (classChar === "Heavy") {
        let htl_moving = $('input[name="htl_moving"]').is(":checked") ? 0.5 : 1;
        classBonus = 1 + (0.3 + (0.04 * (classLevel - 1))) * (classLevel > 0) * htl_moving; //1 1.3-2.26
        classDuration = (classLevel > 0) ? (8 + 0.8 * (classLevel - 1)) : 0;
    } else {
        classBonus = 1;
        classDuration = 0;
    }
    return [classBonus, classDuration];
}

function getDmgOneShot(pureDamagePreDmgBoost, classBonus, critChance, critSkillMult, critDmgBonus, superCrit, poolDmg, DOTDmg, arMastery3, damageMultiplier){
    let damageBoostPure = (1 - critChance) * classBonus + critChance * (classBonus + critSkillMult) * critDmgBonus * superCrit;
    let pureDirectDmg = pureDamagePreDmgBoost * damageBoostPure * arMastery3;
    return (pureDirectDmg + (poolDmg * classBonus * arMastery3) + DOTDmg) * damageMultiplier;
}


    /*
    ## Burst weapons need additional processing for display_rps
    ## Boss standing still (fest)
    ## Stacked bosses (pbe)

    Calculate Time to Kill:
    
    Based on a damage scale:
    <dmg per shot:0.1 sec> <dmg per shot:0.1 sec> <...:.. sec> <reload:0.3 sec> <dmg per shot:0.1 sec> <dmg per shot:0.1 sec> <...:.. sec> ...
     adjustment:    <dps:0.1 sec><last shot:0 sec><reload:0.3 sec> --> last shot and reload at same time
    Place boss hp over the scale to get the time to kill

    Scale size:
        - scale size (max clips) = boss hp / non-htl or ks dmg

    Per clip:
        - Check if adren/ks/htl has run out and adjust dmg and time between shots accordingly

    ## Extra: 
        - "On average, killing a {boss_name} will take {shots_taken} shots, costing ${shots_taken * ammo_price}"

0: "pure_damage_pre_dmg_boost"
1: "pure_DOT"
2: "poolDmg"
3: "display_rps"
4: "class_char"
5: "ks/htl level"
6: "adren_bonus"
7: "adren_duration"
8: "capacity"
9: "adaptive"
10: "bioBombMult"
11: "dmg_type"
12: "gun_adaptive"
13: "critChance"
14: "critSkillMult"
15: "critDmgBonus"
16: "superCrit"
17: "regular reload time"
18: "weapon class"
19: "hda_bonus"
20: "weaponVersion"
21: "bonus_boss_dmg"
22: "weaponName"

0: 140
1: 0
2: 0
3: 5
4: "Assault"
5: "0"
6: 1
7: 0
8: 18
9: 0
10: 1
11: "Physical"
12: 0
13: 0
14: 1
15: 1
16: 1
​​17: 1.7
18: "Pistol"
​​19: 1.25
20: Standard
21: 1
22: "CM 202"
    
    Calculating Time to kill (old):
        - Get dmg of gun, including +10% AR mastery
            - ks/htl? -- for now assume the uptime of these skills is 100%

        - Calculate amount of shots needed to kill (on average)
            Apply adaptive/masteries and biobomb to boss resists
                boss resists = (resistance - adap - mastery) * 0.5
                if boss resists < 0:
                    boss resists = 0
            if devastator:
                ((hp*devEnraged[0]) / dmg) + ((hp*devEnraged[1]) / (dmg * (1-boss resists))
            else:
                hp / (dmg * (1-boss resists))

        - Check if amount of shots is higher or lower than clip size
        if lower:
            - Check if drain time using adren is higher than skill duration
            if yes:
                - split into with and without adren
                    - Shots_adren = (rps * adren_bonus) * adren_duration
                    - Shots_remainder = amount of shots - Shots_adren
                    - TTK = (Shots_adren / (rps * adren_bonus)) + (shots_remainder / rps)
            else:
                - TTK = amount of shots / (rps * adren_bonus)

        else: (if higher)
            - Calculate amount of clips needed to kill boss
            - Amount of reloads = clips needed - 1
            - Get reload time  
                - Calculate adren reload
            - Calculate shooting/reloading during adren
                - Account for adren running out during shooting or reloading
                - Cycle:
                    #1
                    - Adren duration = Adren duration - Time spend shooting with adren
                    if boss not dead and adren duration positive:
                        - Adren duration = Adren duration - Time spend reloading with adren
                        if boss not dead and adren duration positive:
                            back to #1
                    else if boss not dead and adren duration 0:
                        break cycle and continue without adren bonus
                    else if boss not dead and adren duration 0:
                        split into adren and non-adren times
                    else if boss dead:
                        TTK = sum of times
                - TTK = sum of times

                
        Stats needed:
        pure_rps
        adren_bonus
        adren_duration
        average_dmg
        htl_boost
        ks_boost
        capacity
        adaptive
        biobomb
        boss hp
        boss resistances
        weapon_damage_type

        let class_bonus;
        let class_duration;
    if (class_char === "Assault") {
        class_bonus = 1 + (0.3 + (0.05 * (class_level - 1))) * (class_level > 0); //1 1.3-2.5
        class_duration = (class_level > 0) ? (2 + 0.1 * (class_level - 1)) : 0;
    } else if (class_char === "Heavy") {
        let htl_moving = $('input[name="htl_moving"]').is(":checked") ? 0.5 : 1;
        class_bonus = 1 + (0.3 + (0.04 * (class_level - 1))) * (class_level > 0) * htl_moving; //1 1.3-2.26
        class_duration = (class_level > 0) ? (8 + 0.8 * (class_level - 1)) : 0;
    } else {
        class_bonus = 1;
        class_duration = 0;
    }

    */
}

/*
 * Function for displaying skills for the different classes
 */
function setClass(character) {
    //    console.log(character);
    if (character == "Assault") {
        $("#radioAss").prop("checked", true);
        $("#char_skills1").html(`<label>Killing Spree: <input type="number" min="0" max="25" step="1" value="0" name="ks"></label>`);
        $("#char_skills2").html(`<label>Deadly Force: <input type="number" min="0" max="25" step="1" value="0" name="df"></label>`);
        $("#char_skills3").html(`<label>Adrenaline: <input type="number" min="0" max="25" step="1" value="0" name="adren"></label>`);
    } else if (character == "Heavy") {
        $("#radioHea").prop("checked", true);
        $("#char_skills1").html(`<label>Hold The Line: <input type="number" min="0" max="25" step="1" value="0" name="htl"></label>`);
        $("#char_skills2").html(`<label>Moving: <input type="checkbox" name="htl_moving" value="true"></label>`);
        $("#char_skills3").html("<label></label>");
    } else {
        $("#radioMed").prop("checked", true);
        $("#char_skills1").html(`<label>Bio Bomb: <input type="number" min="0" max="25" step="1" value="0" name="biob"></label>`);
        $("#char_skills2").html("<label></label>");
        $("#char_skills3").html("<label></label>");
    }
}
;

function loadXS1Builds(character) {
    setClass(character);
    if (character == "Assault") {
        $('input[name="fr"]').val(4);
        $('input[name="crit"]').val(1);
        $('input[name="nadeDmg"]').val(0);
        $('input[name="ks"]').val(25);
        $('input[name="df"]').val(0);
        $('input[name="adren"]').val(25);
        $('input[name="target_assist"]').val(0);
    } else if (character == "Heavy") {
        $('input[name="fr"]').val(4);
        $('input[name="crit"]').val(25);
        $('input[name="nadeDmg"]').val(0);
        $('input[name="htl"]').val(25);
        $('input[name="target_assist"]').val(12);
    } else {
        $('input[name="fr"]').val(4);
        $('input[name="crit"]').val(25);
        $('input[name="nadeDmg"]').val(0);
        $('input[name="target_assist"]').val(12);
    }

    $('select[name="select_helmet"]').val("Medusa").change();
    $('input[name="helmet_ver"][value="Black"]').prop("checked", true);
    $('input[name="select_vest"][value="Other"]').prop("checked", true);
    $('select[name="select_gloves"]').val("Titan").change();
    $('input[name="gloves_ver"][value="Black"]').prop("checked", true);
    $('input[name="select_pants"][value="Other"]').prop("checked", true);
    $('input[name="select_boots"][value="Other"]').prop("checked", true);

    $('input[name="smart_target"]').val(12);
    $('input[name="nimble"]').val(12);
    $('input[name$="_mastery"]').each(function () { // $= --> ends with 
        $(this).val(5);
    });

    $('input[name$="_collections"]').each(function () { // $= --> ends with 
        if ($(this).val() != "Black") {
            $(this).prop("checked", true);
        }
    });
    $('input[name$="gloves_collections_red"]').prop("checked", true);
    $('input[name$="helmet_collections_rel"]').prop("checked", true);

}
;


/*
 * Main dps calculation function
 */
function getDPS(ttk) {
    const weaponData = weaponJSON();
    const armourData = armourDPSJSON();

    // Select weapon from page and get the associated for it
    let weaponVersion = $('input[name="version"]:checked').val();
    let weaponName = $('select[name="gun_name"] option:selected').val();
    let weapon = weaponData[weaponVersion][weaponName];
    let weaponDamageType = weapon["Type"]

    // Calculating dps only works if there is any data for it. Easiest to just check if not undefined.
    if (!weapon) {
        // TODO: Add some sort of message: black pistols that don't exist go here for example
        //setOutput("Weapon not supported");
        //console.error("Error getting weapon data");
        alert(`Error getting weapon data.
(Non-existant black pistol?)`)
        return null;
    }

    // Data for class specific skills
    let class_char = $('input[name="character"]:checked').val();
    let class_level = 0;
    let deadly_force = 0;
    let adren = 0;
    let bioBombMult = 1
    if (class_char === "Assault") {
        class_level = $('input[name="ks"]').val();
        deadly_force = $('input[name="df"]').val();
        adren = $('input[name="adren"]').val();
    } else if (class_char === "Heavy") {
        class_level = $('input[name="htl"]').val();
    } else if (class_char === "Medic") {
        bioBombMult = ($('input[name="biob"]').val() > 0) ? 0.5 : 1;
    }

    // Amount of base cores and the level of crit skill
    let cores = $('input[name="core"]').val();
    let crit_level = $('input[name="crit"]').val();

    // Only the version of helmet and gloves are relevant
    let helmetVersion = $('input[name="helmet_ver"]:checked').val();
    let glovesVersion = $('input[name="gloves_ver"]:checked').val();

    // Which piece of armour is selected
    let selectedHelmet = $('select[name="select_helmet"] option:selected').val();
    let selectedVest = $('input[name="select_vest"]:checked').val();
    let selectedGloves = $('select[name="select_gloves"] option:selected').val();
    let selectedPants = $('input[name="select_pants"]:checked').val();
    let selectedBoots = $('input[name="select_boots"]:checked').val();

    // The stats of various armour pieces
    let helmetStats = armourData["Helmet"][selectedHelmet][helmetVersion];
    let vestStats = armourData["Vest"][selectedVest];
    let glovesStats = armourData["Gloves"][selectedGloves][glovesVersion];
    let pantsStats = armourData["Pants"][selectedPants];
    let bootsStats = armourData["Boots"][selectedBoots];

    // Extracting relevant bonuses for some armour pieces
    let helmet_base_crit_bonus = helmetStats["Crit"];
    let helmet_base_dmg_bonus = helmetStats["Dmg"];
    let helmet_base_reload_bonus = helmetStats["Reload"];
    let vest_base_reload_bonus = vestStats["Reload"];
    let gloves_base_crit_bonus = glovesStats["Crit"];
    let gloves_base_dmg_bonus = glovesStats["Dmg"];
    let gloves_base_reload_bonus = glovesStats["Reload"];

    // Values for the dps helmet augs
    let armourAugments = {
        "smart_target": $('input[name="smart_target"]').val(),
        "target_assist": $('input[name="target_assist"]').val()
    };

    // Augments on weapon
    let weaponAugments = getAugments([$('select[name="aug1"] option:selected').val(), $('input[name="aug1_grade"]').val()], [$('select[name="aug2"] option:selected').val(), $('input[name="aug2_grade"]').val()],
        [$('select[name="aug3"] option:selected').val(), $('input[name="aug3_grade"]').val()], [$('select[name="aug4"] option:selected').val(), $('input[name="aug4_grade"]').val()]);

    // Stats from dps relevant masteries
    let masteries = getMasteries(weapon["Class"], $('input[name="mastery_gun"]').val(), $('select[name="hda"] option:selected').val(), $('input[name="helmet_mastery"]').val(), $('input[name="nade_mastery"]').val());

    // Finding which relevant collections are selected
    let helmetColl = $('input[name="helmet_collections_rel"]').is(":checked");
    let gunNormal = $('input[name="gun_collections_normal"]').is(":checked");
    let gunRed = $('input[name="gun_collections_red"]').is(":checked");
    let gunBlack = $('input[name="gun_collections_black"]').is(":checked");

    // Get the stats for each selected collection
    let collections = getCollections(weapon["Class"], gunNormal, gunRed, gunBlack, helmetColl);

    // Race modded multiplier
    let race_modded_mult = [1, 0.92, 0.88, 0.84, 0.8, 0.76, 0.72, 0.68, 0.64, 0.6, 0.56, 0.52, 0.48][weaponAugments["Race Modded"]];

    // Get reload bonus from gun masteries/collections, gloves mastery 3, gloves collection red
    let gun_mast_coll_reload = masteries["gun_reload"] + collections["reload"];
    let gloves_reload_mastery = 0.1 * ($('input[name="gloves_mastery"]').val() >= 3);
    let gloves_reload_collections = $('input[name="gloves_collections_red"]').is(":checked") ? 0.1 : 0;
    // Calculate reload bonus
    let reload_bonus = getReload($('input[name="fr"]').val(), helmet_base_reload_bonus, vest_base_reload_bonus, gloves_base_reload_bonus, $('input[name="nimble"]').val(), gun_mast_coll_reload, gloves_reload_mastery, gloves_reload_collections, race_modded_mult);
    //console.log("Reload return:", reload_bonus);

    // Bonus cap perc that the armour gives total
    let armour_perc_bonus = helmetStats["Cap"] + vestStats["Cap"] + glovesStats["Cap"] + pantsStats["Cap"] + bootsStats["Cap"];

    // Calculate dps (function itself has more function calls)
    let output = calculateDPS(weapon, weaponName, cores, weaponAugments, armourAugments, masteries, collections, class_char, class_level, deadly_force, crit_level, 
        helmet_base_crit_bonus, gloves_base_crit_bonus, helmet_base_dmg_bonus, gloves_base_dmg_bonus, reload_bonus, armour_perc_bonus, adren, weaponVersion, bioBombMult, ttk);

    if(ttk){
        return output
    }else{
        // Set the output on the webpage
        addToTable(output[0], "dpsTable");
        addToTable(output[1], "statsTable");
        addToTable(output[2], "infoTable")
    }
    
}
;

/*
 * Display the output in the designated <div>
 */
function addToTable(trOut, tableId) {
    let outTable = document.getElementById(tableId).getElementsByTagName("tbody")[0].insertRow(0);
    outTable.innerHTML = trOut;
}
;

/*
 * 
 * Clears the output tables
 */
function clearTable() {
    $("#dpsTable tbody>tr").remove();
    $("#statsTable tbody>tr").remove();
    $("#infoTable tbody>tr").remove();
    $("#ttk-out").empty();
}
;


function calculateDPS(weapon, weaponName, cores, weaponAugments, armourAugments, masteries, collections, class_char, class_level, deadly_force, crit_level,
    helmet_base_crit_bonus, gloves_base_crit_bonus, helmet_base_dmg_bonus, gloves_base_dmg_bonus, reload_bonus, armour_perc_bonus, adren, weaponVersion, bioBombMult, ttk) {
    // Various base stats and the +% from amount of base cores
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

    // Augments
    let pinpoint = (3 + (1 * (weaponAugments["Pinpoint"] - 1))) * (weaponAugments["Pinpoint"] > 0);
    let adaptive = [0, 0.04, 0.08, 0.12, 0.16, 0.2, 0.24, 0.28, 0.32, 0.36, 0.4, 0.45, 0.5][weaponAugments["Adaptive"]];
    let smart_target = [0, 0.02, 0.04, 0.06, 0.08, 0.095, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17][armourAugments["smart_target"]];
    let target_assist = (2.5 + (0.5 * (armourAugments["target_assist"] - 1))) * (armourAugments["target_assist"] > 0);

    // Mastery bonuses, includes supercrit
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

    // If shooting at boss, for the +10% dmg from ar mastery
    let bonus_boss_dmg; //shooting_at_boss_dps
    let boss_check_dps = $('input[name="shooting_at_boss_dps"]').is(":checked");
    if(ttk){
        bonus_boss_dmg = masteries["gun_boss"]; // Only if ttk is enabled
    }else if(!ttk & boss_check_dps){
        bonus_boss_dmg = masteries["gun_boss"];
    }else{
        bonus_boss_dmg = 1;
    }

    // Collection bonuses
    let gun_dmg_collections = 1 + (0.01 * collections["dmg"]);
    let gun_rps_collections = 1 + (0.01 * collections["rps"]);
    let gun_pierce_collections = collections["pierce"];
    let gun_capacity_collections = collections["capacity"];
    let gun_crit_collections = collections["critc"];
    let gun_critdmg_collections = collections["critdmg"];
    let helmet_collections = 1 * collections["helmet"];

    // Killing spree + HTL bonus
    let class_bonus;
    if (class_char === "Assault") {
        class_bonus = 1 + (0.3 + (0.05 * (class_level - 1))) * (class_level > 0); //1 1.3-2.5
    } else if (class_char === "Heavy") {
        let htl_moving = $('input[name="htl_moving"]').is(":checked") ? 0.5 : 1;
        class_bonus = 1 + (0.3 + (0.04 * (class_level - 1))) * (class_level > 0) * htl_moving; //1 1.3-2.26
    } else {
        class_bonus = 1;
    }

    // :skull: Nade dmg increase, ofcourse only if the gun uses grenades
    // Only applies to BASE damage, not even cores affect it.
    let nade_mult = specialCases(weaponName, "Grenades") ? (0.15 * $('input[name="nadeDmg"]').val()) : 0;
    let nade_mast_mult = specialCases(weaponName, "Grenades") ? (0.05 * masteries["nade_mast"]) : 0;

    // Calculate capacity
    let capacity = getCapacity(clipPity, clip_size, (1 * cores), base_cores, gun_capacity_mastery, gun_capacity_collections, weaponAugments["Capacity"], armour_perc_bonus);

    // Calculate crit bonus
    let crit_skill_chance = (4 + (0.5 * (crit_level - 1))) * (crit_level > 0); //0% 4%-16%
    let crit_skill_mult = (1 + (0.05 + (0.04 * (crit_level - 1))) * (crit_level > 0)); //1 1.05-2.01
    let crit_chance = (pinpoint + target_assist + crit_skill_chance + gun_crit_mastery + gun_crit_collections + helmet_collections + helmet_base_crit_bonus + gloves_base_crit_bonus + gun_base_crit) / 100;
    let crit_dmg_bonus = (1 + (gun_critdmg_mastery / 100)) * (1 + (gun_critdmg_collections / 100));

    let damage_boost_pure = (1 - crit_chance) * class_bonus + crit_chance * (class_bonus + crit_skill_mult) * crit_dmg_bonus * super_crit;

    // Pure dmg and rps:
    let damageMultiplier = (1 + (0.1 * weaponAugments["Deadly"])) * base_cores * gun_dmg_mastery * gun_dmg_collections * helm_mastery2 * (1 + helmet_base_dmg_bonus + gloves_base_dmg_bonus + smart_target + (0.01 * deadly_force));
    let displayed_damage;
    if (specialCases(weaponName, "Grenades")) {
        let grenade_dmg_mult = 1 + helmet_base_dmg_bonus + gloves_base_dmg_bonus + smart_target + (0.01 * deadly_force);
        let nade_dmg_skill = base_dmg * nade_mult;
        let nade_dmg_mast = base_dmg * nade_mast_mult;
        let base_with_deadly_cores = (base_dmg * base_cores) * (1 + (0.1 * weaponAugments["Deadly"]));
        displayed_damage = ((base_with_deadly_cores * grenade_dmg_mult * gun_dmg_mastery * gun_dmg_collections) + nade_dmg_skill + nade_dmg_mast) * helm_mastery2;
    } else {
        displayed_damage = base_dmg * damageMultiplier;
    }
    let adjust_DOT = (base_DOT * (masteries["flamer3"] ? 1.25 : 1));
    let pure_damage_pre_dmg_boost = displayed_damage * hda_bonus * (pellets + shotgun_mastery5);
    let pure_damage = pure_damage_pre_dmg_boost * damage_boost_pure * bonus_boss_dmg;
    let display_DOT = (1 + (0.1 * weaponAugments["Tenacious"])) * adjust_DOT * base_cores; // Every gun that doesn't have DOT has base_DOT = 0
    let pure_DOT = display_DOT * hda_bonus * (pellets + shotgun_mastery5);
    let display_rps = (1 + (0.1 * weaponAugments["Overclocked"])) * base_cores * base_rps * gun_rps_collections * gun_rps_mastery;

    // Adrenaline bonus 
    let adren_bonus = 1 + roundNumber(1 - 0.75 * Math.pow(0.98, adren - 1), 4) * (adren > 0);
    let adren_duration = (adren > 0) ? (5 + 0.25 * (adren - 1)) : 0;
    let pure_rps = display_rps * adren_bonus;

    // Pool damage
    let poolBaseDmg = specialCases(weaponName, "Pool");
    let pure_pool = 0;
    let poolDmg = 0;
    if (poolBaseDmg) {
        poolDmg = poolBaseDmg * damageMultiplier * hda_bonus;
        pure_pool = poolDmg * class_bonus;
    }

    // Calculate pure dps
    let burstDelayData = specialCases(weaponName, "Burst");
    // Burst / non burst
    if (burstDelayData) {
        pure_rps = burst_rps(burstDelayData, capacity, pure_rps);
        //        console.log(drainTime, burstAdjust, pure_rps);
    }
    let pure_dps = dps_calc(pure_damage, pure_DOT, pure_pool, pure_rps);

    // Calculate average dps

    // Average class duration in %; adren/htl cooldowns -- Cooldown htl: 30 sec, adrenaline: 25 sec
    let dmg_cooldown;
    let rps_cooldown;
    if (class_char === "Assault") {
        dmg_cooldown = 1;
        rps_cooldown = (adren > 0) ? (5 + 0.25 * (adren - 1)) / 25 : 1; //adren
    } else if (class_char === "Heavy") {
        dmg_cooldown = (class_level > 0) ? ((8 + 0.8 * (class_level - 1)) / 30) : 1;
        rps_cooldown = 1;// htl
    } else {
        active_uptime = 0;
        dmg_cooldown = 1;
        rps_cooldown = 1;
    }
    let average_adren_incr = 1 + (adren_bonus - 1) * rps_cooldown;

    // Uptime, stays the same when using adren so calculating separate is pointless.
    // Well, the last digit changes but rounding goes to x.xxxx and this happens at x.xxxxxxxxxxxxxxxx
    // TODO: check for burst
    let uptime = (capacity - 1) / pure_rps / ((capacity - 1) / pure_rps + ((reload_bonus * reload) / adren_bonus)); // clip_size-1 because the last shot and reloading happen at the same time   

    // Recalculate dmg boost for cooldowns
    let class_bonus_cooldown = 1 + ((class_bonus - 1) * dmg_cooldown);
    /*
    let damageBoostPure = (1 - critChance) * classBonus + critChance * (classBonus + critSkillMult) * critDmgBonus * superCrit;
    let pureDirectDmg = pureDamagePreDmgBoost * damageBoostPure * arMastery3;
    return (pureDirectDmg + (poolDmg * classBonus * arMastery3) + DOTDmg) * damageMultiplier;
    */

    let damage_boost_avg = (1 - crit_chance) * class_bonus_cooldown + crit_chance * (class_bonus_cooldown + crit_skill_mult) * crit_dmg_bonus * super_crit;
    let avg_damage = pure_damage_pre_dmg_boost * damage_boost_avg * bonus_boss_dmg;

    let avg_rps = display_rps * average_adren_incr;
    if (burstDelayData) {
        avg_rps = burst_rps(burstDelayData, capacity, avg_rps)
    }

    let drain_mult;
    if (burstDelayData) {
        drain_mult = (capacity / (pure_drain_time(capacity, display_rps, burstDelayData["Amount"], burstDelayData["Delay"]) + (reload_bonus * reload))) * average_adren_incr;
    } else {
        drain_mult = (capacity / (pure_drain_time(capacity, display_rps, 1, 0) + (reload_bonus * reload))) * average_adren_incr;
    }
    // let r_drain = pure_drain_time(capacity, pure_rps, 1, 0);
    // let r_uptime = (capacity / (r_drain + ((reload_bonus * reload) / adren_bonus)))/100;

    //console.log("uptime:", uptime);
    // console.log("drain:", drain_mult);

    // For use with uptime
    // let dps_non_uptime = dps_calc(avg_damage, pure_DOT, poolDmg * damage_boost_avg, avg_rps);
    //console.log("dps_non_uptime: ", dps_non_uptime, dmg_cooldown, average_rps_incr, pure_dps);
    // let average_dps = Math.floor(dps_non_uptime * uptime);

    // For use with drain_time
    let total_dmg = avg_damage + pure_DOT + (poolDmg * damage_boost_avg);
    let average_dps = Math.floor(total_dmg * drain_mult);

    // Calculate pierce
    let pierce_wo_bonus = base_pierce * base_cores * (1 + (0.1 * weaponAugments["Piercing"])) + gun_pierce_mastery + gun_pierce_collections;
    let gun_pierce = pierce_wo_bonus * class_bonus;
    let pure_pierce = Math.floor(pure_dps * gun_pierce);
    let average_pierce = Math.floor(average_dps * gun_pierce);

    // For max uptime note in output
    let reload_capped = (reload_bonus === 0.2) ? "(Max)" : ""; // Check condition : true, false
    // Output display only calcs
    let crit_perc = Math.round(crit_chance * 100);
    let reload_display = roundNumber(reload_bonus * reload, 2);
    let uptime_rounded = roundNumber(uptime, 4);

    // console.log("------------");
    // console.log("DPS:");
    // console.log("Pure: ", pure_dps);
    // console.log("Average: ", average_dps);
    // console.log("Pure pierce: ", pure_pierce);
    // console.log("Average pierce: ", average_pierce);
    // console.log("Uptime: ", uptime);
    // console.log("############end");
    if(ttk){ // ### return
        return [[pure_damage_pre_dmg_boost, pure_DOT, poolDmg, display_rps, class_char, class_level, adren_bonus, adren_duration, capacity, adaptive, bioBombMult, weapon["Type"], masteries["gun_adaptive"], crit_chance, crit_skill_mult, crit_dmg_bonus, super_crit, (reload_bonus * reload), weapon["Class"], hda_bonus, weaponVersion, bonus_boss_dmg, weaponName],
        ["pure_damage_pre_dmg_boost", "pure_DOT", "poolDmg", "display_rps", "class_char", "ks/htl level", "adren_bonus", "adren_duration", "capacity", "adaptive", "bioBombMult", "dmg_type", "gun_adaptive", "critChance", "critSkillMult", "critDmgBonus", "superCrit", "regular reload time", "weapon_class", "hda_bonus", "weaponVersion", "bonus_boss_dmg", "weaponName"]]
    }

    //    return outputGenerator(weaponName, pure_dps, average_dps, pure_pierce, average_pierce, displayed_damage, display_rps, capacity, gun_pierce, display_DOT, crit_perc, poolDmg, reload_display, uptime, reload_capped);
    return [getDpsTR(weaponName, weaponVersion, pure_dps, average_dps, uptime_rounded, reload_capped, reload_display, gun_pierce),
    getStatsTR(weaponName, weaponVersion, displayed_damage, display_rps, capacity, pierce_wo_bonus, display_DOT, crit_perc, poolDmg, reload_display),
    getInfoTR(weaponName, weaponVersion, cores)];
}
;

/*
 * Function to calc dps, made for easier use (for use with uptime)
 */
function dps_calc(damage, dot, pool, rps) {
    return Math.floor((damage + dot + pool) * rps);
}
;

/*
 * Function for burst rps, as it needs to be done twice
 */
function burst_rps(burstDelayData, capacity, rps) {
    let drainTime = (Math.floor(capacity / burstDelayData["Amount"]) / rps);
    let burstAdjust = (capacity % burstDelayData["Amount"] === 0) ? (-1 / rps) : (capacity % burstDelayData["Amount"] - 1) * burstDelayData["Delay"];
    
    let oldRps = (capacity / (drainTime + burstAdjust));
    //return (capacity / (drainTime + burstAdjust));

    let burstTime = burstDelayData["Amount"] * burstDelayData["Delay"];
    let timeBetweenBursts = 1 / rps;
    let amountOfBursts = capacity / burstDelayData["Amount"];
    // required for adjusting the drain time for the last burst at high rps, as it won't get overlapped
    let timeAdjust = Math.max(burstTime - timeBetweenBursts, 0) * (1+(amountOfBursts - Math.ceil(amountOfBursts)));
    
    let newRps = capacity / ((timeBetweenBursts * amountOfBursts) + timeAdjust);

    // console.log("Old:", oldRps, "-", "New:", newRps);
    return newRps;
    
    // let timeAdjust = Math.abs(timeBetweenBursts - burstTime);
    /*
    let burstTime = burstDelayData["Amount"] * burstDelayData["Delay"];
    let timeBetweenBursts = 1 / rps;
    let amountOfBursts = capacity / burstDelayData["Amount"];

    return capacity / (timeBetweenBursts * amountOfBursts) + Math.abs(timeBetweenBursts - burstTime);

    capacity / ((1 / rps) * (capacity / burstDelayData["Amount"])) + Math.abs((1 / rps) - (burstDelayData["Amount"] * burstDelayData["Delay"]));
    3388, 2165, 63.59
    */
}
;

/*
 * Function for pure drain time
 * For non-burst weapons: burst_amount = 1, burst_delay = 0
 */
function pure_drain_time(capacity, pure_rps, burst_amount, burst_delay) {
    let func_drain_time = (Math.floor(capacity / burst_amount) / pure_rps);
    let cap_adjust = (capacity % burst_amount === 0) ? (-1 / pure_rps) : (capacity % burst_amount - 1) * burst_delay;
    return (func_drain_time + cap_adjust);
}

/*
 * Function to calculate reload bonus.
 * Caps out at 0.2
 */
function getReload(reload_skill, helmet_base_reload_bonus, vest_base_reload_bonus, gloves_base_reload_bonus, nimble, gun_mast_coll_reload, gloves_reload_mastery, gloves_reload_collections, race_modded_mult) {
    // Guns have mastery reload OR coll reload OR none, not both
    // Bonus from reload skill
    let fastReload = 1 - Math.pow(0.965, reload_skill);
    // Nimble augment
    let glovesReload = gloves_base_reload_bonus + (2.5 * parseInt(nimble));

    // Total bonus, then round it to 0.xxxx
    let reloadCalced = race_modded_mult * ((100 - (glovesReload + helmet_base_reload_bonus + vest_base_reload_bonus)) / 100) * (1 - fastReload) * (1 - gun_mast_coll_reload) - (gloves_reload_mastery + gloves_reload_collections);
    // let reloadBonus = roundNumber(reloadCalced, 4);

    if (reloadCalced < 0.2) {
        return 0.2;
    } else {
        return reloadCalced;
    }
}
;

/*
 * Function to calculate capacity of weapon
 */
function getCapacity(clipPity, clip_size, cores, base_cores, gun_capacity_mastery, gun_capacity_collections, capAug, armour_perc_bonus) {
    // Capacity augment
    let initialCap = clip_size * ([0, 0.1, 0.3, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.5][capAug]);
    // Cap aug is not accurate, adjust by subtracting by 1 on certain aug levels when capacity is an integer
    let capCorrection = [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0][capAug];
    if (initialCap % 1 == 0) {
        initialCap -= capCorrection;
    } else {
        initialCap = Math.floor(initialCap);
    }

    // Capacity aug gives atleast 1 bullet per level
    let cap_aug_amount = 0;
    if (initialCap < capAug) {
        cap_aug_amount = capAug;
    } else {
        cap_aug_amount = initialCap;
    }

    // Clip pity; if true, cores give atleast 1 bullet per added core, regardless of base clip size
    let clip_cores = 0;
    if (clipPity) {
        let additionCapCores = Math.floor(clip_size * (base_cores - 1));
        if (additionCapCores < cores) {
            clip_cores = cores;
        } else {
            clip_cores = additionCapCores;
        }
    } else {
        clip_cores = Math.round(clip_size * (base_cores - 1));
    }

    // Extra bullet given by armour bonuses (mastodon only as of right now), gives atleast 1 bullet
    let armour_bonus = Math.floor(clip_size * armour_perc_bonus);
    if (armour_perc_bonus > 0 & armour_bonus < 1) {
        armour_bonus = 1;
    }

    // Extra clip size from masteries, either percentage based or a static number
    let mastery_cap = 0;
    if (typeof gun_capacity_mastery === 'string' || gun_capacity_mastery instanceof String) { // % based
        let perc_conv = 0.01 * parseInt(gun_capacity_mastery.slice(0, -1)); // Because % values get stored in an annoying way
        let mastery_cap_int = clip_size * perc_conv;
        if (mastery_cap_int < 1 & mastery_cap_int > 0) {
            mastery_cap = 1;
        } else {
            mastery_cap = Math.floor(mastery_cap_int);
        }
    } else { // static amount
        mastery_cap += gun_capacity_mastery;
    }

    // Extra clip size from collection, either percentage based or a static number
    let collections_cap = 0;
    if (typeof gun_capacity_collections === 'string' || gun_capacity_collections instanceof String) { // % based
        let coll_perc = 0.01 * parseInt(gun_capacity_collections.slice(0, -2));
        collections_cap += Math.floor(clip_size * coll_perc); // Because % values get stored in an annoying way
    } else { // static number
        collections_cap += gun_capacity_collections;
    }

    // Total clip size after all bonuses
    let capacity = clip_size + cap_aug_amount + clip_cores + armour_bonus + mastery_cap + collections_cap;

    //    console.log("initialCap", initialCap);
    //    console.log("#####");
    //    console.log("clip_size", clip_size);
    //    console.log("cap_aug_amount", cap_aug_amount);
    //    console.log("clip_cores", clip_cores);
    //    console.log("armour_check", armour_bonus);
    //    console.log("mastery_cap", mastery_cap);
    //    console.log("collections_cap", collections_cap);
    //    console.log("#####");
    //    console.log("capacity", capacity);

    return capacity;
}
;

/*
 * Function to determine selected augments.
 * Supply as: augment type, augment level, {repeat} in the arugments so the if statement can
 * extract the augments correctly regardless of the order or if there are any duplicates.
 */
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
;

/*
 * Fucntion to get weapon mastery data from weaponData.js and combine it in a single dictionary
 * with helmet and hda masteries.
 */
function getMasteries(weaponClass, gunMasteryLevel, hda_mult, HelmetMastery, NadeMastery) {
    let masteryStats = weaponMasteries(weaponClass, gunMasteryLevel);

    let otherMasteries = {
        "hda_mult": hda_mult,
        "helm_mast2": HelmetMastery >= 2,
        "nade_mast": NadeMastery >= 1
    };

    let masteries = Object.assign({}, masteryStats, otherMasteries);
    return masteries;
}
;

/*
 * Fucntion to get the weapon collection bonuses from weaponData.js and combine them into a single
 * dictionary together with the bonus from helmet collections.
 */
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
;

/*
 * Combines 2 dictionaries into 1
 */
function addToCollDict(dict1, dict2) {
    for (var key in dict2) {
        if (dict2.hasOwnProperty(key)) {
            dict1[key] = dict2[key] + dict1[key];
        }
    }
    return dict1;
}
;

/*
 * Rounds a number to a specified amount of decimal places.
 * Default: 0
 */
function roundNumber(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
}
;

/*
 * Used to generate formatted output
 */
function outputGenerator(weaponName, pure_dps, average_dps, pure_pierce, average_pierce, displayed_damage, display_rps, capacity, gun_pierce, pure_DOT, crit_perc, poolDmg, reload_display, uptime, reload_capped) {
    // Maybe do something like (...augments) and input (stat, value) tuples
    let output = `<p><br>
    <u><b>${weaponName}:</u></b><br>
    <i>DPS:</i><br>
    <b>Pure:</b> ${pure_dps.toLocaleString('en-US')}<br>
    <b>Average:</b> ${average_dps.toLocaleString('en-US')}<br>
    <b>Pure pierce:</b> ${pure_pierce.toLocaleString('en-US')}<br>
    <b>Average pierce:</b> ${average_pierce.toLocaleString('en-US')}<br><br>
    <i>Stats:</i><br>
    <b>Damage: </b> ${displayed_damage.toLocaleString('en-US')}<br>
    <b>RPS: </b> ${display_rps.toLocaleString('en-US')}<br>
    <b>Capacity: </b> ${capacity.toLocaleString('en-US')}<br>
    <b>Pierce: </b> ${gun_pierce.toLocaleString('en-US')} <br>
    <b>DoT: </b> ${pure_DOT.toLocaleString('en-US')} <br>
    <b>Crit chance: </b> ${crit_perc.toLocaleString('en-US')}% <br>
    <b>Pool damage: </b> ${poolDmg.toLocaleString('en-US')} <br><br>
    <b>Reload time: </b> ${reload_display} sec <br>
    <b>Uptime: </b> ${(uptime * 100).toLocaleString('en-US')}% ${reload_capped}
    </p>`;

    return output;
}
;

function getDpsTR(weaponName, weaponVersion, pure_dps, average_dps, uptime, reload_capped, reload_display, pure_pierce) {

    return `<tr>
                <td>${weaponName}${(weaponVersion == "Normal") ? "" : ` [${weaponVersion}]`}</td>
                <td>${pure_dps.toLocaleString()}</td>
                <td>${average_dps.toLocaleString()}</td>
                <td>${(uptime * 100).toLocaleString()}% ${reload_capped}</td>
                <td>${reload_display.toLocaleString()}</td>
                <td>${pure_pierce.toLocaleString()}</td>
            </tr>`;
}
;

function getStatsTR(weaponName, weaponVersion, displayed_damage, display_rps, capacity, gun_pierce, display_DOT, crit_perc, poolDmg, reload_display) {

    return `<tr>
                <td>${weaponName}${(weaponVersion == "Normal") ? "" : ` [${weaponVersion}]`}</td>
                <td>${displayed_damage.toLocaleString()}</td>
                <td>${display_rps.toLocaleString()}</td>
                <td>${capacity.toLocaleString()}</td>
                <td>${gun_pierce.toLocaleString()}</td>
                <td>${display_DOT.toLocaleString()}</td>
                <td>${crit_perc.toLocaleString()}%</td>
                <td>${poolDmg.toLocaleString()}</td>
                <td>${reload_display.toLocaleString()}</td>
            </tr>`;
}
;

function getInfoTR(weaponName, weaponVersion, cores) {
    return `<tr>
                <td>${weaponName}${(weaponVersion == "Normal") ? "" : ` [${weaponVersion}]`}</td>
                <td>${$('select[name="aug1"] option:selected').val()}: ${$('input[name="aug1_grade"]').val()}<br>
                ${$('select[name="aug2"] option:selected').val()}: ${$('input[name="aug2_grade"]').val()}</td>
                <td>${$('select[name="aug3"] option:selected').val()}: ${$('input[name="aug3_grade"]').val()}<br>
                ${$('select[name="aug4"] option:selected').val()}: ${$('input[name="aug4_grade"]').val()}</td>
                <td><b>Mastery:</b> ${$('input[name="mastery_gun"]').val()}<br>
                <b>Cores:</b> ${cores}</td>
                <td><b>Collections:</b> ${$('input[name="gun_collections_normal"]').is(":checked") ? "Standard " : ""}${$('input[name="gun_collections_red"]').is(":checked") ? "Red " : ""}${$('input[name="gun_collections_black"]').is(":checked") ? "Black" : ""}<br>
                <b>Ammo:</b> ${$('select[name="hda"] option:selected').text()}</td>
            </tr>`
};
