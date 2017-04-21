<DOCTYPE html>
<html>
  <body>
    <head>
	<style type="text/css">
		body {
			background-color: red;
			transition: background-color 7s;
		}
	</style>
</head>
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
		}, 5000);
	</script>
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
 <b>Want to see another rainbow?:</b><br>
 <p>
 <input type="radio" name="site" value="https://rubenkollen.github.io"> Yes<br>
 <input type="radio" name="site" value="https://youixentoo.github.io"> No<br>
 </p>
 <input type="submit" value="Submit">
 </form>

</body>
    <h1>Bad page</h1>
    <p>Random afvink 1</p>
    <table border="1">
      <tr> <td>Wat?</td>
        <td>?</td> </tr>
        <tr> <td>Kopieren plakken</td>
          <td>JA</td> </tr>
        </table>
      <a href="http://assets.nkstatic.com/Games/gameswfs/sas4/sas4.swf?v=new">
        <img src="SAS4_Icon.jpg" alt="SAS4" style="width:144px;height:144px;border:0;">
      </a>
    </body>
</html>
