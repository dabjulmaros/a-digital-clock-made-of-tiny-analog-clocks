var clock = {
  el: {},
  config: {
    n: 4,
    col: 4,
    row: 6,
    refreshInterval: 30000
  },
  fn: {
    domReferences: function domReferences() {
      clock.el.clock = document.getElementById("clock");
      clock.el.digits = clock.el.clock.getElementsByClassName("digit");
      console.log("DOM references updated");
    },
    init: function init() {

      clock.fn.domReferences();

      var clockHtml = "";
      var i = 0;

      for (var n = 1; n <= clock.config.n; n++) {
        clockHtml += '<div class="digit" digit="' + n + '" >';
        for (var row = 1; row <= clock.config.row; row++) {
          clockHtml += '<div class="pixel_row" row="' + row + '">';
          for (var col = 1; col <= clock.config.col; col++) {
            i++;
            clockHtml += '\
              <div class="pixel_col" col="' + col + '">\
                <div \
                  class="pixel" \
                  digit="' + n + '" \
                  row="' + row + '" \
                  col="' + col + '" \
                  pixel="'+i+'" \
                  id="pixel_'+n+'_'+row+'_'+col+'" \
                >\
                  <span class="hours line"></span> \
                  <span class="minutes line"></span> \
                </div>\
             </div>';
          }
          clockHtml += '</div>';
        }
        clockHtml += '</div>';
      }
      clock.el.clock.innerHTML = clockHtml;
      clock.fn.domReferences();      
      
      /*clock.fn.drawDigits("------");*/
      clock.fn.loop();    
      setTimeout(clock.fn.loop,0);      
      setInterval(clock.fn.loop,clock.config.refreshInterval);
      
      console.log("DOM elements created.");
    },
    drawDigits: function(str) {
      
      console.log("Draw "+str);
      
      if (str && str.length) {
        for (var i=0; i<str.length; i++) {
          if (clock.el.digits[i]) { 
            if (str[i] !== clock.el.digits[i].getAttribute("display")) {
              clock.el.digits[i].setAttribute("display",str[i]);
            } else {
              if ( i >= 2) {
                if (clock.el.digits[i].getAttribute("reverse") != "true") {
                  console.log("Same digit at position "+ i + " ("+str[i]+")");   
                  clock.el.digits[i].setAttribute("reverse","true");
                } else {  
                  console.log("Same digit at position "+ i + " ("+str[i]+")");  
                  clock.el.digits[i].setAttribute("reverse","false");
                }                  
              }

            }
          }
        }
      }
    },
    getTimeString: function() {
      
      var addZero = function(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }  

      var d = new Date();
      var h = addZero(d.getHours()).toString();
      var m = addZero(d.getMinutes()).toString();
      var s = addZero(d.getSeconds()).toString();
     
      return( h + m + s);

    },
    loop: function() {
      var str = clock.fn.getTimeString();      
      clock.fn.drawDigits(str);        
    }
  }
};
clock.fn.init();
var a = true;