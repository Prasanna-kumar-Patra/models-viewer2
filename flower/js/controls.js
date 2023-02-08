var Controls = function (annotationClicked) {
  var self = this;
  let buttonsArr = [];
  let titles;
  self.slideIndex = 1;
  self.modelViewer2;
  //self.audios ;


  self.init = function () {
    self.create();
    self.createCOntrols();

  }

  self.create = function () {
    self.modelViewer2 = document.querySelector("#mv1");
    const audios = document.getElementsByTagName("audio");
    let buttons = document.getElementsByClassName("Hotspot");
    titles = document.getElementsByClassName("title");
   
    for (var i = 0; i < buttons.length; i++) {
        buttonsArr.push(buttons[i]);
      
    }
    
  

  }


  self.createCOntrols = function () {
    console.log("title array length----->", titles.length)

    var htmlStr = '';
    htmlStr += '<button class="arrow arrow-left ">◂</button>';
    for (var i = 0; i < titles.length; i++) {
      htmlStr += '<label class="labelTitle" id="label_' + i + '">' + titles[i].textContent + '</label>';
    }
    htmlStr += '<button class="arrow arrow-right " >▸</button>';

    $(".pagination").html(htmlStr);

    $('.arrow-right').click(function () { $(".listPopup").css("display", "none"); self.plusSlides(1) });
    $('.arrow-left').click(function () { $(".listPopup").css("display", "none"); self.plusSlides(-1) });



   
    self.modalSlideShow(self.slideIndex);
  }

  self.modalSlideShow = function (n,b) {
    let i;
    let title = document.getElementsByClassName("labelTitle");
    if (n > title.length) {
      self.slideIndex = 1
    } else if (n < 1) {
      self.slideIndex = title.length
    }
    for (i = 0; i < title.length; i++) {
      title[i].style.display = "none";
      buttonsArr[i].classList.remove('active')
    }
    title[self.slideIndex - 1].style.display = "block";
    // console.log("jhfddsjfjdfkjfd---------->", buttonsArr[self.slideIndex - 1])
    
    if (b === "y") {
      // console.log("jhfddsjfhfg----------jdfkjfd---------->", buttonsArr[self.slideIndex - 1])
      annotationClicked(buttonsArr[self.slideIndex - 1],"navigation")
      buttonsArr[self.slideIndex - 1].classList.add('active')
   }

  }
  self.plusSlides = function (n) {
    self.modalSlideShow(self.slideIndex += n, "y");
  }



  self.activateClick = function (e) {
    for (i = 0; i < buttonsArr.length; i++) {
      var hotspot = buttonsArr[i]
      hotspot.classList.remove('active')
    }

    if (e.target.classList.contains('Hotspot')) {
      e.target.classList.add('active')
    }

  }
  window.addEventListener('click', (e) => {


    if (e.target.classList.contains('arrow')) {
      // e.target.classList.add('active')

      // console.log("e.target innnn arrow :: ", e.target)
    } else {
      // console.log("e.target not arrow :: ", e.target)
      self.activateClick(e)
    }

    //  // console.log("e.target :: ", e.target) 


  })

  self.playAudio = function(nm, callee){
    let audioElement = document.getElementById("myAudio1")
    console.log("audio callee--->",nm,callee)
    audioElement.src = "./mp3s/"+nm+".mp3";
    // audioElement.load();
    audioElement.play();

    audioElement.addEventListener('ended', (event) => {
      // console.log('audio has been ended');
      audioElement.pause();
      if(nm != "myAudio9")
      $(".arrow-right")?.click()
      //self.plusSlides(1) ;
    });
  }



 


}

