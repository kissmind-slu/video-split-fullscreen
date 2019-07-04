
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

var responsiveChange = function(ratio){
    var wid = window.innerWidth;
    var hei = (9*wid)/16
    //change size
    wrapper.style.height = hei+'px';
    iframe.style.width = (wid-(wid*ratio))+'px'; 
    iframe.style.height = (hei-(hei*ratio))+'px'; 
    
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
button.addEventListener('click', function(){
    responsiveChange(0);
});
/** DETECT PHONE ORIENTATION CHANGE **/
/*Orient horizontal*/
var horizontalFullScreen = function(){
    iframe.scrollIntoView();  
    var rect = iframe.getBoundingClientRect();
    iframe.style.height = rect.height+'px';
    iframe.style.width = rect.width+'px';
    iframe.style.left = (0-rect.x)+'px';
}


window.addEventListener("orientationchange", function() {

});

/** DETECT CLICK OUTSIDE VIDEO **/
document.addEventListener('click', function(event) {
    var isInside = wrapper.contains(event.target);
    if (!isInside) {
        //actions
        console.log('click outside')
    }
});

wrapper.style.height = iframe.style.height;
