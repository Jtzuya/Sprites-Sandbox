import { Player } from './js/class/Player.js'
import { Sprite } from './js/class/Sprite.js'
import { level1, level2, level3 } from './js/data/collisions.js'
import eventz from './js/events.js'

import './js/utils.js'

const sheet = document.getElementsByTagName('canvas')[0]
const scene = sheet.getContext('2d')

sheet.width = 64 * 16 // 1024
sheet.height = 64 * 9 // 576

// floor
let parsedCollisions
let collisionBlocks
let floor
let doors
// player
const p1 = new Player({ 
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
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: '/img/king/enterDoor.png',
            onComplete: () => {
                console.log('completed')
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        
                        if(level === 4) level = 1

                        levels[level].init()
                        p1.switchSprite('idleRight')
                        p1.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            }
        }
    },
    loop: true
})

let level = 1
let levels =  {
    1: {
        init:() => {
            parsedCollisions = level1.parse2d()
            collisionBlocks = parsedCollisions.createObjectsFrom2d()
            p1.collisionBlocks = collisionBlocks

            if(p1.currentAnimation) {
                p1.currentAnimation.isActive = false
            }

            floor = new Sprite({
                pos: { x: 0, y: 0 },
                imageSrc: '/img/backgroundLevel1.png'
            })    
            
            doors = [
                new Sprite({
                    pos: {
                        x: 748.69,
                        y: 385.44 - 112.00  // y coordinate - height of the door
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    2: {
        init:() => {
            parsedCollisions = level2.parse2d()
            collisionBlocks = parsedCollisions.createObjectsFrom2d()
            p1.collisionBlocks = collisionBlocks
            p1.pos.x = 96
            p1.pos.y = 140

            if(p1.currentAnimation) {
                p1.currentAnimation.isActive = false
            }

            floor = new Sprite({
                pos: { x: 0, y: 0 },
                imageSrc: '/img/backgroundLevel2.png'
            })    
            
            doors = [
                new Sprite({
                    pos: {
                        x: 771,
                        y: 448 - 112.00  // y coordinate - height of the door
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    3: {
        init:() => {
            parsedCollisions = level3.parse2d()
            collisionBlocks = parsedCollisions.createObjectsFrom2d()
            p1.collisionBlocks = collisionBlocks
            p1.pos.x = 764
            p1.pos.y = 258 - 64

            if(p1.currentAnimation) {
                p1.currentAnimation.isActive = false
            }

            floor = new Sprite({
                pos: { x: 0, y: 0 },
                imageSrc: '/img/backgroundLevel3.png'
            })    
            
            doors = [
                new Sprite({
                    pos: {
                        x: 176.40,
                        y: 446.47 - 112.00  // y coordinate - height of the door
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
}

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const overlay = {
    opacity: 0
}

// animations
function animate() {
    requestAnimationFrame(animate)

    // floor
    floor.render()
    for(var i = 0; i < collisionBlocks.length; i++) {
        collisionBlocks[i].render()
    }
    
    // doors
    for(var j = 0; j < doors.length; j++) {
        doors[j].render()
    }

    // player
    p1.handleInput(keys)
    p1.render()
    p1.reform()

    scene.save()
    scene.globalAlpha = overlay.opacity
    scene.fillStyle = 'black'
    scene.fillRect(0, 0, sheet.width, sheet.height)
    scene.restore()
}

levels[level].init()
// Render and exports
animate()
eventz()

export { 
    scene, 
    sheet, 
    keys, 
    p1,
    doors
}