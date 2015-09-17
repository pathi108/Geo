var ld=false;
var status="normal";
var svg;
var map;
var projection;
var color;
var submited=false;
var selected="";
var tooltip;
var colorScheme='heatmap';
var csvdata;
var Geojason;
var colors;
var clrshme;
var DrawMap;
var group;
var geojson;
var midlat;
var midlang;
var path;
var width = 700,
height = 700;
var countries=new Array();
var data5=new Array();
var G ; //intilize a variable to store the graph
function lo(){
swal("Map is being Processed plz be paintent");
Geojson=geojson;
group = svg.append("g");
var scale = 150;
clrshme=new colorscheme("heatmap");
colors=clrshme.getColors("heatmap");
projection = d3.geo.mercator()
                        .scale(scale+50)
                        .center(d3.geo.centroid(geojson[1]))
                        .translate([width / 2, height / 2]); // translate map to svg
  path = d3.geo.path().projection(projection);
var bounds = path.bounds(geojson[1]);

var hscale = scale * width / (bounds[1][0] - bounds[0][0]); //center the map to the svg
var vscale = scale * height / (bounds[1][1] - bounds[0][1]);
 var scale = (hscale < vscale) ? hscale : vscale;
var offset = [width - (bounds[0][0] + bounds[1][0]) / 2,
              height - (bounds[0][1] + bounds[1][1]) / 2];
projection = d3.geo.mercator().center(d3.geo.centroid(geojson[1])).scale(scale).translate(offset);
                // Define path generator
path = path.projection(projection);
console.log(geojson[1]);
//********* facade pattern ********************   
DrawMap.Draw(group,path,geojson,status);   
//**************
  swal("Map Loaded");
}
function check(){ //check for form subbmission
 var e = document.getElementById("attrbtes").value;
 var attribute=parseInt(e);
  var tempCountries=new Array();
          var point1,point2;
         swal("Map is being Plotted");
         //*********Composite pattern***********
         for(i=0;i<csvdata.values.length;i++){
          point2=new locations(csvdata.values[i][1]); 
          point1=new locations(csvdata.values[i][0]); 
         if(!containsObject(point1,countries)){
            var Line=new lines(parseInt(i),csvdata.values[i][attribute]);
            point1.lines.push(Line);
            countries[csvdata.values[i][0]]=point1; //find the geographical locations
           tempCountries.push(csvdata.values[i][0]);

         }
         else
         {
            var Line=new lines(parseInt(i),csvdata.values[i][attribute]);
            countries[csvdata.values[i][0]].lines.push(Line);    
         }
         
         if(!containsObject(point2,countries)){
            var Line=new lines(parseInt(i),csvdata.values[i][attribute]);
            point2.lines.push(Line);
            countries[csvdata.values[i][1]]=point2;//find the geographical locations
             tempCountries.push(csvdata.values[i][1]);
         }
          else
         {
            var Line=new lines(parseInt(i),csvdata.values[i][attribute]);
            countries[csvdata.values[i][1]].lines.push(Line);    
         }
         }
         console.log(countries);
         G.addNodesFrom(tempCountries, {color: 'blue'});
      //****************************************************  
var l,r;
var jsonSate;
var vert=d3.values(csvdata.values);//tempory variable to store the data
var tempedges=new Array();
for (var key in countries){
    for(j=0;j<Geojson[1].features.length;j++){
         l=(Geojson[1].features[j].geometry.bbox[0]+Geojson[1].features[j].geometry.bbox[2])/2; //find the geographical coordibnates of countries
        r=(Geojson[1].features[j].geometry.bbox[1]+Geojson[1].features[j].geometry.bbox[3])/2; //find the geographical coordibnates of countries
        jsonState = d3.values(Geojson[1].features[j].properties);
        console.log(l+" "+r);
        console.log(jsonState[4]+"  "+countries[key].name);
       if(jsonState[4].toUpperCase().toLowerCase()==countries[key].name.toUpperCase().toLowerCase()){ 

          console.log(key);
          countries[key].setCoordinates(l,r);
         countries[key].plot(group,countries[key]); //plot the locations in csv in a graph
       }
   }
   console.log(countries);
}
var tempedges=new Array();
for (var key in countries){
 for(i=0;i<countries[key].lines.length;i++)
 {
      countries[key].lines[i].setCorrdinates(vert,countries); 
      var edge=new Array();
      edge.push(countries[vert[[countries[key].lines[i].name]][0]].name); 
      edge.push(countries[vert[[countries[key].lines[i].name]][1]].name);
      edge.push(parseInt(vert[[countries[key].lines[i].name]][attribute]));
      //G.addEdgesFrom(edge)
      tempedges.push(edge);    
 }
}
console.log(countries);
G.addWeightedEdgesFrom(tempedges);

Centarrlity();

for(k=0;k<vert.length-1;k++){
  data5[k]=parseInt(vert[k][attribute]); //convert the values in csv files to integers
}
console.log("data5 : "+Math.max.apply(null,data5));
 color = d3.scale.quantize()
                    .range([colors[0],colors[1], //define the color scheme
                     colors[2], colors[3],colors[4]]).domain([
                Math.min.apply(null,data5),
                Math.max.apply(null,data5)
        ]);
      delete countries[""];
      delete countries['undefined'];
      var linelist=new Array(); //keep track of the alredy drawn lines
      var upperbound=document.getElementById('lowerbound').value;
      console.log(upperbound);
  for(var key in countries)
  {
    
    for(i=0;i < countries[key].lines.length;i++){
        var clr=color(parseInt(countries[key].lines[i].value));
        countries[key].lines[i].draw(group,countries[key].lines[i],clr,upperbound);
      
    }   
    
 // draw edges between the countries.
  }

  svg.selectAll('circle').on("click", function () {
                    console.log(d3.mouse(this));
                    var name=d3.select(this).attr("name");
                    var v=d3.values(this);
                    var connectedLines=d3.values(countries[name]);
                    selected=countries[name].boldLines(group,selected,name,connectedLines,countries)
                }).on("mouseover", function(){return tooltip.style("visibility", "visible");})
               .on("mousemove", function(d){  return tooltip.style("top",
    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(d3.select(this).attr("name")+"\n"+countries[d3.select(this).attr("name")].betweenscenterallity+"\n"+countries[d3.select(this).attr("name")].degree+"\n"+countries[d3.select(this).attr("name")].eigenvector);})
             .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
            
             svg.selectAll('path').on("mousemove", function(d) {

                    d3.select(this).style({fill: '#6495ED'});
                }).on("mouseout", function(){if(status==="normal"){d3.select(this).style({fill: '#606060'});}else{
                  d3.select(this).style({fill: 'transparent'});
                }});
           swal("Thank you for Being Paitent");   
              }

function SelectColor(color){
  console.log("InColor");
  colors=clrshme.getColors(color);
 var colorreset = d3.scale.quantize()
                    .range([colors[0],colors[1], //define the color scheme
                     colors[2], colors[3],colors[4]]).domain([
                Math.min.apply(null,data5),
                Math.max.apply(null,data5)
        ]);
  colorScheme=color;
   for(var key in countries)
  {
    for(i=0;i < countries[key].lines.length;i++){
       var clr=colorreset(parseInt(countries[key].lines[i].value));
        var id=".l"+String(countries[key].lines[i].name);
        countries[key].lines[i].ChangeColor(svg,id,clr)
      
    } 
  }  

}
//********************flyweight pattern*****************
function containsObject(obj, list) { // check whther the array of cuntries are duplicated
    for (var key in list) {
        if (list[key].name === obj.name) {
          
            return true;
        }

    }
//**************************************************
    return false;
}
function ClearAll(){
    console.log(countries);
  for (var key in countries){
    for(i=0;i<countries[key].lines.length;i++){
      countries[key].lines[i].RemoveAll(svg);
    }
  }
location.reload();
}
function ClearDataLayer(){
  for (var key in countries){
    for(i=0;i<countries[key].lines.length;i++){
      countries[key].lines[i].RemoveLines(svg);
    }
  }
}
function test(){
  G = new  jsnx.DiGraph();
         var input = document.getElementById('a').files[0];
         console.log(input);
        var reader = new FileReader();
        console.log(reader.result);
        reader.onload = function(){
        

shp(reader.result).then(function(geojason)
{
  geojson=new Object();
  geojson=geojason;
  console.log(geojason);
  DrawMap=new map("test");//create a new map object
 svg = DrawMap.initMap(height,width);//initate the base map
  tooltip = d3.select("#main") //create tooltip for locations
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .attr("class","d3-tip");
    var csv = document.getElementById('b').files[0]; //load the csv files
          var rder = new FileReader(); 
          csvdata=new Csv();
          rder.onload = function(){              //read csv  file using the filereader object
            var text = rder.result;
            console.log(text);
          var attbutes=csvdata.decode(text);
          console.log(attbutes);
          var dropdwon="<select class=\"btn btn-default dropdown-toggle\" id=\"attrbtes\">"+attbutes+"</ul></div>"; //create dropdown of attributes
          document.getElementById('Parameters').innerHTML=dropdwon;
         swal("Files Loaded");
        }
        rder.readAsText(csv); // read csv
});
};
reader.readAsArrayBuffer(input);
}
function save(){
  DrawMap.Save();
}
function GoogleMap(){
  status="google";
  document.getElementById('container').style.backgroundColor="transparent"; //making the container tranpaernt
var geocoder = new google.maps.Geocoder(); //intialize the geodecoder
  geocoder.geocode( { 'address': geojson[0].features[0].properties.NAME_ENGLI}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results);
        midlat=results[0].geometry.location.G; //getting the corrinates of the cuntry
        midlang=results[0].geometry.location.K;
        }
  var mapOptions = {
    center: new google.maps.LatLng(midlat,midlang),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

new google.maps.Map(document.getElementById('map'), mapOptions);
});

  DrawMap.Draw(group,path,geojson,status); //Overlay Google map Facde design pattern
}

function Lock(){
  DrawMap.lock=true;
  group.selectAll("path").style("stroke-width", "1");
}
function Centarrlity(){
var bet="";
for (var key in jsnx.betweennessCentrality(G)._stringValues){ //terate through the first three countires
  
      bet=bet+key+" "+jsnx.betweennessCentrality(G)._stringValues[key]+"<br/>"; // append the centerilty
      countries[key].betweenscenterallity=jsnx.betweennessCentrality(G)._stringValues[key];
}
var ed="";
for (var key in jsnx.edgeBetweennessCentrality(G)._values){
ed=ed+key+" "+jsnx.edgeBetweennessCentrality(G)._values[key].toFixed(2)+"<br/>";
}

var eig="";
for (var key in jsnx.eigenvectorCentrality(G)._stringValues){
  
eig=eig+key+" "+jsnx.eigenvectorCentrality(G)._stringValues[key]+"<br/>";
countries[key].eigenvector=jsnx.eigenvectorCentrality(G)._stringValues[key];
}
var deg="";
for (var key in jsnx.degree(G)._stringValues){
 
deg=deg+key+" "+jsnx.degree(G)._stringValues[key]+"<br/>";
countries[key].degree=jsnx.degree(G)._stringValues[key];
}
document.getElementById('betweennessCentrality').innerHTML=bet;
document.getElementById('edgeBetweennessCentrality').innerHTML=ed;
document.getElementById('eigenvectorCentrality').innerHTML=eig;
document.getElementById('degree').innerHTML=deg;
console.log(countries);
}