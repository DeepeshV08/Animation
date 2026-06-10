import gsap from 'gsap'
import './style.css'


gsap.to('.box',{
  x: 400,
  delay:0.6,
  duration2
})

gsap.from('.box',{
  x: 400,
  duration: 2,
})

gsap.fromTo('.box',
  {
    x: 300,
    opacity:0
  },{
    x: 800,
    opacity: 1
  }
)