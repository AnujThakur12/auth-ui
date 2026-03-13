const wrapper = document.getElementById("wrapper")

document.getElementById("goRegister").onclick = () => {
wrapper.classList.add("show-register")
}
document.getElementById("goLogin").onclick = () => {
wrapper.classList.remove("show-register")
}
/* password toggle */

document.querySelectorAll(".toggle").forEach(toggle => {
toggle.addEventListener("click", () => {
let input = toggle.parentElement.querySelector(".password")
if(input.type === "password"){
input.type = "text"
toggle.classList.replace("fa-eye","fa-eye-slash")
}else{
input.type = "password"
toggle.classList.replace("fa-eye-slash","fa-eye")
}
})
})
/* particle network */

const canvas = document.getElementById("particles")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let particles=[]
const particleCount=90
const connectDistance=130
const mouse={x:null,y:null,radius:120}
window.addEventListener("mousemove",e=>{
mouse.x=e.x
mouse.y=e.y
})
class Particle{
constructor(){
this.x=Math.random()*canvas.width
this.y=Math.random()*canvas.height
this.size=Math.random()*2+1
this.speedX=(Math.random()-.5)*0.6
this.speedY=(Math.random()-.5)*0.6
}
update(){
this.x+=this.speedX
this.y+=this.speedY
if(this.x<0||this.x>canvas.width) this.speedX*=-1
if(this.y<0||this.y>canvas.height) this.speedY*=-1
let dx=this.x-mouse.x
let dy=this.y-mouse.y
let distance=Math.sqrt(dx*dx+dy*dy)
if(distance<mouse.radius){
let force=(mouse.radius-distance)/mouse.radius
this.x+=dx*force*0.6
this.y+=dy*force*0.6
}
}
draw(){
ctx.beginPath()
ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
ctx.fillStyle="#b892ff"
ctx.fill()
}

}
for(let i=0;i<particleCount;i++){
particles.push(new Particle())
}

function connect(){

for(let a=0;a<particles.length;a++){
for(let b=a;b<particles.length;b++){
let dx=particles[a].x-particles[b].x
let dy=particles[a].y-particles[b].y
let distance=dx*dx+dy*dy
if(distance<connectDistance*connectDistance){
ctx.strokeStyle="rgba(184,146,255,0.18)"
ctx.lineWidth=1
ctx.beginPath()
ctx.moveTo(particles[a].x,particles[a].y)
ctx.lineTo(particles[b].x,particles[b].y)
ctx.stroke()
}
}
}
}
function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height)
particles.forEach(p=>{
p.update()
p.draw()
})
connect()
requestAnimationFrame(animate)
}
animate()
window.addEventListener("resize",()=>{
canvas.width=window.innerWidth
canvas.height=window.innerHeight
})

/*
Author: Anuj Thakur
UI Design: Auth Particle Interface
*/