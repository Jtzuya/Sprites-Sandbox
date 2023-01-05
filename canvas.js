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

// floor
const parsedCollisions = level1.parse2d()
const collisionBlocks = parsedCollisions.createObjectsFrom2d()

// player
const p1 = new Player({ 
    collisionBlocks,
    imageSrc: '/img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: '/img/king/idle.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: '/img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: '/img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: '/img/king/runLeft.png',
        },
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const floor1 = new Sprite({
    pos: { x: 0, y: 0 },
    imageSrc: '/img/backgroundLevel1.png'
})

// animations
function animate() {
    requestAnimationFrame(animate)

    // floor
    floor1.render()
    for(var i = 0; i < collisionBlocks.length; i++) {
        collisionBlocks[i].render()
    }

    // player
    p1.velocity.x = 0
    if(keys.d.pressed) {
        p1.switchSprite('runRight')
        p1.velocity.x = 10
        p1.lastDirection = 'right'
    } else if(keys.a.pressed) {
        p1.switchSprite('runLeft')
        p1.velocity.x = -10
        p1.lastDirection = 'left'
    } else {
        if(p1.lastDirection == 'left') {
            p1.switchSprite('idleLeft')
        } else {
            p1.switchSprite('idleRight')
        }
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