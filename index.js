var button = document.querySelector('#fullButton');
// var goFull = function(){
//     console.log('go full')
//     var iframe = document.querySelector('#iframe1 iframe');
//         if (iframe.requestFullscreen) {
//             iframe.requestFullscreen();
//         } else if (iframe.webkitRequestFullscreen) {
//             iframe.webkitRequestFullscreen();
//         } else if (iframe.mozRequestFullScreen) {
//             iframe.mozRequestFullScreen();
//         } else if (iframe.msRequestFullscreen) {
//             iframe.msRequestFullscreen();
//         }
// }
/*make responsive*/
var htmlAll = document.getElementsByTagName("html")[0];
var wrapper = document.getElementById('iframe1');
var iframe = document.querySelector('#iframe1 iframe');
var vsIsFullScreen = false;


button.addEventListener('click', function(){
    verticalFullScreen();
});

/**
 * 
 * 
 * FULLSCREEN FUNCTIONS
 * 
 * 
 */
var horizontalFullScreen = function(){
    iframe.scrollIntoView();  
    setTimeout(function(){
        var rect = iframe.getBoundingClientRect();
        iframe.style.height = window.innerHeight+'px';
        iframe.style.width = window.innerWidth+'px';
        iframe.style.left = (0-rect.x)+'px';
        iframe.style.top = (0-rect.y)+'px';
        vsIsFullScreen = true;
    }, 200);
}

var verticalFullScreen = function(){
    var wid = window.innerWidth;
    var hei = (9*wid)/16
    //change size
    wrapper.style.height = hei+'px';
    iframe.style.width = wid+'px'; 
    iframe.style.height = hei+'px'; 
    
    //change color background and fix
    iframe.style.position = 'absolute';
    iframe.style['box-shadow'] = '0 0 0 1600px rgba(0,0,0,0.98)';/* dark around it */
    iframe.style['z-index']= 2147483647;
    
    //lock center
    iframe.scrollIntoView(
        {
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        }
    );
    htmlAll.style.overflow = 'hidden';

    //set boolean    
    vsIsFullScreen = true;
}



/** DETECT PHONE ORIENTATION CHANGE **/
/*Orient horizontal*/

window.addEventListener("orientationchange", function() {
    if(horizontalFullScreen()){
        horizontalFullScreen();
    }else{
        verticalFullScreen();
    }
    
});


/** DETECT CLICK OUTSIDE VIDEO **/
document.addEventListener('click', function(event) {
    var isInside = wrapper.contains(event.target);
    if (!isInside) {
        //actions
        console.log('click outside')
    }
});


///testing use case
wrapper.style.height = iframe.style.height;
