import { scene } from "../../canvas.js"

class CollisionBlock {
    constructor({ pos }) {
        this.pos = pos
        this.width = 64
        this.height = 64
    }

    render() {
        scene.fillStyle = 'rgb(0 0 255 / 0%)'
        scene.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
}

export { CollisionBlock }