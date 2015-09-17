function locations(name){
    this.name = name;
    this.corrdinatex;
    this.corrdinatey;
    this.betweenscenterallity;
    this.eigenvector;
    this.degree;
    this.lines=new Array();
    this.plot = function(svg,country){
        svg.append("circle")
         .attr("name",country.name)
         .attr("cx",function(d) {
                    
                   return projection([country.corrdinatex,country.corrdinatey])[0];
           })
         .attr("cy",function(d) {
                    
                   return projection([country.corrdinatex,country.corrdinatey])[1];})
         .attr("r",5)
         .attr("id",country.name)
         .style("vector-effect", "non-scaling-stroke")
         .style("fill","yellow");
    };
    this.addline=function(line,point){
        point.lines.push(line);
    };
    this.boldLines=function(svg,selected,name,connectedLines,countries){
            if(selected!==""){

                      console.log("selected"+selected);
                      var reduceLines=d3.values(countries[selected]);
                      console.log(countries[selected]);
                    for(k=0;k< reduceLines[1].length;k++)
                    {
                      var id=".l"+String(reduceLines[1][k].name);
                      svg.select(id).style("stroke-width", 0.75);
                    }
                      selected=name;
                    }
                    else{
                      selected=name;
                        }
                    for(t=0;t< connectedLines[1].length;t++)
                    {
                      console.log(connectedLines);
                      var id=".l"+String(connectedLines[1][t].name);
                      console.log(id);
                    svg.select(id).style("stroke-width", 5);
                    console.log(svg.select(id).attr("stroke-width"));
                    }
                    return name;
};
this.setCoordinates=function(x,y){
this.corrdinatex=x;
this.corrdinatey=y;
console.log(this);

};
}