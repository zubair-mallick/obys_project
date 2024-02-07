function locomotiveanimation(){
    gsap.registerPlugin(ScrollTrigger);
    
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
}

function loadingAnimation(){
    let tl = gsap.timeline();
    tl.from(".line h1", {
        y:150,
        stagger:0.25,
        duration:2,
        delay:.5
    });
    gsap.from("#line1-part1,.line h2", {
        opacity:0,
        onStart: function(){
            var h5= document.querySelector("#line1-part1 h5")
             var counter=0;
              var a=setInterval(function(){
                if(counter>=100){
                    clearTimeout(a)
                }
                h5.innerHTML= `${counter}`
                counter++
             
            },30)
        }
    });
    tl.to(".line h2",{
        animationName:"anime",
        opacity:1
    })
    tl.to("#loader", {
        opacity:0,
        delay:0.0,//change to 0.5
        duration:0.2,
       
    
    })
    tl.from("#page1",{
        delay:0.2,
        y:1200,
        duration:0.5,
        ease:Power4
    })
    tl.to("#loader",{
        display:"none"
    })
    tl.from("#nav",{
        opacity:0,
    })
    tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1",{
        y:120,
        stagger:0.2,
    })
    tl.from("#hero1  ,#page2",{
        opacity:0,
        
    },"-=1.2")
           
}
function cursornimation(){
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#crsr", {
            left: dets.x,
            top: dets.y,
        });
    });
    
    // const lerp = (current, target, factor) =>
    //     current * (1 - factor) + target * factor;
    
    // let mousePosition = { x: 0, y: 0 };
    // window.addEventListener("mousemove", (e) => {
    //     mousePosition.x = e.pageX;
    //     mousePosition.y = e.pageY;
    // });
    
    // const calculateDistance = (x1, y1, x2, y2) => {
    //     return Math.hypot(x1 - x2, y1 - y2);
    // };
    
    // // ------------------------------------------------------------------------
    
    // class MagneticObject {
    //     constructor(domElement) {
    //         this.domElement = domElement;
    //         this.boundingClientRect = this.domElement.getBoundingClientRect();
    //         this.triggerArea = 90;
    //         this.interpolationFactor = 0.8;
    
    //         this.lerpingData = {
    //             x: { current: 0, target: 0 },
    //             y: { current: 0, target: 0 },
    //         };
    
    //         this.render();
    //         this.resize();
    //     }
    
    //     resize() {
    //         window.addEventListener("resize", () => {
    //             this.boundingClientRect = this.domElement.getBoundingClientRect();
    //         });
    //     }
    
    //     render() {
    //         const distanceFromMouseToCenter = calculateDistance(
    //             mousePosition.x,
    //             mousePosition.y,
    //             this.boundingClientRect.left + this.boundingClientRect.width / 2,
    //             this.boundingClientRect.top + this.boundingClientRect.height / 2
    //         );
    
    //         let targetHolder = { x: 0, y: 0 };
    
    //         if (distanceFromMouseToCenter < this.triggerArea) {
    //             targetHolder.x =
    //                 (mousePosition.x -
    //                     (this.boundingClientRect.left +
    //                         this.boundingClientRect.width / 2)) *
    //                 0.2;
    //             targetHolder.y =
    //                 (mousePosition.y -
    //                     (this.boundingClientRect.top +
    //                         this.boundingClientRect.height / 2)) *
    //                 0.2;
    //         }
    
    //         this.lerpingData["x"].target = targetHolder.x;
    //         this.lerpingData["y"].target = targetHolder.y;
    
    //         for (const item in this.lerpingData) {
    //             this.lerpingData[item].current = lerp(
    //                 this.lerpingData[item].current,
    //                 this.lerpingData[item].target,
    //                 this.interpolationFactor
    //             );
    //         }
    
    //         this.domElement.style.transform = `translate(${this.lerpingData["x"].current}px, ${this.lerpingData["y"].current}px)`;
    
    //         window.requestAnimationFrame(() => this.render());
    //     }
    // }
    
    // const magnets = document.querySelectorAll(".call-to-action-btn");
    // let activeMagnet = null;
    
    // function updateClosestMagnet() {
    //     let closestDistance = Infinity;
    //     let closestMagnet = null;
    
    //     magnets.forEach(function (elem) {
    //         const boundingClientRect = elem.getBoundingClientRect();
    //         const distance = calculateDistance(
    //             mousePosition.x,
    //             mousePosition.y,
    //             boundingClientRect.left + boundingClientRect.width / 2,
    //             boundingClientRect.top + boundingClientRect.height / 2
    //         );
    
    //         if (distance < closestDistance) {
    //             closestDistance = distance;
    //             closestMagnet = elem;
    //         }
    //     });
    
    //     if (activeMagnet !== closestMagnet) {
    //         if (activeMagnet) {
    //             activeMagnet.classList.remove("focus");
    //         }
    
    //         if (closestMagnet && closestDistance < closestMagnet.triggerArea) {
    //             closestMagnet.classList.add("focus");
    //             activeMagnet = closestMagnet;
    //         } else {
    //             activeMagnet = null;
    //         }
    //     }
    // }
    
    // magnets.forEach(function (elem) {
    //     const magneticObj = new MagneticObject(elem);
    
    //     elem.addEventListener("mouseenter", () => {
    //         if (activeMagnet) {
    //             activeMagnet.classList.remove("focus");
    //         }
    //         elem.classList.add("focus");
    //         activeMagnet = elem;
    //     });
    
    //     elem.addEventListener("mouseleave", () => {
    //         if (activeMagnet === elem) {
    //             elem.classList.remove("focus");
    //             activeMagnet = null;
    //         }
    //     });
    // });
    
    
    // document.addEventListener("mousemove", updateClosestMagnet);
    
    Shery.makeMagnet("#navpart2 h4");
    
}
loadingAnimation();
// cursornimation();
locomotiveanimation();



