<DOCTYPE html>
<html>
  <body>
    <head>
	<style type="text/css">
		body {
			background-color: red;
			transition: background-color 60s;
		}
	</style>
</head>
</body>
<body>
	<script type="text/javascript">
		var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

		var i = 1;

		window.setInterval(function(){
			document.body.style.backgroundColor = colors[i];
			i++;
			if (i === colors.length){
				i=0;
			}
		}, 60000);
	</script>
  <h1><strong>Welcome</strong></h1>
<br>
<b> Game: </b><br>
  <a href="http://assets.nkstatic.com/Games/gameswfs/sas4/sas4.swf?v=new">
    <img src="SAS4_Icon.jpg" alt="SAS4" style="width:144px;height:144px;border:0;">
  </a>
  <br>
  <br>
  <script type="text/javascript">
function whichsite(form){
	var sites = form.elements.site, i = sites.length;
	while (--i > -1){
		if(sites[i].checked){
			return sites[i].value;
		}
	}
}
</script>
<form action="#" onsubmit="window.open(whichsite(this), '_blank'); return false;">
<b>Other sites:</b><br>
<p>
<input type="radio" name="site" value="https://ninjakiwi.com"> Main page<br>
<input type="radio" name="site" value="https://forums.ninjakiwi.com"> Forum<br>
</p>
<input type="submit" value="Go">
</form>
  <table border="" style="background-color:rgba(0, 0, 0, 0);" >
      <tr> <td>Wat?</td>
        <td>?</td> </tr>
        <tr> <td>Kopieren plakken</td>
          <td>JA</td> </tr>
        </table><br>
      <p>
        <b><i> Random lines are the best </i></b>
    </body>
</html>
