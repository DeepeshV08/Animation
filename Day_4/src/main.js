import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";


// const play = document.querySelector('.play')
// const pause = document.querySelector('.pause')
// const restart = document.querySelector('.restart')
// const reverse = document.querySelector('.reverse')
// const seek = document.querySelector('.seek')

// const t1 = gsap.timeline({ paused: true })

// t1.to('.box', {
//   x: 1200,
//   duration: 1,
//   delay: 0.5,
//   ease: 'power4.out'
// }).to('.box1', {
//   x: 1200,
//   ease: 'power4.out',
//   duration: 1,
// }).addLabel('deepesh')
// .to('.box2', {
//   x: 1200,
//   duration: 1,
//   delay: 0.3,
//   ease: 'power4.out'
// }).addLabel('deepesh')
// .to('.box3', {
//   x: 1200,
//   duration: 1,
//   delay: 0.3,
//   ease: 'power4.out'
// })

// play.addEventListener('click', () => {
//   t1.play()
// })


// pause.addEventListener('click', () => {
//   t1.pause()
// })

// restart.addEventListener('click', () => {
//   t1.restart()
// })

// reverse.addEventListener('click', () => {
//   t1.reverse()
// })

// seek.addEventListener('click', () => {
//   t1.seek('deepesh')
// })


// Loading timeline
// const loadingTimeline = () => {
//   return gsap.timeline().to(Element, {})
// }

// //Navbar timeline
// const navbarTimeline = () => {
//   return gsap.timeline()
// }

// const master = gsap.timeline()

// master.add(loadingTimeline,'-=0.4').add(navbarTimeline)

//ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

gsap.to('.box',{
  x: 500,
  ease: 'power4.out',
  scrollTrigger:{
    trigger: '.page2',
    start: 'top top',
    end: 'top -40%',
    scrub: true,
    pin: true,
    onEnter = ()=>{},
    onLeave = ()=>{},
    onUpdate: ()=>{},
    onLeaveBack = ()=>{}
  }
})