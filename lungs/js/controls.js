var Controls = function (annotationClicked) {
  var self = this;
  let buttonsArr = [];
  let titles;
  self.slideIndex = 1


  self.init = function () {
    self.create();
    self.createCOntrols();

    // console.log("annotationClicked--->",annotationClicked)
  }

  self.create = function () {



    let buttons = document.getElementsByClassName("Hotspot");
    console.log("pkp:  ~ file: controls.js:20 ~ Controls ~ buttons", buttons)
    titles = document.getElementsByClassName("title");
    console.warn('buttons length--->', buttons)
    for (var i = 0; i < buttons.length; i++) {
      buttonsArr.push(buttons[i]);
      console.warn("button------i---->", buttons[i])
    }
  }


  self.createCOntrols = function () {
    console.log("buttons array length----->", buttonsArr[0])

    var htmlStr = '';
    htmlStr += '<button class="arrow arrow-left ">◂</button>';
    for (var i = 0; i < titles.length; i++) {
      htmlStr += '<label class="labelTitle" id="label_' + i + '">' + titles[i].textContent + '</label>';
    }
    htmlStr += '<button class="arrow arrow-right " >▸</button>';

    $(".pagination").html(htmlStr);

    $('.arrow-right').click(function () { $(".listPopup").css("display", "none"); self.plusSlides(1) });
    $('.arrow-left').click(function () { $(".listPopup").css("display", "none"); self.plusSlides(-1) });



    $(".labelTitle").click(function () {
      // $(".listPopup").css("display", "block");
      // self.createPopUpListDiv();
    })
    self.modalSlideShow(self.slideIndex, "n");
  }

  self.createPopUpListDiv = function () {
    var htmlStr = '';
    htmlStr += '<ol>';
    for (var i = 0; i < titles.length; i++) {
      htmlStr += '<li >' + titles[i].textContent + '</li>';
    }
    htmlStr += '</ol>';
    $('.listPopup').html(htmlStr)

  }

  self.modalSlideShow = function (n, b) {
    let i;
    let title = document.getElementsByClassName("labelTitle");
    if (n > title.length) {
      self.slideIndex = 1
    } else if (n < 1) {
      self.slideIndex = title.length
    }
    for (i = 0; i < title.length; i++) {
      title[i].style.display = "none";
      console.log("button--76>", buttonsArr[i].classList)
      buttonsArr[i].classList.remove('active')
    }
    title[self.slideIndex - 1].style.display = "block";
    console.log("jhfddsjfjdfkjfd---------->", buttonsArr[self.slideIndex - 1])
    if (b === "y") {
      annotationClicked(buttonsArr[self.slideIndex - 1])
      buttonsArr[self.slideIndex - 1].classList.add('active')
    }
    //annotationClicked(buttonsArr[self.slideIndex-1])

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

      console.log("e.target innnn arrow :: ", e.target)
    } else {
      console.log("e.target not arrow :: ", e.target)
      self.activateClick(e)
    }

    //  console.log("e.target :: ", e.target) 


  })


}

