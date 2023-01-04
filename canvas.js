import { Player } from './js/class/Player.js'
import { Sprite } from './js/class/Sprite.js'
import { level1 } from './js/data/collisions.js'
import { CollisionBlock } from './js/class/CollisionBlock.js'
import eventz from './js/events.js'

import './js/utils.js'

const sheet = document.getElementsByTagName('canvas')[0]
const scene = sheet.getContext('2d')

sheet.width = 64 * 16 // 1024
sheet.height = 64 * 9 // 576

// player
const p1 = new Player()
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

// floor
const parsedCollisions = level1.parse2d()
const blocks = parsedCollisions.createObjectsFrom2d()

const floor1 = new Sprite({
    pos: { x: 0, y: 0 },
    imageSrc: '/img/backgroundLevel1.png'
})

// animations
function animate() {
    requestAnimationFrame(animate)

    // floor
    floor1.render()
    for(var i = 0; i < blocks.length; i++) {
        blocks[i].render()
    }

    // player
    p1.velocity.x = 0
    if(keys.a.pressed) {
        p1.velocity.x = -10
    } else if(keys.d.pressed) {
        p1.velocity.x = 10
    }

    p1.render()
    p1.reform()
}

// Render and exports
animate()
eventz()

export { 
    scene, 
    sheet, 
    keys, 
    p1 
}