var ModelViewer = function () {
    var self = this;
    let buttonsArr = [];
    let selectedNavIndex = 0;
    let isAnnotation = true;
    let isAutoplay = false;
    let isAudioPlay = false;
    let isMinimize = false;
    var audioElement;

    self.modelViewer2 = document.querySelector("#mv1");

    self.init = function (e) {
        console.log("model init.........", e);
        self.createModel();
        self.adEventListnerForHotspotClick();
        self.createNavigation();
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
        htmlStr += '<button class="arrow arrow-left prev">◂</button>';
        for (var i = 0; i < titles.length; i++) {
            htmlStr += '<label class="labelTitle" id="label_' + i + '">' + titles[i].textContent + '</label>';
        }
        htmlStr += '<button class="arrow arrow-right next" >▸</button>';

        $(".pagination").html(htmlStr);
        self.addEventListenerForNavigationNextPrevBtn();
        // self.slideNavigation(selectedNavIndex);

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
            selectedNavIndex--;
            if (selectedNavIndex < 0) {
                selectedNavIndex = buttonsArr.length - 1;
            }
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
        htmlStr += '<span class=" list-item isAnnotations"><span class="material-symbols-outlined"> visibility_off </span>Hide annotation</span><br>';
        htmlStr += '<span class=" list-item isAutoplay"><span class="material-symbols-outlined"> autoplay </span> start autoplay</span>';
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


        $(".isAnnotations").click(function(){
            console.log(".isAnnotations clicked")
            if(isAnnotation){
               isAnnotation = false;
               $(".Hotspot").css("display","none")
            }else{
                isAnnotation = true;
                $(".Hotspot").css("display","block")
            }
        })

        $(".isAutoplay").click(function(){
            console.log("annotations-autopilot");
            if(isAutoplay){
                isAutoplay = false;
            }else{
                isAutoplay = true;
                self.annotationClicked(buttonsArr[selectedNavIndex] , "autoplay called")
            }
        })

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
        htmlStr += '<div class="description">';
        console.log("descriptions-------------",descriptions.length)
            htmlStr += '<p id="desTitle_'+(ctr)+'">'+titles[ctr].textContent+'</p>'
            htmlStr += '<p id="description_'+(ctr)+'">'+descriptions[ctr].textContent+'</p>';
            htmlStr += '</div>'
        $(".description-box").html(htmlStr)
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
                if (isAutoplay) {
                    $(".next")?.click();
                }

            }
        }
    }

    self.pauseAndResumeAudio = function () {
       // var count = 0;
        $(".labelTitle").click(function () {
            // count++;
            // if (count == 1) {
            //     audioElement.pause();
            //     self.createNavPopup();
            // } else if (count == 2) {
            //     audioElement.play();
            //     count = 0;
            // }

            if(isAudioPlay){
                audioElement.pause();
                self.createNavPopup();
                isAudioPlay = false
            }else{
                audioElement.play();
                self.createNavPopup();
                isAudioPlay = true
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
                    $(".description").removeClass("hide");
                    $(".action-btn").attr('src',"../css/svg/minimize.svg");
                }else{
                    isMinimize = true;
                    $(".description").addClass("hide");
                    $(".action-btn").attr('src',"../css/svg/maximize.svg");
                }
            }

        })
    }
}