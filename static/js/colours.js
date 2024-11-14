// Execute a function when the user presses a key on the keyboard
document.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        inputOriginId = event.target.id;
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        switch (inputOriginId) {
            case "int":
                fromInt();
                break;
            case "hex":
                fromHex();
                break;
            default:
                fromRGBA();
        }
    }
});

function setBackGround(r, g, b, a) {
    let alpha = a / 255;
    // $("#colour-row").css(`background-color: rgb(${r}, ${g}, ${b}, ${alpha})`)
    $("#colour-row").css("background-color", `rgba(${r}, ${g}, ${b}, ${alpha})`);
}

// From RGBA
function fromRGBA() {
    r = parseInt($('#red').val())
    g = parseInt($('#green').val())
    b = parseInt($('#blue').val())
    a = parseInt($('#alpha').val())

    setBackGround(r, g, b, a);

    $("#hex").val(getHexfromRGBA(r, g, b, a));
    $("#int").val(getNKIntfromRGBA(r, g, b, a));
};

function getHexfromRGBA(r, g, b, a) {
    return `#${HexFunc(r)}${HexFunc(g)}${HexFunc(b)}${HexFunc(a)}`
}

function HexFunc(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function getNKIntfromRGBA(r, g, b, a) {
    return (Number(BigInt(r) << 24n)) + (Number(BigInt(b) << 16n)) + (Number(BigInt(g) << 8n)) + a;
}


// From Int
function fromInt() {
    let r, g, b, a;
    int = parseInt($("#int").val());

    [r, g, b, a] = getRGBAFromIntVal(int);
    setBackGround(r, g, b, a);

    $("#red").val(r); $("#green").val(g); $("#blue").val(b); $("#alpha").val(a);
    $("#hex").val(getHexfromRGBA(r, g, b, a));
};

function getRGBAFromIntVal(i) {
    let r = 0xff & i >>> 24;
    let b = 0xff & i >>> 16;
    let g = 0xff & i >>> 8;
    let a = 0xff & i;
    return [r, g, b, a];
};


// From Hex
function fromHex() {
    let r, g, b, a;
    hex = $("#hex").val();

    [r, g, b, a] = hex2rgba(hex);

    setBackGround(r, g, b, a);

    $("#red").val(r); $("#green").val(g); $("#blue").val(b); $("#alpha").val(a);
    $("#int").val(getNKIntfromRGBA(r, g, b, a));
};

const hex2rgba = (hex) => {
    const [r, g, b, a] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return [r, g, b, a];
};















