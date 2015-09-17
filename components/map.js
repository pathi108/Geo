function map(name){
    this.name = name;
    this.lock=false;
this.initMap=function(width,height){
  var tempsvg=d3.select("#container").append("svg").attr("class","ssvg")
    .attr("width", width)
    .attr("height", height)
    .style("fill","steelblue")
    .style("z-index","2")
    .call(
      
      d3.behavior.zoom() //zooming 
          .scaleExtent([1, 15])
          .on("zoom", zoom)
      );
    console.log(tempsvg);
    return tempsvg;
    }
    this.Draw = function(group,path,geojson,state)
    {
      console.log(state);
      if(state==="normal"){
        group.selectAll("path")  // sellct the paths of geojason
              .data(geojson[1].features)
              .enter()
              .append("path")                                 //draw paths in map
              .attr("class","spath")   
              .style("stroke-width", "0.5")                     //style the paths
              .style("stroke", "#000000")
              .attr("d", path)
              .style("vector-effect", "non-scaling-stroke")
              .style("fill","#606060");
            }
          else{
            group.selectAll('path').style("fill","transparent");
          }
    };
this.Save=function(){
        var doctype = '<?xml version="1.0" standalone="no"?>'
  + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

// serialize our SVG XML to a string.
var source = (new XMLSerializer()).serializeToString(d3.select('svg').node());

// create a file blob of our SVG.
var blob = new Blob([doctype + source], { type: 'image/svg+xml;charset=utf-8' });

var url = window.URL.createObjectURL(blob);

// Put the svg into an image tag so that the Canvas element can read it in.
var img = new Image;

console.log("In");
img.onload = function(){
  // Now that the image has loaded, put the image into a canvas element.
  var canvas = d3.select('#container').append('canvas').node();
  canvas.width = 1000;
  canvas.height =1000;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  var canvasUrl = canvas.toDataURL("image/png");
  var a = document.createElement("a");
    a.download = this.name+".png";
    a.href = canvasUrl;
    a.click();
    d3.select('canvas').remove(); 
}
img.src = url;// start loading the image.
    };

  function zoom(){ //zooming
console.log("zooming  "+this.lock);
if(!this.lock){
group.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
//console.log(d3.event.translate+" "+d3.event.scale);
};
}