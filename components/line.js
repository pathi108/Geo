function lines(name,value){
    this.name = name;
    this.value=value;
    this.corrdinates =new Array();
    this.draw = function(svg,line,clr,upperbound){
      console.log(line);
       console.log(line.name+"  "+this.value+"  "+upperbound);
       if(parseFloat(this.value)>parseFloat(upperbound)){
        svg.append("line")
        .attr("class","l"+line.name)
        .attr("x1", function(d) {
                    
                   return projection([line.corrdinates[0],line.corrdinates[1]])[0];
           })
        .attr("y1", function(d) {
                    
                   return projection([line.corrdinates[0],line.corrdinates[1]])[1];
           })
        .attr("x2", function(d) {
                    
                   return projection([line.corrdinates[2],line.corrdinates[3]])[0];
           })
        .attr("y2", function(d) {
                    
                   return projection([line.corrdinates[2],line.corrdinates[3]])[1];
           })
        .attr("stroke-width", 0.75)
        .attr("stroke", clr);
      }
    };
    this.addCorrdinates=function(corrdinatex,corrdinatey,line){
        var corrdinate=new Array();
        corrdinate.push(corrdinatex);
        corrdinate.push(corrdinatey);
        line.corrdinates.push(corrdinate);
    };
    this.setCorrdinates=function(vert,countries){
            this.corrdinates.push(countries[vert[this.name][0]].corrdinatex);
            this.corrdinates.push(countries[vert[this.name][0]].corrdinatey);
            this.corrdinates.push(countries[vert[this.name][1]].corrdinatex);
            this.corrdinates.push(countries[vert[this.name][1]].corrdinatey);
    };
    this.RemoveAll=function(svg){
      svg.selectAll("*").remove();
    };
    this.RemoveLines=function(){
      
      svg.selectAll("line").remove();
      svg.selectAll("circle").remove();
    }
    this.ChangeColor=function(svg,id,clr){
      svg.selectAll(id).style("stroke-width", 0.75)
        .style("stroke", clr);
    };
};
