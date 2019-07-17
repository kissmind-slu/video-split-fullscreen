var platform = window.navigator.platform;
var iphoneMachines = ['iPhone','iPod','iPad'];

if(platform === iphoneMachines[0] || platform === iphoneMachines[1] || platform === iphoneMachines[2]) {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    var button = document.querySelector('#fullButton');
    /*make responsive*/
    var htmlAll = document.getElementsByTagName("html")[0];
    var body = document.getElementsByTagName("body")[0];
    var wrapper = document.getElementById('iframe1');
    var iframe = document.querySelector('#iframe1 iframe');


    /*Init values*/
    var iframeInitStyle = iframe.style;
    var wrapperInitStyle = wrapper.style;
    var htmlAllInitStyle = htmlAll.style;
    var vsIsFullScreen = false;
    var turningScreen = false;
    var scrollSavedX, scrollSavedY;
    var startingFullscreenY;

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
            startingFullscreenY = window.scrollY;
            document.body.style.overflow = "hidden"
            vsIsFullScreen = true;
        }, 200);
    }

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
                    behavior: 'auto',
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



    /** DETECT PHONE ORIENTATION CHANGE **/
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


    /** DETECT CLICK OUTSIDE VIDEO **/
    document.addEventListener('click', function(event) {
        var isInside = wrapper.contains(event.target);
        if (!isInside) {
            //actions
            console.log('click outside')
        }
    });

    var isHorizontal = function(){
        if(window.orientation == 90 || window.orientation == -90){
            return true;
        }else{
            return false
        }
        
    }

    /////EXIT FULLSCREEN

    //Back to normal

    var exitFullScreen = function(){
        if(vsIsFullScreen){
            iframe.style = iframeInitStyle;
            wrapper.style = wrapperInitStyle;
            htmlAll.style = htmlAllInitStyle;
            vsIsFullScreen = false;
        }
    }

    //WHEN ESCAPE IS PRESSED
    document.onkeydown = function(evt) {
        //pressed escape
        exitFullScreen();
    };

    //scroll exit

    window.addEventListener('scroll', function() { 
        if(vsIsFullScreen && !isHorizontal()){ //remove the vertical
            setTimeout(function(){
                var pixelTreshhold = 50;
                if((window.scrollY-pixelTreshhold)>startingFullscreenY || (window.scrollY+pixelTreshhold)<startingFullscreenY){
                    //scrolled too much
                    exitFullScreen();
                }else{
                    //scrolled too little
                    window.scroll(startingFullscreenX,startingFullscreenY);
                }

            },250);
        }
    });
    //is screen turned
    window.addEventListener("orientationchange", function() {
        turningScreen = true;
        setTimeout(function(){
            turningScreen = false;
            alert('turned')
        },500);
    });


///testing use case
wrapper.style.height = iframe.style.height;


//////////////////////////////////////////////////////////////////////

} 


