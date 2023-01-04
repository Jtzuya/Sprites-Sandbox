import { keys, p1 } from '../canvas.js'

export default function eventz() {
    addEventListener('keydown', (e) => {
        switch(e.key) {
            case ' ':
                // console.log('I pressed spacebar')
                if(p1.velocity.y === 0) p1.velocity.y = -20
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