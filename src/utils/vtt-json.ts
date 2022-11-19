export function convertVttToJson(vttString:any) {
    return new Promise((resolve, reject) => {
    var current:any = {}
    var sections:any = []
    var start = false;
    var vttArray = vttString.split('\n');
     vttArray.forEach((line:any, index:any) => {
      if (line.replace(/<\/?[^>]+(>|$)/g, "") === " "){
      } else if (line.replace(/<\/?[^>]+(>|$)/g, "") == "") {
      } else if (line.indexOf('-->') !== -1 ) {
        start = true;
  
        if (current.start) {
          sections.push(clone(current))
        }
  
        current = {
          start: timeString2ms(line.split("-->")[0].trimRight().split(" ").pop(),undefined),
          end: timeString2ms(line.split("-->")[1].trimLeft().split(" ").shift(), undefined),
          part: ''
        }
      } else if (line.replace(/<\/?[^>]+(>|$)/g, "") === ""){
      } else if (line.replace(/<\/?[^>]+(>|$)/g, "") === " "){
      } else {
        if (start){
          if (sections.length !== 0) {
            if (sections[sections.length - 1].part.replace(/<\/?[^>]+(>|$)/g, "") === line.replace(/<\/?[^>]+(>|$)/g, "")) {
            } else {
              if (current.part.length === 0) {
                current.part = line
              } else {
                current.part = `${current.part} ${line}`
              }
              // If it's the last line of the subtitles
              if (index === vttArray.length - 1) {
                sections.push(clone(current))
              }
            }
          } else {
            current.part = line
            sections.push(clone(current))
            current.part = ''
          }
        }
      }
    })
  
    current = []
  
    sections.forEach((section:any) => {
      section.part = section.part.replace(/<\/?[^>]+(>|$)/g, "")
    })
      resolve(sections);
    })
  }
  
  // helpers
  //   http://codereview.stackexchange.com/questions/45335/milliseconds-to-time-string-time-string-to-milliseconds
  function timeString2ms(a:any,b:any){// time(HH:MM:SS.mss) // optimized
   return a=a.split('.'), // optimized
    b=a[1]*1||0, // optimized
    a=a[0].split(':'),
    b+(a[2]?a[0]*3600+a[1]*60+a[2]*1:a[1]?a[0]*60+a[1]*1:a[0]*1)*1e3 // optimized
  }
  
  function clone(obj:any) {
      if (null == obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
  }


  // vtt-json: npm package
  
