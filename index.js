const canv = document.getElementsByTagName('canvas')[0]
const c = canv.getContext('2d')

canv.height = innerHeight
canv.width = innerWidth

// dynamic box
const box = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

addEventListener('mousemove', (e) => {
    box.x = e.clientX
    box.y = e.clientY
})

// arc
function arc() {
    requestAnimationFrame(arc)
    // console.log('requesting anim frames')
    // main canvas container
    c.fillStyle = '#25252A'
    c.fillRect(0, 0, canv.width, canv.height)

    // dynamic box
    c.fillStyle = 'rgb(255 0 0 / 85%)'
    c.fillRect(box.x, box.y, 100, 100)

    // static box
    c.fillStyle = 'turquoise'
    c.fillRect(canv.width / 2 - 50, canv.height / 2 - 50, 100, 100)

    if(
        box.x + 100 >= canv.width / 2 - 50 &&
        box.x <= canv.width / 2 - 50 + 100 &&
        box.y + 100 >= canv.height / 2 - 50 &&
        box.y <= canv.height / 2 - 50 + 100
    ){
        console.log('colliding')
        c.fillStyle = 'orange'
        c.fillRect(canv.width / 2 - 50, canv.height / 2 - 50, 100, 100)
    }
    
}

// call arc
arc()