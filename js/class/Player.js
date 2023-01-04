import { scene, sheet } from '../../canvas.js'

class Player {
    constructor() {
        this.pos = {
            x: 100, 
            y: 100,
        }
        this.width = 100
        this.height = 100
        this.sides = {
            bottom: this.pos.y + this.height
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1
    }

    render() {
        scene.fillStyle = 'red'
        scene.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }

    reform() {
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
        this.sides.bottom = this.pos.y + this.height

        // above bottom canvas
        if(this.sides.bottom + this.velocity.y < sheet.height) {
            this.velocity.y += this.gravity
        } else {
            this.velocity.y = 0
        }


    }
}

export { Player }