function colorscheme(name){
    this.name=name;
    this.getColors=function(name){
        var colorarray=new Array();
            if(name === 'blue')
            {
                colorarray[0]='rgb(19,31,44)';
                colorarray[1]='rgb(38,63,93)';
                colorarray[2]='rgb(19,31,44)';
                colorarray[3]='rgb(43,104,142)';
                colorarray[4]='rgb(184,210,221)';
            
            }
            else if(name === 'green')
              {
                colorarray[0]='rgb(0,48,0)';
                colorarray[1]='rgb(24,72,24)';
                colorarray[2]='rgb(72,120,0)';
                colorarray[3]='rgb(165,194,0)';
                colorarray[4]='rgb(194,214,79)';
            
            }
            else if(name === 'red')
            {
                colorarray[0]='rgb(236,57,50)';
                colorarray[1]='rgb(184,29,29)';
                colorarray[2]='rgb(163,23,23)';
                colorarray[3]='rgb(165,194,0)';
                colorarray[4]='rgb(220,23,23)';

            }
            else {
                colorarray[0]='rgb(147, 112, 219)';
                colorarray[1]='rgb(50,205,50)';
                colorarray[2]='rgb(0,255,0)';
                colorarray[3]='rgb(0,205,102)';
                colorarray[4]='rgb(219,112,147)';

            }
            return colorarray;
          }
};