function editTimezone(){
  var val = document.getElementById("timezone").value
  var timezoneSelected = val.valueOf();
  var previousTimezone = scheduleInfo.innerHTML.split(".")[0].slice(-2).replace(/\+/g,"").trim();
  hoursToAdd = timezoneSelected - previousTimezone

  //console.log("hoursToAdd, timezoneSelected, previousTimezone", hoursToAdd, timezoneSelected, previousTimezone)
  //console.log("timezone;", typeof timezoneSelected, timezoneSelected)

  var tableData = document.querySelector('.sas4Table tbody');
  for (var i = 1; i < tableData.children.length; i++) {
    var trContent = tableData.children[i];
    for (var j = 2; j < trContent.children.length-1; j++) {
      var cellItem = trContent.children.item(j).innerHTML;

      if(cellItem != "None"){
        //console.log(cellItem)
        const cursive = cellItem.startsWith("<i>")
        if(cursive){
          cellItem = cellItem.replace(/<[^>]*>?/gm, '');
        }

        var split_string = cellItem.split(" - ")
        var startTime = moment(split_string[0], ['h:m a', 'H:m']).add(hoursToAdd, "hours").format('HH:mm');
        var endTime = moment(split_string[1], ['h:m a', 'H:m']).add(hoursToAdd, "hours").format('HH:mm');
        //console.log("table item;", startTime, endTime)

        var cellContent = ""
        if(cursive){
          cellContent = "<i>" + startTime + " - " + endTime + "</i>";
        }else{
          cellContent = startTime + " - " + endTime;
        }
        trContent.children.item(j).innerHTML = cellContent
      }
    }
  }

  if(timezoneSelected <= 0){
    timezoneText(val)
  }else{
    timezoneText("+"+val)
  }

}

function timezoneText(timezoneNumber){
  document.getElementById("scheduleInfo").innerHTML = "";
  document.getElementById("conversionInfo").innerHTML = "";

  scheduleInfo.innerHTML = `Times are in GMT ${timezoneNumber}. If the time is in cursive, the person isn't always available.`;
  conversionInfo.innerHTML = `As the times are listed for GMT ${timezoneNumber}. You can select your own timezone here if it is different. If you're currently in summer time, add 1. <br>So, if you're in GMT +1 and it's summer time, select GMT +2 (Europe).`
  //console.log(timezoneNumber)
}

document.addEventListener('readystatechange', event => {
    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..
        timezoneText(0)
    }
});

// https://stackoverflow.com/questions/807878/how-to-make-javascript-execute-after-page-load
// https://www.encodedna.com/javascript/how-to-read-data-from-html-table-using-javascript.htm
// https://stackoverflow.com/questions/17333425/add-a-duration-to-a-moment-moment-js
