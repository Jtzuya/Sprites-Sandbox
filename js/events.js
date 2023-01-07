import { keys, p1, doors } from '../canvas.js'

export default function eventz() {
    addEventListener('keydown', (e) => {

        if(p1.preventInput) return
        switch(e.key) {
            case ' ':
                for(var i = 0; i < doors.length; i++) {
                    const door = doors[i]

                    if(
                        p1.hitbox.pos.x + p1.hitbox.width <= door.pos.x + door.width &&
                        p1.hitbox.pos.x >= door.pos.x &&
                        p1.hitbox.pos.y + p1.hitbox.height >= door.pos.y &&
                        p1.hitbox.pos.y <= door.pos.y + door.height
                    ) {
                        p1.velocity.x = 0
                        p1.velocity.y = 0
                        p1.preventInput = true
                        p1.switchSprite('enterDoor')
                        door.play()
                        return
                    }
                }

                // console.log('I pressed spacebar')
                if(p1.velocity.y === 0) p1.velocity.y = -15
                break
            case 'a':
                keys.a.pressed = true
                break
            case 's':
                break
            case 'd':
                keys.d.pressed = true
                break
        }
    })
    addEventListener('keyup', (e) => {
        switch(e.key) {
            case 'a':
                keys.a.pressed = false
                break
            case 'd':
                keys.d.pressed = false
                break
        }
    })
}