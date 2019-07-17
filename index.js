var platform = window.navigator.platform;
var iphoneMachines = ['iPhone','iPod','iPad'];

if(platform === iphoneMachines[0] || platform === iphoneMachines[1] || platform === iphoneMachines[2]) {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    var button = document.querySelector('#fullButtonTrigger');//Button to activate fullscreen, change ID
    button.addEventListener('click', function(){
        verticalFullScreen();
        // if(isHorizontal()){        
        //     horizontalFullScreen();
        // }else{
        //     verticalFullScreen();
        // }
    });

    /**
     * 
     * HTML ELEMENTS
     * 
     */
    var htmlAll = document.getElementsByTagName("html")[0]; //parent html
    var body = document.getElementsByTagName("body")[0];    //parent body
    var wrapper = document.getElementById('iframe1');       //iframe wrapper div
    var iframe = document.querySelector('#iframe1 iframe'); //iframe


    /**
     * 
     * Init values & global variables
     * 
     */
    var iframeInitStyle = iframe.style;
    var wrapperInitStyle = wrapper.style;
    var htmlAllInitStyle = htmlAll.style;
    var vsIsFullScreen = false;
    var turningScreen = false;
    var scrollSavedX, scrollSavedY;
    var startingFullscreenY;



    /**
     * 
     * 
     * FULLSCREEN FUNCTIONS
     * 
     * 
     */

    //Horizontal
    var horizontalFullScreen = function(){
        iframe.scrollIntoView();  
        setTimeout(function(){
            var rect = iframe.getBoundingClientRect();
            iframe.style.height = window.innerHeight+'px';
            iframe.style.width = window.innerWidth+'px';
            iframe.style.left = (0-rect.x)+'px';
            iframe.style.top = (0-rect.y)+'px';
            startingFullscreenY = window.scrollY;
            document.body.style.overflow = "hidden"
            vsIsFullScreen = true;
        }, 200);
    }

    //Vertical
    var verticalFullScreen = function(){
        setTimeout(function(){
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
        setTimeout(function(){
            iframe.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                }
            );
        },50);
        setTimeout(function(){
            if(!scrollSavedX || !scrollSavedY){
                //to change, asigning scroll coordinates
                scrollSavedX = window.scrollX;
                scrollSavedY = window.scrollY;
                document.body.style.overflow = "hidden";
            }else{
                window.scrollTo(scrollSavedX,scrollSavedY);
                document.body.style.overflow = "hidden";
            }
            startingFullscreenY = window.scrollY;
        },170)
        
        //set boolean    
        vsIsFullScreen = true;
        }, 200);
    }

    //EXIT

    var exitFullScreen = function(){
        if(vsIsFullScreen){
            iframe.style = iframeInitStyle;
            wrapper.style = wrapperInitStyle;
            htmlAll.style = htmlAllInitStyle;
            vsIsFullScreen = false;
        }
    }


    /**
     * 
     *  DETECT PHONE ORIENTATION CHANGE
     * 
     */
    /*Orient horizontal*/

    window.addEventListener("orientationchange", function() {
        if(isHorizontal()){        
            horizontalFullScreen();
        }else{
            wrapper.style = wrapperInitStyle;
            iframe.style = iframeInitStyle;
            htmlAll.style = htmlAllInitStyle;
            verticalFullScreen();
        }
        
    });

    var isHorizontal = function(){
        if(window.orientation == 90 || window.orientation == -90){
            return true;
        }else{
            return false
        }
        
    }

    //scroll exit

    window.addEventListener('scroll', function() { 
        if(vsIsFullScreen /*&& !isHorizontal()*/ && !turningScreen){ 
            setTimeout(function(){
                var pixelTreshhold = 50;
                if((window.scrollY-pixelTreshhold)>startingFullscreenY || (window.scrollY+pixelTreshhold)<startingFullscreenY){
                    //scrolled too much
                    exitFullScreen();
                }else{
                    //scrolled too little
                    iframe.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'center'
                    })
                }

            },50);
        }
    });
    //is screen turned
    window.addEventListener("orientationchange", function() {
        turningScreen = true;
        setTimeout(function(){
            turningScreen = false;
        },600);
    });


///testing use case
wrapper.style.height = iframe.style.height;


//////////////////////////////////////////////////////////////////////

} 


