//theme switcher
const switcher = () => {
  //theme switcher 
  const toggleSwitch = document.getElementById('checkbox');
  const currentTheme = localStorage.getItem('data-theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme == 'dark') {
      toggleSwitch.checked = true;
    }
  }
  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('data-theme', 'light');
    }
  }
  toggleSwitch.addEventListener('change', switchTheme, false);
}
//Menu and burger
const menuBurger = () => {
  //Menu and burger
  let burger = document.querySelector('.burger');
  let menu = document.getElementById('menu');
  burger.addEventListener('click', e => {
    e.preventDefault();
    //togle navigation
    menu.classList.toggle('open');
    //Burger animation
    burger.classList.toggle('toggle-burger');
  });

}
//testimonials slider
const testimonials = () => {
  //Slider guest says
   const sliderTestimonials = document.querySelector('.guests-says-slider');
   const prevSliderTestimonials = document.getElementById('prevTestimonials');
   const nextSLiderTestimonials = document.getElementById('nextTestimonials');

   nextSLiderTestimonials.addEventListener('click', e => {
     e.preventDefault();
     sliderTestimonials.scrollBy(300, 0); 
   });

   prevSliderTestimonials.addEventListener('click', e => {
     e.preventDefault();
     sliderTestimonials.scrollBy(-300, 0); 
   });
};
//instagram
const instagram = () => {
  // Get the button that opens the modal
  let btnImgModal = document.querySelectorAll('.btn-img-modal');
  // Get the <span> element that closes the modal
  let clsBtnImg = document.querySelectorAll('.close-img');
  // When the user clicks the button, open the modal
  btnImgModal.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      imgModal = document.querySelector(e.target.getAttribute("href"));
      imgModal.classList.add('img-modal-open');
    });
  });
  // When the user clicks on <span> (x), close the modal
  clsBtnImg.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      imgModal.classList.remove('img-modal-open');
    });
  });
};
//appear
const appear = () => {
  const faders = document.querySelectorAll('.fade-in');
  const slideIn = document.querySelectorAll('.slide-in');
  const appearOptions = {
    rootMargin: "0px 0px -250px 0px"
  };
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);   
      }
    });
  },
  appearOptions);
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
  slideIn.forEach(slide => {
    appearOnScroll.observe(slide);
  });
}; 
//invokeAll
const invokeAll = () => {
  switcher();
  menuBurger();
  testimonials();
  instagram();
  appear();
}
//window on load
window.onload = () => {
//showSlideWindow
//lets
let tracker = 0;
let slidewindow = document.querySelector("#slidewindow");
let slides = document.querySelectorAll("#slidewindow-child");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let dots = document.querySelector("#dots");
let allDots = dots.getElementsByTagName("LI");
//Attach click events to next and prev
next.onclick = direction;
prev.onclick = direction;
function direction(eventObject) {
  let idVal = eventObject.target.id;
  if(idVal === 'next' && tracker == slides.length - 1) {
    tracker = 0;
  } else if(idVal === 'next') {
    tracker++;
  }else if(idVal === 'prev' && tracker == 0) {
    tracker = slides.length - 1;
  }else if(idVal === 'prev') {
    tracker--;
  }else if(isNumber(idVal)) {
    tracker = idVal;
  }
  updateAll();
}
function isNumber(obj) {
  return !isNaN(parseFloat(obj));
}
//create a dot for each slide
for (var i = 0; i < slides.length; i++) {
  let dot = document.createElement("LI");
  dot.id = i;
  dots.appendChild(dot);
  dot.onclick = direction;
}
//updateDots
function updateDots(n) {
  for (var i = 0; i < allDots.length; i++) {
    allDots[i].className = "";
  }
  allDots[n].className = "active";
}
//update slide and container sizes
function updateAllTransitionOff() {
  updateDots(tracker);
  //set width of slidewindow to 100%
  slidewindow.style.width = "100%";
  //Get current width and height
  let curWidth = slides[0].offsetWidth;
  let curHeight = slides[0].offsetHeight;
  //set current w/h of slidewindow to match slide
  slidewindow.style.width = curWidth + "px";
  slidewindow.style.height = curHeight + "px";
  //set position of each slide
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.transform = "translateX(" + (i * curWidth + -tracker * curWidth) + "px )";
    slides[i].style.transition = 'none';
  }
}
updateAllTransitionOff();
//update slide and container sizes transitionOff
function updateAll() {
  updateDots(tracker);
  //set width of slidewindow to 100%
  slidewindow.style.width = "100%";
  //Get current width and height
  let curWidth = slides[0].offsetWidth;
  let curHeight = slides[0].offsetHeight;
  //set current w/h of slidewindow to match slide
  slidewindow.style.width = curWidth + "px";
  slidewindow.style.height = curHeight + "px";
  //set position of each slide
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.transform = "translateX(" + (i * curWidth + -tracker * curWidth) + "px )";
    slides[i].style.transition = 'transform 0.4s ease-in-out';
  }
}
//autoplay true=on, false=off
let autoplay = true;
//slideshow autoplay timing in ms
let autoTime = 5000;
let slideInterval;
function runSlider() {
  return setInterval(() => {
  if(tracker == slides.length - 1) {
    tracker = 0;
  }else if(tracker <= slides.length) {
    tracker++;
  }
  updateAll();
  }, autoTime);
}
//autoplay 
if (autoplay === true) {
  slideInterval = runSlider();
}
//stop autoplay
slidewindow.addEventListener('mouseenter', () => {
  clearTimeout(slideInterval);
});
//start auto play
slidewindow.addEventListener('mouseleave', () => {
  if (autoplay === true) {
    slideInterval = runSlider();
  }
});
//swipe event listeners
slidewindow.addEventListener("touchstart", handleTouchStart, false);
slidewindow.addEventListener("touchmove", handleTouchMove, false);
slidewindow.addEventListener('touchend', () => {
  //start auto play
  if (autoplay === true) {
    slideInterval = runSlider();
  }
});
//swipe lets
let xDown = null;
//swipe handleTouchStart
function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  //stop auto play
  clearTimeout(slideInterval);
}
//swipe handleTouchMove
function handleTouchMove(evt) {
  if (!xDown) {
    return;
  }
  var xUp = evt.touches[0].clientX;
  var xDiff = xDown - xUp;
  if (Math.abs(xDiff)) {
    /*determine most significant*/
    if (xDiff > 0) {
      //swipe left - next
      if(tracker == slides.length - 1) {
        tracker = 0;
      }else if(tracker <= slides.length) {
        tracker++;
      }
      updateAll();
    } else {
      //swipe right - prev
      if(tracker == 0) {
        tracker = slides.length - 1;
      }else if(tracker >= 0){
        tracker--;
      }
      updateAll();
    } 
  } 
  /* reset values */
  xDown = null;
}
//tabs
//lets
let trackerTab = 0;
let tabWindow = document.querySelector("#tabwindow");
let tabs = document.querySelectorAll("#tabwindow-child");
let dotsTab = document.querySelector("#dots-tabs");
let allDotsTab = dotsTab.getElementsByTagName("LI");
function directionTab(eventObjectTab) {
//get id from target
let idValTab = eventObjectTab.target.id;
if (isNumberTabs(idValTab)) {
  trackerTab = idValTab;
  }
  updateAllTabs();
}
function isNumberTabs(objTab) {
  return !isNaN(parseFloat(objTab));
}
//create a dot for each slide
for (var i = 0; i < tabs.length; i++) {
  let dotTab = document.createElement("LI");
  dotTab.id = i;
  dotsTab.appendChild(dotTab);
  dotTab.onclick = directionTab;
}
//updateDotsTabs
function updateDotsTabs(nTab) {
  for (var i = 0; i < allDotsTab.length; i++) {
    allDotsTab[i].className = "";
  }
  allDotsTab[nTab].className = "activeTab";
  allDotsTab[i = 0].textContent = 'PIZZA';
  allDotsTab[i = 1].textContent = 'PASTA';
  allDotsTab[i = 2].textContent = 'SALADS';
  allDotsTab[i = 3].textContent = 'DESSERTS';
}
//update slide and container sizes TransitionOff
function updateAllTabsTransitionOff() {
  updateDotsTabs(trackerTab);
  //set width of slidewindow to 100%
  tabWindow.style.width = "100%";
  //Get current width and height
  let curWidthTab = tabs[0].offsetWidth;
  let curHeightTab = tabs[0].offsetHeight;
  //set current w/h of tabWindow to match slide
  tabWindow.style.width = curWidthTab + "px";
  tabWindow.style.height = curHeightTab + "px";
  //set position of each slide
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].style.transform = "translateX(" + (i * curWidthTab + -trackerTab * curWidthTab) + "px )";
    tabs[i].style.transition = "none";
  }
}
updateAllTabsTransitionOff();
//update slide and container sizes
function updateAllTabs() {
  updateDotsTabs(trackerTab);
  //set width of slidewindow to 100%
  tabWindow.style.width = "100%";
  //Get current width and height
  let curWidthTab = tabs[0].offsetWidth;
  let curHeightTab = tabs[0].offsetHeight;
  //set current w/h of tabWindow to match slide
  tabWindow.style.width = curWidthTab + "px";
  tabWindow.style.height = curHeightTab + "px";
  //set position of each slide
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].style.transform = "translateX(" + (i * curWidthTab + -trackerTab * curWidthTab) + "px )";
    tabs[i].style.transition = "transform 0.4s ease-in-out";
  }
}
//swipe event listeners
tabWindow.addEventListener("touchstart", handleTouchStartTab, false);
tabWindow.addEventListener("touchmove", handleTouchMoveTab, false);
//swipe lets
let xDownTab = null;
//swipe handleTouchStart
function handleTouchStartTab(evtTab) {
  xDownTab = evtTab.touches[0].clientX;
}
//swipe handleTouchMove
function handleTouchMoveTab(evtTab) {
  if (!xDownTab) {
    return;
  }
  var xUpTab = evtTab.touches[0].clientX;
  var xDiffTab = xDownTab - xUpTab;
  if (Math.abs(xDiffTab)) {
    /*determine most significant*/
    if (xDiffTab > 0) {
      //swipe left - next
      if(trackerTab == tabs.length - 1) {
        trackerTab = 0;
      }else if(trackerTab <= tabs.length) {
        trackerTab++;
      }
      updateAllTabs();
    } else {
      //swipe right - prev
      if(trackerTab == 0) {
        trackerTab = tabs.length - 1;
      }else if(trackerTab >= 0){
        trackerTab--;
      }
      updateAllTabs();
    }
  }
  /* reset values */
  xDownTab = null;
}  
  //invokeAll
  invokeAll();
  //window onresize
  window.onresize = () => {
    //slidewindow
    updateAllTransitionOff();
    //tabs
    updateAllTabsTransitionOff();
  }; 
};
// Close If Outside Click
window.addEventListener('click', outsideClick);
function outsideClick(e) {
  let burger = document.querySelector('.burger');
  let menu = document.getElementById('menu');
  if (e.target == menu) {
    menu.classList.toggle('open');
    burger.classList.toggle('toggle-burger');
  }
  let imgModal = document.querySelector('.img-modal-open');
  if (e.target == imgModal) {
    imgModal.classList.remove('img-modal-open');
  }
}
//Active navigation on scroll
window.addEventListener('scroll', event => {
  event.preventDefault();
  let navigationLinks = document.querySelectorAll('.nav-links .nav-links-li a');
  let fromTop = window.scrollY;
  navigationLinks.forEach(link => {
    let section = document.querySelector(link.hash);
    if (
      section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add('activeLinks');
    } else {
      link.classList.remove('activeLinks');
    }
  });
});
































