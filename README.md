<script>
window.onload= function(){
if(window.location.href=="http://demogorgon22.weebly.com/tower-keepers-calculator.html"){
document.body.className=""
document.head.innerHTML="<title>TK Calcs</title>"
document.body.innerHTML=document.getElementById('payload').innerHTML
}
}
</script>
<div id="payload">
<style>
/*
MAYBE USABLE
#CDF7C4 - nearly white idk
#85F7F4 - pretty blue
#78D994 - blue green
#EBB3BB - pink
#44F45E - biter green
#69DF3C - chill green
#56CB17 - chiller green

*/
.menuBtn{
background-color:#6e8ba9;
height:30px;
width:100px;
text-align:center;
padding-top:10px;
font-size:20px;
cursor:pointer;
}
body{
font:12px Helvetica;
color:#CDF7C4;
background-color:#2a3847;
}
.calcHolder{
background-color:#44607c;//#2f4154;
height:100px;
width:500px;
padding-left:3px;
display:none;
}
//#a8a8a8
</style>
<table>
<tr>
<td>
<div style="background-color:#a6b3c1" onclick="menuSwap(this,heroes)" class="menuBtn">Heroes</div>
</td><td>
<div onclick="alert('Doesn\'t work yet.')" class="menuBtn">Artisans</div>
</td><td>
<div onclick="menuSwap(this,addr)" class="menuBtn">ADD Ratio</div>
</td>
</tr>
</table>
<div class="calcHolder" id="arthero" style="display:block">
<h1 id="headd">Hero Training Point Cost Calculator</h1>
<input id="start" placeholder="Initial Hero Level">
<input id="end" placeholder="Desired Hero Level">
<input id="calc1" style="background-color:#a6b3c1;cursor:pointer;width:100px" value="Calc" onclick="calc(this)">
</div>
<div class="calcHolder" id="addr">
<h1>Attacker attack vs Defender Defense Damage Multiplier</h1>
<input id="attack" placeholder="Attacker Attack">
<input id="defense" placeholder="Defender Defense">
<input style="background-color:#a6b3c1;cursor:pointer;width:100px" value="Calc" onclick="addrCalc(this)">
</div>
<script>
function calc(op){
var start=document.getElementById('start').value
var end=document.getElementById('end').value
var total=0;
for(i=start;i<end;i++){
i=Number(i)
total+=(i+1)*(i+1);
}
op.value=total;
}

function addrCalc(op){
var attack=document.getElementById('attack').value;
var defense=document.getElementById('defense').value ;
if(attack>defense){
var num = (attack / defense * 100 - 100) / 2 + Math.sqrt(attack - defense);
if(num > 200){
num = 200;
}
} else{
var num = (attack / defense * 100 - 100) / 2 - Math.sqrt(defense - attack);
if(num<-67){
num = -67;
}
}
op.value = num/100;
}

function menuSwap(clicked,func){
var btns = document.getElementsByClassName('menuBtn');
for(i=0;i<btns.length;i++){
btns[i].style.backgroundColor="#6e8ba9";//default
}
clicked.style.backgroundColor="#a6b3c1";//selected
var calcs=document.getElementsByClassName('calcHolder')
for(i=0;i<calcs.length;i++){
calcs[i].style.display="none";
}
func();
}

function heroes(){
document.getElementById('arthero').style.display="block";
document.getElementById('headd').innerHTML = "Hero Training Point Cost Calculator";
document.getElementById('start').value=""
document.getElementById('start').placeholder="Initial Hero Level"
document.getElementById('end').value=""
document.getElementById('end').placeholder="Desired Hero Level"
document.getElementById('calc1').value = "Calc"
}

function artisans(){
document.getElementById('arthero').style.display="block";
document.getElementById('headd').innerHTML = "Artisan Point Cost Calculator";
document.getElementById('start').value=""
document.getElementById('start').placeholder="Initial Artisan Level"
document.getElementById('end').value=""
document.getElementById('end').placeholder="Desired Artisan Level"
document.getElementById('calc1').value = "Calc"
}

function addr(){
document.getElementById('addr').style.display="block";

}

</script>
</div>
