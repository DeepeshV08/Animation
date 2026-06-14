import './style.css'
import gsap from 'gsap'

// gsap.to('h1' ,
//   {
//     x: 200,
//     duration: 1,
//     delay: 0.5,
//     ease: 'power4.out',
//     stagger: {
//       each: 0.1,
//       from: 'random'
//     },
//   }
// )

// Second task

// gsap.from('h1 span' , {
//   yPercent: 100,
//   opacity: 0,
//   duration: 2,
//   ease: 'expo.out',
//   stagger: {
//     each: 0.08,
//     from:'random'
//   }
// })


// gsap.to('.box',{
//   x: 1200,
//   duration: 1.3,
//   delay: 0.6,
//   ease: 'power4.out'
// })

// gsap.to('.box1',{
//   x: 1200,
//   ease: 'power4.out',
//   duration: 1.3,
//   delay: 1.9
// })


// Time Line
const t1 = gsap.timeline()

t1.to('.box',{
  x: 1200,
  duration: 1.3,
  delay: 0.5,
  ease: 'power4.out'
}).to('.box1',{
  x: 1200,
  ease: 'power4.out',
  duration: 1.3,
},"deepesh-=0.3").to('.box2',{
  x: 1200,
  duration: 1.3,
  delay: 0.6,
  ease: 'power4.out'
}).to('.box3',{
  x: 1200,
  duration: 1.3,
  delay: 0.6,
  ease: 'power4.out'
},"deepesh")