var data = getDrops()
var outputSet = new Set()

function search(term) {
    let level = $("#playerLevel").val();
    $("#tableOutput").html("")
    // single and double letter searches are pretty useless anyway
    if (term.length > 2) {
        for (key in data) {
            if (key.indexOf(term.toLowerCase()) > -1) {
                outputSet.add(key)
            } else if (outputSet.has(key)) {
                outputSet.delete(key)
            }
        }
        outputSet.forEach((item) => {
            let table_content = genTableRow(item, data[item]['meta'], data[item][level])
            $("#tableOutput").append(table_content)
        });
    } else {
        outputSet.clear()
    }
};

function genTableRow(itemName, dr, [stl, ttn, mlb, rdm, ndm, prm, thl, nnt]) {
    return `<tr>
    <td class="itemName">${itemName}</td>
    <td>${dr}</td>
    <td class="${stl[0]}">
        <div>${stl[1]}</div>
    </td>
    <td class="${ttn[0]}">
        <div>${ttn[1]}</div>
    </td>
    <td class="${mlb[0]}">
        <div>${mlb[1]}</div>
    </td>
    <td class="${rdm[0]}">
        <div>${rdm[1]}</div>
    </td>
    <td class="${ndm[0]}">
        <div>${ndm[1]}</div>
    </td>
    <td class="${prm[0]}">
        <div>${prm[1]}</div>
    </td>
    <td class="${thl[0]}">
        <div>${thl[1]}</div>
    </td>
    <td class="${nnt[0]}">
        <div>${nnt[1]}</div>
    </td>
</tr>`
};