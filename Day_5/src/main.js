import gsap from "gsap";
    
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Draggable,Flip,InertiaPlugin,ScrollTrigger,SplitText);
import './style.css'


// const split = new SplitText('.title h1',{
//   type: 'chars,words',
//   wordsClass: 'titleword',
//   charsClass: 'titleChars'
// })

// gsap.from(split.chars,{
//   yPercent: 100,
//   opacity: 0,
//   duration: 1.2,
//   ease: 'expo.out',
//   stagger:{
//     each: 0.09,
//     from:'start'
//   }
// })

// Draggable.create('.box',{
//   // bounds: {
//   //   maxX: ,
//   //   maxY: ,
//   //   minX: ,
//   //   minY: ,
//   // }
//   bounds: '#app',
//   type: 'x,y',
//   edgeResistance: 1
// })



const img = document.querySelector('.imageGallery img')




img.addEventListener('click',() => {

  const state = Flip.getState(img)

  document.querySelector('.imageShow').appendChild(img)

  Flip.from(state,{
    duration: 0.8,
    ease: 'power3.inOut'
  })
})