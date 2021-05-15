function selectTimezone() {
  var val = document.getElementById("timezone").value
  var timezoneSelected = val.valueOf();
  console.log("timezone;", typeof timezoneSelected, timezoneSelected)

  var sas4Table = document.getElementById('sas4Table');
  for (i = 1; i < sas4Table.rows.length; i++) {
    var objCells = sas4Table.rows.item(i).cells;
    for (var j = 2; j < objCells.length-1; j++) {
      var cellItem = objCells.item(j).innerHTML;

      if(cellItem != "None"){
        var cursive = cellItem.startsWith("<i>")
        if(cursive){
          cellItem = cellItem.replace(/<[^>]*>?/gm, '');
        }

        var split_string = cellItem.split(" - ")

        var startTime = moment(split_string[0], ['h:m a', 'H:m']).add(timezoneSelected, "hours").format('HH:mm');
        var endTime = moment(split_string[1], ['h:m a', 'H:m']).add(timezoneSelected, "hours").format('HH:mm');

        console.log("table item;", startTime, endTime)
      }else{
        //console.log("None item;", cellItem)
      }
    }
  }
}

// https://www.encodedna.com/javascript/how-to-read-data-from-html-table-using-javascript.htm
// https://stackoverflow.com/questions/17333425/add-a-duration-to-a-moment-moment-js
