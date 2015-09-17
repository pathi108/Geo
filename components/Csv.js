function Csv(){
    this.Parameters=new Array();
    this.values=new Array();
    this.decode = function(text){
        var data=text.split("\n");
        console.log(data);
          this.Parameters=data[0].split(",");                   // find the attributes of the csv
          for(i=1;i<data.length;i++){
           var data3=data[i].split(",");  

          this.values[i-1]=data3;                              // divide the csv into tuples
          }
        
          data3=d3.values(this.values[0]);
          console.log(data3);
          var attbutes="";
          for(i=0;i<data3.length;i++)
          {
            
            if (!isNaN(data3[i]) && data3[i]!=""){  //check for attributes with integers
               
                
                attbutes=attbutes+"<option value="+i+">"+this.Parameters[i]+"</option>";                       //dropdown list of parameters with numerical values

            }
          }
          return attbutes;
    };
    this.addline=function(line,point){
        point.lines.push(line);
    };
};