var ModelViewer = function () {
    var self = this;
    let buttonsArr = [];
    let selectedNavIndex = 0;
    let isAnnotation = true;
    let isAutoplay = false;
    let isAudioPlay = true;
    let isMinimize = false;
    var audioElement;

    self.modelViewer2 = document.querySelector("#mv1");

    self.init = function (e) {
        console.log("model init.........", e);
        self.createModel();
        self.adEventListnerForHotspotClick();
        self.createNavigation();
       // self.demoNav()
        self.pauseAndResumeAudio();
       // self.createDescriptionBox ();
        self.slideNavigation(selectedNavIndex, e);
        console.log("selected nav Index--->", selectedNavIndex)
       self.onWindowsClick();
       
    }

    self.createModel = function () {
        let buttons = document.getElementsByClassName("Hotspot");
        titles = document.getElementsByClassName("title");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute("id", "Hotspot_" + (i + 1))
            buttonsArr.push(buttons[i]);
        }
    }

    self.adEventListnerForHotspotClick = function () {
        $(".Hotspot").click(function (e) {
            if ($(".Hotspot").hasClass('active')) {
                $(".Hotspot").removeClass('active');
            }
            var id = e.target.id.split('_');
            id = id[1];
            selectedNavIndex = id - 1;
            for (var i = 0; i < buttonsArr.length; i++) {
                if (i === (id - 1)) {
                    $("#Hotspot_" + id).addClass('active');
                    self.annotationClicked(buttonsArr[id - (1)], "Hotspot click");
                    self.createDescriptionBox (id-(1));
                }
            }
            console.log("selected nav Index--->", selectedNavIndex)
            self.slideNavigation(selectedNavIndex, e);
        })

    }



    self.createNavigation = function () {
        console.log("title array length----->", titles.length)
        var htmlStr = '';

        // htmlStr += '<span class="material-icons">settings</span>';
        for (var i = 0; i < titles.length; i++) {
            htmlStr += '<label class="pagination-title labelTitle" id="label_' + i + '">' + titles[i].textContent + '</label>';
        }
        htmlStr += '<button class="pagination-btn arrow arrow-left prev"><span class="material-icons arrow">arrow_left</span></button>';
        htmlStr += '<button class="pagination-btn arrow arrow-right next" ><span class="material-icons arrow">arrow_right</span></button>';
        // htmlStr += '<button class="pagination-btn" ><span class="material-icons">visibility</span></button>';
        // htmlStr += '<button class="pagination-btn" ><span class="material-icons">visibility_off</span></button>';
        // htmlStr += '<button class="pagination-btn" > <span class="material-icons">stop</span></button>';
        // htmlStr += '<button class="pagination-btn" ><span class=" material-symbols-outlined ">autoplay</span> </button>';
       // if(isAutoplay === false){
            htmlStr += '<button class="pagination-btn isAutoplay navBtn" ></button>';
            htmlStr += '<button class="pagination-btn visibility" ></button>';
       // }
        // else{
        //     htmlStr += '<button class="pagination-btn isAutoplay navBtn" ><span class=" material-symbols-outlined isAutoplay">autoplay</span> </button>';
        //}
        
        //htmlStr += '<div class="play_pauseBtn pagination-btn" style="display:block"><button class="pagination-btn isAutoplay" ><span class=" material-symbols-outlined isAutoplay">autoplay</span> </button></div>';
       
      

        $(".pagination").html(htmlStr);
        self.addEventListenerForNavigationNextPrevBtn();
        // self.slideNavigation(selectedNavIndex);

        if(isAutoplay === false){
        $(".navBtn").html('<span class=" material-symbols-outlined isAutoplay">autoplay</span>')
        }else{
            $(".navBtn").html('<span class="material-icons">stop</span>')
        }
        if(isAnnotation){
            $('.visibility').html('<span class="material-icons visibility">visibility_off</span>');
        }else{
            $('.visibility').html('<span class="material-icons visibility">visibility</span>');
        }


       

    }

    

    self.addEventListenerForNavigationNextPrevBtn = function () {
        $(".next").click(function (e) {
            console.log("Navigation next clicked")
            console.log("selected nav Index--->", selectedNavIndex)
            selectedNavIndex++;
            if (selectedNavIndex > buttonsArr.length - 1) {
                selectedNavIndex = 0;
            }
            self.slideNavigation(selectedNavIndex, e);

        });

        $(".prev").click(function (e) {
            console.log("Navigation prev clicked")
           // selectedNavIndex--;
            // if (selectedNavIndex < 0) {
            //     selectedNavIndex = buttonsArr.length - 1;
            // }
              if (selectedNavIndex === 0) {
                selectedNavIndex =buttonsArr.length - 1;
            }else{
                selectedNavIndex--;
            }
            console.log("selectedNavIndex at prev click--->>>>>>",selectedNavIndex)
            self.slideNavigation(selectedNavIndex, e);
        });
    }

    self.slideNavigation = function (navIndex, e) {
        console.log("selected nav Index--->", navIndex)
        let title = document.getElementsByClassName("labelTitle");
        let btn = document.getElementsByClassName("arrow");
        navIndex = parseInt(navIndex)
        for (i = 0; i < title.length; i++) {
            if (i === navIndex) {
                title[i].style.display = "block";
                buttonsArr[i].classList.add('active')
                self.createDescriptionBox(i)
                if (e.type === "click") {
                    self.annotationClicked(buttonsArr[i], "next-prev btn");
                }
            } else {
                title[i].style.display = "none";
                    buttonsArr[i].classList.remove('active');
                
            }
        }

    }

    self.createNavPopup = function () {
        $(".listPopup").css('display','block')
        var htmlStr = '';
        htmlStr += '<div class="list hotspots-list visible">';
        // htmlStr += '<a href="#" data-action="toggle-visibility" class="annotations-visibility "><span class="isAnnotations">Hide annotation</span></a><br>';
        // htmlStr += '<a href="#" data-action="toggle-autopilot" class="annotations-autopilot "><span class="isAutoplay"> start autoplay</span></a>';
        // if(isAnnotation){
        //     htmlStr += '<span class=" list-item isAnnotations"><span class="material-symbols-outlined"> visibility_off </span>Hide annotation</span>';
        // }else{
        //     htmlStr += '<span class=" list-item isAnnotations"><span class="material-symbols-outlined"> visibility </span>Show annotation</span>';
        // }
        // if(isAutoplay){
        //     htmlStr += '<span class=" list-item isAutoplay"><span class="material-symbols-outlined"> stop </span> stop autoplay</span>';
        // }else{
        //     htmlStr += '<span class=" list-item isAutoplay"><span class="material-symbols-outlined"> autoplay </span> start autoplay</span>';
        // }
       
        //htmlStr += '<span class=" list-item isAutoplay"><span class="material-symbols-outlined"> autoplay </span> start autoplay</span>';
        htmlStr += '<div class="setBgColor list-item">';
        htmlStr += '<span class="colorDiv" id="black"></span><span class="colorDiv" id="gray"></span><span class="colorDiv" id="coral"></span><span class="colorDiv" id="fuchsia"></span>';
        //htmlStr += '<span class="colorDiv" id="white"></span><span class="colorDiv" id="yellow"></span><span class="colorDiv" id="darkorange"></span><span class="colorDiv" id="greenyellow"></span>'
        htmlStr +='</div>';
        htmlStr += '<ul class="js-scrollable">';
        for (var i = 0; i < titles.length; i++) {
            console.log("titles i ------->", titles[i]);
            htmlStr += '<li class="link list-item" id="link_' + i + '"><span class="index">' + (i + 1) + '</span> ' + titles[i].textContent + '</li>'

        }
        htmlStr += '</ul>'
        htmlStr += '</div>'

        $('.listPopup').html(htmlStr);
        self.addEventListnerForpopUpListClick();


    }


    self.addEventListnerForpopUpListClick = function () {
        $(".link").click(function (e) {
            id = e.target.id.split("_");
            id = id[1];
            id = parseInt(id);
            selectedNavIndex = id;
            self.slideNavigation(id , e)
        })


        // $(".isAnnotations").click(function(){
        //     console.log(".isAnnotations clicked")
        //     if(isAnnotation){
        //        isAnnotation = false;
        //        $(".Hotspot").css("display","none")
        //     }else{
        //         isAnnotation = true;
        //         $(".Hotspot").css("display","block")
        //     }
        // })

        // $(".isAutoplay").click(function(){
        //     console.log("annotations-autopilot");
        //     // var htmlStr = '<span class="material-symbols-outlined autoplayoff">stop_circle</span>';
        //     // var html = '<span class="material-symbols-outlined autoplayoff">autoplay</span>'
        // //  var htmlAutoplyStopStr = '<button class="pagination-btn" > <span class="material-icons">stop</span></button>';
        // //   var htmlAutoplayStr  = '<button class="pagination-btn" ><span class=" material-symbols-outlined ">autoplay</span> </button>';
        //     if(isAutoplay){
        //         isAutoplay = false;
        //         // $(".play_pauseBtn").css({"display":"block"})
        //         // $(".play_pauseBtn").html(htmlAutoplayStr)
        //     }else{
        //         isAutoplay = true;
        //         // $(".play_pauseBtn").css({"display":"block"})
        //         // $(".play_pauseBtn").html(htmlAutoplyStopStr)
        //         self.annotationClicked(buttonsArr[selectedNavIndex] , "autoplay called")
        //     }
        // })

        $(".colorDiv").click(function(e){
            id = e.target.id;
            console.log("selected color is--->",id)
            $("#mv1").css("background-color",id)
        })
    }


    self.createDescriptionBox = function(ctr){
        var htmlStr = '';
        let  = document.getElementsByClassName("title");
        let descriptions = document.getElementsByClassName("description");
        console.warn(descriptions);
       //  htmlStr += '<div class="description">';
        console.log("descriptions-------------",descriptions.length)
           // htmlStr += '<p class="description_title" id="desTitle_'+(ctr)+'">'+titles[ctr].textContent+'</p>'
          // htmlStr += '<div class="descriptions ">'
            htmlStr += '<p id="description_'+(ctr)+'">'+descriptions[ctr].textContent+'</p>';
          // htmlStr += '</div>'
       // $(".description-container").html(htmlStr)
       $(".descriptions").html(htmlStr)
       $(".description_title").attr("id","desTitle_"+ctr);
       $('.description_title').html(titles[ctr].textContent);
        console.warn(descriptions[ctr].textContent);
    }


    self.annotationClicked = (annotation, callee) => {
        console.log("pkp:  ~ file: index.html:142 ~ annotationClicked ~ callee", annotation)
        let dataset = annotation.dataset;
        self.modelViewer2.cameraTarget = dataset.target;
        self.modelViewer2.cameraOrbit = dataset.orbit;
        self.modelViewer2.fieldOfView = '0deg';
        self.playAudio(dataset.audio, "from annotation/Hotspot clicked ");

    }





    
    self.playAudio = function (audNm, callee) {
        if (audioElement) {
            audioElement.pause()
        }
        audioElement = document.createElement("AUDIO");
      let audioUrl = "./audio/" + audNm + ".mp3"
      
        if (audioElement.canPlayType("audio/mpeg")) {
            // audioElement.setAttribute("src", "./audio/" + audNm + ".mp3");
            audioElement.setAttribute("src", audioUrl);
        } else {
            console.log("pkp:  ~ file: controls.js:121 ~ Controls ~ else xxxxxxxxx")
            // audioElement.setAttribute("src", "horse.ogg");
        }
        document.body.appendChild(audioElement);
        audioElement.removeEventListener("ended", onAudioEnd);
        audioElement.addEventListener('ended', onAudioEnd);

        audioElement.addEventListener('canplaythrough', soundLoaded, false);

        function soundLoaded(evt, callee) {
            console.log("pkp:  ~ file: controls.js:126 ~ soundLoaded ~ evt", evt)
            if(audioUrl){
                audioElement.play();
            }
            

        }
        function onAudioEnd(evt, callee) {
            console.log("pkp:  ~ file: controls.js:130 ~ onAudioEnd ~ evt", evt)
           
            
            audioElement.pause();
            if (audNm != "myAudio"+buttonsArr.length) {
                console.log("isAutoplay ------------------------->",isAutoplay);
                if (isAutoplay) {
                    console.log("Audio number------------------------->",audNm);
                  //  $(".next")?.click();
                    setTimeout(function() {
                        $(".next")?.click();
                      }, 2000);
                    
                }

            }else if(audNm === "myAudio"+buttonsArr.length){
                buttonsArr[selectedNavIndex].classList.remove("active");
                isAutoplay = false;
               // $(".play_pauseBtn").css({"display":"none"})
               $(".navBtn").html('<span class=" material-symbols-outlined isAutoplay">autoplay</span> ');
               //selectedNavIndex = 0;
            }

            $(".autoplayoff").click(function(){
                if(isAutoplay){
                    isAutoplay = false;
                    
                   // $(".play_pauseBtn").css({"display":"none"})
                }
            })
        }
    }

    self.pauseAndResumeAudio = function () {
        $(".labelTitle").click(function () {
          if(audioElement){
            if(isAudioPlay){
                audioElement.pause();
                self.createNavPopup();
                isAudioPlay = false
            }else{
                audioElement.play();
                self.createNavPopup();
                isAudioPlay = true
            }
          }else{
            self.createNavPopup();
          }
           

        })
    }

    self.onWindowsClick = function () {

        window.addEventListener('click', (e) => {
            console.log("windows click-------------->", e)
            document.querySelectorAll('.Hotspot').forEach((hotspot) => {
                hotspot.classList.remove('active')
            })

            $(".description-box").css("display", "none");

            if (e.target.classList.contains('labelTitle')) {
                $(".listPopup").css('display', 'block');
                $(".description-box").css("display", "block");
            } else {
                $(".listPopup").css('display', 'none');
            }
            if (e.target.classList.contains('Hotspot')) {
                e.target.classList.add('active')
                $(".description-box").css("display", "block");
            } else if (e.target.classList.contains('arrow')) {
                buttonsArr[selectedNavIndex].classList.add('active')
                $(".description-box").css("display", "block");
            } else if(e.target.classList.contains('link')){
                buttonsArr[selectedNavIndex].classList.add('active')
                $(".description-box").css("display", "block");
            }else if(e.target.classList.contains('action-btn')){
                buttonsArr[selectedNavIndex].classList.add('active')
                $(".description-box").css("display", "block");
                if(isMinimize){
                    isMinimize = false;
                    $(".descriptions").removeClass("hide");
                    $(".description-box").removeClass("des-hide");
                    $(".description_title").removeClass("center");
                   // $(".action-btn").attr('src',"../css/svg/minimize.svg");
                    $(".actionBtn").attr('src',"../libs/css/svg/minimize.svg");

         
                }else{
                    isMinimize = true;
                    $(".descriptions").addClass("hide");
                    $(".description-box").addClass("des-hide");
                    $(".description_title").addClass("center");
                   // $(".action-btn").attr('src',"../css/svg/maximize.svg");
                    $(".actionBtn").attr('src',"../libs/css/svg/maximize.svg");

                
                }
            }else if(e.target.classList.contains("isAutoplay")){
                var htmlStr = ' <span class="material-icons isAutoplay">stop</span>';
                 var html_ = ' <span class=" material-symbols-outlined isAutoplay">autoplay</span> ';
                
                if(isAutoplay){
                    isAutoplay = false;
                   $(".navBtn").html(html_);
                   audioElement.pause();
                   $(".description-box").css("display", "block");
                    }else{
                        if(selectedNavIndex == buttonsArr.length - 1){
                            selectedNavIndex = 0
                        }
                    isAutoplay = true;
                    $(".navBtn").html(htmlStr);
                    $(".description-box").css("display", "block");
                    buttonsArr[selectedNavIndex].classList.add('active')
                    self.annotationClicked(buttonsArr[selectedNavIndex] , "autoplay called")
                  }
                  
            }else if(e.target.classList.contains("labelTitle")){
                buttonsArr[selectedNavIndex].classList.add('active')
            }else if(e.target.classList.contains("visibility")){
                if(isAnnotation){
                    isAnnotation = false;
                    $(".Hotspot").css("display","none");
                    $(".description-box").css("display", "none");
                    $('.visibility').html('<span class="material-icons visibility">visibility</span>');
                }else{
                    isAnnotation = true;
                    $(".Hotspot").css("display","block");
                    $(".description-box").css("display", "block");
                    $('.visibility').html('<span class="material-icons visibility">visibility_off</span>');
                }
            }else if(e.target.classList.contains("mv1")){
                $(".navigation").css("display","block");
               // buttonsArr[selectedNavIndex].classList.add('active');
              //  $(".description-box").css("display", "block");
            }else if(e.target.classList.contains("description_title")){
                $(".description-box").css("display", "block");
            }else if(e.target.classList.contains("center")){
                $(".description-box").css("display", "block");
            }
            

        })
    }
} 