const letterNumber = s => s.split('').map(s => s.charCodeAt() - 48);






function useCode(page){
    if(page=="weapon"){
        useWeaponCode();
    }
}


function getCode(page){
    if(page=="weapon"){
        genWeaponCode();
    }
}


function useWeaponCode(){
    var convertedCode = letterNumber(deCode);
    var deCode = decompressCode($('input[name="codeGen"]').val());
    console.log("decode", deCode);
};


function decompressCode(Ccode){

};


function genWeaponCode(){
    /*
    Class: A-C
    Skills: A-Y
        - Reload
        - Crit
        - Nade
        - Class skill 1
        - Class skill 2 (A for true, B for false for moving HTL)
        - Class skill 3
    Mastery: A-E
        - Helm
        - Vest
        - Gloves
        - Pants
        - Boots
        - Nades
        - Gun
    Collections: (binary (0-7))
        - Helm
        - Vest
        - Gloves
        - Pants
        - Boots
        - Gun
    Augments: A-M
        - ST
        - TA
        - Nimble
    Armour type: A-K (DIFFERENT ORDER DUE TO MASTODON)
        - Helm
        - Gloves
        - Vest
        - Pants
        - Boots
    Version: A,B,C
        - Helm
        - Gloves
        - Gun
    Gun cores: A-J
    Gun ammo: A-F
    Augments: A-L
        - Aug 1 
        - Aug 2
        - Aug 3
        - Aug 4
    Augment cores: A-L
        - Aug 1 
        - Aug 2
        - Aug 3
        - Aug 4
    Selected gun: Direct index --> 0 - ?
    */
    // A = charCode 65
    console.log("test")
    $('#classSelect :input').each(function (index) {
        var input = $(this);
        if(input.prop('checked')){
            console.log(input.attr('name'), input.attr('value'), index, String.fromCharCode(65+index));
        };
        
    });

    // var inputValues = [
    //     ...document.querySelectorAll('[type="input"]')
    // ].map(el => el.value);

    // console.log("inputs", inputValues);
};