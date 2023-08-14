
// locomotive js from github for smooth scrolling
const scroll = new LocomotiveScroll({
   el: document.querySelector('#container'),
   smooth: true
});


// Code To Animate Navigation
// Start TO Animate
var navbar =document.getElementById('menu');
var MenuBtn = document.getElementById('menu-btn');
 
MenuBtn.addEventListener('click', function(){
    document.querySelector('#menu-btn').style.opacity=0;
    const tm =gsap.timeline();
    tm.to('#menu',{
      duration: 1,
      y: '1%',
      opacity:1
    })
    .from('.item',{
      y: '-100%',
      duration: .5,
      opacity: 0,
      stagger: .2,
      delay:-1,
      ease:Power3
    })
});
// End TO Animate


// function to animate the first page by using GSAP

// animateFirstPage function start...
function animateFirstPage() {
   var tl = gsap.timeline();
   tl.from("#nav", {
      y: -10,
      ease: Power3,
      opacity: 0,
      duration: 1.5,
      delay: .1
   })
      .to(".move-element", {
         y: 0,
         ease: Expo.easeInOut,
         duration: 1.5,
         stagger: .2,
         delay: -1
      })
      .from("#herofooter", {
         y: -10,
         opacity: 0,
         duration: 1.5,
         delay: .1,
         ease: Power3,
      })
}
// animateFirstPage function end...

// Global variable for clearing the setTimeOut property
var TimeOut;


// function to skew the circle as mouse moves using Gsap

// Skew the circle function start...
function SkewCircle(){
   // initial scale values
   var xscale = 1;
   var yscale = 1;
     
   // previous scale values
   var PreX = 0;
   var PreY = 0;

   // adding a event listener to skew the circle b/w the range (.8 - 1)

   window.addEventListener("mousemove", function(dets){
      
      // function to clear the previous data
      clearTimeout(TimeOut);

      // mantain the diff b/w .8 and 1.2 using clamp function
      xscale = gsap.utils.clamp(.8,1.2, dets.clientX - PreX);
      yscale = gsap.utils.clamp(.8,1.2, dets.clientY - PreY);
       
      // get the mouse move values 
      PreX = dets.clientX;
      PreY = dets.clientY;

      // call the function moveCircle() 
      moveCircle(xscale, yscale);
      
      // get the circle in original shape by using settimeout function
      TimeOut=setTimeout(function(){
      document.querySelector("#point-circle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(1,1)`;
      }, 100);
   })
}
// Skew the circle function end...

// function to move circle along with curser

// move circle function start...
function moveCircle(xscale, yscale) {
   window.addEventListener("mousemove", function (dets) {
      document.querySelector("#point-circle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${xscale},${yscale})`;
   })
}
// move circle function end...

// calling functions
animateFirstPage();
SkewCircle();

// move the image along with mouse in side the element div

// ForEach Loop function start....
document.querySelectorAll(".elements").forEach(function(element){
   var RotDiff=0;
   var rotate = 0;
   // event handler for removing the image as mouse leaves the element
   element.addEventListener("mouseleave", function(){
      gsap.to(element.querySelector("img"),{
       opacity: 0,
       ease:Power3, 
       duration: 0.5, 
      });
    });

   // event handler for moving the image along with mousemove
   element.addEventListener("mousemove", function(dets){
     var getdiff = dets.clientY - element.getBoundingClientRect().top;
     RotDiff = dets.clientX -rotate;
     rotate=dets.clientX;
     gsap.to(element.querySelector("img"),{
      opacity: 1,
      ease:Power3,
      top: getdiff,
      left:dets.clientX,
      rotate: gsap.utils.clamp(-20,20,RotDiff * 0.5),
     });
   });
});
// ForEach Loop function end...

// function to set time

// Clock function start...
function Clock(){

var Now = new Date();
var h = Now.getHours();
var m = Now.getMinutes();

var ampm=h>12? "PM" : "AM";
  
if(h==0){
   h=12;
}else{
   if(h>12){
      h-=12;
   }
}

m= m<10? "0"+m:m;

// Calculate the UTC offset in hours
var utcOffset = Now.getTimezoneOffset() / 60;
var timezone = 'UTC';
if (utcOffset !== 0) {
  timezone = `UTC${utcOffset > 0 ? '+' : ''}${utcOffset}`;
}

  var append=document.getElementById('Clock');
  append.textContent= `${h}:${m} ${ampm} ${timezone}`;
  
  setTimeout(Clock,1000);
}
// Clock function end...

// calling the function clock
Clock();